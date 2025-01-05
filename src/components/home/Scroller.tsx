import apiService from "@/config/tmdb";
import { IMediaDetails } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";
import MySlider from "../common/sliders";

const Scroller = ({
  endpoint,
  heading,
}: {
  endpoint: string;
  heading?: string;
}) => {
  const { data: mediaDetails, isLoading } = useQuery<IMediaDetails[]>({
    queryKey: ["trending", "today", endpoint],
    queryFn: async () => {
      const res = await apiService.get(endpoint);
      return res.data.results;
    },
  });

  if (isLoading || !mediaDetails) return <div>Loading</div>;
  return <MySlider mediaDetails={mediaDetails} heading={heading} />;
};

export default Scroller;
