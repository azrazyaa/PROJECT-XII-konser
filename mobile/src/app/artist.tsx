import { apiGet } from "@/lib/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
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

type ArtistConcert = {
  id: number;
  title: string;
  venue: string;
  event_date: string;
  banner_url: string;
  min_price?: number;
};

type ArtistDetail = {
  id: number;
  name: string;
  genre: string;
  image_url?: string;
  concerts?: ArtistConcert[];
};

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1000";
const FALLBACK_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400";

const formatPrice = (p?: number) =>
  p ? "Rp" + p.toLocaleString("id-ID") : "See prices";

function formatDate(d: string) {
  try {
    return (
      new Date(d).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );
  } catch {
    return d;
  }
}

export default function ArtistScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const artistId = params.id || "1";

  const [artist, setArtist] = useState<ArtistDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGet<ArtistDetail>(`/api/artists/${artistId}`);
        if (res.success && res.data) {
          setArtist(res.data);
        }
      } catch (err) {
        console.error("ArtistScreen load error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [artistId]);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={COLORS.purple} />
      </View>
    );
  }

  const name = artist?.name || "Artist";
  const genre = artist?.genre || "Music";
  const avatar = artist?.image_url || FALLBACK_AVATAR;
  const concerts = artist?.concerts || [];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* COVER IMAGE */}
        <ImageBackground
          source={{ uri: FALLBACK_COVER }}
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
            <Image source={{ uri: avatar }} style={styles.avatar} />

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

          <Text style={styles.artistName}>{name}</Text>
          <Text style={styles.artistMeta}>{genre} · Indonesia</Text>

          {/* BIO */}
          <Text style={styles.aboutText}>
            {name} is an active recording and touring artist on the Nocturne concert platform. Discover upcoming tour dates, tickets, and live shows below.
          </Text>
        </View>

        {/* UPCOMING SHOWS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Shows</Text>

          {concerts.length === 0 ? (
            <Text style={styles.emptyText}>No upcoming shows scheduled.</Text>
          ) : (
            concerts.map((concert) => (
              <Pressable
                key={concert.id}
                style={styles.concertCard}
                onPress={() =>
                  router.push({
                    pathname: "/event-detail",
                    params: { id: String(concert.id) },
                  })
                }
              >
                <Image
                  source={{ uri: concert.banner_url || FALLBACK_COVER }}
                  style={styles.concertImage}
                />

                <View style={styles.concertInfo}>
                  <Text style={styles.concertTitle} numberOfLines={1}>
                    {concert.title}
                  </Text>
                  <Text style={styles.concertDate}>
                    {formatDate(concert.event_date)}
                  </Text>
                  <Text style={styles.concertVenue}>{concert.venue}</Text>
                  <Text style={styles.concertPrice}>
                    From {formatPrice(concert.min_price)}
                  </Text>
                </View>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingBottom: 40 },
  coverImage: {
    height: 220,
    width: "100%",
    justifyContent: "flex-start",
  },
  coverOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(33, 11, 53, 0.4)",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 48,
    marginLeft: 16,
  },
  backIcon: { color: COLORS.white, fontSize: 28, lineHeight: 32 },
  profileSection: {
    paddingHorizontal: 20,
    marginTop: -40,
    marginBottom: 26,
  },
  profileTop: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
  },
  followButton: {
    backgroundColor: COLORS.purple,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  followingButton: {
    backgroundColor: COLORS.lightPurple,
  },
  followButtonText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 13,
  },
  followingButtonText: {
    color: COLORS.purple,
  },
  artistName: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  artistMeta: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 4,
  },
  aboutText: {
    fontSize: 13,
    color: COLORS.muted,
    lineHeight: 20,
    marginTop: 12,
  },
  section: { paddingHorizontal: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 14,
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 13,
    fontStyle: "italic",
  },
  concertCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
    flexDirection: "row",
    marginBottom: 12,
  },
  concertImage: { width: 100, height: 100 },
  concertInfo: { flex: 1, padding: 12 },
  concertTitle: { fontSize: 14, fontWeight: "800", color: COLORS.text },
  concertDate: { fontSize: 12, color: COLORS.muted, marginTop: 4 },
  concertVenue: { fontSize: 11, color: COLORS.muted, marginTop: 2 },
  concertPrice: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.purple,
    marginTop: 6,
  },
});
