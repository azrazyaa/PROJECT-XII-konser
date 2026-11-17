import { useAuth } from "@/context/AuthContext";
import { apiGet, apiPost } from "@/lib/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
  yellow: "#FFF1C7",
  yellowText: "#B65B00",
};

type ItemParam = {
  ticket_category_id: number;
  qty: number;
  price: number;
  name: string;
};

type EventSummary = {
  id: number;
  title: string;
  venue: string;
  event_date: string;
  banner_url: string;
};

const formatPrice = (price: number) => "Rp" + price.toLocaleString("id-ID");

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

const getString = (v: string | string[] | undefined, fb = "") =>
  Array.isArray(v) ? v[0] : v || fb;

export default function PaymentScreen() {
  const router = useRouter();
  const { user, token } = useAuth();
  const params = useLocalSearchParams<{
    id?: string;
    items?: string;
    subtotal?: string;
    serviceFee?: string;
    total?: string;
  }>();

  const eventId = getString(params.id, "1");
  const [event, setEvent] = useState<EventSummary | null>(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [processing, setProcessing] = useState(false);

  let items: ItemParam[] = [];
  try {
    if (params.items) {
      items = JSON.parse(getString(params.items));
    }
  } catch {}

  const subtotal = Number(getString(params.subtotal, "0")) || 0;
  const serviceFee = Number(getString(params.serviceFee, "0")) || 0;
  const total = Number(getString(params.total, String(subtotal + serviceFee))) || 0;

  const totalTickets = items.reduce((s, it) => s + (it.qty || 0), 0);

  const [fullName, setFullName] = useState(user?.name || "Aditya Pratama");
  const [email, setEmail] = useState(user?.email || "aditya@example.com");
  const [phone, setPhone] = useState("+62 812 3456 7890");

  const [paymentMethod, setPaymentMethod] = useState("Virtual Account");
  const [selectedBank, setSelectedBank] = useState("BCA");
  const banks = ["BCA", "BNI", "Mandiri"];

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGet<EventSummary>(`/api/events/${eventId}`);
        if (res.success && res.data) setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event in payment:", err);
      } finally {
        setLoadingEvent(false);
      }
    })();
  }, [eventId]);

  const handlePayment = async () => {
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      Alert.alert("Incomplete Details", "Please complete all buyer details.");
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (totalTickets < 1 || items.length === 0) {
      Alert.alert("No Tickets", "Please select your tickets first.");
      return;
    }

    setProcessing(true);
    try {
      const fullPaymentMethod =
        paymentMethod === "Virtual Account"
          ? `Virtual Account (${selectedBank})`
          : paymentMethod;

      const orderPayload = {
        user_id: user?.id,
        items: items.map((it) => ({
          ticket_category_id: it.ticket_category_id,
          qty: it.qty,
        })),
        status: "paid",
        payment_method: fullPaymentMethod,
      };

      const res = await apiPost<{
        order_id: number;
        order_code: string;
        tickets?: Array<{ ticket_code: string; category_name: string }>;
      }>("/api/orders", orderPayload, token);

      if (!res.success || !res.data) {
        throw new Error(res.message || "Gagal membuat pesanan");
      }

      router.push({
        pathname: "/order-success",
        params: {
          id: eventId,
          order_code: res.data.order_code,
          name: fullName,
          email,
          phone,
          paymentMethod,
          bank: paymentMethod === "Virtual Account" ? selectedBank : "",
          total: String(total),
          items: JSON.stringify(items),
          tickets: JSON.stringify(res.data.tickets || []),
        },
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
      Alert.alert("Payment Error", msg);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Payment</Text>
      </View>

      {/* PROGRESS */}
      <View style={styles.progressContainer}>
        <View style={styles.progressStep}>
          <View style={styles.completedCircle}>
            <Text style={styles.checkIcon}>✓</Text>
          </View>
          <Text style={styles.activeStepText}>Tickets</Text>
        </View>

        <View style={styles.progressLineActive} />

        <View style={styles.progressStep}>
          <View style={styles.currentCircle}>
            <Text style={styles.currentNumber}>2</Text>
          </View>
          <Text style={styles.activeStepText}>Payment</Text>
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
        {/* DEADLINE */}
        <View style={styles.deadlineCard}>
          <Text style={styles.clockIcon}>◷</Text>
          <Text style={styles.deadlineText}>
            Complete payment before 23:59 WIB
          </Text>
        </View>

        {/* EVENT SUMMARY */}
        {event && (
          <View style={styles.eventCard}>
            <View style={styles.eventTop}>
              <Image
                source={{ uri: event.banner_url || FALLBACK }}
                style={styles.eventImage}
              />
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDetails}>
                  {formatDateTime(event.event_date)}
                </Text>
                <Text style={styles.eventDetails}>{event.venue}</Text>
              </View>
            </View>

            <View style={styles.eventDivider} />

            {items.map((it) => (
              <View key={it.ticket_category_id} style={styles.ticketSummaryRow}>
                <Text style={styles.ticketSummaryName}>
                  {it.name} × {it.qty}
                </Text>
                <Text style={styles.ticketSummaryPrice}>
                  {formatPrice(it.price * it.qty)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* PRICE SUMMARY */}
        <View style={styles.priceCard}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>{formatPrice(subtotal)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service fee (5%)</Text>
            <Text style={styles.priceValue}>{formatPrice(serviceFee)}</Text>
          </View>
          <View style={styles.priceDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>{formatPrice(total)}</Text>
          </View>
        </View>

        {/* BUYER DETAILS */}
        <Text style={styles.sectionTitle}>Buyer details</Text>
        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>Full name</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            placeholderTextColor={C.muted}
            style={styles.input}
          />

          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={C.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <Text style={styles.inputLabel}>Phone</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="+62 812 3456 7890"
            placeholderTextColor={C.muted}
            keyboardType="phone-pad"
            style={styles.input}
          />

          <Text style={styles.helperText}>
            Tickets are issued in the buyer name above. Bring an ID that matches
            it.
          </Text>
        </View>

        {/* PAYMENT METHODS */}
        <Text style={styles.sectionTitle}>Payment method</Text>

        <Pressable
          onPress={() => setPaymentMethod("Virtual Account")}
          style={[
            styles.methodCard,
            paymentMethod === "Virtual Account" && styles.methodSelected,
          ]}
        >
          <View style={styles.methodTop}>
            <View
              style={[
                styles.radio,
                paymentMethod === "Virtual Account" && styles.radioActive,
              ]}
            >
              {paymentMethod === "Virtual Account" && (
                <View style={styles.radioDot} />
              )}
            </View>
            <Text style={styles.methodIcon}>♧</Text>
            <Text style={styles.methodName}>Virtual Account</Text>
            <Text style={styles.bankHint}>{selectedBank}</Text>
          </View>

          {paymentMethod === "Virtual Account" && (
            <View style={styles.bankList}>
              {banks.map((bank) => (
                <Pressable
                  key={bank}
                  onPress={() => setSelectedBank(bank)}
                  style={[
                    styles.bankButton,
                    selectedBank === bank && styles.bankSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.bankText,
                      selectedBank === bank && styles.bankTextSelected,
                    ]}
                  >
                    {bank}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </Pressable>

        <Pressable
          onPress={() => setPaymentMethod("E-Wallet")}
          style={[
            styles.methodCard,
            paymentMethod === "E-Wallet" && styles.methodSelected,
          ]}
        >
          <View style={styles.methodTop}>
            <View
              style={[
                styles.radio,
                paymentMethod === "E-Wallet" && styles.radioActive,
              ]}
            >
              {paymentMethod === "E-Wallet" && <View style={styles.radioDot} />}
            </View>
            <Text style={styles.methodIcon}>▣</Text>
            <Text style={styles.methodName}>E-Wallet</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => setPaymentMethod("Credit or Debit Card")}
          style={[
            styles.methodCard,
            paymentMethod === "Credit or Debit Card" && styles.methodSelected,
          ]}
        >
          <View style={styles.methodTop}>
            <View
              style={[
                styles.radio,
                paymentMethod === "Credit or Debit Card" && styles.radioActive,
              ]}
            >
              {paymentMethod === "Credit or Debit Card" && (
                <View style={styles.radioDot} />
              )}
            </View>
            <Text style={styles.methodIcon}>▤</Text>
            <Text style={styles.methodName}>Credit or Debit Card</Text>
          </View>
        </Pressable>

        <View style={styles.demoNotice}>
          <Text style={styles.demoIcon}>♢</Text>
          <Text style={styles.demoText}>
            Connected to Nocturne Live Database. Ticket will be created directly.
          </Text>
        </View>
      </ScrollView>

      {/* FIXED BOTTOM */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomInfo}>
          <Text style={styles.bottomLabel}>TOTAL</Text>
          <Text style={styles.bottomPrice}>{formatPrice(total)}</Text>
        </View>

        <Pressable
          style={[styles.payButton, processing && { opacity: 0.6 }]}
          onPress={handlePayment}
          disabled={processing}
        >
          {processing ? (
            <ActivityIndicator color={C.white} />
          ) : (
            <Text style={styles.payButtonText}>Pay {formatPrice(total)}</Text>
          )}
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
  backIcon: { fontSize: 29, lineHeight: 32, color: C.purple },
  headerTitle: { fontSize: 17, fontWeight: "700", color: C.text, marginLeft: 9 },
  progressContainer: {
    height: 49,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  progressStep: { flexDirection: "row", alignItems: "center", gap: 7 },
  completedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: C.purple,
    alignItems: "center",
    justifyContent: "center",
  },
  currentCircle: {
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
  checkIcon: { color: C.white, fontSize: 14, fontWeight: "800" },
  currentNumber: { color: C.purple, fontSize: 11, fontWeight: "800" },
  inactiveNumber: { color: C.muted, fontSize: 11, fontWeight: "700" },
  activeStepText: { color: C.purple, fontSize: 12, fontWeight: "700" },
  inactiveStepText: { color: C.muted, fontSize: 12, fontWeight: "600" },
  progressLineActive: {
    height: 1,
    backgroundColor: C.purple,
    flex: 1,
    marginHorizontal: 8,
  },
  progressLine: {
    height: 1,
    backgroundColor: C.lavender,
    flex: 1,
    marginHorizontal: 8,
  },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 25 },
  deadlineCard: {
    height: 46,
    borderRadius: 25,
    backgroundColor: "#FFF2C9",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    gap: 10,
    marginBottom: 20,
  },
  clockIcon: { color: "#D45C00", fontSize: 20 },
  deadlineText: { color: "#C65300", fontSize: 13, fontWeight: "700" },
  eventCard: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  eventTop: { flexDirection: "row", alignItems: "center", gap: 12 },
  eventImage: { width: 56, height: 64, borderRadius: 13, backgroundColor: C.light },
  eventInfo: { flex: 1 },
  eventTitle: { fontSize: 14, fontWeight: "800", color: C.text, marginBottom: 4 },
  eventDetails: { fontSize: 12, color: C.muted, lineHeight: 18 },
  eventDivider: { height: 1, backgroundColor: C.border, marginVertical: 15 },
  ticketSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  ticketSummaryName: { color: C.muted, fontSize: 13 },
  ticketSummaryPrice: { color: C.text, fontSize: 13, fontWeight: "700" },
  priceCard: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    padding: 16,
    marginBottom: 30,
  },
  priceRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 13 },
  priceLabel: { fontSize: 13, color: C.muted },
  priceValue: { fontSize: 13, fontWeight: "700", color: C.text },
  priceDivider: { height: 1, backgroundColor: C.border, marginBottom: 13 },
  totalRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  totalLabel: { fontSize: 17, fontWeight: "800", color: C.text },
  totalPrice: { fontSize: 20, fontWeight: "900", color: C.purple },
  sectionTitle: { fontSize: 19, fontWeight: "800", color: C.text, marginBottom: 13 },
  formCard: {
    backgroundColor: C.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    marginBottom: 29,
  },
  inputLabel: { color: C.text, fontSize: 12, fontWeight: "700", marginBottom: 9 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 15,
    paddingHorizontal: 16,
    fontSize: 14,
    color: C.text,
    backgroundColor: C.white,
    marginBottom: 19,
  },
  helperText: { color: C.muted, fontSize: 12, lineHeight: 18, marginTop: -2 },
  methodCard: {
    backgroundColor: C.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    marginBottom: 10,
  },
  methodSelected: { borderColor: C.accent, borderWidth: 1.3 },
  methodTop: { flexDirection: "row", alignItems: "center", gap: 12 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: C.lavender,
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: { backgroundColor: C.accent, borderColor: C.accent },
  radioDot: { width: 7, height: 7, borderRadius: 5, backgroundColor: C.white },
  methodIcon: { color: C.purple, fontSize: 19 },
  methodName: { color: C.text, fontSize: 14, fontWeight: "700", flex: 1 },
  bankHint: { color: C.muted, fontSize: 13 },
  bankList: { flexDirection: "row", gap: 8, marginTop: 12, paddingLeft: 32 },
  bankButton: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.white,
  },
  bankSelected: { backgroundColor: C.purple, borderColor: C.purple },
  bankText: { fontSize: 12, fontWeight: "700", color: C.text },
  bankTextSelected: { color: C.white },
  demoNotice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 14,
    borderRadius: 14,
    backgroundColor: C.light,
    marginTop: 10,
  },
  demoIcon: { color: C.accent, fontSize: 16 },
  demoText: { color: C.muted, fontSize: 12, flex: 1 },
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
  bottomLabel: { color: C.muted, fontSize: 10, fontWeight: "700" },
  bottomPrice: { color: C.purple, fontSize: 18, fontWeight: "900" },
  payButton: {
    backgroundColor: C.purple,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
    minWidth: 150,
    alignItems: "center",
  },
  payButtonText: { color: C.white, fontWeight: "800", fontSize: 14 },
});
