// pages/BeerDetail.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBeers } from "../context/beerContext";

const BeerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { beers } = useBeers();

  const beer = beers.find((b) => b.id === id);

  if (!beer) {
    return (
      <div className="min-h-screen bg-purple-600 flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-white text-2xl mb-8 lowercase">beer not found</p>
          <button
            onClick={() => navigate("/beers")}
            className="px-8 py-4 bg-white text-purple-600 font-bold lowercase text-xl hover:bg-gray-100 transition-colors"
          >
            back to beers
          </button>
        </div>
      </div>
    );
  }

  // Color palette for different ABV ranges
  const abvValue = parseFloat(beer.abv);
  const bgColor =
    abvValue < 4
      ? "bg-teal-500"
      : abvValue < 6
      ? "bg-blue-600"
      : abvValue < 8
      ? "bg-purple-600"
      : "bg-pink-600";

  return (
    <div className={`min-h-screen ${bgColor}`}>
      <header className="px-6 py-8 flex justify-between items-center">
        <button
          onClick={() => navigate("/beers")}
          className="text-white hover:bg-white hover:bg-opacity-20 p-3 rounded-full transition-colors"
          aria-label="Back to beers"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
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
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="aspect-square bg-white p-4">
              <img
                src={beer.pic_link}
                alt={beer.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info Section */}
            <div className="flex flex-col justify-center text-white">
              <h1 className="text-5xl lg:text-7xl font-bold lowercase mb-8">
                {beer.name}
              </h1>

              <div className="space-y-4 text-xl">
                <div>
                  <span className="opacity-80 lowercase">brewery: </span>
                  <span className="font-bold lowercase">{beer.brewery}</span>
                </div>

                <div>
                  <span className="opacity-80 lowercase">strength: </span>
                  <span className="font-bold">{beer.abv}% abv</span>
                </div>

                {beer.description && (
                  <div className="pt-6">
                    <p className="text-lg opacity-90 lowercase">
                      {beer.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Visual ABV indicator - minimalist style */}
              <div className="mt-12">
                <div className="w-full bg-white bg-opacity-20 h-2">
                  <div
                    className="h-full bg-white transition-all duration-500"
                    style={{
                      width: `${Math.min((abvValue / 12) * 100, 100)}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm opacity-60 lowercase">
                  <span>light</span>
                  <span>strong</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BeerDetail;
