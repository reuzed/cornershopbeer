// components/BeerCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import type { Beer } from "../types/Beer";

interface BeerCardProps {
  beer: Beer;
}

const BeerCard: React.FC<BeerCardProps> = ({ beer }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/beers/${beer.id}`);
  };

  return (
    <div
      className="group cursor-pointer relative overflow-hidden bg-white aspect-square hover:scale-105 transition-transform duration-200"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
      aria-label={`View details for ${beer.name}`}
    >
      <img
        src={beer.pic_link}
        alt={beer.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 p-3 translate-y-full group-hover:translate-y-0 transition-all duration-200">
        <h3 className="text-white font-bold text-lg lowercase">{beer.name}</h3>
        <p className="text-white text-sm opacity-90 lowercase">
          {beer.abv}% abv
        </p>
      </div>
    </div>
  );
};

export default BeerCard;
