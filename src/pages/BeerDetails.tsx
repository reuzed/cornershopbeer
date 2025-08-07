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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <p className="text-gray-600 mb-4">Beer not found</p>
          <button
            onClick={() => navigate("/beers")}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  // Determine background gradient based on ABV
  const abvValue = parseFloat(beer.abv);
  const bgGradient =
    abvValue < 5
      ? "from-teal-50 to-green-100"
      : abvValue < 7
      ? "from-blue-50 to-indigo-100"
      : "from-purple-50 to-pink-100";

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgGradient}`}>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/beers")}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
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
            Back to Collection
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Section */}
            <div className="aspect-square lg:aspect-auto lg:h-full bg-gray-100">
              <img
                src={beer.pic_link}
                alt={beer.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Info Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                {beer.name}
              </h1>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium w-24">
                    Brewery:
                  </span>
                  <span className="text-xl text-gray-800">{beer.brewery}</span>
                </div>

                <div className="flex items-center">
                  <span className="text-gray-600 font-medium w-24">ABV:</span>
                  <span className="text-xl font-semibold text-indigo-600">
                    {beer.abv}%
                  </span>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {beer.description}
                </p>
              </div>

              {/* Visual ABV indicator */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Strength</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {beer.abv}% ABV
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((abvValue / 12) * 100, 100)}%`,
                    }}
                  />
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
