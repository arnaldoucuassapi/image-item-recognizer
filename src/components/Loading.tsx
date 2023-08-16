import { ActivityIndicator } from "react-native";

export function Loading() {
  return <ActivityIndicator style={{ marginVertical: 8 }} size={32} color="#50C878" />
}