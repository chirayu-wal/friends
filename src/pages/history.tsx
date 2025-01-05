import { SearchIcon, Trash2Icon } from "lucide-react";
import useUserStore from "@/store/user";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { HistoryMediaCard } from "@/components/history/historyCard";

const History = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { getActiveProfile } = useUserStore();
  const activeProfile = getActiveProfile();
  const history = activeProfile?.history;

  // Group history items by date
  const groupedHistory = history
    ?.filter((item) =>
      (item.mediaDetails.title || item.mediaDetails.name)
        ?.toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    )
    .reduce((groups: Record<string, typeof history>, item) => {
      const date = new Date(item.watchedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
      return groups;
    }, {});

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-8">
        <div className="text-4xl font-bold">
          Watch History
          <span className="text-lg text-gray-400 pl-2">
            ({history?.length} Items)
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-2 space-y-6">
          {Object.entries(groupedHistory || {})
            .sort(
              ([dateA], [dateB]) =>
                new Date(dateB).getTime() - new Date(dateA).getTime()
            )
            .map(([date, items]) => (
              <div key={date} className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-400">{date}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {items.map((item) => (
                    <HistoryMediaCard historyItem={item} />
                  ))}
                </div>
              </div>
            ))}
        </div>
        <div className="col-span-1">
          <div className="flex flex-col space-y-6 mt-12">
            <div className="relative w-full">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search In History"
                className="bg-white/10 backdrop-blur-lg border-none rounded-xl w-full px-8 py-8 text-xl"
              />
              <SearchIcon className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
            <button className="w-full bg-white/10 rounded-xl flex items-center justify-center space-x-4 p-4">
              <Trash2Icon className="w-4 h-4" />
              <span className="text-white">Clear Watch History</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
