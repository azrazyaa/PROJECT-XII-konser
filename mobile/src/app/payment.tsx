import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
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

const eventData: Record<
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

  "4": {
    title: "Listrik Malam",
    date: "Sat, 9 Jan 2027 · 21:00 WIB",
    venue: "Sky Garden Kuningan, Jakarta",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500",
  },
};

const ticketInfo = [
  { id: "festival", name: "Festival", price: 850000 },
  { id: "tribune", name: "Tribune", price: 1250000 },
  { id: "vip", name: "VIP", price: 2500000 },
];

const formatPrice = (price: number) => "Rp" + price.toLocaleString("id-ID");

const getString = (value: string | string[] | undefined, fallback = "") => {
  return Array.isArray(value) ? value[0] : value || fallback;
};

export default function PaymentScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    id?: string;
    quantities?: string;
    subtotal?: string;
    serviceFee?: string;
    total?: string;
  }>();

  const eventId = getString(params.id, "1");
  const event = eventData[eventId] || eventData["1"];

  let selectedQuantities: Record<string, number> = {
    festival: 0,
    tribune: 0,
    vip: 0,
  };

  try {
    if (params.quantities) {
      const parsed = JSON.parse(getString(params.quantities));
      selectedQuantities = {
        ...selectedQuantities,
        ...parsed,
      };
    }
  } catch {
    // Gunakan jumlah default jika parameter tidak valid.
  }

  const subtotal = Number(getString(params.subtotal, "0")) || 0;
  const serviceFee = Number(getString(params.serviceFee, "0")) || 0;
  const total =
    Number(getString(params.total, String(subtotal + serviceFee))) || 0;

  const totalTickets = Object.values(selectedQuantities).reduce(
    (sum, quantity) => sum + (Number(quantity) || 0),
    0,
  );

  const [fullName, setFullName] = useState("Aditya Pratama");
  const [email, setEmail] = useState("aditya.pratama@example.com");
  const [phone, setPhone] = useState("+62 812 3456 7890");

  const [paymentMethod, setPaymentMethod] = useState("Virtual Account");
  const [selectedBank, setSelectedBank] = useState("BCA");

  const banks = ["BCA", "BNI", "Mandiri"];

  const handlePayment = () => {
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      Alert.alert("Incomplete Details", "Please complete all buyer details.");
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValid) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (totalTickets < 1 || total <= 0) {
      Alert.alert("No Tickets", "Please select your tickets first.");
      return;
    }

    router.push({
      pathname: "/order-success",
      params: {
        id: eventId,
        name: fullName,
        email,
        phone,
        paymentMethod,
        bank: paymentMethod === "Virtual Account" ? selectedBank : "",
        total: String(total),
        quantities: JSON.stringify(selectedQuantities),
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

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
        {/* PAYMENT DEADLINE */}
        <View style={styles.deadlineCard}>
          <Text style={styles.clockIcon}>◷</Text>
          <Text style={styles.deadlineText}>
            Complete payment before 23:59 WIB
          </Text>
        </View>

        {/* EVENT SUMMARY */}
        <View style={styles.eventCard}>
          <View style={styles.eventTop}>
            <Image source={{ uri: event.image }} style={styles.eventImage} />

            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDetails}>{event.date}</Text>
              <Text style={styles.eventDetails}>{event.venue}</Text>
            </View>
          </View>

          <View style={styles.eventDivider} />

          {ticketInfo.map((ticket) => {
            const quantity = selectedQuantities[ticket.id] || 0;

            if (quantity === 0) return null;

            return (
              <View key={ticket.id} style={styles.ticketSummaryRow}>
                <Text style={styles.ticketSummaryName}>
                  {ticket.name} × {quantity}
                </Text>
                <Text style={styles.ticketSummaryPrice}>
                  {formatPrice(
                    ticket.id === "festival" && subtotal > 0
                      ? Math.round(
                          (subtotal -
                            (selectedQuantities.tribune || 0) *
                              ticketInfo[1].price -
                            (selectedQuantities.vip || 0) *
                              ticketInfo[2].price) /
                            Math.max(selectedQuantities.festival || 1, 1),
                        )
                      : ticket.price * quantity,
                  )}
                </Text>
              </View>
            );
          })}
        </View>

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

        {/* VIRTUAL ACCOUNT */}
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

        {/* E-WALLET */}
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

        {/* CARD */}
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

        {/* DEMO NOTICE */}
        <View style={styles.demoNotice}>
          <Text style={styles.demoIcon}>♢</Text>
          <Text style={styles.demoText}>
            Demo mode. No real payment will be processed.
          </Text>
        </View>
      </ScrollView>

      {/* FIXED BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomInfo}>
          <Text style={styles.bottomLabel}>TOTAL</Text>
          <Text style={styles.bottomPrice}>{formatPrice(total)}</Text>
        </View>

        <Pressable style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay {formatPrice(total)}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },

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

  backIcon: {
    fontSize: 29,
    lineHeight: 32,
    color: C.purple,
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: C.text,
    marginLeft: 9,
  },

  progressContainer: {
    height: 49,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },

  progressStep: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

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

  checkIcon: {
    color: C.white,
    fontSize: 14,
    fontWeight: "800",
  },

  currentNumber: {
    color: C.purple,
    fontSize: 11,
    fontWeight: "800",
  },

  inactiveNumber: {
    color: C.muted,
    fontSize: 11,
    fontWeight: "700",
  },

  activeStepText: {
    color: C.purple,
    fontSize: 12,
    fontWeight: "700",
  },

  inactiveStepText: {
    color: C.muted,
    fontSize: 12,
    fontWeight: "600",
  },

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

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 25,
  },

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

  clockIcon: {
    color: "#D45C00",
    fontSize: 20,
  },

  deadlineText: {
    color: "#C65300",
    fontSize: 13,
    fontWeight: "700",
  },

  eventCard: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },

  eventTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  eventImage: {
    width: 56,
    height: 64,
    borderRadius: 13,
    backgroundColor: C.light,
  },

  eventInfo: {
    flex: 1,
  },

  eventTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: C.text,
    marginBottom: 4,
  },

  eventDetails: {
    fontSize: 12,
    color: C.muted,
    lineHeight: 18,
  },

  eventDivider: {
    height: 1,
    backgroundColor: C.border,
    marginVertical: 15,
  },

  ticketSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },

  ticketSummaryName: {
    color: C.muted,
    fontSize: 13,
  },

  ticketSummaryPrice: {
    color: C.text,
    fontSize: 13,
    fontWeight: "700",
  },

  priceCard: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    padding: 16,
    marginBottom: 30,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 13,
  },

  priceLabel: {
    fontSize: 13,
    color: C.muted,
  },

  priceValue: {
    fontSize: 13,
    fontWeight: "700",
    color: C.text,
  },

  priceDivider: {
    height: 1,
    backgroundColor: C.border,
    marginBottom: 13,
  },

  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  totalLabel: {
    fontSize: 17,
    fontWeight: "800",
    color: C.text,
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: "900",
    color: C.purple,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: C.text,
    marginBottom: 13,
  },

  formCard: {
    backgroundColor: C.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    marginBottom: 29,
  },

  inputLabel: {
    color: C.text,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 9,
  },

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

  helperText: {
    color: C.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: -2,
  },

  methodCard: {
    backgroundColor: C.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    marginBottom: 10,
  },

  methodSelected: {
    borderColor: C.accent,
    borderWidth: 1.3,
  },

  methodTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: C.lavender,
    alignItems: "center",
    justifyContent: "center",
  },

  radioActive: {
    backgroundColor: C.accent,
    borderColor: C.accent,
  },

  radioDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: C.white,
  },

  methodIcon: {
    color: C.purple,
    fontSize: 19,
  },

  methodName: {
    color: C.text,
    fontSize: 14,
    fontWeight: "700",
    flex: 1,
  },

  bankHint: {
    color: C.muted,
    fontSize: 12,
  },

  bankList: {
    flexDirection: "row",
    gap: 8,
    marginTop: 13,
    marginLeft: 0,
  },

  bankButton: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  bankSelected: {
    backgroundColor: C.purple,
    borderColor: C.purple,
  },

  bankText: {
    color: C.text,
    fontSize: 12,
    fontWeight: "600",
  },

  bankTextSelected: {
    color: C.white,
  },

  demoNotice: {
    backgroundColor: C.light,
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
    marginBottom: 5,
  },

  demoIcon: {
    color: C.accent,
    fontSize: 19,
  },

  demoText: {
    color: C.muted,
    fontSize: 12,
  },

  bottomBar: {
    backgroundColor: C.white,
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 17,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  bottomInfo: {
    flex: 1,
  },

  bottomLabel: {
    color: C.muted,
    fontSize: 11,
    letterSpacing: 1,
  },

  bottomPrice: {
    color: C.text,
    fontSize: 17,
    fontWeight: "900",
  },

  payButton: {
    flex: 1.8,
    height: 52,
    backgroundColor: C.purple,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  payButtonText: {
    color: C.white,
    fontSize: 14,
    fontWeight: "700",
  },
});
