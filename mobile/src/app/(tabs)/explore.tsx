import { apiGet } from "@/lib/api";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  RefreshControl,
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
  light: "#F5EDFC",
  text: "#21182B",
  muted: "#81788B",
  white: "#FFFFFF",
  border: "#EAE3F0",
};

type EventItem = {
  id: number;
  title: string;
  artist_name: string;
  artist_genre: string;
  venue: string;
  event_date: string;
  banner_url: string;
  min_price?: number;
};

const FALLBACK =
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600";

function formatDate(d: string) {
  try {
    return new Date(d)
      .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return d;
  }
}

function extractCity(venue: string) {
  const p = venue.split(",");
  return p[p.length - 1]?.trim() || venue;
}

function formatPrice(p?: number) {
  if (!p) return "See prices";
  return "Rp" + p.toLocaleString("id-ID");
}

const sortOptions = ["Upcoming", "A–Z", "Price ↑"] as const;
type SortOption = (typeof sortOptions)[number];

export default function ExploreScreen() {
  const router = useRouter();

  const [events, setEvents] = useState<EventItem[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("Upcoming");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadEvents = useCallback(async () => {
    try {
      const res = await apiGet<EventItem[]>("/api/events");
      if (res.success && Array.isArray(res.data)) {
        setEvents(res.data);
      }
    } catch (err) {
      console.error("ExploreScreen error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const onRefresh = () => {
    setRefreshing(true);
    loadEvents();
  };

  const filtered = events
    .filter((e) => {
      const q = search.toLowerCase();
      return (
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.artist_name.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sort === "A–Z") return a.title.localeCompare(b.title);
      if (sort === "Price ↑")
        return (a.min_price || 0) - (b.min_price || 0);
      return new Date(a.event_date).getTime() - new Date(b.event_date).getTime();
    });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subtitle}>Discover concerts near you</Text>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search concerts, artists, venues"
          placeholderTextColor={C.muted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* SORT TABS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.sortScroll}
        contentContainerStyle={styles.sortContent}
      >
        {sortOptions.map((s) => (
          <Pressable
            key={s}
            onPress={() => setSort(s)}
            style={[styles.sortBtn, sort === s && styles.sortActive]}
          >
            <Text style={[styles.sortText, sort === s && styles.sortTextActive]}>
              {s}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.loadingBox}>
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
          {filtered.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyIcon}>♫</Text>
              <Text style={styles.emptyText}>No concerts found.</Text>
              <Text style={styles.emptyHint}>Try a different search.</Text>
            </View>
          ) : (
            filtered.map((event) => (
              <Pressable
                key={event.id}
                style={styles.card}
                onPress={() =>
                  router.push({
                    pathname: "/event-detail",
                    params: { id: String(event.id) },
                  })
                }
              >
                <Image
                  source={{ uri: event.banner_url || FALLBACK }}
                  style={styles.cardImage}
                />

                <View style={styles.cardBody}>
                  <View style={styles.cardBadge}>
                    <Text style={styles.cardBadgeText}>
                      {event.artist_genre || "Music"}
                    </Text>
                  </View>

                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {event.title}
                  </Text>
                  <Text style={styles.cardArtist}>{event.artist_name}</Text>

                  <View style={styles.cardMeta}>
                    <Text style={styles.cardMetaText}>
                      ▦ {formatDate(event.event_date)}
                    </Text>
                    <Text style={styles.cardMetaText}>
                      ⌖ {extractCity(event.venue)}
                    </Text>
                  </View>

                  <Text style={styles.cardPrice}>
                    From {formatPrice(event.min_price)}
                  </Text>
                </View>
              </Pressable>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },

  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: C.text,
    letterSpacing: -1,
  },

  subtitle: { fontSize: 14, color: C.muted, marginTop: 4 },

  searchBox: {
    height: 48,
    backgroundColor: C.white,
    borderRadius: 15,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#382443",
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },

  searchIcon: { fontSize: 24, color: C.muted, marginRight: 10 },

  searchInput: { flex: 1, fontSize: 14, color: C.text },

  sortScroll: { maxHeight: 50 },

  sortContent: { paddingHorizontal: 20, gap: 8, alignItems: "center" },

  sortBtn: {
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 20,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },

  sortActive: { backgroundColor: C.purple, borderColor: C.purple },

  sortText: { fontSize: 13, fontWeight: "600", color: C.text },

  sortTextActive: { color: C.white },

  loadingBox: { flex: 1, justifyContent: "center", alignItems: "center" },

  list: { padding: 20, gap: 14 },

  card: {
    backgroundColor: C.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.border,
    overflow: "hidden",
    flexDirection: "row",
  },

  cardImage: { width: 100, height: 110 },

  cardBody: { flex: 1, padding: 12 },

  cardBadge: {
    alignSelf: "flex-start",
    backgroundColor: C.light,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 6,
  },

  cardBadgeText: { color: C.purple, fontSize: 10, fontWeight: "700" },

  cardTitle: { color: C.text, fontSize: 14, fontWeight: "800" },

  cardArtist: { color: C.muted, fontSize: 12, marginTop: 2 },

  cardMeta: { marginTop: 7, gap: 3 },

  cardMetaText: { color: C.muted, fontSize: 11 },

  cardPrice: {
    color: C.purple,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 7,
  },

  emptyBox: { alignItems: "center", paddingTop: 60 },

  emptyIcon: { fontSize: 48, marginBottom: 12 },

  emptyText: { fontSize: 16, fontWeight: "700", color: C.text },

  emptyHint: { fontSize: 13, color: C.muted, marginTop: 4 },
});
