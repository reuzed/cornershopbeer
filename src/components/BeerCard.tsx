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
      className="group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
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
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={beer.pic_link}
          alt={beer.name}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-lg font-bold text-gray-800 truncate">
          {beer.name}
        </h3>
        <p className="text-sm text-gray-600">{beer.brewery}</p>
        <p className="text-sm font-semibold text-indigo-600">{beer.abv}% ABV</p>
      </div>
    </div>
  );
};

export default BeerCard;
