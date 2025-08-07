// context/BeerContext.tsx;
import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import type { Beer } from "../types/Beer";

interface BeerContextType {
  beers: Beer[];
  loading: boolean;
  error: string | null;
  fetchBeers: () => Promise<void>;
}

const BeerContext = createContext<BeerContextType | undefined>(undefined);

export const BeerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBeers = async () => {
    // Don't refetch if we already have data
    if (beers.length > 0) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<Beer[]>(
        `${import.meta.env.VITE_BASE_URL}/beers`
      );
      setBeers(response.data);
    } catch (err) {
      setError("Failed to fetch beers. Please try again.");
      console.error("Error fetching beers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeers();
  }, []);

  return (
    <BeerContext.Provider value={{ beers, loading, error, fetchBeers }}>
      {children}
    </BeerContext.Provider>
  );
};

export const useBeers = () => {
  const context = useContext(BeerContext);
  if (context === undefined) {
    throw new Error("useBeers must be used within a BeerProvider");
  }
  return context;
};
