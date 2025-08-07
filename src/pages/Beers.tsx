// pages/BeerGallery.tsx
import React from "react";
import { useBeers } from "../context/beerContext";
import BeerCard from "../components/BeerCard";
import LoadingGrid from "../components/LoadingGrid";

const BeerGallery: React.FC = () => {
  const { beers, loading, error } = useBeers();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Beer Collection
            </h1>
          </div>
        </header>
        <LoadingGrid />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-800">Beer Collection</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {beers.map((beer) => (
            <BeerCard key={beer.id} beer={beer} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default BeerGallery;
