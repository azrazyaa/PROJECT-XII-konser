import { apiGet } from "@/lib/api";
import { getWishlist, saveWishlist, WishlistItem } from "@/lib/storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  Share,
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
  green: "#DDF9E6",
  greenText: "#168442",
  yellow: "#FFF1C7",
  yellowText: "#AD6A00",
};

type TicketCategory = {
  id: number;
  name: string;
  price: number;
  quota: number;
  sold: number;
  is_locked: boolean;
};

type EventDetail = {
  id: number;
  title: string;
  description: string;
  venue: string;
  event_date: string;
  banner_url: string;
  artist_name: string;
  artist_genre: string;
  artist_image_url?: string;
  artist_id?: number;
  total_quota: number;
  is_closed: boolean;
  min_price?: number;
};

const FALLBACK =
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200";
const FALLBACK_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200";

const formatPrice = (n: number) => "Rp" + n.toLocaleString("id-ID");

function formatFullDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

function formatTimeWIB(d: string) {
  try {
    const date = new Date(d);
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    return `${h}:${m} WIB`;
  } catch {
    return "";
  }
}

export default function EventDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const eventId = params.id || "";

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [tickets, setTickets] = useState<TicketCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [inWishlist, setInWishlist] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const loadEvent = useCallback(async () => {
    if (!eventId) {
      setLoadError("Event ID is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setLoadError("");
    const [eventResult, ticketsResult, wishlistResult] =
      await Promise.allSettled([
        apiGet<EventDetail>(`/api/events/${eventId}`),
        apiGet<TicketCategory[]>(`/api/tickets?event_id=${eventId}`),
        getWishlist(),
      ]);

    if (eventResult.status === "fulfilled") {
      const evRes = eventResult.value;
      if (evRes.success && evRes.data) {
        setEvent(evRes.data);
      } else {
        setEvent(null);
        setLoadError(evRes.message || "Event not found.");
      }
    } else {
      console.error("EventDetail event error:", eventResult.reason);
      setEvent(null);
      setLoadError(
        eventResult.reason instanceof Error
          ? eventResult.reason.message
          : "Unable to load event."
      );
    }

    if (ticketsResult.status === "fulfilled") {
      const tcRes = ticketsResult.value;
      if (tcRes.success && Array.isArray(tcRes.data)) {
        setTickets(tcRes.data);
      }
    } else {
      console.error("EventDetail tickets error:", ticketsResult.reason);
    }

    if (wishlistResult.status === "fulfilled") {
      setInWishlist(wishlistResult.value.some((w) => w.id === eventId));
    } else {
      console.error("EventDetail wishlist error:", wishlistResult.reason);
    }

    setLoading(false);
  }, [eventId]);

  useEffect(() => {
    loadEvent();
  }, [loadEvent]);

  const toggleWishlist = async () => {
    if (!event) return;
    const wl = await getWishlist();
    let updated: WishlistItem[];
    if (inWishlist) {
      updated = wl.filter((w) => w.id !== eventId);
    } else {
      const item: WishlistItem = {
        id: eventId,
        title: event.title,
        artist: event.artist_name,
        date: formatFullDate(event.event_date),
        venue: event.venue,
        price: tickets[0]?.price || 0,
        image: event.banner_url || FALLBACK,
        category: event.artist_genre || "Music",
        savedAt: Date.now(),
      };
      updated = [item, ...wl];
    }
    await saveWishlist(updated);
    setInWishlist(!inWishlist);
  };

  const handleShare = async () => {
    if (!event) return;
    try {
      await Share.share({
        message: `Check out ${event.title} by ${event.artist_name} at Nocturne!`,
      });
    } catch {}
  };

  const handleMaps = () => {
    if (!event) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue)}`;
    Linking.openURL(url);
  };

  const handleTickets = () => {
    router.push({
      pathname: "/select-tickets",
      params: { id: eventId },
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={C.purple} />
      </View>
    );
  }

  if (!event) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: C.muted, textAlign: "center", paddingHorizontal: 24 }}>
          {loadError || "Event not found."}
        </Text>
        <Pressable onPress={loadEvent} style={{ marginTop: 16 }}>
          <Text style={{ color: C.accent, fontWeight: "700" }}>Try again</Text>
        </Pressable>
        <Pressable onPress={() => router.back()} style={{ marginTop: 16 }}>
          <Text style={{ color: C.accent, fontWeight: "700" }}>← Go back</Text>
        </Pressable>
      </View>
    );
  }

  const minPrice = tickets.length
    ? Math.min(...tickets.map((t) => t.price))
    : event.min_price || 0;

  const galleryImages = [event.banner_url || FALLBACK];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO */}
        <ImageBackground source={{ uri: event.banner_url || FALLBACK }} style={styles.hero}>
          <View style={styles.heroOverlay} />
          <View style={styles.heroActions}>
            <Pressable onPress={() => router.back()} style={styles.heroButton}>
              <Text style={styles.heroButtonText}>‹</Text>
            </Pressable>
            <View style={styles.heroRight}>
              <Pressable onPress={handleShare} style={styles.heroButton}>
                <Text style={styles.heroButtonText}>↗</Text>
              </Pressable>
              <Pressable onPress={toggleWishlist} style={styles.heroButton}>
                <Text style={styles.heroButtonText}>{inWishlist ? "♥" : "♡"}</Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>

        {/* CONTENT */}
        <View style={styles.content}>
          {/* BADGES */}
          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{event.artist_genre || "Music"}</Text>
            </View>
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>Featured</Text>
            </View>
            {!event.is_closed && (
              <View style={styles.saleBadge}>
                <Text style={styles.saleBadgeText}>▣ On sale</Text>
              </View>
            )}
          </View>

          <Text style={styles.eventTitle}>{event.title}</Text>

          {/* ARTIST ROW */}
          <Pressable
            style={styles.artistRow}
            onPress={() =>
              event.artist_id &&
              router.push({
                pathname: "/artist",
                params: { id: String(event.artist_id) },
              })
            }
          >
            <Image
              source={{ uri: event.artist_image_url || FALLBACK_AVATAR }}
              style={styles.artistAvatar}
            />
            <Text style={styles.artistName}>{event.artist_name}</Text>
            <Text style={styles.artistArrow}>›</Text>
          </Pressable>

          {/* INFO CARD */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>▦</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>DATE</Text>
                <Text style={styles.infoValue}>{formatFullDate(event.event_date)}</Text>
              </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>◷</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>TIME</Text>
                <Text style={styles.infoValue}>{formatTimeWIB(event.event_date)}</Text>
                <Text style={styles.infoDescription}>Gates open 1 hour before</Text>
              </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>⌖</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>VENUE</Text>
                <Text style={styles.infoValue}>{event.venue}</Text>
                <Pressable onPress={handleMaps}>
                  <Text style={styles.mapsLink}>Open in Maps ↗</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>♙</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>AGE RULE</Text>
                <Text style={styles.ageText}>
                  All ages. Under 12 must be accompanied by a parent.
                </Text>
              </View>
            </View>
          </View>

          {/* TICKETS */}
          <Text style={styles.sectionTitle}>Tickets</Text>
          <View style={styles.ticketCard}>
            {tickets.length === 0 ? (
              <Text style={{ color: C.muted, padding: 12, textAlign: "center" }}>
                No ticket categories available.
              </Text>
            ) : (
              tickets.map((ticket, index) => {
                const avail = ticket.quota - ticket.sold;
                const statusLabel =
                  avail <= 20 ? "Selling fast" : "Available";
                return (
                  <View key={ticket.id}>
                    <View style={styles.ticketRow}>
                      <View style={styles.ticketDescription}>
                        <Text style={styles.ticketName}>{ticket.name}</Text>
                        <Text style={styles.ticketSubtext}>
                          {avail} remaining
                        </Text>
                      </View>
                      <View style={styles.ticketPriceContainer}>
                        <Text style={styles.ticketPrice}>
                          {formatPrice(ticket.price)}
                        </Text>
                        <View
                          style={[
                            styles.statusBadge,
                            statusLabel === "Selling fast"
                              ? styles.sellingBadge
                              : styles.availableBadge,
                          ]}
                        >
                          <Text
                            style={[
                              styles.statusText,
                              statusLabel === "Selling fast"
                                ? styles.sellingText
                                : styles.availableText,
                            ]}
                          >
                            {statusLabel}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {index !== tickets.length - 1 && (
                      <View style={styles.separator} />
                    )}
                  </View>
                );
              })
            )}
          </View>

          {/* ABOUT EVENT */}
          <View style={styles.aboutSection}>
            <Text style={styles.sectionTitle}>About this event</Text>
            <Text
              style={styles.aboutDescription}
              numberOfLines={expanded ? undefined : 4}
            >
              {event.description || "No description provided."}
            </Text>
            <Pressable onPress={() => setExpanded(!expanded)}>
              <Text style={styles.readMore}>
                {expanded ? "Read less ⌃" : "Read more ⌄"}
              </Text>
            </Pressable>
          </View>

          {/* GALLERY */}
          <View style={styles.gallerySection}>
            <Text style={styles.sectionTitle}>Gallery</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.galleryList}
            >
              {galleryImages.map((img, i) => (
                <Image key={i} source={{ uri: img }} style={styles.galleryImage} />
              ))}
            </ScrollView>
          </View>

          {/* GOOD TO KNOW */}
          <View style={styles.goodSection}>
            <Text style={styles.sectionTitle}>Good to know</Text>
            <View style={styles.goodCard}>
              {[
                "Bring a valid ID that matches the ticket holder name.",
                "No re-entry once you leave the venue.",
                "Outside food, drinks and professional cameras are not allowed.",
              ].map((tip, i) => (
                <View key={i} style={styles.goodRow}>
                  <Text style={styles.goodIcon}>ⓘ</Text>
                  <Text style={styles.goodText}>{tip}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* FIXED BOTTOM */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPriceContainer}>
          <Text style={styles.bottomLabel}>FROM</Text>
          <Text style={styles.bottomPrice}>
            {minPrice ? formatPrice(minPrice) : "See prices"}
          </Text>
        </View>
        <Pressable
          style={[styles.selectButton, event.is_closed && { opacity: 0.5 }]}
          onPress={handleTickets}
          disabled={event.is_closed}
        >
          <Text style={styles.selectButtonText}>
            {event.is_closed ? "Sold Out" : "Select Tickets"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  scrollContent: { paddingBottom: 15 },
  hero: { height: 245, width: "100%", justifyContent: "flex-start" },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(25, 5, 38, 0.12)",
  },
  heroActions: {
    paddingTop: 49,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroRight: { flexDirection: "row", gap: 10 },
  heroButton: {
    width: 42,
    height: 42,
    borderRadius: 22,
    backgroundColor: "rgba(35, 12, 49, 0.65)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroButtonText: { color: C.white, fontSize: 25, fontWeight: "500" },
  content: { paddingHorizontal: 20, paddingTop: 15 },
  badges: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 11 },
  badge: { backgroundColor: C.light, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  badgeText: { color: C.purple, fontSize: 10, fontWeight: "600" },
  featuredBadge: { backgroundColor: C.purple, paddingHorizontal: 13, paddingVertical: 6, borderRadius: 20 },
  featuredBadgeText: { color: C.white, fontSize: 10, fontWeight: "700" },
  saleBadge: { backgroundColor: C.light, paddingHorizontal: 11, paddingVertical: 6, borderRadius: 20 },
  saleBadgeText: { color: C.purple, fontSize: 10, fontWeight: "600" },
  eventTitle: { color: C.text, fontSize: 24, fontWeight: "800", letterSpacing: -0.7 },
  artistRow: { flexDirection: "row", alignItems: "center", marginTop: 12, marginBottom: 19 },
  artistAvatar: { width: 34, height: 34, borderRadius: 18, borderWidth: 2, borderColor: C.white },
  artistName: { color: C.accent, fontSize: 14, fontWeight: "700", marginLeft: 11 },
  artistArrow: { color: C.accent, fontSize: 24, marginLeft: 12 },
  infoCard: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 29,
  },
  infoRow: { flexDirection: "row", alignItems: "flex-start", paddingVertical: 15, gap: 12 },
  infoIcon: {
    width: 37,
    height: 37,
    borderRadius: 20,
    backgroundColor: C.light,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  infoIconText: { color: C.purple, fontSize: 19, fontWeight: "600" },
  infoContent: { flex: 1 },
  infoLabel: { color: C.muted, fontSize: 11, fontWeight: "600", letterSpacing: 0.6 },
  infoValue: { color: C.text, fontSize: 14, fontWeight: "600", marginTop: 5 },
  infoDescription: { color: C.muted, fontSize: 12, lineHeight: 18, marginTop: 6 },
  mapsLink: { color: C.accent, fontSize: 12, fontWeight: "700", marginTop: 9 },
  ageText: { color: C.text, fontSize: 13, lineHeight: 19, marginTop: 5 },
  separator: { height: 1, backgroundColor: C.border },
  sectionTitle: { color: C.text, fontSize: 20, fontWeight: "800", letterSpacing: -0.4, marginBottom: 13 },
  ticketCard: { backgroundColor: C.white, borderRadius: 19, borderWidth: 1, borderColor: C.border, paddingHorizontal: 16, marginBottom: 29 },
  ticketRow: { flexDirection: "row", alignItems: "flex-start", paddingVertical: 16, gap: 8 },
  ticketDescription: { flex: 1 },
  ticketName: { color: C.text, fontSize: 13, fontWeight: "700", lineHeight: 19 },
  ticketSubtext: { color: C.muted, fontSize: 12, lineHeight: 18, marginTop: 4 },
  ticketPriceContainer: { alignItems: "flex-end", minWidth: 105 },
  ticketPrice: { color: C.purple, fontSize: 14, fontWeight: "800" },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, marginTop: 6 },
  availableBadge: { backgroundColor: C.green },
  sellingBadge: { backgroundColor: C.yellow },
  statusText: { fontSize: 10, fontWeight: "700" },
  availableText: { color: C.greenText },
  sellingText: { color: C.yellowText },
  aboutSection: { marginBottom: 30 },
  aboutDescription: { color: C.muted, fontSize: 14, lineHeight: 23 },
  readMore: { color: C.accent, fontSize: 13, fontWeight: "700", marginTop: 5 },
  gallerySection: { marginHorizontal: -20, marginBottom: 32 },
  galleryList: { paddingHorizontal: 20, gap: 12 },
  galleryImage: { width: 200, height: 150, borderRadius: 15, backgroundColor: C.light },
  goodSection: { marginBottom: 13 },
  goodCard: { backgroundColor: C.white, borderWidth: 1, borderColor: C.border, borderRadius: 20, padding: 16, gap: 13 },
  goodRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  goodIcon: { color: C.accent, fontSize: 16, fontWeight: "600" },
  goodText: { color: C.muted, fontSize: 12, lineHeight: 19, flex: 1 },
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
  bottomPriceContainer: { flex: 1 },
  bottomLabel: { color: C.muted, fontSize: 10, fontWeight: "700" },
  bottomPrice: { color: C.text, fontSize: 18, fontWeight: "900" },
  selectButton: {
    backgroundColor: C.purple,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
  },
  selectButtonText: { color: C.white, fontWeight: "800", fontSize: 14 },
});
