// pages/BeerGallery.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useBeers } from "../context/beerContext";
import BeerCard from "../components/BeerCard";
import LoadingGrid from "../components/LoadingGrid";

const BeerGallery: React.FC = () => {
  const { beers, loading, error } = useBeers();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-500">
        <header className="px-6 py-8">
          <h1 className="text-6xl md:text-8xl font-bold text-white lowercase">
            beers
          </h1>
        </header>
        <LoadingGrid />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-500 flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-white text-2xl mb-8 lowercase">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-white text-red-500 font-bold lowercase text-xl hover:bg-gray-100 transition-colors"
          >
            retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-500">
      <header className="px-6 py-8 flex justify-between items-center">
        <h1 className="text-6xl md:text-8xl font-bold text-white lowercase">
          beers
        </h1>
        <button
          onClick={() => navigate("/")}
          className="text-white hover:bg-white hover:bg-opacity-20 p-3 rounded-full transition-colors"
          aria-label="Home"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </button>
      </header>

      <main className="px-6 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {beers.map((beer) => (
            <BeerCard key={beer.id} beer={beer} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default BeerGallery;
