const fs = require("fs");
const path = require("path");

const A = "src/app";

const screen = (n) => `import { View, Text } from 'react-native';

export default function ${n}() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>${n}</Text>
    </View>
  );
}
`;

const tab = (name, title, icon) =>
  `      <Tabs.Screen name="${name}" options={{ title: '${title}', tabBarIcon: ({ color, size }) => <Ionicons name="${icon}" color={color} size={size} /> }} />`;

const files = {
  [`${A}/_layout.tsx`]: `import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
`,

  [`${A}/(tabs)/_layout.tsx`]: `import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#4C1D95' }}>
${tab("index", "Home", "home")}
${tab("explore", "Explore", "compass")}
${tab("wishlist", "Wishlist", "heart")}
${tab("my-tickets", "My Tickets", "ticket")}
${tab("profile", "Profile", "person")}
    </Tabs>
  );
}
`,

  [`${A}/(tabs)/index.tsx`]: screen("HomeScreen"), // 01
  [`${A}/(tabs)/explore.tsx`]: screen("ExploreScreen"), // 02
  [`${A}/event-detail.tsx`]: screen("EventDetailScreen"), // 03
  [`${A}/artist.tsx`]: screen("ArtistScreen"), // 04
  [`${A}/about.tsx`]: screen("AboutScreen"), // 05
  [`${A}/(tabs)/wishlist.tsx`]: screen("WishlistScreen"), // 06
  [`${A}/select-tickets.tsx`]: screen("SelectTicketsScreen"), // 07
  [`${A}/payment.tsx`]: screen("PaymentScreen"), // 08
  [`${A}/order-success.tsx`]: screen("OrderSuccessScreen"), // 09
  [`${A}/(tabs)/my-tickets.tsx`]: screen("MyTicketsScreen"), // 10
  [`${A}/(tabs)/profile.tsx`]: screen("ProfileScreen"),

  "src/constants/colors.ts": `export const colors = {
  primary: '#4C1D95',
  primaryLight: '#EDE9FE',
  background: '#F7F5FA',
  text: '#1F1B2E',
  muted: '#6B6880',
  white: '#FFFFFF',
};
`,
  "src/data/events.ts": `export const events = [];\n`,
  "src/data/artists.ts": `export const artists = [];\n`,
};

["src/components", "src/hooks", "assets/images"].forEach((d) =>
  fs.mkdirSync(d, { recursive: true }),
);

// hapus index.tsx bawaan agar tidak bentrok dengan (tabs)/index.tsx
const defaultIndex = `${A}/index.tsx`;
if (fs.existsSync(defaultIndex)) fs.unlinkSync(defaultIndex);

Object.entries(files).forEach(([file, content]) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  console.log("dibuat:", file);
});
