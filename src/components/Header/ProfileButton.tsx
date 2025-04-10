import React from "react";

type ProfileHeaderProps = {
  name: string;
  initial: string;
  backgroundColor?: string;
  textColor?: string;
};

const ProfileButton: React.FC<ProfileHeaderProps> = ({
  name,
  initial,
  backgroundColor = "bg-purple-900",
  textColor = "text-white",
}) => {
  return (
    <header className="w-full bg-gray-50 p-4 flex items-center">
      <div
        className={`${backgroundColor} ${textColor} w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold`}
      >
        {initial}
      </div>
      <div className="ml-4">
        <h1 className="text-purple-900 text-xl font-medium">{name}</h1>
      </div>
    </header>
  );
};
export default ProfileButton;