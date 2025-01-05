import { IMediaDetails } from "@/types/movie";
import MediaCard from "./mediaCard";
import { Swiper, SwiperSlide } from "swiper/react";
//@ts-ignore
import "swiper/css";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRef } from "react";

const MySlider = ({
  mediaDetails,
  heading,
}: {
  mediaDetails: IMediaDetails[];
  heading?: string;
}) => {
  const swiperRef = useRef<any>(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="space-y-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold w-full">
          {heading || "Heading"}
        </h1>
        <div className="w-full flex justify-end items-center space-x-2">
          <Button onClick={handlePrev}>
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button onClick={handleNext}>
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div>
        <Swiper
          ref={swiperRef}
          spaceBetween={10}
          slidesPerView={6}
          speed={500}
          className="w-full mx-auto"
        >
          {mediaDetails.map((media) => (
            <SwiperSlide key={media.id}>
              <MediaCard mediaDetails={media} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MySlider;
