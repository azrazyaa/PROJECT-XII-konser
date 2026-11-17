import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
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
  danger: "#DC2626",
  dangerBg: "#FEE2E2",
};

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/login");
        },
      },
    ]);
  };

  const initial = (user?.name?.[0] || "U").toUpperCase();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* USER CARD */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || "User"}</Text>
            <Text style={styles.userEmail}>{user?.email || ""}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>
                {(user?.role || "user").toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {/* MENU SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.card}>
            <Pressable
              style={styles.menuRow}
              onPress={() => router.push("/(tabs)/my-tickets")}
            >
              <Text style={styles.menuIcon}>🎟</Text>
              <Text style={styles.menuLabel}>My Tickets</Text>
              <Text style={styles.arrow}>›</Text>
            </Pressable>

            <View style={styles.divider} />

            <Pressable
              style={styles.menuRow}
              onPress={() => router.push("/(tabs)/wishlist")}
            >
              <Text style={styles.menuIcon}>♥</Text>
              <Text style={styles.menuLabel}>Wishlist</Text>
              <Text style={styles.arrow}>›</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App</Text>

          <View style={styles.card}>
            <Pressable
              style={styles.menuRow}
              onPress={() => router.push("/about")}
            >
              <Text style={styles.menuIcon}>ⓘ</Text>
              <Text style={styles.menuLabel}>About Nocturne</Text>
              <Text style={styles.arrow}>›</Text>
            </Pressable>

            <View style={styles.divider} />

            <View style={styles.menuRow}>
              <Text style={styles.menuIcon}>⚙</Text>
              <Text style={styles.menuLabel}>Version</Text>
              <Text style={styles.versionText}>1.0.0</Text>
            </View>
          </View>
        </View>

        {/* LOGOUT */}
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
  header: { marginBottom: 20 },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: C.text,
    letterSpacing: -1,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.border,
    padding: 18,
    gap: 16,
    marginBottom: 26,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E3C2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 24, fontWeight: "800", color: C.purple },
  userInfo: { flex: 1 },
  userName: { fontSize: 18, fontWeight: "800", color: C.text },
  userEmail: { fontSize: 13, color: C.muted, marginTop: 2 },
  roleBadge: {
    alignSelf: "flex-start",
    backgroundColor: C.light,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 6,
  },
  roleText: { color: C.purple, fontSize: 10, fontWeight: "800" },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: C.muted,
    letterSpacing: 0.6,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: C.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 16,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    gap: 12,
  },
  menuIcon: { fontSize: 18 },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: "600", color: C.text },
  arrow: { fontSize: 20, color: C.muted },
  versionText: { fontSize: 13, color: C.muted },
  divider: { height: 1, backgroundColor: C.border },
  logoutButton: {
    height: 52,
    backgroundColor: C.dangerBg,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  logoutText: { color: C.danger, fontSize: 14, fontWeight: "800" },
});
