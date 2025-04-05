"use client";
import { useState } from "react";
import { scholarships } from "./scholarship";

const ScholarshipPage = () => {
  const [error, setError] = useState<string | null>(null);

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        Available Scholarships
      </h1>
      {scholarships.length === 0 ? (
        <p className="text-center text-gray-600">No scholarships found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarships.map((scholarship, index) => (
            <div
              key={index}
              className="bg-white/20 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={scholarship.image}
                alt={scholarship.name}
                className="w-96 h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {scholarship.name}
                </h2>
                <p className="text-gray-600 mb-2">{scholarship.award}</p>
                <p className="text-gray-800 font-medium mb-4">
                  Eligibility: {scholarship.eligibility}
                </p>
                <p className="text-gray-500 mb-2">
                  {scholarship.tentative_date}
                </p>
                { scholarship.deadline && <p className="text-gray-500 mb-2">Deadline: {scholarship.deadline}</p> }
                <a
                  href={scholarship.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScholarshipPage;