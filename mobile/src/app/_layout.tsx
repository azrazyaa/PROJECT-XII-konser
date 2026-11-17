import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

const PUBLIC_ROUTES = ["login", "register", "about"];

function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const currentSegment = segments[0] as string | undefined;
    const isPublic = !currentSegment || PUBLIC_ROUTES.includes(currentSegment);

    if (!isAuthenticated && !isPublic) {
      router.replace("/login");
    } else if (
      isAuthenticated &&
      (currentSegment === "login" || currentSegment === "register")
    ) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, isLoading, segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
