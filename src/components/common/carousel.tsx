import { Heart, PlayIcon, Star } from "lucide-react";
import { Button } from "../ui/button";
import { IMediaDetails } from "@/types/movie";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import { Swiper, SwiperSlide } from "swiper/react";
//@ts-ignore
import "swiper/css";
import moment from "moment";

export default function SimpleSlider({
  mediaDetails,
}: {
  mediaDetails: IMediaDetails[];
}) {
  return (
    <div>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        speed={500}
        className="w-full mx-auto"
      >
        {mediaDetails.map((media) => (
          <SwiperSlide key={media.id}>
            <div className="w-full h-[50vh] rounded-3xl overflow-hidden p-4 flex justify-between items-center relative">
              <div className="absolute top-0 rounded-3xl overflow-hidden left-0 w-full h-full -z-10 bg-black/50 backdrop-blur-sm">
                <img
                  src={`https://image.tmdb.org/t/p/original/${media.backdrop_path}`}
                  alt={media.title}
                  className="w-full h-full object-cover opacity-20 blur-md"
                />
              </div>
              <div className="h-full flex flex-col justify-between space-y-4 md:w-2/3 p-8 py-16 z-20">
                <h1 className="text-5xl font-bold">
                  {media.title || media.name}
                </h1>
                {/* <Separator className="my-4" /> */}
                <div className="flex items-center space-x-4 capitalize">
                  <p>{media.media_type || "Movie"}</p>
                  <Separator orientation="vertical" />
                  <p>
                    {moment(media.release_date || media.first_air_date).format(
                      "ll"
                    )}
                  </p>
                  <Separator orientation="vertical" />
                  <p className="flex items-center space-x-2">
                    <p>{media.vote_average.toFixed(2)}</p>
                    <Star className="fill-yellow-400 text-yellow-400 w-4 h-4" />
                  </p>
                </div>
                {/* <Separator className="my-4" /> */}
                <p className="text-lg line-clamp-3">{media.overview}</p>
                <div className="flex items-center space-x-4 py-2">
                  <Link to={`/details/${media.media_type}/${media.id}`}>
                    <Button variant={"default"} className="text-xl p-6">
                      <PlayIcon className="w-4 h-4 fill-secondary" />
                      Play Now
                    </Button>
                  </Link>
                  <Button variant={"default"} className="rounded-full p-6">
                    <Heart />
                  </Button>
                </div>
              </div>
              <div className="relative w-full bg-black z-10">
                <img
                  src={`https://image.tmdb.org/t/p/original/${media.poster_path}`}
                  alt={media.title}
                  className="h-[110vh] rotate-[15deg] w-[90vw] object-cover top-1/2 right-24  absolute -translate-y-1/2"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
