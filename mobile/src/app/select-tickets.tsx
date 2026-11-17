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

const C = {
  bg: "#F7F5FB",
  purple: "#3D1D53",
  accent: "#A64AFF",
  lavender: "#E8C9FF",
  light: "#F5EDFC",
  text: "#21182B",
  muted: "#81788B",
  white: "#FFFFFF",
  border: "#EAE3F0",
  green: "#DDF9E6",
  greenText: "#168442",
  yellow: "#FFF1C7",
  yellowText: "#AD6A00",
};

type TicketCategory = {
  id: number;
  name: string;
  price: number;
  quota: number;
  sold: number;
  is_locked: boolean;
};

type EventSummary = {
  id: number;
  title: string;
  venue: string;
  event_date: string;
  banner_url: string;
};

const formatPrice = (p: number) => "Rp" + p.toLocaleString("id-ID");

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

export default function SelectTicketsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const eventId = params.id || "";

  const [event, setEvent] = useState<EventSummary | null>(null);
  const [tickets, setTickets] = useState<TicketCategory[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!eventId) return;
    try {
      const [evRes, tcRes] = await Promise.all([
        apiGet<EventSummary>(`/api/events/${eventId}`),
        apiGet<TicketCategory[]>(`/api/tickets?event_id=${eventId}`),
      ]);
      if (evRes.success && evRes.data) setEvent(evRes.data);
      if (tcRes.success && Array.isArray(tcRes.data)) {
        setTickets(tcRes.data);
        const q: Record<number, number> = {};
        tcRes.data.forEach((t) => (q[t.id] = 0));
        setQuantities(q);
      }
    } catch (err) {
      console.error("SelectTickets error:", err);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const totalTickets = Object.values(quantities).reduce((s, q) => s + q, 0);
  const subtotal = tickets.reduce(
    (s, t) => s + (quantities[t.id] || 0) * t.price,
    0
  );
  const serviceFee =
    subtotal > 0 ? Math.ceil((subtotal * 0.05) / 1000) * 1000 : 0;
  const totalPayment = subtotal + serviceFee;

  const updateQuantity = (id: number, change: number, stock: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const next = current + change;
      if (next < 0 || next > 4) return prev;
      const total = Object.values(prev).reduce((s, q) => s + q, 0);
      if (change > 0 && total >= 6) return prev;
      if (change > 0 && next > stock) return prev;
      return { ...prev, [id]: next };
    });
  };

  const handleContinue = () => {
    if (totalTickets < 1) return;
    const items = tickets
      .filter((t) => (quantities[t.id] || 0) > 0)
      .map((t) => ({
        ticket_category_id: t.id,
        qty: quantities[t.id],
        price: t.price,
        name: t.name,
      }));

    router.push({
      pathname: "/payment",
      params: {
        id: eventId,
        items: JSON.stringify(items),
        subtotal: String(subtotal),
        serviceFee: String(serviceFee),
        total: String(totalPayment),
      },
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={C.purple} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Select Tickets</Text>
      </View>

      {/* PROGRESS */}
      <View style={styles.progressContainer}>
        <View style={styles.progressStep}>
          <View style={styles.activeCircle}>
            <Text style={styles.activeNumber}>1</Text>
          </View>
          <Text style={styles.activeStepText}>Tickets</Text>
        </View>
        <View style={styles.progressLine} />
        <View style={styles.progressStep}>
          <View style={styles.inactiveCircle}>
            <Text style={styles.inactiveNumber}>2</Text>
          </View>
          <Text style={styles.inactiveStepText}>Payment</Text>
        </View>
        <View style={styles.progressLine} />
        <View style={styles.progressStep}>
          <View style={styles.inactiveCircle}>
            <Text style={styles.inactiveNumber}>3</Text>
          </View>
          <Text style={styles.inactiveStepText}>Done</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* EVENT INFO */}
        {event && (
          <View style={styles.eventCard}>
            <Image
              source={{ uri: event.banner_url || FALLBACK }}
              style={styles.eventImage}
            />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle} numberOfLines={1}>
                {event.title}
              </Text>
              <Text style={styles.eventDate}>
                {formatDateTime(event.event_date)}
              </Text>
              <Text style={styles.eventVenue}>{event.venue}</Text>
            </View>
          </View>
        )}

        {/* NOTICE */}
        <View style={styles.noticeCard}>
          <Text style={styles.noticeIcon}>ⓘ</Text>
          <Text style={styles.noticeText}>
            Max 4 per category, 6 per order. Prices exclude the service fee.
          </Text>
        </View>

        {/* TICKET LIST */}
        <View style={styles.ticketList}>
          {tickets.length === 0 ? (
            <Text style={{ color: C.muted, textAlign: "center", marginTop: 20 }}>
              No ticket categories available.
            </Text>
          ) : (
            tickets.map((ticket) => {
              const qty = quantities[ticket.id] || 0;
              const selected = qty > 0;
              const avail = ticket.quota - ticket.sold;
              const statusLabel = avail <= 20 ? "Selling fast" : "Available";

              return (
                <View
                  key={ticket.id}
                  style={[
                    styles.ticketCard,
                    selected && styles.selectedTicketCard,
                  ]}
                >
                  {/* TOP */}
                  <View style={styles.ticketTop}>
                    <Pressable
                      style={styles.ticketRadio}
                      onPress={() =>
                        updateQuantity(ticket.id, qty === 0 ? 1 : -qty, avail)
                      }
                    >
                      <View
                        style={[
                          styles.radioOuter,
                          selected && styles.radioSelected,
                        ]}
                      >
                        {selected && <View style={styles.radioInner} />}
                      </View>
                    </Pressable>

                    <View style={styles.ticketMain}>
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{ticket.name}</Text>
                      </View>
                      <Text style={styles.ticketDescription}>
                        {avail} tickets remaining
                      </Text>
                    </View>

                    <View style={styles.ticketPriceContainer}>
                      <Text style={styles.ticketPrice}>
                        {formatPrice(ticket.price)}
                      </Text>
                    </View>
                  </View>

                  {/* BOTTOM */}
                  <View style={styles.ticketBottom}>
                    <View style={styles.stockInfo}>
                      <View
                        style={[
                          styles.stockBadge,
                          statusLabel === "Selling fast" && styles.sellingBadge,
                        ]}
                      >
                        <Text
                          style={[
                            styles.stockText,
                            statusLabel === "Selling fast" && styles.sellingText,
                          ]}
                        >
                          {statusLabel}
                        </Text>
                      </View>
                      <Text style={styles.stockCount}>{avail} left</Text>
                    </View>

                    <View style={styles.quantityControl}>
                      <Pressable
                        onPress={() => updateQuantity(ticket.id, -1, avail)}
                        disabled={qty === 0}
                        style={styles.quantityButton}
                      >
                        <Text
                          style={[
                            styles.quantitySymbol,
                            qty === 0 && styles.disabledSymbol,
                          ]}
                        >
                          −
                        </Text>
                      </Pressable>
                      <Text style={styles.quantityNumber}>{qty}</Text>
                      <Pressable
                        onPress={() => updateQuantity(ticket.id, 1, avail)}
                        disabled={qty >= 4 || totalTickets >= 6}
                        style={styles.plusButton}
                      >
                        <Text style={styles.plusSymbol}>+</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </View>

        <Text style={styles.feeDescription}>
          Service fee is 5% of the subtotal, rounded up to the nearest Rp1.000.
        </Text>

        {/* ORDER SUMMARY */}
        {totalTickets > 0 && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tickets ({totalTickets})</Text>
              <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service fee</Text>
              <Text style={styles.summaryValue}>{formatPrice(serviceFee)}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTotalLabel}>Total payment</Text>
              <Text style={styles.summaryTotal}>{formatPrice(totalPayment)}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* FIXED BOTTOM */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomInfo}>
          <Text style={styles.bottomHint}>
            {totalTickets > 0
              ? `${totalTickets} ticket${totalTickets > 1 ? "s" : ""} selected`
              : "Select at least 1 ticket"}
          </Text>
          {totalTickets > 0 && (
            <Text style={styles.bottomTotal}>{formatPrice(totalPayment)}</Text>
          )}
        </View>
        <Pressable
          onPress={handleContinue}
          disabled={totalTickets === 0}
          style={[
            styles.continueButton,
            totalTickets === 0 && styles.disabledButton,
          ]}
        >
          <Text style={styles.continueText}>Continue to Payment</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: {
    height: 57,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 22,
    backgroundColor: C.light,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: { color: C.purple, fontSize: 29, lineHeight: 32 },
  headerTitle: { color: C.text, fontSize: 17, fontWeight: "700", marginLeft: 9 },
  progressContainer: {
    height: 49,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  progressStep: { flexDirection: "row", alignItems: "center", gap: 7 },
  activeCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: C.lavender,
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: C.light,
    alignItems: "center",
    justifyContent: "center",
  },
  activeNumber: { color: C.purple, fontSize: 11, fontWeight: "800" },
  inactiveNumber: { color: C.muted, fontSize: 11, fontWeight: "700" },
  activeStepText: { color: C.purple, fontSize: 12, fontWeight: "700" },
  inactiveStepText: { color: C.muted, fontSize: 12, fontWeight: "600" },
  progressLine: {
    height: 1,
    backgroundColor: C.lavender,
    flex: 1,
    marginHorizontal: 9,
  },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 25 },
  eventCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.white,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: C.border,
    padding: 12,
    gap: 12,
    marginBottom: 20,
  },
  eventImage: { width: 64, height: 64, borderRadius: 13, backgroundColor: C.light },
  eventInfo: { flex: 1 },
  eventTitle: { color: C.text, fontSize: 14, fontWeight: "800", marginBottom: 4 },
  eventDate: { color: C.muted, fontSize: 12, marginBottom: 3 },
  eventVenue: { color: C.muted, fontSize: 12 },
  noticeCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: C.light,
    borderRadius: 17,
    padding: 15,
    marginBottom: 20,
    gap: 10,
  },
  noticeIcon: { color: C.accent, fontSize: 16, fontWeight: "700" },
  noticeText: { flex: 1, color: C.muted, fontSize: 12, lineHeight: 19 },
  ticketList: { gap: 12 },
  ticketCard: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    padding: 16,
  },
  selectedTicketCard: { borderColor: C.lavender },
  ticketTop: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  ticketRadio: { paddingTop: 2 },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: C.lavender,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: { borderColor: C.accent },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: C.accent,
  },
  ticketMain: { flex: 1 },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F0DCFF",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 6,
  },
  categoryText: { color: C.purple, fontSize: 10, fontWeight: "700" },
  ticketDescription: { color: C.muted, fontSize: 12, lineHeight: 18, marginTop: 4 },
  ticketPriceContainer: { minWidth: 105, alignItems: "flex-end" },
  ticketPrice: { color: C.purple, fontSize: 15, fontWeight: "800" },
  ticketBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 13,
  },
  stockInfo: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
  stockBadge: {
    backgroundColor: "#DDF9E6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  sellingBadge: { backgroundColor: C.yellow },
  stockText: { color: "#168442", fontSize: 10, fontWeight: "700" },
  sellingText: { color: C.yellowText },
  stockCount: { color: C.muted, fontSize: 10 },
  quantityControl: {
    height: 44,
    width: 114,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 4,
  },
  quantityButton: { width: 29, height: 34, alignItems: "center", justifyContent: "center" },
  quantitySymbol: { color: C.muted, fontSize: 21 },
  disabledSymbol: { color: "#D7D0DC" },
  quantityNumber: {
    color: C.text,
    fontSize: 15,
    fontWeight: "700",
    minWidth: 17,
    textAlign: "center",
  },
  plusButton: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: C.lavender,
    alignItems: "center",
    justifyContent: "center",
  },
  plusSymbol: { color: C.purple, fontSize: 23, lineHeight: 26 },
  feeDescription: {
    color: C.muted,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 20,
    marginBottom: 12,
  },
  summaryCard: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
  },
  summaryTitle: { color: C.text, fontSize: 15, fontWeight: "800", marginBottom: 13 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
  },
  summaryLabel: { color: C.muted, fontSize: 13 },
  summaryValue: { color: C.text, fontSize: 13, fontWeight: "700" },
  summaryDivider: { height: 1, backgroundColor: C.border, marginVertical: 11 },
  summaryTotalLabel: { color: C.text, fontSize: 15, fontWeight: "800" },
  summaryTotal: { color: C.purple, fontSize: 16, fontWeight: "900" },
  bottomBar: {
    backgroundColor: C.white,
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bottomInfo: { flex: 1 },
  bottomHint: { color: C.muted, fontSize: 12 },
  bottomTotal: { color: C.purple, fontSize: 16, fontWeight: "900", marginTop: 3 },
  continueButton: {
    backgroundColor: C.purple,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 30,
  },
  disabledButton: { opacity: 0.4 },
  continueText: { color: C.white, fontWeight: "800", fontSize: 14 },
});
