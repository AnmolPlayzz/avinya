"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const InventoryPage = () => {
  const [predictions, setPredictions] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const sampleData = {
    day_type: "regular",
    inventory: {
      rice: 100,
      vegetables: 80,
      spices: 20,
      chicken: 50,
      lentils: 40,
      flour: 60,
      oil: 30,
      paneer: 25,
      butter: 15,
      onions: 40,
      fish: 30,
      yogurt: 35,
      sugar: 25,
      fruits: 45,
    },
  };

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.post(
          "https://python-backend-xiup.onrender.com/predict",
          sampleData
        );
        setPredictions(response.data.predictions); // Assuming the API returns predictions in this format
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching predictions.");
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Predicted Inventory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(predictions).map(([item, quantity]) => (
          <div
            key={item}
            className="bg-white shadow-md rounded-lg p-6 text-center"
          >
            <h2 className="text-xl font-semibold mb-2">{item}</h2>
            <p className="text-gray-600">Quantity: {quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;