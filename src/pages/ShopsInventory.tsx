import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { Shop } from "../types/Shop";
import { useBeers } from "../context/beerContext";
import SearchableDropdown from "../components/SearchableDropdown";
import type { Option } from "../components/SearchableDropdown";

export default function ShopsInventory() {
  const navigate = useNavigate();
  const { beers, loading: beersLoading } = useBeers();
  const beerOptions: Option[] = beers.map((b) => ({
    value: b.id,
    label: b.name,
  }));

  const [shops, setShops] = useState<Shop[]>([]);
  const [shopsLoading, setShopsLoading] = useState(false);

  const shopOptions: Option[] = shops.map((s) => ({
    value: s.id,
    label: s.name,
  }));

  const [selectedBeer, setSelectedBeer] = useState<string | null>(null);
  const [selectedShop, setSelectedShop] = useState<string | null>(null);
  const [price, setPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchShops = async () => {
      setShopsLoading(true);
      try {
        const res = await axios.get<Shop[]>(
          `${import.meta.env.VITE_BASE_URL}/shops`
        );
        setShops(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setShopsLoading(false);
      }
    };
    fetchShops();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBeer || !selectedShop) return;
    setSubmitting(true);
    setMessage(null);
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/shopbeer`, {
        beers_id: parseInt(selectedBeer),
        shops_id: parseInt(selectedShop),
        price: parseFloat(price) || 0,
      });
      setMessage("inventory added!");
      setSelectedBeer(null);
      setSelectedShop(null);
      setPrice("");
    } catch (err) {
      console.error(err);
      setMessage("failed to add inventory");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-600">
      <header className="px-6 py-8 flex justify-between items-center">
        <button
          onClick={() => navigate("/shops-add-menu")}
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
          add inventory
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
          {shopsLoading ? (
            <p className="text-center lowercase">loading shops...</p>
          ) : (
            <div>
              <label className="block mb-1 text-sm font-semibold lowercase">
                select shop
              </label>
              <SearchableDropdown
                options={shopOptions}
                selected={selectedShop}
                setSelected={setSelectedShop}
                placeholder="Start typing shop name..."
              />
            </div>
          )}

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

          <div>
            <label className="block mb-1 text-sm font-semibold lowercase">
              price
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border px-4 py-2 rounded focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !selectedBeer || !selectedShop}
            className="w-full py-3 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition-colors lowercase disabled:opacity-50"
          >
            {submitting ? "adding..." : "add to inventory"}
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
