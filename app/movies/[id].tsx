import { icons } from "@/constants/icons";
import { fetchMovieData } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View, Image, ImageBackground } from "react-native";
import { BlurView } from "expo-blur";

interface MovieInfo {
  label: string;
  value: string | number | null | undefined;
}

export default function Movie() {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() => fetchMovieData(id as string));

  const MovieInfo = ({ label, value }: MovieInfo) => {
    return (
      <View className="flex-col items-start justify-center mt-5">
        <Text className="text-light-200 font-normal text-sm">{label}</Text>
        <Text className="text-light-100 font-bold text-sm mt-2">{value}</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}>
        <View>
          <ImageBackground
            className="w-full h-[550px]"
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}>
            <BlurView
              intensity={40}
              tint="light"
              className="w-full h-full"></BlurView>
          </ImageBackground>
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date}
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join("-") || "N/A"}
          />
          <View className="flex flex-row justify-between w-full">
            <MovieInfo
              label="Budget"
              value={`${movie?.budget / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`${Math.round(movie?.revenue) / 1_000_000} million`}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
