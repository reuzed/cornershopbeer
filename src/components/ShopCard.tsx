import React from "react";
import { useNavigate } from "react-router-dom";
import type { Shop } from "../types/Shop";

interface ShopCardProps {
  shop: Shop;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  const navigate = useNavigate();
  return (
    <div
      className="group cursor-pointer relative overflow-hidden bg-white aspect-square hover:scale-105 transition-transform duration-200"
      onClick={() => navigate(`/shops/${shop.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") navigate(`/shops/${shop.id}`);
      }}
      aria-label={`View ${shop.name}`}
    >
      {shop.pic_link && (
        <img
          src={shop.pic_link}
          alt={shop.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 p-3 translate-y-full group-hover:translate-y-0 transition-all duration-200">
        <h3 className="text-white font-bold text-lg lowercase text-center">
          {shop.name}
        </h3>
      </div>
    </div>
  );
};

export default ShopCard;
