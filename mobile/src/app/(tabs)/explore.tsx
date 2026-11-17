import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const C = {
  bg: "#F7F5FB",
  purple: "#3D1D53",
  accent: "#8A28FF",
  light: "#F0DEFF",
  text: "#21182B",
  muted: "#81788B",
  white: "#FFFFFF",
  border: "#EBE5F0",
};

const categories = ["All", "Pop", "Rock", "Jazz", "Electronic"];

const concerts = [
  {
    id: "1",
    title: "Neon Skyline World Tour",
    artist: "Aurora Lestari",
    category: "Pop",
    date: "Sat, 21 Nov 2026",
    time: "19:30 WIB",
    venue: "Istora Senayan",
    city: "Jakarta",
    price: 850000,
    popularity: 100,
    dateOrder: 1,
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=700",
  },
  {
    id: "2",
    title: "Jazz Malam Selatan",
    artist: "Jakarta Jazz Collective",
    category: "Jazz",
    date: "Sat, 28 Nov 2026",
    time: "19:00 WIB",
    venue: "Aula Simfonia",
    city: "Jakarta",
    price: 500000,
    popularity: 90,
    dateOrder: 2,
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500",
  },
  {
    id: "3",
    title: "Suara Beton",
    artist: "Monokrom",
    category: "Rock",
    date: "Sun, 29 Nov 2026",
    time: "19:00 WIB",
    venue: "Eldorado Dome",
    city: "Bandung",
    price: 300000,
    popularity: 85,
    dateOrder: 3,
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500",
  },
  {
    id: "4",
    title: "Midnight Reverie",
    artist: "Raka & The Hollow Lights",
    category: "Indie",
    date: "Fri, 4 Dec 2026",
    time: "20:00 WIB",
    venue: "Tennis Indoor Senayan",
    city: "Jakarta",
    price: 250000,
    popularity: 80,
    dateOrder: 4,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500",
  },
  {
    id: "5",
    title: "Sunset Acoustic Session",
    artist: "Kirana Ayu",
    category: "Jazz",
    date: "Sat, 12 Dec 2026",
    time: "18:00 WIB",
    venue: "Ciputra Artpreneur",
    city: "Jakarta",
    price: 450000,
    popularity: 75,
    dateOrder: 5,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500",
  },
  {
    id: "6",
    title: "Mimpi Biru",
    artist: "Nadia Rani",
    category: "Pop",
    date: "Sun, 27 Dec 2026",
    time: "19:30 WIB",
    venue: "Sabuga",
    city: "Bandung",
    price: 425000,
    popularity: 70,
    dateOrder: 6,
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=500",
  },
  {
    id: "7",
    title: "Listrik Malam",
    artist: "DJ Wira & Friends",
    category: "Electronic",
    date: "Sat, 9 Jan 2027",
    time: "21:00 WIB",
    venue: "Sky Garden Kuningan",
    city: "Jakarta",
    price: 400000,
    popularity: 65,
    dateOrder: 7,
    image: "https://images.unsplash.com/photo-1571266028243-d220c9c3b1f8?w=500",
  },
  {
    id: "8",
    title: "Batu Karang Tour",
    artist: "Nusa Timur",
    category: "Rock",
    date: "Sat, 23 Jan 2027",
    time: "19:00 WIB",
    venue: "Grand City",
    city: "Surabaya",
    price: 380000,
    popularity: 60,
    dateOrder: 8,
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500",
  },
  {
    id: "9",
    title: "Pulau Cahaya Fest",
    artist: "Various Artists",
    category: "Festival",
    date: "Sun, 7 Feb 2027",
    time: "15:00 WIB",
    venue: "Lapangan Puputan",
    city: "Denpasar",
    price: 600000,
    popularity: 95,
    dateOrder: 9,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500",
  },
  {
    id: "10",
    title: "Rimba Festival 2027",
    artist: "Various Artists",
    category: "Festival",
    date: "Sat, 20 Feb 2027",
    time: "14:00 WIB",
    venue: "Lapangan Gasibu",
    city: "Bandung",
    price: 550000,
    popularity: 88,
    dateOrder: 10,
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500",
  },
];

const formatPrice = (price: number) => "Rp" + price.toLocaleString("id-ID");

export default function ExploreScreen() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Soonest");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState("All");

  const filteredConcerts = useMemo(() => {
    let result = concerts.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;

      const query = search.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.artist.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query) ||
        item.venue.toLowerCase().includes(query);

      const matchesCity = selectedCity === "All" || item.city === selectedCity;

      return matchesCategory && matchesSearch && matchesCity;
    });

    if (sort === "Lowest price") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "Most popular") {
      result.sort((a, b) => b.popularity - a.popularity);
    } else {
      result.sort((a, b) => a.dateOrder - b.dateOrder);
    }

    return result;
  }, [category, search, sort, selectedCity]);

  const featured = concerts[0];

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const openDetails = (id: string) => {
    router.push({
      pathname: "/event-detail",
      params: { id },
    });
  };

  const openTickets = (id: string) => {
    router.push({
      pathname: "/select-tickets",
      params: { id },
    });
  };

  const visibleConcerts = filteredConcerts.filter(
    (item) => item.id !== featured.id,
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>N</Text>
            </View>
            <Text style={styles.headerTitle}>Explore</Text>
          </View>

          <Pressable
            style={styles.filterButton}
            onPress={() => setFilterVisible(true)}
          >
            <Text style={styles.filterIcon}>☷</Text>
            <Text style={styles.filterText}>Filter</Text>
          </Pressable>
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
          {search.length > 0 && (
            <Pressable onPress={() => setSearch("")}>
              <Text style={styles.clearSearch}>×</Text>
            </Pressable>
          )}
        </View>

        {/* CATEGORY */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((item) => (
            <Pressable
              key={item}
              onPress={() => setCategory(item)}
              style={[
                styles.categoryButton,
                category === item && styles.categoryActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === item && styles.categoryTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* SORT */}
        <View style={styles.sortContainer}>
          {["Soonest", "Lowest price", "Most popular"].map((item) => (
            <Pressable
              key={item}
              onPress={() => setSort(item)}
              style={[styles.sortButton, sort === item && styles.sortActive]}
            >
              <Text
                style={[
                  styles.sortText,
                  sort === item && styles.sortTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* CONCERT COUNT */}
        <Text style={styles.countText}>{filteredConcerts.length} concerts</Text>

        {/* FEATURED */}
        {filteredConcerts.some((item) => item.id === featured.id) && (
          <View style={styles.featuredCard}>
            <ImageBackground
              source={{ uri: featured.image }}
              style={styles.featuredImage}
              imageStyle={styles.featuredImageRadius}
            >
              <View style={styles.imageOverlay} />

              <View style={styles.featuredTop}>
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredBadgeText}>☆ Featured</Text>
                </View>

                <Pressable
                  onPress={() => toggleFavorite(featured.id)}
                  style={styles.favoriteButton}
                >
                  <Text style={styles.favoriteIcon}>
                    {favorites.includes(featured.id) ? "♥" : "♡"}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.dateBadge}>
                <Text style={styles.dateBadgeText}>NOV 21</Text>
              </View>

              <View style={styles.featuredInfo}>
                <Text style={styles.featuredTitle}>{featured.title}</Text>
                <Text style={styles.featuredArtist}>{featured.artist}</Text>
                <Text style={styles.featuredLocation}>
                  21 NOV · 19:30 WIB · Istora Senayan, Jakarta
                </Text>
              </View>
            </ImageBackground>

            <View style={styles.featuredFooter}>
              <View>
                <Text style={styles.featuredDateText}>NOV 21 · JAKARTA</Text>
                <Text style={styles.featuredPrice}>
                  From {formatPrice(featured.price)}
                </Text>
              </View>

              <Pressable
                style={styles.ticketButton}
                onPress={() => openTickets(featured.id)}
              >
                <Text style={styles.ticketButtonText}>Get Tickets</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* CONCERT LIST */}
        <View style={styles.listContainer}>
          {visibleConcerts.map((item) => (
            <View key={item.id} style={styles.concertCard}>
              <Image source={{ uri: item.image }} style={styles.concertImage} />

              <View style={styles.concertContent}>
                <View style={styles.cardTop}>
                  <Text style={styles.categoryBadge}>{item.category}</Text>

                  <Pressable
                    style={styles.cardFavorite}
                    onPress={() => toggleFavorite(item.id)}
                  >
                    <Text
                      style={[
                        styles.cardHeart,
                        favorites.includes(item.id) && styles.heartActive,
                      ]}
                    >
                      {favorites.includes(item.id) ? "♥" : "♡"}
                    </Text>
                  </Pressable>
                </View>

                <Text style={styles.concertTitle} numberOfLines={1}>
                  {item.title}
                </Text>

                <Text style={styles.concertArtist} numberOfLines={1}>
                  {item.artist}
                </Text>

                <Text style={styles.concertDate} numberOfLines={1}>
                  {item.date} · {item.time}
                </Text>

                <Text style={styles.concertVenue} numberOfLines={1}>
                  {item.venue}, {item.city}
                </Text>

                <View style={styles.cardBottom}>
                  <Text style={styles.concertPrice}>
                    From {formatPrice(item.price)}
                  </Text>

                  <Pressable
                    style={styles.detailsButton}
                    onPress={() => openDetails(item.id)}
                  >
                    <Text style={styles.detailsText}>Details</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}

          {filteredConcerts.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>♫</Text>
              <Text style={styles.emptyTitle}>No concerts found</Text>
              <Text style={styles.emptyDescription}>
                Try another search or category.
              </Text>
              <Pressable
                onPress={() => {
                  setSearch("");
                  setCategory("All");
                  setSelectedCity("All");
                }}
              >
                <Text style={styles.resetText}>Reset filters</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* FOOTNOTE */}
        <Text style={styles.footnote}>
          Prices shown are starting prices and exclude the service fee.
        </Text>

        <View style={styles.bottomInfo}>
          <Pressable onPress={() => router.push("/about")}>
            <Text style={styles.aboutLink}>About Nocturne</Text>
          </Pressable>
          <Text style={styles.soldOutText}>
            Sold out shows are marked in the list.
          </Text>
        </View>
      </ScrollView>

      {/* FILTER MODAL */}
      <Modal
        visible={filterVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalBackground}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setFilterVisible(false)}
          />

          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Concerts</Text>
              <Pressable onPress={() => setFilterVisible(false)}>
                <Text style={styles.modalClose}>×</Text>
              </Pressable>
            </View>

            <Text style={styles.modalLabel}>Choose City</Text>

            <View style={styles.modalCities}>
              {["All", "Jakarta", "Bandung", "Surabaya", "Denpasar"].map(
                (city) => (
                  <Pressable
                    key={city}
                    onPress={() => setSelectedCity(city)}
                    style={[
                      styles.modalCity,
                      selectedCity === city && styles.modalCityActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.modalCityText,
                        selectedCity === city && styles.modalCityTextActive,
                      ]}
                    >
                      {city}
                    </Text>
                  </Pressable>
                ),
              )}
            </View>

            <Text style={styles.modalLabel}>Sort by</Text>

            {["Soonest", "Lowest price", "Most popular"].map((item) => (
              <Pressable
                key={item}
                style={styles.modalSort}
                onPress={() => setSort(item)}
              >
                <Text style={styles.modalSortText}>{item}</Text>
                <Text style={styles.modalCheck}>
                  {sort === item ? "●" : "○"}
                </Text>
              </Pressable>
            ))}

            <View style={styles.modalActions}>
              <Pressable
                style={styles.resetButton}
                onPress={() => {
                  setSelectedCity("All");
                  setSort("Soonest");
                  setCategory("All");
                  setSearch("");
                }}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </Pressable>

              <Pressable
                style={styles.applyButton}
                onPress={() => setFilterVisible(false)}
              >
                <Text style={styles.applyButtonText}>
                  Show {filteredConcerts.length} Concerts
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },

  scrollContent: {
    paddingTop: 10,
    paddingBottom: 25,
  },

  header: {
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  logo: {
    width: 32,
    height: 32,
    backgroundColor: C.purple,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    color: C.white,
    fontSize: 17,
    fontWeight: "800",
  },

  headerTitle: {
    color: C.text,
    fontSize: 19,
    fontWeight: "700",
  },

  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 22,
  },

  filterIcon: {
    fontSize: 17,
    color: C.purple,
  },

  filterText: {
    color: C.text,
    fontSize: 12,
    fontWeight: "600",
  },

  searchBox: {
    height: 43,
    backgroundColor: C.white,
    borderRadius: 13,
    marginHorizontal: 15,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: C.border,
    elevation: 2,
    shadowColor: C.purple,
    shadowOpacity: 0.05,
    shadowRadius: 7,
  },

  searchIcon: {
    fontSize: 23,
    color: C.muted,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 12,
    color: C.text,
  },

  clearSearch: {
    fontSize: 22,
    color: C.muted,
  },

  categoryList: {
    paddingHorizontal: 15,
    paddingTop: 9,
    paddingBottom: 2,
  },

  categoryButton: {
    height: 29,
    paddingHorizontal: 15,
    borderRadius: 18,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 7,
  },

  categoryActive: {
    backgroundColor: C.purple,
    borderColor: C.purple,
  },

  categoryText: {
    fontSize: 11,
    color: C.text,
    fontWeight: "600",
  },

  categoryTextActive: {
    color: C.white,
  },

  sortContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    gap: 7,
    marginTop: 9,
    marginBottom: 10,
  },

  sortButton: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
  },

  sortActive: {
    backgroundColor: C.light,
  },

  sortText: {
    fontSize: 10,
    color: C.muted,
    fontWeight: "500",
  },

  sortTextActive: {
    color: C.purple,
    fontWeight: "700",
  },

  countText: {
    fontSize: 10,
    fontWeight: "600",
    color: C.muted,
    marginHorizontal: 15,
    marginBottom: 9,
  },

  featuredCard: {
    marginHorizontal: 15,
    borderRadius: 16,
    backgroundColor: C.white,
    overflow: "hidden",
    elevation: 4,
    shadowColor: C.purple,
    shadowOpacity: 0.09,
    shadowRadius: 10,
    marginBottom: 10,
  },

  featuredImage: {
    height: 305,
    padding: 12,
    justifyContent: "space-between",
  },

  featuredImageRadius: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(31, 7, 48, 0.36)",
  },

  featuredTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  featuredBadge: {
    backgroundColor: "rgba(61, 29, 83, 0.9)",
    borderRadius: 18,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  featuredBadgeText: {
    color: C.white,
    fontSize: 10,
    fontWeight: "600",
  },

  favoriteButton: {
    width: 34,
    height: 34,
    borderRadius: 18,
    backgroundColor: "rgba(45, 15, 60, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },

  favoriteIcon: {
    fontSize: 22,
    color: C.white,
  },

  dateBadge: {
    position: "absolute",
    top: 40,
    left: 12,
    backgroundColor: "#F3E7FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },

  dateBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: C.purple,
  },

  featuredInfo: {
    marginBottom: 1,
  },

  featuredTitle: {
    color: C.white,
    fontSize: 19,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  featuredArtist: {
    color: C.white,
    fontSize: 11,
    marginTop: 3,
  },

  featuredLocation: {
    color: "#D5C9DD",
    fontSize: 9,
    marginTop: 4,
  },

  featuredFooter: {
    minHeight: 59,
    paddingHorizontal: 12,
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  featuredDateText: {
    color: C.muted,
    fontSize: 9,
    fontWeight: "600",
  },

  featuredPrice: {
    color: C.text,
    fontSize: 11,
    fontWeight: "800",
    marginTop: 4,
  },

  ticketButton: {
    backgroundColor: C.purple,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 25,
  },

  ticketButtonText: {
    color: C.white,
    fontSize: 11,
    fontWeight: "700",
  },

  listContainer: {
    paddingHorizontal: 15,
  },

  concertCard: {
    backgroundColor: C.white,
    borderRadius: 15,
    padding: 8,
    flexDirection: "row",
    marginBottom: 9,
    minHeight: 128,
    elevation: 3,
    shadowColor: C.purple,
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },

  concertImage: {
    width: 64,
    height: 84,
    borderRadius: 10,
    backgroundColor: C.light,
  },

  concertContent: {
    flex: 1,
    marginLeft: 9,
    justifyContent: "space-between",
    minWidth: 0,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  categoryBadge: {
    backgroundColor: "#F4EAFE",
    color: C.purple,
    fontSize: 9,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    overflow: "hidden",
  },

  cardFavorite: {
    width: 27,
    height: 27,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },

  cardHeart: {
    color: C.purple,
    fontSize: 17,
  },

  heartActive: {
    color: C.accent,
  },

  concertTitle: {
    color: C.text,
    fontSize: 11,
    fontWeight: "800",
    marginTop: 2,
  },

  concertArtist: {
    color: C.accent,
    fontSize: 9,
    fontWeight: "600",
    marginTop: 2,
  },

  concertDate: {
    color: C.muted,
    fontSize: 9,
    marginTop: 4,
  },

  concertVenue: {
    color: C.muted,
    fontSize: 9,
    marginTop: 2,
  },

  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },

  concertPrice: {
    color: C.text,
    fontSize: 10,
    fontWeight: "800",
  },

  detailsButton: {
    backgroundColor: C.light,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
  },

  detailsText: {
    color: C.purple,
    fontSize: 9,
    fontWeight: "700",
  },

  emptyState: {
    alignItems: "center",
    paddingVertical: 45,
  },

  emptyIcon: {
    color: C.purple,
    fontSize: 35,
  },

  emptyTitle: {
    color: C.text,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 8,
  },

  emptyDescription: {
    color: C.muted,
    fontSize: 12,
    marginTop: 5,
  },

  resetText: {
    color: C.accent,
    fontWeight: "700",
    marginTop: 12,
  },

  footnote: {
    marginHorizontal: 15,
    marginTop: 8,
    color: C.muted,
    fontSize: 9,
  },

  bottomInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 18,
    gap: 12,
  },

  aboutLink: {
    color: C.accent,
    fontSize: 9,
    fontWeight: "700",
  },

  soldOutText: {
    color: C.muted,
    fontSize: 9,
    flex: 1,
  },

  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },

  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(25, 12, 35, 0.45)",
  },

  modalContent: {
    backgroundColor: C.bg,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 22,
    paddingBottom: 32,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  modalTitle: {
    color: C.text,
    fontSize: 20,
    fontWeight: "800",
  },

  modalClose: {
    color: C.text,
    fontSize: 27,
  },

  modalLabel: {
    color: C.text,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 5,
  },

  modalCities: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },

  modalCity: {
    backgroundColor: C.white,
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.border,
  },

  modalCityActive: {
    backgroundColor: C.purple,
    borderColor: C.purple,
  },

  modalCityText: {
    color: C.text,
    fontSize: 11,
    fontWeight: "600",
  },

  modalCityTextActive: {
    color: C.white,
  },

  modalSort: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },

  modalSortText: {
    color: C.text,
    fontSize: 13,
  },

  modalCheck: {
    color: C.accent,
    fontSize: 16,
  },

  modalActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 25,
  },

  resetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: C.purple,
    alignItems: "center",
  },

  resetButtonText: {
    color: C.purple,
    fontSize: 13,
    fontWeight: "700",
  },

  applyButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: C.purple,
    alignItems: "center",
  },

  applyButtonText: {
    color: C.white,
    fontSize: 13,
    fontWeight: "700",
  },
});
