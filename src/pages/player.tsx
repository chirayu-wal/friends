import MediaPlayer from "@/components/playerCommon";
import { useParams } from "react-router-dom";

const PlayerPage = () => {
  const { type, id } = useParams();
  return (
    <MediaPlayer type={type === "movie" ? "movie" : "tv"} id={id || ""} />
  );
};

export default PlayerPage;
