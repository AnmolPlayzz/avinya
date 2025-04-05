"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Scholarship {
  id: number;
  name: string;
  description: string;
  eligibility: string;
}

const ScholarshipPage = () => {
//   const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const sampleData = {
    "day_type": "regular",
    "inventory": {
        "rice": 100,
        "vegetables": 80,
        "spices": 20,
        "chicken": 50,
        "lentils": 40,
        "flour": 60,
        "oil": 30,
        "paneer": 25,
        "butter": 15,
        "onions": 40,
        "fish": 30,
        "yogurt": 35,
        "sugar": 25,
        "fruits": 45
    }
}

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/predict", sampleData);
        console.log(response.data);
        // setScholarships(response.data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching scholarships.");
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
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
      <h1 className="text-3xl font-bold text-center mb-6">Available Scholarships</h1>
      {/* {scholarships.length === 0 ? (
        <p className="text-center text-gray-600">No scholarships found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship) => (
            <div key={scholarship.id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">{scholarship.name}</h2>
              <p className="text-gray-600 mb-2">{scholarship.description}</p>
              <p className="text-gray-800 font-medium">
                Eligibility: {scholarship.eligibility}
              </p>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default ScholarshipPage;