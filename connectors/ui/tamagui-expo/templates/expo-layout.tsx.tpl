/**
 * Expo Root Layout with Tamagui Provider
 * 
 * Wraps the Expo app with TamaguiProvider
 */

import { Stack } from 'expo-router';
import { TamaguiProvider } from '<%= importPath(paths.packages.shared.src) %>ui/tamagui/provider';

export default function RootLayout() {
  return (
    <TamaguiProvider defaultTheme="light">
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ title: 'Home' }} />
      </Stack>
    </TamaguiProvider>
  );
}

