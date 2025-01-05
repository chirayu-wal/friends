import useUserStore from "@/store/user";
import MediaCard from "@/components/common/mediaCard";
const Watchlist = () => {
  const { getActiveProfile } = useUserStore();
  const activeProfile = getActiveProfile();
  const watchlist = activeProfile?.watchlist;
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">
          Watchlist
          <span className="text-sm text-gray-400 pl-2">
            ({watchlist?.length} results)
          </span>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {watchlist?.map((media) => (
          <MediaCard mediaDetails={media} key={media.id} />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
