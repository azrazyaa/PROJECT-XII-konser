import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
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
};

const events: Record<
  string,
  {
    title: string;
    date: string;
    venue: string;
    image: string;
  }
> = {
  "1": {
    title: "Neon Skyline World Tour",
    date: "Sat, 21 Nov 2026 · 19:30 WIB",
    venue: "Istora Senayan, Jakarta",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500",
  },
  "2": {
    title: "Jazz Malam Selatan",
    date: "Sat, 28 Nov 2026 · 19:00 WIB",
    venue: "Aula Simfonia, Jakarta",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500",
  },
  "3": {
    title: "Suara Beton",
    date: "Sun, 29 Nov 2026 · 19:00 WIB",
    venue: "Eldorado Dome, Bandung",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500",
  },
};

const tickets = [
  { id: "festival", name: "Festival" },
  { id: "tribune", name: "Tribune" },
  { id: "vip", name: "VIP" },
];

const formatPrice = (price: number) => "Rp" + price.toLocaleString("id-ID");

const getString = (value: string | string[] | undefined, fallback = "") =>
  Array.isArray(value) ? value[0] : value || fallback;

export default function OrderSuccessScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    paymentMethod?: string;
    bank?: string;
    total?: string;
    quantities?: string;
  }>();

  const eventId = getString(params.id, "1");
  const event = events[eventId] || events["1"];

  const buyerName = getString(params.name, "Aditya Pratama");
  const email = getString(params.email, "aditya.pratama@example.com");
  const phone = getString(params.phone, "+62 812 3456 7890");
  const method = getString(params.paymentMethod, "Virtual Account");
  const bank = getString(params.bank, "BCA");
  const total = Number(getString(params.total, "840000")) || 0;

  let quantities: Record<string, number> = {
    festival: 2,
    tribune: 0,
    vip: 0,
  };

  try {
    if (params.quantities) {
      quantities = {
        festival: 0,
        tribune: 0,
        vip: 0,
        ...JSON.parse(getString(params.quantities)),
      };
    }
  } catch {
    // Gunakan data demo jika parameter tidak valid.
  }

  const totalTickets = Object.values(quantities).reduce(
    (sum, quantity) => sum + (Number(quantity) || 0),
    0,
  );

  const orderId = `NOC-${eventId}-2026-001`;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* SUCCESS ICON */}
        <View style={styles.successSection}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <Text style={styles.checkIcon}>✓</Text>
            </View>
          </View>

          <Text style={styles.successTitle}>Payment Successful!</Text>

          <Text style={styles.successSubtitle}>
            Your payment has been received. Your concert tickets are ready!
          </Text>
        </View>

        {/* ORDER NUMBER */}
        <View style={styles.orderCard}>
          <Text style={styles.orderLabel}>ORDER NUMBER</Text>

          <View style={styles.orderRow}>
            <Text style={styles.orderNumber}>{orderId}</Text>
            <View style={styles.paidBadge}>
              <Text style={styles.paidText}>PAID</Text>
            </View>
          </View>
        </View>

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

          <Image source={{ uri: event.image }} style={styles.ticketImage} />

          <View style={styles.ticketInfo}>
            <Text style={styles.ticketEventTitle}>{event.title}</Text>

            <Text style={styles.ticketDate}>{event.date}</Text>
            <Text style={styles.ticketVenue}>{event.venue}</Text>
          </View>

          <View style={styles.dashedDivider}>
            <View style={styles.leftCutout} />
            <View style={styles.rightCutout} />
          </View>

          <View style={styles.qrSection}>
            <View style={styles.qrPlaceholder}>
              <Text style={styles.qrIcon}>▦</Text>
              <Text style={styles.qrPlaceholderText}>DEMO QR</Text>
            </View>

            <View style={styles.qrInfo}>
              <Text style={styles.qrLabel}>TICKET HOLDER</Text>
              <Text style={styles.qrName}>{buyerName}</Text>

              <Text style={styles.qrLabel}>TICKET QUANTITY</Text>
              <Text style={styles.qrName}>
                {totalTickets} {totalTickets === 1 ? "Ticket" : "Tickets"}
              </Text>

              <Text style={styles.qrLabel}>ORDER ID</Text>
              <Text style={styles.qrOrderId}>{orderId}</Text>
            </View>
          </View>

          <View style={styles.ticketFooter}>
            <Text style={styles.ticketFooterText}>
              Please show your e-ticket at the entrance.
            </Text>
          </View>
        </View>

        {/* TICKET BREAKDOWN */}
        <Text style={styles.sectionTitle}>Ticket Details</Text>

        <View style={styles.detailCard}>
          {tickets.map((ticket) => {
            const quantity = quantities[ticket.id] || 0;

            if (!quantity) return null;

            return (
              <View key={ticket.id} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{ticket.name}</Text>
                <Text style={styles.detailValue}>× {quantity}</Text>
              </View>
            );
          })}

          <View style={styles.detailDivider} />

          <View style={styles.detailRow}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
          </View>
        </View>

        {/* PAYMENT INFORMATION */}
        <Text style={styles.sectionTitle}>Payment Information</Text>

        <View style={styles.detailCard}>
          <View style={styles.paymentRow}>
            <Text style={styles.detailLabel}>Payment method</Text>
            <Text style={styles.paymentValue}>{method}</Text>
          </View>

          {method === "Virtual Account" && (
            <View style={styles.paymentRow}>
              <Text style={styles.detailLabel}>Bank</Text>
              <Text style={styles.paymentValue}>{bank}</Text>
            </View>
          )}

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

        {/* INFORMATION */}
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>ⓘ</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Important information</Text>
            <Text style={styles.infoText}>
              Bring a valid ID matching the ticket holder name. Keep your
              e-ticket ready when entering the venue.
            </Text>
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

        <Text style={styles.footerText}>Thank you for choosing Nocturne ♡</Text>
      </ScrollView>
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
    paddingTop: 35,
    paddingBottom: 35,
  },

  successSection: {
    alignItems: "center",
    marginBottom: 28,
  },

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

  checkIcon: {
    color: C.white,
    fontSize: 38,
    fontWeight: "800",
  },

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

  orderNumber: {
    color: C.purple,
    fontSize: 15,
    fontWeight: "800",
  },

  paidBadge: {
    backgroundColor: "#DCFCE7",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  paidText: {
    color: C.green,
    fontSize: 10,
    fontWeight: "800",
  },

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

  ticketIconText: {
    color: C.white,
    fontSize: 24,
  },

  ticketImage: {
    width: "100%",
    height: 150,
    backgroundColor: C.light,
  },

  ticketInfo: {
    padding: 16,
  },

  ticketEventTitle: {
    color: C.text,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 7,
  },

  ticketDate: {
    color: C.muted,
    fontSize: 12,
    marginBottom: 5,
  },

  ticketVenue: {
    color: C.muted,
    fontSize: 12,
  },

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

  qrPlaceholder: {
    width: 105,
    height: 105,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.light,
    alignItems: "center",
    justifyContent: "center",
  },

  qrIcon: {
    color: C.purple,
    fontSize: 63,
    lineHeight: 72,
  },

  qrPlaceholderText: {
    color: C.muted,
    fontSize: 9,
    fontWeight: "800",
  },

  qrInfo: {
    flex: 1,
    gap: 4,
  },

  qrLabel: {
    color: C.muted,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginTop: 5,
  },

  qrName: {
    color: C.text,
    fontSize: 12,
    fontWeight: "800",
  },

  qrOrderId: {
    color: C.purple,
    fontSize: 10,
    fontWeight: "700",
  },

  ticketFooter: {
    backgroundColor: C.light,
    padding: 12,
    alignItems: "center",
  },

  ticketFooterText: {
    color: C.purple,
    fontSize: 11,
    fontWeight: "600",
  },

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

  detailLabel: {
    color: C.muted,
    fontSize: 13,
  },

  detailValue: {
    color: C.text,
    fontSize: 13,
    fontWeight: "700",
  },

  detailDivider: {
    height: 1,
    backgroundColor: C.border,
    marginBottom: 15,
  },

  totalLabel: {
    color: C.text,
    fontSize: 15,
    fontWeight: "800",
  },

  totalValue: {
    color: C.purple,
    fontSize: 17,
    fontWeight: "900",
  },

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

  statusValue: {
    color: C.green,
    fontSize: 12,
    fontWeight: "800",
  },

  infoBox: {
    backgroundColor: C.light,
    borderRadius: 17,
    padding: 16,
    flexDirection: "row",
    gap: 12,
    marginBottom: 25,
  },

  infoIcon: {
    color: C.accent,
    fontSize: 20,
  },

  infoTitle: {
    color: C.purple,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 5,
  },

  infoText: {
    color: C.muted,
    fontSize: 12,
    lineHeight: 19,
  },

  primaryButton: {
    height: 54,
    backgroundColor: C.purple,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  primaryButtonText: {
    color: C.white,
    fontSize: 14,
    fontWeight: "800",
  },

  secondaryButton: {
    height: 52,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: C.purple,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    color: C.purple,
    fontSize: 14,
    fontWeight: "800",
  },

  footerText: {
    color: C.muted,
    fontSize: 12,
    textAlign: "center",
    marginTop: 23,
  },
});
