import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  StatusBar,
  Share,
  Linking,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

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

const eventData = {
  "1": {
    title: "Neon Skyline World Tour",
    artist: "Aurora Lestari",
    category: "Pop",
    date: "Sat, 21 Nov 2026",
    dateShort: "21 NOV",
    time: "19:30 WIB",
    gates: "Gates open 18:00 WIB",
    venue: "Istora Senayan, Jakarta",
    address: "Jl. Pintu Satu Senayan, Gelora, Jakarta Pusat 10270",
    age: "All ages. Under 12 must be accompanied by a parent.",
    price: 850000,
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200",
    description:
      "Neon Skyline is Aurora Lestari at her biggest: a full arena production with a moving light rig, a nine piece band and a set that runs from the 2019 debut through every single she has released since.",
    gallery: [
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=700",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=700",
    ],
  },
  "2": {
    title: "Jazz Malam Selatan",
    artist: "Jakarta Jazz Collective",
    category: "Jazz",
    date: "Sat, 28 Nov 2026",
    dateShort: "28 NOV",
    time: "19:00 WIB",
    gates: "Gates open 18:00 WIB",
    venue: "Aula Simfonia, Jakarta",
    address: "Jakarta, Indonesia",
    age: "All ages. Children must be accompanied by an adult.",
    price: 500000,
    image:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=1200",
    description:
      "Experience an unforgettable evening of live jazz, soulful improvisation and beautiful performances by Jakarta Jazz Collective.",
    gallery: [
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=700",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=700",
    ],
  },
  "3": {
    title: "Suara Beton",
    artist: "Monokrom",
    category: "Rock",
    date: "Sun, 29 Nov 2026",
    dateShort: "29 NOV",
    time: "19:00 WIB",
    gates: "Gates open 18:00 WIB",
    venue: "Eldorado Dome, Bandung",
    address: "Bandung, Jawa Barat, Indonesia",
    age: "All ages. Under 12 must be accompanied by a parent.",
    price: 300000,
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200",
    description:
      "Monokrom brings an explosive rock performance with powerful guitar riffs, unforgettable songs and a spectacular live stage.",
    gallery: [
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=700",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=700",
    ],
  },
};

const defaultEvent = eventData["1"];

const tickets = [
  {
    id: "festival",
    name: "Festival (standing)",
    description: "Standing area with full view of the stage and main screen",
    price: 850000,
    status: "Available",
  },
  {
    id: "tribune",
    name: "Tribune (numbered seat)",
    description: "Reserved seat in the lower tier, clear sightline",
    price: 1250000,
    status: "Available",
  },
  {
    id: "vip",
    name: "VIP A (front stage, early entry, merch pack)",
    description: "Front stage zone, early entry and an exclusive merch pack",
    price: 2500000,
    status: "Selling fast",
  },
];

const formatPrice = (price: number) => "Rp" + price.toLocaleString("id-ID");

export default function EventDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();

  const event =
    (params.id && eventData[params.id as keyof typeof eventData]) ||
    defaultEvent;

  const [favorite, setFavorite] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${event.title} by ${event.artist} at Nocturne!`,
      });
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  const handleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue)}`;
    Linking.openURL(url);
  };

  const handleTickets = () => {
    router.push({
      pathname: "/select-tickets",
      params: { id: params.id || "1" },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO IMAGE */}
        <ImageBackground source={{ uri: event.image }} style={styles.hero}>
          <View style={styles.heroOverlay} />

          <View style={styles.heroActions}>
            <Pressable onPress={() => router.back()} style={styles.heroButton}>
              <Text style={styles.heroButtonText}>‹</Text>
            </Pressable>

            <View style={styles.heroRight}>
              <Pressable onPress={handleShare} style={styles.heroButton}>
                <Text style={styles.heroButtonText}>↗</Text>
              </Pressable>

              <Pressable
                onPress={() => setFavorite(!favorite)}
                style={styles.heroButton}
              >
                <Text style={styles.heroButtonText}>
                  {favorite ? "♥" : "♡"}
                </Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>

        {/* EVENT CONTENT */}
        <View style={styles.content}>
          {/* BADGES */}
          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{event.category}</Text>
            </View>

            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>Featured</Text>
            </View>

            <View style={styles.saleBadge}>
              <Text style={styles.saleBadgeText}>▣ On sale</Text>
            </View>
          </View>

          {/* TITLE */}
          <Text style={styles.eventTitle}>{event.title}</Text>

          {/* ARTIST */}
          <Pressable
            style={styles.artistRow}
            onPress={() => router.push("/artist")}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
              }}
              style={styles.artistAvatar}
            />

            <Text style={styles.artistName}>{event.artist}</Text>
            <Text style={styles.artistArrow}>›</Text>
          </Pressable>

          {/* EVENT INFORMATION */}
          <View style={styles.infoCard}>
            {/* DATE */}
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>▦</Text>
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>DATE</Text>
                <Text style={styles.infoValue}>{event.date}</Text>
              </View>
            </View>

            <View style={styles.separator} />

            {/* TIME */}
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>◷</Text>
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>TIME</Text>
                <Text style={styles.infoValue}>{event.time}</Text>
                <Text style={styles.infoDescription}>{event.gates}</Text>
              </View>
            </View>

            <View style={styles.separator} />

            {/* VENUE */}
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>⌖</Text>
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>VENUE</Text>
                <Text style={styles.infoValue}>{event.venue}</Text>
                <Text style={styles.infoDescription}>{event.address}</Text>

                <Pressable onPress={handleMaps}>
                  <Text style={styles.mapsLink}>Open in Maps ↗</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.separator} />

            {/* AGE RULE */}
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>♙</Text>
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>AGE RULE</Text>
                <Text style={styles.ageText}>{event.age}</Text>
              </View>
            </View>
          </View>

          {/* TICKETS */}
          <Text style={styles.sectionTitle}>Tickets</Text>

          <View style={styles.ticketCard}>
            {tickets.map((ticket, index) => (
              <View key={ticket.id}>
                <View style={styles.ticketRow}>
                  <View style={styles.ticketDescription}>
                    <Text style={styles.ticketName}>{ticket.name}</Text>
                    <Text style={styles.ticketSubtext}>
                      {ticket.description}
                    </Text>
                  </View>

                  <View style={styles.ticketPriceContainer}>
                    <Text style={styles.ticketPrice}>
                      {formatPrice(index === 0 ? event.price : ticket.price)}
                    </Text>

                    <View
                      style={[
                        styles.statusBadge,
                        ticket.status === "Selling fast"
                          ? styles.sellingBadge
                          : styles.availableBadge,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          ticket.status === "Selling fast"
                            ? styles.sellingText
                            : styles.availableText,
                        ]}
                      >
                        {ticket.status}
                      </Text>
                    </View>
                  </View>
                </View>

                {index !== tickets.length - 1 && (
                  <View style={styles.separator} />
                )}
              </View>
            ))}
          </View>

          {/* ABOUT EVENT */}
          <View style={styles.aboutSection}>
            <Text style={styles.sectionTitle}>About this event</Text>

            <Text
              style={styles.aboutDescription}
              numberOfLines={expanded ? undefined : 4}
            >
              {event.description}
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
              {event.gallery.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.galleryImage}
                />
              ))}
            </ScrollView>
          </View>

          {/* GOOD TO KNOW */}
          <View style={styles.goodSection}>
            <Text style={styles.sectionTitle}>Good to know</Text>

            <View style={styles.goodCard}>
              <View style={styles.goodRow}>
                <Text style={styles.goodIcon}>ⓘ</Text>
                <Text style={styles.goodText}>
                  Bring a valid ID that matches the ticket holder name.
                </Text>
              </View>

              <View style={styles.goodRow}>
                <Text style={styles.goodIcon}>ⓘ</Text>
                <Text style={styles.goodText}>
                  No re-entry once you leave the venue.
                </Text>
              </View>

              <View style={styles.goodRow}>
                <Text style={styles.goodIcon}>ⓘ</Text>
                <Text style={styles.goodText}>
                  Outside food, drinks and professional cameras are not allowed.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* FIXED BOTTOM TICKET BAR */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPriceContainer}>
          <Text style={styles.bottomLabel}>FROM</Text>
          <Text style={styles.bottomPrice}>{formatPrice(event.price)}</Text>
        </View>

        <Pressable style={styles.selectButton} onPress={handleTickets}>
          <Text style={styles.selectButtonText}>Select Tickets</Text>
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

  scrollContent: {
    paddingBottom: 15,
  },

  hero: {
    height: 245,
    width: "100%",
    justifyContent: "flex-start",
  },

  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(25, 5, 38, 0.12)",
  },

  heroActions: {
    paddingTop: 49,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  heroRight: {
    flexDirection: "row",
    gap: 10,
  },

  heroButton: {
    width: 42,
    height: 42,
    borderRadius: 22,
    backgroundColor: "rgba(35, 12, 49, 0.65)",
    alignItems: "center",
    justifyContent: "center",
  },

  heroButtonText: {
    color: C.white,
    fontSize: 25,
    fontWeight: "500",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  badges: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 11,
  },

  badge: {
    backgroundColor: C.light,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: C.purple,
    fontSize: 10,
    fontWeight: "600",
  },

  featuredBadge: {
    backgroundColor: C.purple,
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 20,
  },

  featuredBadgeText: {
    color: C.white,
    fontSize: 10,
    fontWeight: "700",
  },

  saleBadge: {
    backgroundColor: C.light,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 20,
  },

  saleBadgeText: {
    color: C.purple,
    fontSize: 10,
    fontWeight: "600",
  },

  eventTitle: {
    color: C.text,
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.7,
  },

  artistRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 19,
  },

  artistAvatar: {
    width: 34,
    height: 34,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: C.white,
  },

  artistName: {
    color: C.accent,
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 11,
  },

  artistArrow: {
    color: C.accent,
    fontSize: 24,
    marginLeft: 12,
  },

  infoCard: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 29,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 15,
    gap: 12,
  },

  infoIcon: {
    width: 37,
    height: 37,
    borderRadius: 20,
    backgroundColor: C.light,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },

  infoIconText: {
    color: C.purple,
    fontSize: 19,
    fontWeight: "600",
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    color: C.muted,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.6,
  },

  infoValue: {
    color: C.text,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 5,
  },

  infoDescription: {
    color: C.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },

  mapsLink: {
    color: C.accent,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 9,
  },

  ageText: {
    color: C.text,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },

  separator: {
    height: 1,
    backgroundColor: C.border,
  },

  sectionTitle: {
    color: C.text,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.4,
    marginBottom: 13,
  },

  ticketCard: {
    backgroundColor: C.white,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 16,
    marginBottom: 29,
  },

  ticketRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 16,
    gap: 8,
  },

  ticketDescription: {
    flex: 1,
  },

  ticketName: {
    color: C.text,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 19,
  },

  ticketSubtext: {
    color: C.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },

  ticketPriceContainer: {
    alignItems: "flex-end",
    minWidth: 105,
  },

  ticketPrice: {
    color: C.purple,
    fontSize: 14,
    fontWeight: "800",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 6,
  },

  availableBadge: {
    backgroundColor: C.green,
  },

  sellingBadge: {
    backgroundColor: C.yellow,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },

  availableText: {
    color: C.greenText,
  },

  sellingText: {
    color: C.yellowText,
  },

  aboutSection: {
    marginBottom: 30,
  },

  aboutDescription: {
    color: C.muted,
    fontSize: 14,
    lineHeight: 23,
  },

  readMore: {
    color: C.accent,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 5,
  },

  gallerySection: {
    marginHorizontal: -20,
    marginBottom: 32,
  },

  gallerySectionTitle: {
    marginHorizontal: 20,
  },

  galleryList: {
    paddingHorizontal: 0,
    gap: 12,
  },

  galleryImage: {
    width: 200,
    height: 150,
    borderRadius: 15,
    backgroundColor: C.light,
  },

  goodSection: {
    marginBottom: 13,
  },

  goodCard: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    padding: 16,
    gap: 13,
  },

  goodRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  goodIcon: {
    color: C.accent,
    fontSize: 16,
    fontWeight: "600",
  },

  goodText: {
    color: C.muted,
    fontSize: 12,
    lineHeight: 19,
    flex: 1,
  },

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

  bottomPriceContainer: {
    minWidth: 92,
  },

  bottomLabel: {
    color: C.muted,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.7,
  },

  bottomPrice: {
    color: C.text,
    fontSize: 17,
    fontWeight: "800",
    marginTop: 2,
  },

  selectButton: {
    flex: 1,
    backgroundColor: C.purple,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },

  selectButtonText: {
    color: C.white,
    fontSize: 14,
    fontWeight: "700",
  },
});
