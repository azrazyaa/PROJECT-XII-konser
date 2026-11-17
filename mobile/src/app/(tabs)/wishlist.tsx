import { getWishlist, saveWishlist, WishlistItem } from "@/lib/storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const COLORS = {
  background: "#F7F5FB",
  purple: "#3D1D53",
  accent: "#963BFF",
  lightPurple: "#F0DDFF",
  text: "#21182B",
  muted: "#81788B",
  white: "#FFFFFF",
  border: "#EAE3F0",
};

const formatPrice = (price: number) => "Rp" + price.toLocaleString("id-ID");

export default function WishlistScreen() {
  const router = useRouter();

  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [activeTab, setActiveTab] = useState<"soonest" | "recent">("soonest");
  const [refreshing, setRefreshing] = useState(false);

  const loadWishlist = useCallback(async () => {
    try {
      const items = await getWishlist();
      setWishlist(items);
    } catch (err) {
      console.error("Wishlist error:", err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  const onRefresh = () => {
    setRefreshing(true);
    loadWishlist();
  };

  const sortedWishlist = useMemo(() => {
    const items = [...wishlist];
    if (activeTab === "recent") {
      return items.sort((a, b) => b.savedAt - a.savedAt);
    }
    return items.sort((a, b) => a.id.localeCompare(b.id));
  }, [wishlist, activeTab]);

  const removeFromWishlist = async (id: string) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    await saveWishlist(updated);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Wishlist</Text>
        <Text style={styles.subtitle}>Concerts you're keeping an eye on</Text>
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === "soonest" && styles.tabActive]}
          onPress={() => setActiveTab("soonest")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "soonest" && styles.tabTextActive,
            ]}
          >
            Soonest
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === "recent" && styles.tabActive]}
          onPress={() => setActiveTab("recent")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "recent" && styles.tabTextActive,
            ]}
          >
            Recently Added
          </Text>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.purple}
          />
        }
      >
        {sortedWishlist.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>♥</Text>
            <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
            <Text style={styles.emptySubtitle}>
              Tap the heart on any concert to save it here.
            </Text>
            <Pressable
              style={styles.browseButton}
              onPress={() => router.push("/(tabs)/explore")}
            >
              <Text style={styles.browseText}>Explore Concerts</Text>
            </Pressable>
          </View>
        ) : (
          sortedWishlist.map((item) => (
            <View key={item.id} style={styles.card}>
              <Pressable
                style={styles.cardMain}
                onPress={() =>
                  router.push({
                    pathname: "/event-detail",
                    params: { id: item.id },
                  })
                }
              >
                <Image source={{ uri: item.image }} style={styles.cardImage} />

                <View style={styles.cardBody}>
                  <View style={styles.badgeRow}>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText}>
                        {item.category}
                      </Text>
                    </View>

                    <Pressable
                      onPress={() => removeFromWishlist(item.id)}
                      hitSlop={8}
                    >
                      <Text style={styles.heartIcon}>♥</Text>
                    </Pressable>
                  </View>

                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.cardArtist}>{item.artist}</Text>

                  <Text style={styles.cardMeta}>▦ {item.date}</Text>
                  <Text style={styles.cardMeta}>⌖ {item.venue}</Text>

                  <Text style={styles.cardPrice}>
                    From {formatPrice(item.price)}
                  </Text>
                </View>
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 10 },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.text,
    letterSpacing: -1,
  },
  subtitle: { fontSize: 14, color: COLORS.muted, marginTop: 4 },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  tabActive: { backgroundColor: COLORS.purple, borderColor: COLORS.purple },
  tabText: { fontSize: 13, fontWeight: "700", color: COLORS.muted },
  tabTextActive: { color: COLORS.white },
  list: { paddingHorizontal: 20, paddingBottom: 30, gap: 14 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  cardMain: { flexDirection: "row" },
  cardImage: { width: 110, height: 130 },
  cardBody: { flex: 1, padding: 12 },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  categoryBadge: {
    backgroundColor: COLORS.lightPurple,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: COLORS.purple,
    fontSize: 10,
    fontWeight: "700",
  },
  heartIcon: { color: "#E11D48", fontSize: 18 },
  cardTitle: { fontSize: 14, fontWeight: "800", color: COLORS.text },
  cardArtist: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  cardMeta: { fontSize: 11, color: COLORS.muted, marginTop: 3 },
  cardPrice: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.purple,
    marginTop: 8,
  },
  emptyBox: { alignItems: "center", paddingTop: 60, paddingHorizontal: 20 },
  emptyIcon: { fontSize: 44, color: COLORS.muted, marginBottom: 12 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: COLORS.muted,
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: COLORS.purple,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
  },
  browseText: { color: COLORS.white, fontWeight: "700", fontSize: 14 },
});
