import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { ProfileItem } from "./item";
import { AddProfileDialog } from "./add";
import useUserStore from "@/store/user";
import { useNavigate } from "react-router-dom";
export function ProfileSelector() {
  const [isAddProfileOpen, setIsAddProfileOpen] = useState(false);
  const profiles = useUserStore((state) => state.profiles);
  const addProfile = useUserStore((state) => state.addProfile);
  const setActiveProfile = useUserStore((state) => state.setActiveProfile);
  const navigate = useNavigate();

  const handleProfileSelect = (profileId: string) => {
    setActiveProfile(profileId);
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen w-screen fixed top-0 left-0 flex flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-8">Who's watching?</h1>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl">
        {profiles.map((profile) => (
          <ProfileItem
            key={profile.id}
            name={profile.name}
            imageUrl={profile.imageUrl}
            onClick={() => handleProfileSelect(profile.id)}
          />
        ))}
        <div
          className="flex flex-col items-center space-y-2 cursor-pointer group"
          onClick={() => setIsAddProfileOpen(true)}
        >
          <div className="w-32 h-32 rounded-md bg-gray-800 flex items-center justify-center transition-all duration-200 group-hover:bg-gray-700">
            <PlusCircle className="w-16 h-16 text-gray-400 group-hover:text-white transition-colors duration-200" />
          </div>
          <span className="text-gray-400 group-hover:text-white transition-colors duration-200">
            Add Profile
          </span>
        </div>
      </div>
      <AddProfileDialog
        isOpen={isAddProfileOpen}
        onClose={() => setIsAddProfileOpen(false)}
        onAddProfile={addProfile}
      />
    </div>
  );
}
