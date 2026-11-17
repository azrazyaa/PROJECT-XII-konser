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

const categories = ["All", "Pop", "Rock", "Jazz", "Electronic"];

const concerts = [
  {
    id: "1",
    title: "Jazz Malam Selatan",
    artist: "Jakarta Jazz Collective",
    city: "Jakarta",
    price: "Rp500.000",
    date: "NOV 28",
    category: "Jazz",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600",
  },
  {
    id: "2",
    title: "Suara Beton",
    artist: "Monokrom",
    city: "Bandung",
    price: "Rp300.000",
    date: "NOV 29",
    category: "Rock",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600",
  },
  {
    id: "3",
    title: "Midnight Echo",
    artist: "Raka & The Hollow",
    city: "Jakarta",
    price: "Rp250.000",
    date: "DEC 04",
    category: "Pop",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600",
  },
];

const artists = [
  {
    name: "Aurora Lestari",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
  },
  {
    name: "Jakarta Jazz Collective",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
  },
  {
    name: "Monokrom",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300",
  },
  {
    name: "Raka & The Hollow",
    image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=300",
  },
];

const cities = ["Jakarta", "Bandung", "Surabaya", "Denpasar"];

export default function HomeScreen() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [favorite, setFavorite] = useState(false);

  const filteredConcerts = concerts.filter((concert) => {
    const matchesCategory =
      selectedCategory === "All" || concert.category === selectedCategory;

    const matchesSearch =
      concert.title.toLowerCase().includes(search.toLowerCase()) ||
      concert.artist.toLowerCase().includes(search.toLowerCase()) ||
      concert.city.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.brand}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>N</Text>
            </View>
            <Text style={styles.brandName}>Nocturne</Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>N</Text>
          </View>
        </View>

        {/* GREETING */}
        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>Good morning, Naira</Text>
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
        <View style={styles.featuredCard}>
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1000",
            }}
            style={styles.featuredImage}
            imageStyle={styles.featuredImageRadius}
          >
            <View style={styles.featuredOverlay} />

            <View style={styles.featuredTop}>
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>☆ Featured</Text>
              </View>

              <Pressable
                onPress={() => setFavorite(!favorite)}
                style={styles.favoriteButton}
              >
                <Text style={styles.favoriteIcon}>{favorite ? "♥" : "♡"}</Text>
              </Pressable>
            </View>

            <View style={styles.featuredDate}>
              <Text style={styles.featuredDateText}>NOV 21</Text>
            </View>

            <View style={styles.featuredInfo}>
              <Text style={styles.featuredTitle}>Neon Skyline World Tour</Text>
              <Text style={styles.featuredArtist}>Aurora Lestari</Text>
              <Text style={styles.featuredLocation}>
                21 NOV · 19:30 WIB · Istora Senayan, Jakarta
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.ticketFooter}>
            <View>
              <Text style={styles.ticketDate}>NOV 21 · JAKARTA</Text>
              <Text style={styles.ticketPrice}>From Rp850.000</Text>
            </View>

            <Pressable
              style={styles.ticketButton}
              onPress={() => router.push("/select-tickets")}
            >
              <Text style={styles.ticketButtonText}>Get Tickets</Text>
            </Pressable>
          </View>
        </View>

        {/* UPCOMING CONCERTS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Concerts</Text>
            <Pressable>
              <Text style={styles.seeAll}>See all ›</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.concertList}
          >
            {filteredConcerts.map((concert) => (
              <Pressable
                key={concert.id}
                style={styles.concertCard}
                onPress={() => router.push("/event-detail")}
              >
                <View>
                  <Image
                    source={{ uri: concert.image }}
                    style={styles.concertImage}
                  />
                  <View style={styles.concertDateBadge}>
                    <Text style={styles.concertDateText}>{concert.date}</Text>
                  </View>
                </View>

                <Text style={styles.concertTitle} numberOfLines={1}>
                  {concert.title}
                </Text>
                <Text style={styles.concertArtist} numberOfLines={1}>
                  {concert.artist}
                </Text>
                <Text style={styles.concertCity}>{concert.city}</Text>
                <Text style={styles.concertPrice}>From {concert.price}</Text>
              </Pressable>
            ))}
          </ScrollView>

          {filteredConcerts.length === 0 && (
            <Text style={styles.emptyText}>No concerts found.</Text>
          )}
        </View>

        {/* POPULAR ARTISTS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Artists</Text>
            <Pressable>
              <Text style={styles.seeAll}>See all ›</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.artistList}
          >
            {artists.map((artist, index) => (
              <Pressable
                key={index}
                style={styles.artistItem}
                onPress={() => router.push("/artist")}
              >
                <Image
                  source={{ uri: artist.image }}
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
                onPress={() => {
                  setSearch(city);
                }}
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
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingTop: 12,
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 14,
  },

  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logo: {
    width: 32,
    height: 32,
    backgroundColor: COLORS.purple,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
  },

  brandName: {
    fontSize: 21,
    fontWeight: "700",
    color: COLORS.text,
  },

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

  greeting: {
    paddingHorizontal: 20,
    marginBottom: 17,
  },

  greetingTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -1,
  },

  subtitle: {
    fontSize: 15,
    color: COLORS.secondary,
    marginTop: 4,
  },

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

  searchIcon: {
    fontSize: 25,
    color: COLORS.secondary,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },

  categoryScroll: {
    marginTop: 17,
    marginBottom: 28,
    paddingLeft: 20,
  },

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

  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },

  categoryTextActive: {
    color: COLORS.white,
  },

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
    ...StyleSheet.absoluteFillObject,
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

  featuredBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "600",
  },

  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(39, 13, 56, 0.75)",
    alignItems: "center",
    justifyContent: "center",
  },

  favoriteIcon: {
    color: COLORS.white,
    fontSize: 25,
  },

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

  featuredInfo: {
    marginBottom: 2,
  },

  featuredTitle: {
    fontSize: 24,
    color: COLORS.white,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  featuredArtist: {
    fontSize: 13,
    color: COLORS.white,
    marginTop: 5,
  },

  featuredLocation: {
    fontSize: 11,
    color: "#D4C8DD",
    marginTop: 5,
  },

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

  section: {
    marginBottom: 30,
  },

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

  seeAll: {
    fontSize: 13,
    fontWeight: "600",
    color: "#841BFF",
  },

  concertList: {
    paddingLeft: 20,
    paddingRight: 20,
  },

  concertCard: {
    width: 152,
    marginRight: 12,
  },

  concertImage: {
    width: 152,
    height: 190,
    borderRadius: 15,
  },

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

  concertArtist: {
    color: COLORS.secondary,
    fontSize: 12,
    marginTop: 4,
  },

  concertCity: {
    color: COLORS.secondary,
    fontSize: 12,
    marginTop: 2,
  },

  concertPrice: {
    color: COLORS.purple,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 6,
  },

  emptyText: {
    color: COLORS.secondary,
    paddingHorizontal: 20,
    marginTop: 10,
  },

  artistList: {
    paddingHorizontal: 20,
  },

  artistItem: {
    width: 82,
    alignItems: "center",
    marginRight: 12,
  },

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

  cityIcon: {
    fontSize: 17,
    color: COLORS.purple,
    marginRight: 7,
  },

  cityText: {
    color: COLORS.purple,
    fontSize: 13,
    fontWeight: "600",
  },

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

  aboutMusicIcon: {
    fontSize: 22,
    color: COLORS.purple,
  },

  aboutContent: {
    flex: 1,
  },

  aboutTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "700",
  },

  aboutDescription: {
    color: COLORS.secondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },

  learnMore: {
    color: "#841BFF",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 9,
  },
});
