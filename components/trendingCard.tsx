import { Link } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { icons } from "@/constants/icons";

export default function TrendingCard({
  id,
  title,
  poster_path,
  vote_average,
  index,
}: Movie) {
  return (
    <>
      <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity>
          <View className="">
            <View className="">
              <View className="flex-row items-center justify-start gap-x-1 absolute z-10 top-2 right-2 bg-[#ffffff50] px-2 py-1 rounded">
                <Image
                  source={icons.star}
                  className="size-4"
                  resizeMode="contain"
                />
                <Text className="text-sm text-slate-500 font-bold uppercase">
                  {Math.round(vote_average * 10) / 10}
                </Text>
              </View>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${poster_path}`,
                }}
                className="w-40 h-72 rounded-lg"
                resizeMode="cover"
              />
              <Text className="text-slate-300 font-bold text-7xl absolute bottom-0 -left-3">
                {index + 1}
              </Text>
            </View>
            <Text className="text-white">
              {title.length > 10 ? title.slice(0, 10) + "..." : title}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
    </>
  );
}
