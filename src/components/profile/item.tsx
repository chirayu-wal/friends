interface ProfileItemProps {
  name: string;
  imageUrl: string;
  onClick: () => void;
}

export function ProfileItem({ name, imageUrl, onClick }: ProfileItemProps) {
  return (
    <div
      className="flex flex-col items-center space-y-2 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative w-32 h-32 overflow-hidden rounded-md transition-all duration-200 group-hover:ring-4 group-hover:ring-white">
        <img
          src={imageUrl || "https://xsgames.co/randomusers/avatar.php?g=pixel"}
          alt={`${name}'s profile`}
          onError={(e) => {
            console.log("Error loading image");
            e.currentTarget.src =
              "https://xsgames.co/randomusers/avatar.php?g=pixel";
          }}
          className="transition-all duration-200 group-hover:scale-110 object-cover"
        />
      </div>
      <span className="text-gray-400 group-hover:text-white transition-colors duration-200">
        {name}
      </span>
    </div>
  );
}
