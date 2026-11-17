import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
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

const initialWishlist = [
  {
    id: "2",
    category: "Jazz",
    title: "Jazz Malam Selatan",
    artist: "Jakarta Jazz Collective",
    date: "Sat, 28 Nov 2026 · 19:00 WIB",
    venue: "Aula Simfonia, Jakarta",
    price: 500000,
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500",
    savedAt: 2,
  },
  {
    id: "9",
    category: "Festival",
    title: "Pulau Cahaya Fest",
    artist: "Various Artists",
    date: "Sun, 7 Feb 2027 · 15:00 WIB",
    venue: "Lapangan Puputan, Denpasar",
    price: 600000,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500",
    savedAt: 1,
  },
];

export default function WishlistScreen() {
  const router = useRouter();

  const [wishlist, setWishlist] = useState(initialWishlist);
  const [activeTab, setActiveTab] = useState<"soonest" | "recent">("soonest");

  const sortedWishlist = useMemo(() => {
    const items = [...wishlist];

    if (activeTab === "recent") {
      return items.sort((a, b) => b.savedAt - a.savedAt);
    }

    return items.sort((a, b) => a.id.localeCompare(b.id));
  }, [wishlist, activeTab]);

  const removeFromWishlist = (id: string) => {
    setWishlist((current) => current.filter((item) => item.id !== id));
  };

  const formatPrice = (price: number) => {
    return "Rp" + price.toLocaleString("id-ID");
  };

  const openEvent = (id: string) => {
    router.push({
      pathname: "/event-detail",
      params: { id },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>N</Text>
          </View>

          <Text style={styles.headerTitle}>Wishlist</Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.countHeart}>♥</Text>
          <Text style={styles.countText}>{wishlist.length}</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* SORT TABS */}
        <View style={styles.tabs}>
          <Pressable
            onPress={() => setActiveTab("soonest")}
            style={[styles.tab, activeTab === "soonest" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "soonest" && styles.activeTabText,
              ]}
            >
              Soonest
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab("recent")}
            style={[styles.tab, activeTab === "recent" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "recent" && styles.activeTabText,
              ]}
            >
              Recently saved
            </Text>
          </Pressable>
        </View>

        {/* WISHLIST CARDS */}
        {sortedWishlist.length > 0 ? (
          sortedWishlist.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <View style={styles.eventTop}>
                <Image
                  source={{ uri: event.image }}
                  style={styles.eventImage}
                />

                <View style={styles.eventInfo}>
                  <View style={styles.eventInfoTop}>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>{event.category}</Text>
                    </View>

                    <Pressable
                      style={styles.heartButton}
                      onPress={() => removeFromWishlist(event.id)}
                    >
                      <Text style={styles.heartIcon}>♥</Text>
                    </Pressable>
                  </View>

                  <Text style={styles.eventTitle}>{event.title}</Text>

                  <Text style={styles.artistName}>{event.artist}</Text>

                  <Text style={styles.eventDate}>{event.date}</Text>

                  <Text style={styles.eventVenue}>{event.venue}</Text>
                </View>
              </View>

              <View style={styles.cardDivider} />

              {/* PRICE AND BUTTON */}
              <View style={styles.eventFooter}>
                <Text style={styles.price}>
                  From {formatPrice(event.price)}
                </Text>

                <Pressable
                  style={styles.ticketButton}
                  onPress={() => openEvent(event.id)}
                >
                  <Text style={styles.ticketButtonText}>Get Tickets</Text>
                </Pressable>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyHeart}>♡</Text>

            <Text style={styles.emptyTitle}>Your wishlist is empty</Text>

            <Text style={styles.emptyDescription}>
              Save your favorite concerts and find them here later.
            </Text>

            <Pressable
              style={styles.exploreButton}
              onPress={() => router.push("/explore")}
            >
              <Text style={styles.exploreButtonText}>Explore Concerts</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },

  logo: {
    width: 33,
    height: 33,
    borderRadius: 10,
    backgroundColor: COLORS.purple,
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: "900",
  },

  headerTitle: {
    fontSize: 21,
    fontWeight: "900",
    color: COLORS.text,
  },

  countBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: COLORS.lightPurple,
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 22,
  },

  countHeart: {
    color: COLORS.purple,
    fontSize: 14,
  },

  countText: {
    color: COLORS.purple,
    fontSize: 13,
    fontWeight: "800",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  tabs: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },

  tab: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  activeTab: {
    backgroundColor: COLORS.purple,
  },

  tabText: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "700",
  },

  activeTabText: {
    color: COLORS.white,
  },

  eventCard: {
    backgroundColor: COLORS.white,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 13,
    shadowColor: "#301741",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },

  eventTop: {
    flexDirection: "row",
    gap: 12,
  },

  eventImage: {
    width: 90,
    height: 120,
    borderRadius: 13,
    backgroundColor: COLORS.lightPurple,
  },

  eventInfo: {
    flex: 1,
    minWidth: 0,
  },

  eventInfoTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  categoryBadge: {
    backgroundColor: "#F5ECFC",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  categoryText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.purple,
  },

  heartButton: {
    width: 36,
    height: 36,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
  },

  heartIcon: {
    color: COLORS.accent,
    fontSize: 21,
  },

  eventTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 3,
  },

  artistName: {
    color: COLORS.muted,
    fontSize: 12,
    marginBottom: 6,
  },

  eventDate: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 18,
  },

  eventVenue: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 18,
  },

  cardDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },

  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: "800",
  },

  ticketButton: {
    backgroundColor: COLORS.purple,
    borderRadius: 24,
    paddingHorizontal: 17,
    paddingVertical: 11,
  },

  ticketButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 75,
  },

  emptyHeart: {
    fontSize: 55,
    color: COLORS.accent,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 8,
  },

  emptyDescription: {
    color: COLORS.muted,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },

  exploreButton: {
    backgroundColor: COLORS.purple,
    borderRadius: 25,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },

  exploreButtonText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 13,
  },
});
