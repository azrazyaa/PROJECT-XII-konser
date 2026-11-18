import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
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
  accent: "#8A28FF",
  light: "#F2E8FC",
  text: "#21182B",
  muted: "#81788B",
  white: "#FFFFFF",
  border: "#EAE3F0",
};

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      Alert.alert("Lengkapi Data", "Nama, email, dan password wajib diisi.");
      return;
    }

    if (trimmedPassword.length < 6) {
      Alert.alert("Password Lemah", "Password minimal 6 karakter.");
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    if (!emailValid) {
      Alert.alert("Email Tidak Valid", "Masukkan format email yang benar.");
      return;
    }

    setLoading(true);
    try {
      await register(trimmedName, trimmedEmail, trimmedPassword);
      Alert.alert(
        "Registrasi Berhasil!",
        "Akun Anda telah berhasil dibuat. Silakan login untuk melanjutkan.",
        [
          {
            text: "Login Sekarang",
            onPress: () => router.replace("/login"),
          },
        ]
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registrasi gagal";
      Alert.alert("Registrasi Gagal", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* BRAND */}
        <View style={styles.brand}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>N</Text>
          </View>
          <Text style={styles.brandName}>Nocturne</Text>
        </View>

        <Text style={styles.heading}>Create account</Text>
        <Text style={styles.sub}>Join Nocturne and discover live concerts.</Text>

        {/* FORM */}
        <View style={styles.form}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your full name"
            placeholderTextColor={C.muted}
            autoCapitalize="words"
            editable={!loading}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            placeholderTextColor={C.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Min. 6 characters"
            placeholderTextColor={C.muted}
            secureTextEntry
            editable={!loading}
          />

          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={C.white} size="small" />
            ) : (
              <Text style={styles.buttonText}>Create Account</Text>
            )}
          </Pressable>
        </View>

        {/* LOGIN LINK */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Pressable onPress={() => router.replace("/login")}>
            <Text style={styles.link}>Sign In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 40,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 36,
  },
  logo: {
    width: 36,
    height: 36,
    backgroundColor: C.purple,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { color: C.white, fontSize: 19, fontWeight: "800" },
  brandName: { fontSize: 22, fontWeight: "800", color: C.text },
  heading: {
    fontSize: 30,
    fontWeight: "900",
    color: C.text,
    letterSpacing: -1,
    marginBottom: 8,
  },
  sub: { fontSize: 14, color: C.muted, marginBottom: 36 },
  form: { gap: 4 },
  label: { fontSize: 13, fontWeight: "700", color: C.text, marginBottom: 8 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: C.text,
    backgroundColor: C.white,
    marginBottom: 18,
  },
  button: {
    height: 54,
    backgroundColor: C.purple,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: C.white, fontSize: 15, fontWeight: "800" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 28 },
  footerText: { color: C.muted, fontSize: 14 },
  link: { color: C.accent, fontSize: 14, fontWeight: "700" },
});
