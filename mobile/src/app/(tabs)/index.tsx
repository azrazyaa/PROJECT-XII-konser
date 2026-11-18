import { useAuth } from "@/context/AuthContext";
import { apiGet } from "@/lib/api";
import { getWishlist, saveWishlist, WishlistItem } from "@/lib/storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const COLORS = {
  background: "#F7F5FB",
  purple: "#3D1D53",
  purpleLight: "#EEDBFF",
  text: "#21182B",
  secondary: "#81788B",
  white: "#FFFFFF",
};

const categories = ["All", "Pop", "Rock", "Jazz", "Electronic", "Festival"];

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

type ArtistItem = {
  id: number;
  name: string;
  genre: string;
  image_url?: string;
  concert_count?: number;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800";
const FALLBACK_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300";

function formatEventDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d
      .toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
      .toUpperCase();
  } catch {
    return dateStr;
  }
}

function formatPrice(price?: number): string {
  if (!price) return "See prices";
  return "Rp" + price.toLocaleString("id-ID");
}

function extractCity(venue: string): string {
  const parts = venue.split(",");
  return parts[parts.length - 1]?.trim() || venue;
}

const cities = ["Jakarta", "Bandung", "Surabaya", "Denpasar"];

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [artists, setArtists] = useState<ArtistItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [eventsError, setEventsError] = useState("");

  const loadData = useCallback(async () => {
    const [eventsResult, artistsResult, wishlistResult] =
      await Promise.allSettled([
        apiGet<EventItem[]>("/api/events"),
        apiGet<ArtistItem[]>("/api/artists"),
        getWishlist(),
      ]);

    if (eventsResult.status === "fulfilled") {
      const eventsRes = eventsResult.value;
      if (eventsRes.success && Array.isArray(eventsRes.data)) {
        setEvents(eventsRes.data);
        setEventsError("");
      } else {
        setEventsError(
          eventsRes.message || "Server returned an invalid event list."
        );
      }
    } else {
      console.error("HomeScreen events error:", eventsResult.reason);
      setEventsError(
        eventsResult.reason instanceof Error
          ? eventsResult.reason.message
          : "Unable to load events."
      );
    }

    if (artistsResult.status === "fulfilled") {
      const artistsRes = artistsResult.value;
      if (artistsRes.success && Array.isArray(artistsRes.data)) {
        setArtists(artistsRes.data);
      }
    } else {
      console.error("HomeScreen artists error:", artistsResult.reason);
    }

    if (wishlistResult.status === "fulfilled") {
      setWishlistIds(
        new Set(wishlistResult.value.map((w) => String(w.id)))
      );
    } else {
      console.error("HomeScreen wishlist error:", wishlistResult.reason);
    }

    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, [loadData]);

  const toggleWishlist = useCallback(
    async (event: EventItem) => {
      const id = String(event.id);
      const current = await getWishlist();
      let updated: WishlistItem[];

      if (wishlistIds.has(id)) {
        updated = current.filter((w) => w.id !== id);
      } else {
        const item: WishlistItem = {
          id,
          title: event.title,
          artist: event.artist_name,
          date: formatEventDate(event.event_date),
          venue: event.venue,
          price: event.min_price || 0,
          image: event.banner_url || FALLBACK_IMAGE,
          category: event.artist_genre || "Music",
          savedAt: Date.now(),
        };
        updated = [item, ...current];
      }

      await saveWishlist(updated);
      setWishlistIds(new Set(updated.map((w) => w.id)));
    },
    [wishlistIds]
  );

  const filteredEvents = events.filter((e) => {
    const genre = e.artist_genre?.toLowerCase() || "";
    const matchesCategory =
      selectedCategory === "All" ||
      genre.includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === "Festival" && e.title.toLowerCase().includes("fest"));

    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      e.title.toLowerCase().includes(q) ||
      e.artist_name.toLowerCase().includes(q) ||
      e.venue.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const featuredEvent = events[0];
  const upcomingEvents = filteredEvents;

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  const firstName = user?.name?.split(" ")[0] || "there";

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={COLORS.purple} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.purple} />
        }
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.brand}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>N</Text>
            </View>
            <Text style={styles.brandName}>Nocturne</Text>
          </View>

          <Pressable
            style={styles.avatar}
            onPress={() => router.push("/(tabs)/profile")}
          >
            <Text style={styles.avatarText}>
              {(user?.name?.[0] || "N").toUpperCase()}
            </Text>
          </Pressable>
        </View>

        {/* GREETING */}
        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>
            {greeting}, {firstName}
          </Text>
          <Text style={styles.subtitle}>Find your next night out.</Text>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search concerts, artists, venues"
            placeholderTextColor={COLORS.secondary}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* CATEGORIES */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map((category) => (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* FEATURED CONCERT */}
        {featuredEvent && (
          <Pressable
            style={styles.featuredCard}
            onPress={() =>
              router.push({
                pathname: "/event-detail",
                params: { id: String(featuredEvent.id) },
              })
            }
          >
            <ImageBackground
              source={{ uri: featuredEvent.banner_url || FALLBACK_IMAGE }}
              style={styles.featuredImage}
              imageStyle={styles.featuredImageRadius}
            >
              <View style={styles.featuredOverlay} />

              <View style={styles.featuredTop}>
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredBadgeText}>☆ Featured</Text>
                </View>

                <Pressable
                  onPress={() => toggleWishlist(featuredEvent)}
                  style={styles.favoriteButton}
                >
                  <Text style={styles.favoriteIcon}>
                    {wishlistIds.has(String(featuredEvent.id)) ? "♥" : "♡"}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.featuredDate}>
                <Text style={styles.featuredDateText}>
                  {formatEventDate(featuredEvent.event_date)}
                </Text>
              </View>

              <View style={styles.featuredInfo}>
                <Text style={styles.featuredTitle}>{featuredEvent.title}</Text>
                <Text style={styles.featuredArtist}>
                  {featuredEvent.artist_name}
                </Text>
                <Text style={styles.featuredLocation}>
                  {formatEventDate(featuredEvent.event_date)} ·{" "}
                  {featuredEvent.venue}
                </Text>
              </View>
            </ImageBackground>

            <View style={styles.ticketFooter}>
              <View>
                <Text style={styles.ticketDate}>
                  {formatEventDate(featuredEvent.event_date)} ·{" "}
                  {extractCity(featuredEvent.venue).toUpperCase()}
                </Text>
                <Text style={styles.ticketPrice}>
                  From {formatPrice(featuredEvent.min_price)}
                </Text>
              </View>

              <Pressable
                style={styles.ticketButton}
                onPress={() =>
                  router.push({
                    pathname: "/select-tickets",
                    params: { id: String(featuredEvent.id) },
                  })
                }
              >
                <Text style={styles.ticketButtonText}>Get Tickets</Text>
              </Pressable>
            </View>
          </Pressable>
        )}

        {/* UPCOMING CONCERTS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Concerts</Text>
            <Pressable onPress={() => router.push("/(tabs)/explore")}>
              <Text style={styles.seeAll}>See all ›</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.concertList}
          >
            {upcomingEvents.map((event) => (
              <Pressable
                key={event.id}
                style={styles.concertCard}
                onPress={() =>
                  router.push({
                    pathname: "/event-detail",
                    params: { id: String(event.id) },
                  })
                }
              >
                <View>
                  <Image
                    source={{ uri: event.banner_url || FALLBACK_IMAGE }}
                    style={styles.concertImage}
                  />
                  <View style={styles.concertDateBadge}>
                    <Text style={styles.concertDateText}>
                      {formatEventDate(event.event_date)}
                    </Text>
                  </View>
                </View>

                <Text style={styles.concertTitle} numberOfLines={1}>
                  {event.title}
                </Text>
                <Text style={styles.concertArtist} numberOfLines={1}>
                  {event.artist_name}
                </Text>
                <Text style={styles.concertCity}>
                  {extractCity(event.venue)}
                </Text>
                <Text style={styles.concertPrice}>
                  From {formatPrice(event.min_price)}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {eventsError ? (
            <Text style={styles.emptyText}>
              Could not load events: {eventsError}
            </Text>
          ) : upcomingEvents.length === 0 ? (
            <Text style={styles.emptyText}>No concerts found.</Text>
          ) : null}
        </View>

        {/* POPULAR ARTISTS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Artists</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.artistList}
          >
            {artists.map((artist) => (
              <Pressable
                key={artist.id}
                style={styles.artistItem}
                onPress={() =>
                  router.push({
                    pathname: "/artist",
                    params: { id: String(artist.id) },
                  })
                }
              >
                <Image
                  source={{ uri: artist.image_url || FALLBACK_AVATAR }}
                  style={styles.artistImage}
                />
                <Text style={styles.artistName} numberOfLines={2}>
                  {artist.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* BROWSE BY CITY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by City</Text>

          <View style={styles.cityContainer}>
            {cities.map((city) => (
              <Pressable
                key={city}
                style={styles.cityChip}
                onPress={() => setSearch(city)}
              >
                <Text style={styles.cityIcon}>⌖</Text>
                <Text style={styles.cityText}>{city}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* ABOUT NOCTURNE */}
        <View style={styles.aboutCard}>
          <View style={styles.aboutIcon}>
            <Text style={styles.aboutMusicIcon}>♫</Text>
          </View>

          <View style={styles.aboutContent}>
            <Text style={styles.aboutTitle}>About Nocturne</Text>
            <Text style={styles.aboutDescription}>
              A mobile-first way to find concerts across Indonesia, pick your
              ticket and walk in with a QR e-ticket on your phone.
            </Text>

            <Pressable onPress={() => router.push("/about")}>
              <Text style={styles.learnMore}>Learn more ›</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  scrollContent: { paddingTop: 12, paddingBottom: 30 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 14,
  },

  brand: { flexDirection: "row", alignItems: "center", gap: 10 },

  logo: {
    width: 32,
    height: 32,
    backgroundColor: COLORS.purple,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: { color: COLORS.white, fontSize: 17, fontWeight: "700" },

  brandName: { fontSize: 21, fontWeight: "700", color: COLORS.text },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E3C2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.purple,
  },

  greeting: { paddingHorizontal: 20, marginBottom: 17 },

  greetingTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -1,
  },

  subtitle: { fontSize: 15, color: COLORS.secondary, marginTop: 4 },

  searchBox: {
    height: 48,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAE5F0",
    elevation: 3,
    shadowColor: "#382443",
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },

  searchIcon: { fontSize: 25, color: COLORS.secondary, marginRight: 10 },

  searchInput: { flex: 1, fontSize: 14, color: COLORS.text },

  categoryScroll: { marginTop: 17, marginBottom: 28, paddingLeft: 20 },

  categoryButton: {
    paddingHorizontal: 17,
    height: 40,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#EAE5F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  categoryActive: {
    backgroundColor: COLORS.purple,
    borderColor: COLORS.purple,
  },

  categoryText: { fontSize: 13, fontWeight: "600", color: COLORS.text },

  categoryTextActive: { color: COLORS.white },

  featuredCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#291538",
    shadowOpacity: 0.1,
    shadowRadius: 14,
    marginBottom: 30,
  },

  featuredImage: {
    height: 435,
    justifyContent: "space-between",
    padding: 16,
  },

  featuredImageRadius: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  featuredOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(28, 5, 43, 0.32)",
  },

  featuredTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  featuredBadge: {
    backgroundColor: "rgba(61, 29, 83, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  featuredBadgeText: { color: COLORS.white, fontSize: 12, fontWeight: "600" },

  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(39, 13, 56, 0.75)",
    alignItems: "center",
    justifyContent: "center",
  },

  favoriteIcon: { color: COLORS.white, fontSize: 25 },

  featuredDate: {
    position: "absolute",
    top: 57,
    left: 16,
    backgroundColor: "#F4E9FF",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 5,
  },

  featuredDateText: {
    color: COLORS.purple,
    fontSize: 11,
    fontWeight: "800",
  },

  featuredInfo: { marginBottom: 2 },

  featuredTitle: {
    fontSize: 24,
    color: COLORS.white,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  featuredArtist: { fontSize: 13, color: COLORS.white, marginTop: 5 },

  featuredLocation: { fontSize: 11, color: "#D4C8DD", marginTop: 5 },

  ticketFooter: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  ticketDate: {
    fontSize: 11,
    color: COLORS.secondary,
    fontWeight: "700",
  },

  ticketPrice: {
    color: COLORS.text,
    fontWeight: "700",
    fontSize: 13,
    marginTop: 5,
  },

  ticketButton: {
    backgroundColor: COLORS.purple,
    paddingHorizontal: 23,
    paddingVertical: 16,
    borderRadius: 30,
  },

  ticketButtonText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
  },

  section: { marginBottom: 30 },

  sectionHeader: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 13,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: -0.5,
  },

  seeAll: { fontSize: 13, fontWeight: "600", color: "#841BFF" },

  concertList: { paddingLeft: 20, paddingRight: 20 },

  concertCard: { width: 152, marginRight: 12 },

  concertImage: { width: 152, height: 190, borderRadius: 15 },

  concertDateBadge: {
    position: "absolute",
    top: 9,
    left: 8,
    backgroundColor: "#F6ECFF",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  concertDateText: {
    fontSize: 10,
    fontWeight: "800",
    color: COLORS.purple,
  },

  concertTitle: {
    color: COLORS.text,
    fontWeight: "700",
    fontSize: 13,
    marginTop: 10,
  },

  concertArtist: { color: COLORS.secondary, fontSize: 12, marginTop: 4 },

  concertCity: { color: COLORS.secondary, fontSize: 12, marginTop: 2 },

  concertPrice: {
    color: COLORS.purple,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 6,
  },

  emptyText: { color: COLORS.secondary, paddingHorizontal: 20, marginTop: 10 },

  artistList: { paddingHorizontal: 20 },

  artistItem: { width: 82, alignItems: "center", marginRight: 12 },

  artistImage: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    borderColor: COLORS.white,
  },

  artistName: {
    color: COLORS.text,
    fontWeight: "600",
    fontSize: 11,
    textAlign: "center",
    marginTop: 9,
  },

  cityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    marginTop: 12,
    gap: 9,
  },

  cityChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.purpleLight,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  cityIcon: { fontSize: 17, color: COLORS.purple, marginRight: 7 },

  cityText: { color: COLORS.purple, fontSize: 13, fontWeight: "600" },

  aboutCard: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#F4EDFC",
    borderWidth: 1,
    borderColor: "#EAE1F3",
    flexDirection: "row",
    alignItems: "flex-start",
  },

  aboutIcon: {
    width: 37,
    height: 37,
    borderRadius: 20,
    backgroundColor: "#DDBBFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  aboutMusicIcon: { fontSize: 22, color: COLORS.purple },

  aboutContent: { flex: 1 },

  aboutTitle: { color: COLORS.text, fontSize: 17, fontWeight: "700" },

  aboutDescription: {
    color: COLORS.secondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },

  learnMore: { color: "#841BFF", fontSize: 13, fontWeight: "700", marginTop: 8 },
});
