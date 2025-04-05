"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const ScholarshipPage = () => {
  const [scholarships, setScholarships] = useState([
    {
      name: "IET India Scholarship Award 2024",
      tentative_date: "Tentative launch date Apr 2025",
      deadline: "10 May",
      award: "₹10,00,000 worth of prizes",
      eligibility:
        "Open for students studying in the 1st, 2nd, 3rd, or 4th year of a full-time regular undergraduate engineering program (in any field)",
      last_updated: "01-06-2024",
      image:
        "https://d2w7l1p59qkl0r.cloudfront.net/static/scholarship_logo/logo_24389_1712825632.png",
      link: "https://www.buddy4study.com/page/iet-india-scholarship-awards",
    },
    {
      name: "JM Sethia Merit Scholarship Scheme 2024",
      tentative_date: "Tentative launch date May 2025",
      deadline: "",
      award: "Up to ₹1,000 per month for course duration",
      eligibility: "Students from Class 9 to Professional levels",
      last_updated: "17-05-2024",
      image:
        "https://s3-ap-southeast-1.amazonaws.com/cdn.buddy4study.com/static/scholarship_logo/logo_4e6915c9-1925-41a0-bb6c-7063391bbbca_JM-Sethia.png",
      link: "https://www.buddy4study.com/scholarship/jm-sethia-merit-scholarship-scheme-2024",
    },
  ]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get(
          "https://avinya-iv0j.onrender.com/scholarships"
        ); // Replace with your API endpoint
        setScholarships(response.data);
      } catch (err: any) {
        setError(
          err.message || "An error occurred while fetching scholarships."
        );
      }
    };

    // fetchScholarships();
  }, []);

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