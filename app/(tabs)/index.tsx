import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchPopularMovies, fetchTopRatedMovies } from "@/services/api";
import MovieCard from "@/components/movieCard";
import { Link } from "expo-router";
import TrendingCard from "@/components/trendingCard";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchPopularMovies({ query: "" }));

  const {
    data: topRatedMovies,
    loading: topRatedMoviesLoading,
    error: topRatedMoviesError,
  } = useFetch(() => fetchTopRatedMovies());

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}>
        {/* Logo */}
        <Image
          source={images.logo1}
          className="mt-20 mb-5 mx-auto"
          width={10}
          height={10}
        />
        {moviesLoading || topRatedMoviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || topRatedMoviesError ? (
          <Text>
            Error: {moviesError?.message || topRatedMoviesError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            {/* Search */}
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />
            {/* Top Rated Movies */}
            <View className="mt-10">
              <Text className="text-lg text-white font-bold mb-3">
                Top Rated Movies
              </Text>
              <Image source={images.trending} className="absolute bottom-0" />
              <FlatList
                data={topRatedMovies}
                renderItem={({ item, index }) => (
                  <TrendingCard {...item} index={index} />
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                contentContainerStyle={{
                  gap: 15,
                }}
              />
            </View>
            {/* Latest Movies */}
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
