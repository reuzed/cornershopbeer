import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Shop } from "../types/Shop";
import axios from "axios";
import LoadingGrid from "../components/LoadingGrid";

const ShopDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shop, setShop] = React.useState<Shop | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchShop = async () => {
      setLoading(true);
      try {
        const res = await axios.get<Shop[]>(
          `${import.meta.env.VITE_BASE_URL}/shops`
        );
        const s = res.data.find((sh) => sh.id === id);
        if (!s) {
          setError("shop not found");
        } else {
          setShop(s);
        }
      } catch (err) {
        console.error(err);
        setError("failed to fetch shop");
      } finally {
        setLoading(false);
      }
    };
    fetchShop();
  }, [id]);

  if (loading) return <LoadingGrid />;
  if (error || !shop)
    return (
      <div className="min-h-screen bg-green-600 flex items-center justify-center">
        <p className="text-white text-2xl lowercase">
          {error ?? "shop not found"}
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-green-600">
      <header className="px-6 py-8 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
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

      <main className="px-6 pb-12 flex flex-col items-center">
        <img
          src={shop.pic_link}
          alt={shop.name}
          className="w-full max-w-lg object-contain mb-8 bg-white"
        />
        <h1 className="text-5xl font-bold text-white lowercase mb-6 text-center">
          {shop.name}
        </h1>
        <div className="space-y-4 text-white text-xl text-center">
          {shop.website_link && (
            <div>
              <a
                href={shop.website_link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                website
              </a>
            </div>
          )}
          {shop.maps_link && (
            <div>
              <a
                href={shop.maps_link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                view on maps
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ShopDetail;
