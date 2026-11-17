import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

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

type Ticket = {
  id: string;
  eventId: string;
  category: string;
  title: string;
  artist: string;
  date: string;
  venue: string;
  image: string;
  quantity: number;
  orderId: string;
  status: "Paid" | "Awaiting payment";
  price: number;
};

const upcomingTickets: Ticket[] = [
  {
    id: "1",
    eventId: "4",
    category: "Festival",
    title: "Listrik Malam",
    artist: "DJ Wira & Friends",
    date: "Sat, 9 Jan 2027 · 21:00 WIB",
    venue: "Sky Garden Kuningan, Jakarta",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400",
    quantity: 2,
    orderId: "NCT-90015",
    status: "Awaiting payment",
    price: 840000,
  },
  {
    id: "2",
    eventId: "1",
    category: "VIP A (front stage, early entry, merch pack)",
    title: "Neon Skyline World Tour",
    artist: "Aurora Lestari",
    date: "Sat, 21 Nov 2026 · 19:30 WIB",
    venue: "Istora Senayan, Jakarta",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400",
    quantity: 2,
    orderId: "NCT-84210",
    status: "Paid",
    price: 5000000,
  },
  {
    id: "3",
    eventId: "5",
    category: "Festival",
    title: "Midnight Reverie",
    artist: "Raka & The Hollow Lights",
    date: "Fri, 4 Dec 2026 · 20:00 WIB",
    venue: "Tennis Indoor Senayan, Jakarta",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=400",
    quantity: 1,
    orderId: "NCT-84196",
    status: "Paid",
    price: 250000,
  },
  {
    id: "4",
    eventId: "6",
    category: "Tribune B",
    title: "Sunset Acoustic Session",
    artist: "Kirana Ayu",
    date: "Sat, 12 Dec 2026 · 18:00 WIB",
    venue: "Ciputra Artpreneur, Jakarta",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400",
    quantity: 4,
    orderId: "NCT-84190",
    status: "Paid",
    price: 1800000,
  },
];

const pastTickets: Ticket[] = [
  {
    id: "5",
    eventId: "2",
    category: "Pop",
    title: "Summer Music Festival",
    artist: "Various Artists",
    date: "Sat, 15 Aug 2026 · 19:00 WIB",
    venue: "Jakarta International Stadium",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400",
    quantity: 2,
    orderId: "NCT-83021",
    status: "Paid",
    price: 600000,
  },
  {
    id: "6",
    eventId: "3",
    category: "Jazz",
    title: "Jazz in the City",
    artist: "Jakarta Jazz Collective",
    date: "Sun, 2 Aug 2026 · 18:30 WIB",
    venue: "Jakarta Convention Center",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400",
    quantity: 2,
    orderId: "NCT-82910",
    status: "Paid",
    price: 1000000,
  },
];

const formatPrice = (price: number) => "Rp" + price.toLocaleString("id-ID");

export default function MyTicketsScreen() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"Upcoming" | "Past">("Upcoming");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const currentTickets =
    activeTab === "Upcoming" ? upcomingTickets : pastTickets;

  const handleCompletePayment = (ticket: Ticket) => {
    const subtotal = ticket.price - 40000;
    const serviceFee = 40000;

    router.push({
      pathname: "/payment",
      params: {
        id: ticket.eventId,
        quantities: JSON.stringify({
          festival: 2,
          tribune: 0,
          vip: 0,
        }),
        subtotal: String(subtotal),
        serviceFee: String(serviceFee),
        total: String(ticket.price),
      },
    });
  };

  const renderTicket = (ticket: Ticket) => (
    <View key={ticket.id} style={styles.ticketCard}>
      {/* TICKET MAIN */}
      <View style={styles.ticketMain}>
        <Image source={{ uri: ticket.image }} style={styles.ticketImage} />

        <View style={styles.ticketContent}>
          <View style={styles.badgeRow}>
            <View
              style={[
                styles.categoryBadge,
                ticket.category.includes("VIP") && styles.vipBadge,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  ticket.category.includes("VIP") && styles.vipText,
                ]}
                numberOfLines={2}
              >
                {ticket.category}
              </Text>
            </View>

            <View
              style={[
                styles.statusBadge,
                ticket.status === "Paid"
                  ? styles.paidBadge
                  : styles.pendingBadge,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  ticket.status === "Paid"
                    ? styles.paidText
                    : styles.pendingText,
                ]}
              >
                {ticket.status === "Paid" ? "Paid" : "◷ Awaiting payment"}
              </Text>
            </View>
          </View>

          <Text style={styles.eventTitle} numberOfLines={2}>
            {ticket.title}
          </Text>

          <Text style={styles.artist}>{ticket.artist}</Text>

          <Text style={styles.eventDate}>{ticket.date}</Text>

          <Text style={styles.eventVenue}>{ticket.venue}</Text>
        </View>
      </View>

      {/* DIVIDER */}
      <View style={styles.divider} />

      {/* TICKET FOOTER */}
      <View style={styles.ticketFooter}>
        <Text style={styles.orderInfo}>
          {ticket.quantity} {ticket.quantity === 1 ? "ticket" : "tickets"} · #
          {ticket.orderId}
        </Text>

        {ticket.status === "Awaiting payment" ? (
          <Pressable
            style={styles.completeButton}
            onPress={() => handleCompletePayment(ticket)}
          >
            <Text style={styles.completeButtonText}>Complete Payment</Text>
          </Pressable>
        ) : (
          <Pressable
            style={styles.viewButton}
            onPress={() => setSelectedTicket(ticket)}
          >
            <Text style={styles.viewButtonText}>View E-Ticket</Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>N</Text>
          </View>
          <Text style={styles.headerTitle}>My Tickets</Text>
        </View>

        {/* SUMMARY BANNER */}
        <View style={styles.summaryBanner}>
          <Text style={styles.summaryEyebrow}>YOUR NIGHTS OUT</Text>

          <Text style={styles.summaryTitle}>3 upcoming orders · 7 tickets</Text>

          <Text style={styles.summarySubtitle}>
            Next up · Sat, 21 Nov 2026 · Istora Senayan
          </Text>
        </View>

        {/* UPCOMING / PAST TABS */}
        <View style={styles.tabContainer}>
          <Pressable
            onPress={() => setActiveTab("Upcoming")}
            style={[styles.tab, activeTab === "Upcoming" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Upcoming" && styles.activeTabText,
              ]}
            >
              Upcoming
            </Text>
            <View style={styles.tabCount}>
              <Text style={styles.tabCountText}>4</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab("Past")}
            style={[styles.tab, activeTab === "Past" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Past" && styles.activeTabText,
              ]}
            >
              Past
            </Text>
            <View style={styles.tabCount}>
              <Text style={styles.tabCountText}>2</Text>
            </View>
          </Pressable>
        </View>

        {/* TICKET LIST */}
        {currentTickets.length > 0 ? (
          currentTickets.map(renderTicket)
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>♫</Text>
            <Text style={styles.emptyTitle}>No tickets yet</Text>
            <Text style={styles.emptyText}>
              Your concert tickets will appear here.
            </Text>
            <Pressable
              style={styles.exploreButton}
              onPress={() => router.push("/(tabs)/explore")}
            >
              <Text style={styles.exploreButtonText}>Explore Concerts</Text>
            </Pressable>
          </View>
        )}

        <Text style={styles.footerNote}>
          Tickets are personal and cannot be transferred.
        </Text>
      </ScrollView>

      {/* E-TICKET MODAL */}
      <Modal
        visible={selectedTicket !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedTicket(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Your E-Ticket</Text>
              <Pressable onPress={() => setSelectedTicket(null)}>
                <Text style={styles.closeButton}>✕</Text>
              </Pressable>
            </View>

            {selectedTicket && (
              <>
                <Image
                  source={{ uri: selectedTicket.image }}
                  style={styles.modalImage}
                />

                <Text style={styles.modalEventTitle}>
                  {selectedTicket.title}
                </Text>

                <Text style={styles.modalArtist}>{selectedTicket.artist}</Text>

                <View style={styles.qrPlaceholder}>
                  <Text style={styles.qrSymbol}>▦</Text>
                  <Text style={styles.qrDemoText}>DEMO QR CODE</Text>
                </View>

                <Text style={styles.qrHolder}>
                  {selectedTicket.quantity} Tickets · #{selectedTicket.orderId}
                </Text>

                <Text style={styles.qrWarning}>
                  Show your ticket at the entrance.
                </Text>
              </>
            )}

            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setSelectedTicket(null)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 25,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },

  logo: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: C.purple,
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    color: C.white,
    fontSize: 17,
    fontWeight: "900",
  },

  headerTitle: {
    color: C.text,
    fontSize: 20,
    fontWeight: "800",
  },

  summaryBanner: {
    backgroundColor: C.purple,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },

  summaryEyebrow: {
    color: "#DCC5EC",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 10,
  },

  summaryTitle: {
    color: C.white,
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 30,
    marginBottom: 6,
  },

  summarySubtitle: {
    color: "#D8C8E1",
    fontSize: 12,
  },

  tabContainer: {
    height: 44,
    borderRadius: 25,
    backgroundColor: C.light,
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    marginBottom: 17,
  },

  tab: {
    flex: 1,
    height: 36,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  activeTab: {
    backgroundColor: C.white,
  },

  tabText: {
    color: C.muted,
    fontSize: 13,
    fontWeight: "600",
  },

  activeTabText: {
    color: C.purple,
    fontWeight: "800",
  },

  tabCount: {
    backgroundColor: C.light,
    minWidth: 19,
    height: 19,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },

  tabCountText: {
    color: C.purple,
    fontSize: 10,
    fontWeight: "800",
  },

  ticketCard: {
    backgroundColor: C.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.border,
    padding: 12,
    marginBottom: 13,
    shadowColor: "#2F1740",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },

  ticketMain: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  ticketImage: {
    width: 76,
    height: 92,
    borderRadius: 14,
    backgroundColor: C.light,
  },

  ticketContent: {
    flex: 1,
    minWidth: 0,
  },

  badgeRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 5,
    marginBottom: 8,
  },

  categoryBadge: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexShrink: 1,
    maxWidth: "70%",
  },

  categoryText: {
    color: C.muted,
    fontSize: 10,
    fontWeight: "700",
  },

  vipBadge: {
    backgroundColor: "#F0DDFF",
    borderColor: "#F0DDFF",
  },

  vipText: {
    color: C.accent,
  },

  statusBadge: {
    borderRadius: 15,
    paddingHorizontal: 9,
    paddingVertical: 5,
    flexShrink: 0,
  },

  paidBadge: {
    backgroundColor: C.greenBg,
  },

  pendingBadge: {
    backgroundColor: C.yellow,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },

  paidText: {
    color: C.green,
  },

  pendingText: {
    color: C.yellowText,
  },

  eventTitle: {
    color: C.text,
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 3,
  },

  artist: {
    color: C.muted,
    fontSize: 12,
    marginBottom: 7,
  },

  eventDate: {
    color: C.muted,
    fontSize: 11,
    lineHeight: 17,
  },

  eventVenue: {
    color: C.muted,
    fontSize: 11,
    lineHeight: 17,
  },

  divider: {
    height: 1,
    backgroundColor: C.border,
    marginTop: 13,
    marginBottom: 12,
  },

  ticketFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  orderInfo: {
    color: C.muted,
    fontSize: 11,
    fontWeight: "600",
    flex: 1,
  },

  completeButton: {
    backgroundColor: C.purple,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  completeButtonText: {
    color: C.white,
    fontSize: 12,
    fontWeight: "700",
  },

  viewButton: {
    backgroundColor: "#F0DDFF",
    borderRadius: 25,
    paddingHorizontal: 17,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  viewButtonText: {
    color: C.purple,
    fontSize: 12,
    fontWeight: "700",
  },

  emptyState: {
    backgroundColor: C.white,
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    marginTop: 10,
  },

  emptyIcon: {
    fontSize: 42,
    color: C.accent,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: C.text,
    marginBottom: 6,
  },

  emptyText: {
    color: C.muted,
    fontSize: 12,
    textAlign: "center",
    marginBottom: 17,
  },

  exploreButton: {
    backgroundColor: C.purple,
    borderRadius: 25,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },

  exploreButtonText: {
    color: C.white,
    fontSize: 12,
    fontWeight: "700",
  },

  footerNote: {
    textAlign: "center",
    color: C.muted,
    fontSize: 10,
    marginTop: 8,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(25, 12, 35, 0.65)",
    justifyContent: "center",
    padding: 22,
  },

  modalCard: {
    backgroundColor: C.white,
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
  },

  modalHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  modalTitle: {
    color: C.text,
    fontSize: 19,
    fontWeight: "800",
  },

  closeButton: {
    fontSize: 20,
    color: C.muted,
    padding: 5,
  },

  modalImage: {
    width: "100%",
    height: 135,
    borderRadius: 15,
    marginBottom: 14,
  },

  modalEventTitle: {
    color: C.text,
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },

  modalArtist: {
    color: C.muted,
    fontSize: 13,
    marginTop: 5,
  },

  qrPlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: C.light,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: C.border,
  },

  qrSymbol: {
    color: C.purple,
    fontSize: 90,
  },

  qrDemoText: {
    color: C.muted,
    fontSize: 10,
    fontWeight: "800",
  },

  qrHolder: {
    color: C.purple,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 14,
  },

  qrWarning: {
    color: C.muted,
    fontSize: 11,
    marginTop: 8,
  },

  modalCloseButton: {
    width: "100%",
    height: 48,
    borderRadius: 25,
    backgroundColor: C.purple,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  modalCloseText: {
    color: C.white,
    fontSize: 14,
    fontWeight: "700",
  },
});
