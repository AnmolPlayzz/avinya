"use client";
import axios from "axios";
import { useState } from "react";

const NutritionPage = () => {
  const [barcode, setBarcode] = useState<string>("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchNutrition = async () => {
    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
      );
      console.log(response.data);
      setData(response.data);
      setError(null); // Clear any previous errors
    } catch (error: any) {
      console.error("Error fetching nutrition data:", error);
      setData(null); // Clear previous data on error
      setError(
        error.message || "Failed to fetch nutrition data. Please try again."
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nutrition Information</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Enter barcode"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
        <button
          onClick={fetchNutrition}
          className="border-2 border-gray-500 text-white font-bold py-2 px-2 rounded"
        >
          Get Info
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {data && data.product && (
        <div className="flex shadow-md rounded px-8 pt-6 pb-8 mb-4">
          
          <div>
            <img
            src={data.product.image_url}
            alt={data.product.product_name}
            className="mb-4 rounded"
            />
            </div>
            <div>

          <h1 className="text-xl font-bold mb-2">{data.product.product_name}</h1>
          <p className="mb-2">
            <span className="font-bold">Ingredients:</span> {data.product.ingredients_text}
          </p>
          <p className="mb-2">
            <span className="font-bold">Calories:</span> {data.product.nutriments?.energy} KJ
          </p>
          <p className="mb-2">
            <span className="font-bold">Protein:</span> {data.product.nutriments?.proteins}
          </p>
          <p className="mb-2">
            <span className="font-bold">Fat:</span> {data.product.nutriments?.fat}{data.product.nutriments?.fat_unit}
          </p>
          <p className="mb-2">
            <span className="font-bold">Carbohydrates:</span> {data.product.nutriments?.carbohydrates}
          </p>
          <a href={data.product.link}>Product Page</a>
            </div>
        </div>
      )}
    </div>
  );
};

export default NutritionPage;