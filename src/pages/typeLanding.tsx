import MainLayout from "@/components/home";
import { useParams } from "react-router-dom";
const TypeLanding = () => {
  const { type } = useParams();
  return <MainLayout type={type as "all" | "movie" | "tv"} />;
};

export default TypeLanding;
