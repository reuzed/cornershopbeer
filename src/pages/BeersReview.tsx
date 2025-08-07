import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBeers } from "../context/beerContext";
import SearchableDropdown, {
  type Option,
} from "../components/SearchableDropdown";

export default function BeersReview() {
  const navigate = useNavigate();
  const { beers, loading: beersLoading } = useBeers();

  /* --------------------------------------------------
   * Build dropdown options [value=id, label=name]
   * -------------------------------------------------- */
  const beerOptions: Option[] = beers.map((b) => ({
    value: b.id,
    label: b.name,
  }));

  /* ---------------------- Form state ---------------------- */
  const [selectedBeer, setSelectedBeer] = useState<string | null>(null);
  const [favourite, setFavourite] = useState(false);
  const [rating, setRating] = useState(0); // 0-17
  const [description, setDescription] = useState("");
  const today = new Date().toISOString().split("T")[0]; // inferred date
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const selectedBeerObj = beers.find((b) => b.id === selectedBeer);

  /* --------------------- Heart icon --------------------- */
  const HeartIcon: React.FC<{ filled: boolean; onClick: () => void }> = ({
    filled,
    onClick,
  }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-8 h-8 cursor-pointer transition-transform hover:scale-110"
      fill={filled ? "#ef4444" : "none"}
      stroke={filled ? "#ef4444" : "currentColor"}
      strokeWidth={1.5}
      onClick={onClick}
      aria-label="toggle favourite"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 7.247a5.974 5.974 0 00-8.447 0L12 8.586l-1.305-1.34a5.974 5.974 0 00-8.447 0 6.307 6.307 0 000 8.697L12 21.25l9.752-9.306a6.307 6.307 0 000-8.697z"
      />
    </svg>
  );

  /* ----------------------- Submit ----------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/beerreview`, {
        beers_id: selectedBeer ? parseInt(selectedBeer) : 0,
        favourite,
        rating,
        description,
        date: today,
      });
      setMessage("review added!");
      // reset (retain selected beer so user can add multiple quickly)
      setFavourite(false);
      setRating(0);
      setDescription("");
    } catch (err) {
      console.error(err);
      setMessage("failed to add review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-600 flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center">
        <button
          onClick={() => navigate("/beers-add-menu")}
          className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
          aria-label="Back"
        >
          <svg
            className="w-6 h-6"
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
        <h1 className="text-3xl md:text-5xl font-bold text-white lowercase text-center flex-1">
          review beer
        </h1>
        <button
          onClick={() => navigate("/")}
          className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
          aria-label="Home"
        >
          <svg
            className="w-6 h-6"
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

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6 pb-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl bg-white rounded-lg p-8 grid md:grid-cols-2 gap-8"
        >
          {/* Left side: form fields */}
          <div className="space-y-6">
            {/* Beer dropdown */}
            {beersLoading ? (
              <p className="text-center lowercase">loading beers...</p>
            ) : (
              <div>
                <label className="block mb-1 text-sm font-semibold lowercase">
                  review a beer
                </label>
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <SearchableDropdown
                      options={beerOptions}
                      selected={selectedBeer}
                      setSelected={setSelectedBeer}
                      placeholder="find beer..."
                    />
                  </div>
                  <HeartIcon
                    filled={favourite}
                    onClick={() => setFavourite((p) => !p)}
                  />
                </div>
              </div>
            )}

            {/* Rating slider */}
            <div>
              <label className="block mb-1 text-sm font-semibold lowercase">
                rating
              </label>
              <div className="flex items-center space-x-4 ">
                <input
                  type="range"
                  min={0}
                  max={17}
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="flex-1 h-2 rounded-full appearance-none bg-gray-200 slider-thumb-orange"
                />
                <span className="font-semibold">{rating} / 17</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 text-sm font-semibold lowercase">
                write
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border-2 border-gray-900 px-4 py-2 rounded focus:outline-none resize-none"
                rows={4}
              />
            </div>

            <button
              type="submit"
              disabled={submitting || !selectedBeer}
              className="w-full py-3 bg-orange-600 text-white font-bold rounded hover:bg-orange-700 transition-colors lowercase disabled:opacity-50"
            >
              {submitting ? "adding..." : "add review"}
            </button>
            {message && (
              <p className="text-center mt-2 lowercase font-semibold text-gray-700">
                {message}
              </p>
            )}
          </div>

          {/* Right side: beer image */}
          <div className="flex items-center justify-center">
            {selectedBeerObj ? (
              <img
                src={selectedBeerObj.pic_link}
                alt={selectedBeerObj.name}
                className="w-full h-auto max-h-96 object-contain rounded"
              />
            ) : (
              <p className="text-center lowercase text-gray-500">
                select a beer to preview its image
              </p>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
