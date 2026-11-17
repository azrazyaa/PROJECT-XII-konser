import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageBackground,
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

const artist = {
  name: "Aurora Lestari",
  genre: "Pop",
  location: "Jakarta",
  followers: "1.2M followers",
  cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1000",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
  about:
    "Aurora Lestari writes pop songs about the city at night — the long drive home, the last song before the lights come up, the friends you keep finding again. Since her debut single in 2019 she has become one of the most streamed voices in Indonesia.\n\nHer live shows are built around a single idea: a warm wash of violet light, a full band and a crowd that knows every word. Neon Skyline World Tour is her biggest production yet, travelling from Jakarta to Surabaya with an entirely new stage design.",
};

const concerts = [
  {
    id: "1",
    category: "Pop",
    title: "Neon Skyline World Tour",
    artist: "Aurora Lestari",
    date: "Sat, 21 Nov 2026 · 19:30 WIB",
    venue: "Istora Senayan, Jakarta",
    price: "Rp850.000",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500",
  },
  {
    id: "9",
    category: "Festival",
    title: "Pulau Cahaya Fest",
    artist: "Various Artists",
    date: "Sun, 7 Feb 2027 · 15:00 WIB",
    venue: "Lapangan Puputan, Denpasar",
    price: "Rp600.000",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500",
  },
];

const fans = [
  {
    name: "Jakarta Jazz Collective",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
  },
  {
    name: "Monokrom",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300",
  },
  {
    name: "Raka & The Hollow...",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
  },
  {
    name: "Kirana Ayu",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300",
  },
];

export default function ArtistScreen() {
  const router = useRouter();

  const [following, setFollowing] = useState(true);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (id: string) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#210B35"
        translucent
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* COVER IMAGE */}
        <ImageBackground
          source={{ uri: artist.cover }}
          style={styles.coverImage}
          resizeMode="cover"
        >
          <View style={styles.coverOverlay} />

          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
        </ImageBackground>

        {/* ARTIST PROFILE */}
        <View style={styles.profileSection}>
          <View style={styles.profileTop}>
            <Image source={{ uri: artist.avatar }} style={styles.avatar} />

            <Pressable
              style={[styles.followButton, following && styles.followingButton]}
              onPress={() => setFollowing(!following)}
            >
              <Text
                style={[
                  styles.followButtonText,
                  following && styles.followingButtonText,
                ]}
              >
                {following ? "Following" : "Follow +"}
              </Text>
            </Pressable>
          </View>

          <Text style={styles.artistName}>{artist.name}</Text>

          <Text style={styles.artistMeta}>
            {artist.genre} · {artist.location}
          </Text>

          <Text style={styles.followers}>{artist.followers}</Text>
        </View>

        {/* ABOUT */}
        <View style={styles.aboutCard}>
          <Text style={styles.sectionTitle}>About</Text>

          <Text style={styles.aboutText}>{artist.about}</Text>
        </View>

        {/* UPCOMING CONCERTS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Concerts</Text>

          {concerts.map((concert) => (
            <View key={concert.id} style={styles.concertCard}>
              <Image
                source={{ uri: concert.image }}
                style={styles.concertImage}
              />

              <View style={styles.concertContent}>
                <View style={styles.concertTop}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{concert.category}</Text>
                  </View>

                  <Pressable
                    style={styles.heartButton}
                    onPress={() => toggleWishlist(concert.id)}
                  >
                    <Text
                      style={[
                        styles.heartIcon,
                        wishlist.includes(concert.id) && styles.heartActive,
                      ]}
                    >
                      {wishlist.includes(concert.id) ? "♥" : "♡"}
                    </Text>
                  </Pressable>
                </View>

                <Text style={styles.concertTitle} numberOfLines={2}>
                  {concert.title}
                </Text>

                <Text style={styles.concertArtist}>{concert.artist}</Text>

                <Text style={styles.concertDate}>{concert.date}</Text>

                <Text style={styles.concertVenue}>{concert.venue}</Text>

                <View style={styles.concertFooter}>
                  <Text style={styles.price}>From {concert.price}</Text>

                  <Pressable
                    style={styles.detailsButton}
                    onPress={() =>
                      router.push({
                        pathname: "/event-detail",
                        params: { id: concert.id },
                      })
                    }
                  >
                    <Text style={styles.detailsText}>Details</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* FANS ALSO LIKE */}
        <View style={styles.fansSection}>
          <Text style={styles.sectionTitle}>Fans also like</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.fansList}
          >
            {fans.map((fan, index) => (
              <Pressable
                key={index}
                style={styles.fanItem}
                onPress={() =>
                  router.push({
                    pathname: "/artist",
                  })
                }
              >
                <Image source={{ uri: fan.image }} style={styles.fanImage} />

                <Text style={styles.fanName} numberOfLines={2}>
                  {fan.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingBottom: 35,
  },

  coverImage: {
    height: 220,
    width: "100%",
    backgroundColor: COLORS.purple,
  },

  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(35, 8, 54, 0.12)",
  },

  backButton: {
    position: "absolute",
    top: 48,
    left: 16,
    width: 42,
    height: 42,
    borderRadius: 25,
    backgroundColor: "rgba(43, 17, 64, 0.75)",
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    color: COLORS.white,
    fontSize: 34,
    lineHeight: 38,
    marginTop: -5,
  },

  profileSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },

  profileTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: -44,
    marginBottom: 12,
  },

  avatar: {
    width: 104,
    height: 104,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: COLORS.white,
    backgroundColor: COLORS.lightPurple,
  },

  followButton: {
    backgroundColor: COLORS.purple,
    borderRadius: 25,
    paddingHorizontal: 19,
    paddingVertical: 12,
    marginBottom: 7,
  },

  followingButton: {
    backgroundColor: COLORS.lightPurple,
  },

  followButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "700",
  },

  followingButtonText: {
    color: COLORS.purple,
  },

  artistName: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 5,
  },

  artistMeta: {
    color: COLORS.muted,
    fontSize: 13,
    marginBottom: 8,
  },

  followers: {
    color: COLORS.purple,
    fontSize: 13,
    fontWeight: "800",
  },

  aboutCard: {
    backgroundColor: COLORS.white,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: 20,
    padding: 16,
    marginBottom: 29,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: "900",
    marginBottom: 10,
  },

  aboutText: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 22,
  },

  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },

  concertCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    flexDirection: "row",
    gap: 12,
    marginTop: 2,
    marginBottom: 12,
    shadowColor: "#301741",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },

  concertImage: {
    width: 90,
    height: 120,
    borderRadius: 14,
    backgroundColor: COLORS.lightPurple,
  },

  concertContent: {
    flex: 1,
    minWidth: 0,
  },

  concertTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 7,
  },

  categoryBadge: {
    backgroundColor: COLORS.lightPurple,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  categoryText: {
    color: COLORS.purple,
    fontSize: 11,
    fontWeight: "700",
  },

  heartButton: {
    width: 36,
    height: 36,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  heartIcon: {
    fontSize: 24,
    color: COLORS.purple,
    lineHeight: 28,
  },

  heartActive: {
    color: COLORS.accent,
  },

  concertTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 3,
  },

  concertArtist: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 7,
  },

  concertDate: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 17,
  },

  concertVenue: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 17,
  },

  concertFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 9,
    gap: 5,
  },

  price: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
    flexShrink: 1,
  },

  detailsButton: {
    backgroundColor: COLORS.lightPurple,
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },

  detailsText: {
    color: COLORS.purple,
    fontSize: 11,
    fontWeight: "700",
  },

  fansSection: {
    marginBottom: 10,
  },

  fansList: {
    paddingHorizontal: 20,
    gap: 17,
  },

  fanItem: {
    width: 75,
    alignItems: "center",
  },

  fanImage: {
    width: 62,
    height: 62,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: COLORS.white,
    marginBottom: 8,
    backgroundColor: COLORS.lightPurple,
  },

  fanName: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 15,
  },
});
