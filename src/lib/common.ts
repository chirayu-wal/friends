import apiService from "@/config/tmdb";

export const fullSearch = async (query: string) => {
  const res = await apiService.get("/search/multi", {
    params: {
      query: query,
      include_adult: true,
    },
  });
  return res.data.results;
};
