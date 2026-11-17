import { useAuth } from "@/context/AuthContext";
import { apiGet } from "@/lib/api";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  RefreshControl,
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
  greenBg: "#DCFCE7",
  yellow: "#FFF1C7",
  yellowText: "#B65B00",
};

type OrderDetail = {
  id: number;
  ticket_category_id: number;
  qty: number;
  category_name: string;
  price: number;
};

type TicketItem = {
  id: number;
  ticket_code: string;
  is_used: boolean;
  category_name: string;
};

type OrderRecord = {
  id: number;
  order_code: string;
  total_price: number;
  status: "pending" | "paid" | "cancelled" | "expired";
  payment_method: string;
  created_at: string;
  event_id: number;
  event_title: string;
  event_venue: string;
  event_date: string;
  event_banner_url: string;
  artist_name: string;
  details: OrderDetail[];
  tickets: TicketItem[];
};

const FALLBACK =
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500";

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }) + " WIB";
  } catch {
    return d;
  }
}

const formatPrice = (p: number) => "Rp" + p.toLocaleString("id-ID");

export default function MyTicketsScreen() {
  const router = useRouter();
  const { user, token } = useAuth();

  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);

  const loadOrders = useCallback(async () => {
    try {
      const endpoint = user?.id
        ? `/api/orders?user_id=${user.id}`
        : "/api/orders";
      const res = await apiGet<OrderRecord[]>(endpoint, token);
      if (res.success && Array.isArray(res.data)) {
        setOrders(res.data);
      }
    } catch (err) {
      console.error("MyTickets load error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?.id, token]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const onRefresh = () => {
    setRefreshing(true);
    loadOrders();
  };

  const now = new Date().getTime();

  const upcomingOrders = orders.filter((o) => {
    const evTime = new Date(o.event_date).getTime();
    return o.status === "pending" || evTime >= now;
  });

  const pastOrders = orders.filter((o) => {
    const evTime = new Date(o.event_date).getTime();
    return o.status !== "pending" && evTime < now;
  });

  const displayOrders = activeTab === "upcoming" ? upcomingOrders : pastOrders;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tickets</Text>
        <Text style={styles.headerSub}>Manage your concert passes</Text>
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === "upcoming" && styles.tabActive]}
          onPress={() => setActiveTab("upcoming")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "upcoming" && styles.tabTextActive,
            ]}
          >
            Upcoming ({upcomingOrders.length})
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === "past" && styles.tabActive]}
          onPress={() => setActiveTab("past")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "past" && styles.tabTextActive,
            ]}
          >
            Past ({pastOrders.length})
          </Text>
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color={C.purple} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={C.purple}
            />
          }
        >
          {displayOrders.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyIcon}>🎟</Text>
              <Text style={styles.emptyTitle}>No tickets found</Text>
              <Text style={styles.emptySub}>
                {activeTab === "upcoming"
                  ? "You don't have any upcoming concert tickets."
                  : "No past concert history."}
              </Text>
              <Pressable
                style={styles.browseButton}
                onPress={() => router.push("/(tabs)/explore")}
              >
                <Text style={styles.browseButtonText}>Explore Concerts</Text>
              </Pressable>
            </View>
          ) : (
            displayOrders.map((order) => {
              const totalQty = (order.details || []).reduce(
                (s, d) => s + (d.qty || 0),
                0
              );
              const isPaid = order.status === "paid";
              const primaryTicket = order.tickets?.[0]?.ticket_code || order.order_code;

              return (
                <Pressable
                  key={order.id}
                  style={styles.ticketCard}
                  onPress={() => setSelectedOrder(order)}
                >
                  <Image
                    source={{ uri: order.event_banner_url || FALLBACK }}
                    style={styles.ticketImage}
                  />

                  <View style={styles.ticketBody}>
                    <View style={styles.ticketHeaderRow}>
                      <View
                        style={[
                          styles.statusBadge,
                          isPaid ? styles.paidBadge : styles.pendingBadge,
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusBadgeText,
                            isPaid ? styles.paidText : styles.pendingText,
                          ]}
                        >
                          {isPaid ? "PAID" : "AWAITING PAYMENT"}
                        </Text>
                      </View>
                      <Text style={styles.orderCode}>{order.order_code}</Text>
                    </View>

                    <Text style={styles.eventTitle} numberOfLines={1}>
                      {order.event_title}
                    </Text>
                    <Text style={styles.artistName}>{order.artist_name}</Text>

                    <Text style={styles.metaText}>
                      ▦ {formatDate(order.event_date)}
                    </Text>
                    <Text style={styles.metaText}>⌖ {order.event_venue}</Text>

                    <View style={styles.divider} />

                    <View style={styles.ticketFooterRow}>
                      <Text style={styles.qtyText}>
                        {totalQty} ticket{totalQty > 1 ? "s" : ""}
                      </Text>
                      <Text style={styles.priceText}>
                        {formatPrice(order.total_price)}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })
          )}
        </ScrollView>
      )}

      {/* DETAIL MODAL / QR MODAL */}
      <Modal
        visible={!!selectedOrder}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedOrder(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>E-Ticket</Text>
              <Pressable
                onPress={() => setSelectedOrder(null)}
                style={styles.closeBtn}
              >
                <Text style={styles.closeBtnText}>✕</Text>
              </Pressable>
            </View>

            {selectedOrder && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalQrBox}>
                  <QRCode
                    value={
                      selectedOrder.tickets?.[0]?.ticket_code ||
                      selectedOrder.order_code
                    }
                    size={150}
                    color={C.purple}
                    backgroundColor="transparent"
                  />
                  <Text style={styles.modalTicketCode}>
                    {selectedOrder.tickets?.[0]?.ticket_code ||
                      selectedOrder.order_code}
                  </Text>
                </View>

                <Text style={styles.modalEventTitle}>
                  {selectedOrder.event_title}
                </Text>
                <Text style={styles.modalDate}>
                  {formatDate(selectedOrder.event_date)}
                </Text>
                <Text style={styles.modalVenue}>{selectedOrder.event_venue}</Text>

                <View style={styles.modalDivider} />

                <Text style={styles.modalSectionLabel}>TICKETS</Text>
                {(selectedOrder.details || []).map((d) => (
                  <View key={d.id} style={styles.modalDetailRow}>
                    <Text style={styles.modalDetailName}>{d.category_name}</Text>
                    <Text style={styles.modalDetailVal}>× {d.qty}</Text>
                  </View>
                ))}

                <View style={styles.modalDivider} />

                <View style={styles.modalDetailRow}>
                  <Text style={styles.modalDetailName}>Total</Text>
                  <Text style={styles.modalTotalVal}>
                    {formatPrice(selectedOrder.total_price)}
                  </Text>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 10 },
  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: C.text,
    letterSpacing: -1,
  },
  headerSub: { fontSize: 14, color: C.muted, marginTop: 4 },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    height: 42,
    borderRadius: 22,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },
  tabActive: { backgroundColor: C.purple, borderColor: C.purple },
  tabText: { fontSize: 13, fontWeight: "700", color: C.muted },
  tabTextActive: { color: C.white },
  centerBox: { flex: 1, justifyContent: "center", alignItems: "center" },
  list: { paddingHorizontal: 20, paddingBottom: 30, gap: 16 },
  ticketCard: {
    backgroundColor: C.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.border,
    overflow: "hidden",
  },
  ticketImage: { width: "100%", height: 130, backgroundColor: C.light },
  ticketBody: { padding: 16 },
  ticketHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  paidBadge: { backgroundColor: C.greenBg },
  pendingBadge: { backgroundColor: C.yellow },
  statusBadgeText: { fontSize: 10, fontWeight: "800" },
  paidText: { color: C.green },
  pendingText: { color: C.yellowText },
  orderCode: { fontSize: 11, fontWeight: "700", color: C.muted },
  eventTitle: { fontSize: 16, fontWeight: "800", color: C.text, marginBottom: 2 },
  artistName: { fontSize: 13, color: C.muted, marginBottom: 8 },
  metaText: { fontSize: 12, color: C.muted, marginBottom: 3 },
  divider: { height: 1, backgroundColor: C.border, marginVertical: 12 },
  ticketFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qtyText: { fontSize: 13, fontWeight: "600", color: C.muted },
  priceText: { fontSize: 15, fontWeight: "800", color: C.purple },
  emptyBox: { alignItems: "center", paddingTop: 60, paddingHorizontal: 20 },
  emptyIcon: { fontSize: 50, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: "800", color: C.text, marginBottom: 6 },
  emptySub: {
    fontSize: 13,
    color: C.muted,
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: C.purple,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
  },
  browseButtonText: { color: C.white, fontWeight: "700", fontSize: 14 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: C.white,
    borderRadius: 24,
    padding: 20,
    maxHeight: "85%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: "800", color: C.text },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: C.light,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnText: { fontSize: 16, color: C.purple, fontWeight: "700" },
  modalQrBox: {
    alignItems: "center",
    padding: 20,
    backgroundColor: C.bg,
    borderRadius: 16,
    marginBottom: 16,
  },
  modalTicketCode: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: "800",
    color: C.purple,
  },
  modalEventTitle: { fontSize: 17, fontWeight: "800", color: C.text },
  modalDate: { fontSize: 13, color: C.muted, marginTop: 4 },
  modalVenue: { fontSize: 13, color: C.muted, marginTop: 2 },
  modalDivider: { height: 1, backgroundColor: C.border, marginVertical: 14 },
  modalSectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: C.muted,
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  modalDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  modalDetailName: { fontSize: 13, color: C.text },
  modalDetailVal: { fontSize: 13, fontWeight: "700", color: C.text },
  modalTotalVal: { fontSize: 16, fontWeight: "900", color: C.purple },
});
