import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BeersAdd() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [abv, setAbv] = useState("");
  const [brewery, setBrewery] = useState("");
  const [picLink, setPicLink] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/beer`, {
        id: 0,
        name,
        abv: parseFloat(abv) || 0,
        brewery,
        pic_link: picLink,
        description,
      });
      setMessage("beer added!");
      // reset form
      setName("");
      setAbv("");
      setBrewery("");
      setPicLink("");
      setDescription("");
    } catch (err) {
      setMessage("failed to add beer");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-600">
      <header className="px-6 py-8 flex justify-between items-center">
        <button
          onClick={() => navigate("/beers-menu")}
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
          add beer
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
          <div>
            <label className="block mb-1 text-sm font-semibold lowercase">
              name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-4 py-2 rounded focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold lowercase">
              abv %
            </label>
            <input
              type="number"
              step="0.1"
              value={abv}
              onChange={(e) => setAbv(e.target.value)}
              className="w-full border px-4 py-2 rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold lowercase">
              brewery
            </label>
            <input
              type="text"
              value={brewery}
              onChange={(e) => setBrewery(e.target.value)}
              className="w-full border px-4 py-2 rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold lowercase">
              picture url
            </label>
            <input
              type="url"
              value={picLink}
              onChange={(e) => setPicLink(e.target.value)}
              className="w-full border px-4 py-2 rounded focus:outline-none"
            />
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
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white font-bold rounded hover:bg-purple-700 transition-colors lowercase disabled:opacity-50"
          >
            {loading ? "adding..." : "add beer"}
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
