import React from "react";
import { useNavigate } from "react-router-dom";

interface BinaryMenuProps {
  leftLink: string;
  rightLink: string;
  leftTitle: string;
  rightTitle: string;
  leftColor: string;
  rightColor: string;
  leftTextColor: string;
  rightTextColor: string;
}

const BinaryMenu: React.FC<BinaryMenuProps> = ({
  leftLink,
  rightLink,
  leftTitle,
  rightTitle,
  leftColor,
  rightColor,
  leftTextColor,
  rightTextColor,
}) => {
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    navigate(link);
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      {/* Left/Top Section */}
      <div
        className="relative flex-1 flex items-center justify-center cursor-pointer transition-all duration-200 hover:flex-[1.05]"
        style={{ backgroundColor: leftColor }}
        onClick={() => handleClick(leftLink)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleClick(leftLink);
          }
        }}
        aria-label={`Navigate to ${leftTitle}`}
      >
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold select-none"
          style={{ color: leftTextColor }}
        >
          {leftTitle}
        </h1>
      </div>

      {/* Right/Bottom Section */}
      <div
        className="relative flex-1 flex items-center justify-center cursor-pointer transition-all duration-200 hover:flex-[1.05]"
        style={{ backgroundColor: rightColor }}
        onClick={() => handleClick(rightLink)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleClick(rightLink);
          }
        }}
        aria-label={`Navigate to ${rightTitle}`}
      >
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold select-none"
          style={{ color: rightTextColor }}
        >
          {rightTitle}
        </h1>
      </div>
    </div>
  );
};

export default BinaryMenu;

// Example usage:
/*
import BinaryMenu from './BinaryMenu';

function App() {
  return (
    <div>
      <BinaryMenu
        leftLink="/option-one"
        rightLink="/option-two"
        leftTitle="beers"
        rightTitle="shops"
        leftColor="#3B82F6"
        rightColor="#10B981"
        leftTextColor="#F9FAFB"
        rightTextColor="#F9FAFB"
      />
      
      <BinaryMenu
        leftLink="/option-three"
        rightLink="/option-four"
        leftTitle="food"
        rightTitle="drinks"
        leftColor="#DC2626"
        rightColor="#7C3AED"
        leftTextColor="#FFFFFF"
        rightTextColor="#FFFFFF"
      />
    </div>
  );
}
*/
