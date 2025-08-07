import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBeers } from "../context/beerContext";
import SearchableDropdown, { Option } from "../components/SearchableDropdown";

export default function BeersReview() {
  const navigate = useNavigate();
  const { beers, loading: beersLoading } = useBeers();

  const beerOptions: Option[] = beers.map((b) => ({
    value: b.id,
    label: b.name,
  }));

  const [selectedBeer, setSelectedBeer] = useState<string | null>(null);
  const [favourite, setFavourite] = useState(false);
  const [rating, setRating] = useState("0");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/beerreview`, {
        favourite,
        rating: parseInt(rating) || 0,
        description,
        date,
      });
      setMessage("review added!");
      setFavourite(false);
      setRating("0");
      setDescription("");
      setSelectedBeer(null);
    } catch (err) {
      console.error(err);
      setMessage("failed to add review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-600">
      <header className="px-6 py-8 flex justify-between items-center">
        <button
          onClick={() => navigate("/beers-add-menu")}
          className="text-white hover:bg-white hover:bg-opacity-20 p-3 rounded-full transition-colors"
          aria-label="Back"
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
        <h1 className="text-4xl md:text-6xl font-bold text-white lowercase">
          review beer
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
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white p-6 rounded-lg space-y-4"
        >
          {beersLoading ? (
            <p className="text-center lowercase">loading beers...</p>
          ) : (
            <div>
              <label className="block mb-1 text-sm font-semibold lowercase">
                select beer
              </label>
              <SearchableDropdown
                options={beerOptions}
                selected={selectedBeer}
                setSelected={setSelectedBeer}
                placeholder="Start typing beer name..."
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="fav"
              checked={favourite}
              onChange={(e) => setFavourite(e.target.checked)}
            />
            <label htmlFor="fav" className="lowercase">
              favourite
            </label>
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold lowercase">
              rating (0-5)
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full border px-4 py-2 rounded focus:outline-none"
            >
              {[0, 1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r} className="lowercase">
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold lowercase">
              description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-4 py-2 rounded focus:outline-none"
              rows={4}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold lowercase">
              date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border px-4 py-2 rounded focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-orange-600 text-white font-bold rounded hover:bg-orange-700 transition-colors lowercase disabled:opacity-50"
          >
            {submitting ? "adding..." : "add review"}
          </button>
          {message && (
            <p className="text-center mt-4 lowercase font-semibold text-gray-700">
              {message}
            </p>
          )}
        </form>
      </main>
    </div>
  );
}
