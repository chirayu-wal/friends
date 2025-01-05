import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { servers } from "@/config/servers";
import { Button } from "../ui/button";
import { AlertTriangle, HeartIcon, Share } from "lucide-react";
import useUserStore from "@/store/user";

const PlayerOptions = ({ serverId }: { serverId?: string }) => {
  const { updatePreferences, getActiveProfile } = useUserStore();
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="  flex items-center justify-center space-x-6">
        <p className="text-xl font-medium">Server</p>
        <Select
          value={serverId || getActiveProfile()?.preferences.preferredServer}
          onValueChange={(value) =>
            updatePreferences({ preferredServer: value })
          }
        >
          <SelectTrigger className="border-none text-center text-xl p-6 w-[10rem] bg-white/10 rounded-lg">
            <SelectValue placeholder="Select server" />
          </SelectTrigger>
          <SelectContent className="bg-black border-none text-center">
            {servers.map((server) => (
              <SelectItem
                key={server.id}
                value={server.id}
                className="text-center bg-white/10 text-xl text-white font-medium px-4 mb-2"
              >
                {server.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Button>
          <HeartIcon className="w-4 h-4" />
          <span>Favorite</span>
        </Button>
        <Button>
          <Share className="w-4 h-4" />
          <span>Share</span>
        </Button>
        <Button>
          <AlertTriangle className="w-4 h-4" />
          <span>Report</span>
        </Button>
      </div>
    </div>
  );
};

export default PlayerOptions;
