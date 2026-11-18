import { useAuth } from "@/context/AuthContext";
import { apiGet } from "@/lib/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

const C = {
  bg: "#F7F5FB",
  purple: "#3D1D53",
  accent: "#963BFF",
  lavender: "#E8C9FF",
  light: "#F5EDFC",
  text: "#21182B",
  muted: "#81788B",
  white: "#FFFFFF",
  border: "#EAE3F0",
  green: "#159447",
};

type ItemParam = {
  ticket_category_id: number;
  qty: number;
  price: number;
  name: string;
};

type GeneratedTicket = {
  ticket_code: string;
  category_name?: string;
};

type OrderStatus = {
  status: "pending" | "paid" | "cancelled" | "expired";
  midtrans_status_checked?: boolean;
  total_amount: number;
  event: EventSummary | null;
  items: ItemParam[];
  tickets: GeneratedTicket[];
};

type EventSummary = {
  id: number;
  title: string;
  venue: string;
  event_date: string;
  banner_url: string;
};

const formatPrice = (price: number) => "Rp" + price.toLocaleString("id-ID");

const getString = (value: string | string[] | undefined, fallback = "") =>
  Array.isArray(value) ? value[0] : value || fallback;

function formatDateTime(d: string) {
  try {
    return (
      new Date(d).toLocaleString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }) + " WIB"
    );
  } catch {
    return d;
  }
}

const FALLBACK =
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500";

export default function OrderSuccessScreen() {
  const router = useRouter();
  const { token } = useAuth();

  const params = useLocalSearchParams<{
    order_code?: string;
    name?: string;
    email?: string;
    phone?: string;
  }>();

  const orderCode = getString(params.order_code);
  const buyerName = getString(params.name, "Aditya Pratama");
  const email = getString(params.email, "aditya.pratama@example.com");
  const phone = getString(params.phone, "+62 812 3456 7890");

  const [event, setEvent] = useState<EventSummary | null>(null);
  const [order, setOrder] = useState<OrderStatus | null>(null);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [statusError, setStatusError] = useState("");

  const refreshOrder = useCallback(async (showLoading = true) => {
    if (!token || !orderCode) {
      setLoadingOrder(false);
      return;
    }
    if (showLoading) setLoadingOrder(true);
    try {
      const res = await apiGet<OrderStatus>(
        `/api/orders/${encodeURIComponent(orderCode)}`,
        token
      );
      if (!res.success || !res.data) {
        throw new Error(res.message || "Unable to retrieve payment status.");
      }
      setOrder(res.data);
      setEvent(res.data.event);
      setStatusError("");
    } catch (err) {
      console.error("Order status error:", err);
      setStatusError(
        err instanceof Error
          ? err.message
          : "Unable to verify payment status. Please try again."
      );
    } finally {
      if (showLoading) setLoadingOrder(false);
    }
  }, [orderCode, token]);

  useEffect(() => {
    refreshOrder();
  }, [refreshOrder]);

  useEffect(() => {
    if (
      !orderCode ||
      order?.status === "paid" ||
      order?.status === "cancelled" ||
      order?.status === "expired"
    ) {
      return;
    }

    let active = true;
    let timeout: ReturnType<typeof setTimeout>;
    const poll = async () => {
      await refreshOrder(false);
      if (active) timeout = setTimeout(poll, 10000);
    };
    timeout = setTimeout(poll, 10000);
    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [order?.status, orderCode, refreshOrder]);

  const items = order?.items || [];
  const tickets = order?.tickets || [];
  const total = order?.total_amount || 0;
  const isPaid = order?.status === "paid";
  const statusLabel =
    order?.status === "paid"
      ? "PAID"
      : order?.status === "cancelled"
        ? "CANCELLED"
        : order?.status === "expired"
          ? "EXPIRED"
          : "PENDING";

  const totalTickets = items.reduce((s, it) => s + (it.qty || 0), 0);
  const primaryTicketCode = tickets[0]?.ticket_code || "";

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* SUCCESS ICON */}
        <View style={styles.successSection}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <Text style={styles.checkIcon}>
                {isPaid ? "✓" : order?.status === "pending" || !order ? "…" : "!"}
              </Text>
            </View>
          </View>

          <Text style={styles.successTitle}>
            {isPaid
              ? "Payment Successful!"
              : order?.status === "cancelled" || order?.status === "expired"
                ? "Payment not completed"
                : "Waiting for payment"}
          </Text>
          <Text style={styles.successSubtitle}>
            {isPaid
              ? "Your payment has been received. Your concert tickets are ready!"
              : order?.status === "cancelled" || order?.status === "expired"
                ? "This order is no longer active. Please create a new order to try again."
                : "Complete payment in the Midtrans page. This screen updates after Midtrans confirms your payment."}
          </Text>
        </View>

        {/* ORDER NUMBER */}
        <View style={styles.orderCard}>
          <Text style={styles.orderLabel}>ORDER NUMBER</Text>
          <View style={styles.orderRow}>
            <Text style={styles.orderNumber}>{orderCode}</Text>
            <View style={isPaid ? styles.paidBadge : styles.pendingBadge}>
              <Text style={isPaid ? styles.paidText : styles.pendingText}>
                {statusLabel}
              </Text>
            </View>
          </View>
        </View>

        {loadingOrder && !order ? (
          <ActivityIndicator size="large" color={C.purple} />
        ) : !isPaid ? (
          <View style={styles.detailCard}>
            <Text style={styles.sectionTitle}>Payment status</Text>
            <Text style={styles.paymentValue}>
              {order
                ? `Order is ${order.status}. Your tickets will appear here after Midtrans confirms payment.`
                : "Unable to load payment status. Check your connection and try again."}
            </Text>
            {statusError ? (
              <Text style={styles.statusError}>{statusError}</Text>
            ) : null}
            {order?.status === "pending" && !statusError ? (
              <Text style={styles.statusHint}>
                Checking the latest status with Midtrans automatically.
              </Text>
            ) : null}
            <Pressable
              style={styles.refreshButton}
              onPress={() => refreshOrder()}
              disabled={loadingOrder}
            >
              <Text style={styles.primaryButtonText}>
                {loadingOrder ? "Checking..." : "Check payment status"}
              </Text>
            </Pressable>
            <Pressable
              style={styles.secondaryButton}
              onPress={() => router.replace("/(tabs)/my-tickets")}
            >
              <Text style={styles.secondaryButtonText}>View My Tickets</Text>
            </Pressable>
          </View>
        ) : (
          <>
        {/* E-TICKET */}
        <Text style={styles.sectionTitle}>Your E-Ticket</Text>

        <View style={styles.ticketCard}>
          <View style={styles.ticketHeader}>
            <View>
              <Text style={styles.ticketBrand}>NOCTURNE</Text>
              <Text style={styles.ticketSubBrand}>YOUR NIGHT. YOUR MUSIC.</Text>
            </View>
            <View style={styles.ticketIcon}>
              <Text style={styles.ticketIconText}>♫</Text>
            </View>
          </View>

          <Image
            source={{ uri: event?.banner_url || FALLBACK }}
            style={styles.ticketImage}
          />

          <View style={styles.ticketInfo}>
            <Text style={styles.ticketEventTitle}>
              {event?.title || "Concert"}
            </Text>
            <Text style={styles.ticketDate}>
              {event ? formatDateTime(event.event_date) : ""}
            </Text>
            <Text style={styles.ticketVenue}>{event?.venue || ""}</Text>
          </View>

          <View style={styles.dashedDivider}>
            <View style={styles.leftCutout} />
            <View style={styles.rightCutout} />
          </View>

          <View style={styles.qrSection}>
            <View style={styles.qrBox}>
              <QRCode
                value={primaryTicketCode}
                size={85}
                color={C.purple}
                backgroundColor="transparent"
              />
            </View>

            <View style={styles.qrInfo}>
              <Text style={styles.qrLabel}>TICKET HOLDER</Text>
              <Text style={styles.qrName}>{buyerName}</Text>

              <Text style={styles.qrLabel}>TICKETS</Text>
              <Text style={styles.qrName}>
                {totalTickets || tickets.length} Ticket
                {(totalTickets || tickets.length) > 1 ? "s" : ""}
              </Text>

              <Text style={styles.qrLabel}>TICKET CODE</Text>
              <Text style={styles.qrOrderId}>{primaryTicketCode}</Text>
            </View>
          </View>

          <View style={styles.ticketFooter}>
            <Text style={styles.ticketFooterText}>
              Show this QR code at the concert venue entrance.
            </Text>
          </View>
        </View>

        {/* TICKET DETAILS */}
        <Text style={styles.sectionTitle}>Ticket Details</Text>
        <View style={styles.detailCard}>
          {items.map((it) => (
            <View key={it.ticket_category_id} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{it.name}</Text>
              <Text style={styles.detailValue}>× {it.qty}</Text>
            </View>
          ))}
          <View style={styles.detailDivider} />
          <View style={styles.detailRow}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
          </View>
        </View>

        {/* PAYMENT INFO */}
        <Text style={styles.sectionTitle}>Payment Information</Text>
        <View style={styles.detailCard}>
          <View style={styles.paymentRow}>
            <Text style={styles.detailLabel}>Buyer</Text>
            <Text style={styles.paymentValue}>{buyerName}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.paymentValue}>{email}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.detailLabel}>Phone</Text>
            <Text style={styles.paymentValue}>{phone}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.detailLabel}>Status</Text>
            <Text style={styles.statusValue}>Successful</Text>
          </View>
        </View>

        {/* BUTTONS */}
        <Pressable
          style={styles.primaryButton}
          onPress={() => router.replace("/(tabs)/my-tickets")}
        >
          <Text style={styles.primaryButtonText}>View My Tickets</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.secondaryButtonText}>Back to Home</Text>
        </Pressable>
          </>
        )}

        {isPaid && (
          <Text style={styles.footerText}>Thank you for choosing Nocturne ♡</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 35,
  },
  successSection: { alignItems: "center", marginBottom: 28 },
  outerCircle: {
    width: 100,
    height: 100,
    borderRadius: 55,
    backgroundColor: "#EDE0F9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  innerCircle: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: C.purple,
    alignItems: "center",
    justifyContent: "center",
  },
  checkIcon: { color: C.white, fontSize: 38, fontWeight: "800" },
  successTitle: {
    color: C.text,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 10,
  },
  successSubtitle: {
    color: C.muted,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 21,
    paddingHorizontal: 15,
  },
  orderCard: {
    backgroundColor: C.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    marginBottom: 27,
  },
  orderLabel: {
    color: C.muted,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 9,
  },
  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  orderNumber: { color: C.purple, fontSize: 15, fontWeight: "800" },
  paidBadge: {
    backgroundColor: "#DCFCE7",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  pendingBadge: {
    backgroundColor: "#FFF1C7",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  paidText: { color: C.green, fontSize: 10, fontWeight: "800" },
  pendingText: { color: "#B65B00", fontSize: 10, fontWeight: "800" },
  sectionTitle: {
    color: C.text,
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 13,
  },
  ticketCard: {
    backgroundColor: C.white,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: C.border,
    overflow: "hidden",
    marginBottom: 27,
  },
  ticketHeader: {
    backgroundColor: C.purple,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ticketBrand: {
    color: C.white,
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 2,
  },
  ticketSubBrand: {
    color: "#DCC7E9",
    fontSize: 9,
    letterSpacing: 1,
    marginTop: 4,
  },
  ticketIcon: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: "#58336B",
    alignItems: "center",
    justifyContent: "center",
  },
  ticketIconText: { color: C.white, fontSize: 24 },
  ticketImage: { width: "100%", height: 150, backgroundColor: C.light },
  ticketInfo: { padding: 16 },
  ticketEventTitle: {
    color: C.text,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 7,
  },
  ticketDate: { color: C.muted, fontSize: 12, marginBottom: 5 },
  ticketVenue: { color: C.muted, fontSize: 12 },
  dashedDivider: {
    height: 1,
    borderTopWidth: 1,
    borderColor: "#D8CCE3",
    borderStyle: "dashed",
    marginHorizontal: 16,
    position: "relative",
  },
  leftCutout: {
    position: "absolute",
    left: -25,
    top: -12,
    width: 24,
    height: 24,
    borderRadius: 15,
    backgroundColor: C.bg,
  },
  rightCutout: {
    position: "absolute",
    right: -25,
    top: -12,
    width: 24,
    height: 24,
    borderRadius: 15,
    backgroundColor: C.bg,
  },
  qrSection: {
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
  },
  qrBox: {
    width: 105,
    height: 105,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.white,
    alignItems: "center",
    justifyContent: "center",
  },
  qrInfo: { flex: 1, gap: 4 },
  qrLabel: {
    color: C.muted,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginTop: 4,
  },
  qrName: { color: C.text, fontSize: 12, fontWeight: "800" },
  qrOrderId: { color: C.purple, fontSize: 10, fontWeight: "700" },
  ticketFooter: {
    backgroundColor: C.light,
    padding: 12,
    alignItems: "center",
  },
  ticketFooterText: { color: C.purple, fontSize: 11, fontWeight: "600" },
  detailCard: {
    backgroundColor: C.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.border,
    padding: 17,
    marginBottom: 26,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  detailLabel: { color: C.muted, fontSize: 13 },
  detailValue: { color: C.text, fontSize: 13, fontWeight: "700" },
  detailDivider: { height: 1, backgroundColor: C.border, marginBottom: 15 },
  totalLabel: { color: C.text, fontSize: 15, fontWeight: "800" },
  totalValue: { color: C.purple, fontSize: 17, fontWeight: "900" },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    gap: 10,
  },
  paymentValue: {
    color: C.text,
    fontSize: 12,
    fontWeight: "700",
    flexShrink: 1,
    textAlign: "right",
  },
  statusError: {
    color: "#B42318",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
  },
  statusHint: {
    color: C.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
  },
  statusValue: { color: C.green, fontSize: 12, fontWeight: "800" },
  primaryButton: {
    height: 54,
    backgroundColor: C.purple,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  refreshButton: {
    backgroundColor: C.purple,
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 15,
    marginTop: 16,
  },
  primaryButtonText: { color: C.white, fontSize: 14, fontWeight: "800" },
  secondaryButton: {
    height: 52,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: C.purple,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: { color: C.purple, fontSize: 14, fontWeight: "800" },
  footerText: {
    color: C.muted,
    fontSize: 12,
    textAlign: "center",
    marginTop: 23,
  },
});
