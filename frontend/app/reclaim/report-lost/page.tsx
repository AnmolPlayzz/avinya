"use client";
import { useState } from "react";
import axios from "axios";

interface LostItem {
  name: string;
  description: string;
  dateLost: string;
  location: string;
}

const LostPage = () => {
  const [lostItem, setLostItem] = useState<LostItem>({
    name: "",
    description: "",
    dateLost: "",
    location: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLostItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addLostItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://avinya-iv0j.onrender.com/lost-items",
        lostItem
      );
      console.log(response.data);
      setSuccessMessage("Lost item added successfully!");
    } catch (err: any) {
      console.error(
        "Error adding lost item:",
        err.message || "An error occurred while adding the lost item."
      );
    }
    setLostItem({
      name: "",
      description: "",
      dateLost: "",
      location: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-2 text-gray-200">
        Report Lost Item
      </h1>
      <p className="text-center text-gray-200 mb-6">
        Please fill out the form below to report a lost item.
      </p>
      <div className="bg-white/10 shadow-lg rounded-lg p-8">
        {successMessage && (
          <div className="mb-4 text-green-600 font-semibold text-center">
            {successMessage}
          </div>
        )}
        <form className="space-y-6" onSubmit={addLostItem}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={lostItem.name}
                onChange={handleInputChange}
                placeholder="Enter the item's name"
                className="mt-1 block w-full rounded-md outline-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description:
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={lostItem.description}
                onChange={handleInputChange}
                placeholder="Provide a brief description"
                className="mt-1 block w-full rounded-md outline-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="dateLost"
                className="block text-sm font-medium"
              >
                Date Lost:
              </label>
              <input
                type="datetime-local"
                id="dateLost"
                name="dateLost"
                value={lostItem.dateLost}
                onChange={handleInputChange}
                className="mt-1 rounded-md outline-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium"
              >
                Location:
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={lostItem.location}
                onChange={handleInputChange}
                placeholder="Enter the location where the item was lost"
                className="mt-1 block w-full rounded-md outline-none"
              />
            </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white font-semibold py-2 px-4"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default LostPage;