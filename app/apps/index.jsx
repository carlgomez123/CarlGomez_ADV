import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View style={{ padding: 20 }}>
      <Link href="/apps/state">
        <Text>useState</Text>
      </Link>
      <Link href="/apps/effect">
        <Text>useEffect</Text>
      </Link>
    </View>
  );
}
