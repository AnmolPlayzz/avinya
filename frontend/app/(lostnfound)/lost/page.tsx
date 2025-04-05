"use client";
import { useState } from "react";
import axios from "axios";
import { Navbar } from "@/components/Navbar";

interface LostItem {
  id: number;
  name: string;
  description: string;
  dateLost: string;
}

const LostPage = () => {
  const [lostItem, setLostItem] = useState<LostItem>({
    id: 1,
    name: "",
    description: "",
    dateLost: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLostItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    const addLostItem = async (e) => {
        e.preventDefault()
        try {
        const response = await axios.post("http://localhost:5000/lost-items", lostItem);
        console.log(response.data);
        } catch (err: any) {
        console.error("Error adding lost item:", err.message || "An error occurred while adding the lost item.");
        }
        setLostItem({
            id: 1,
            name: "",
            description: "",
            dateLost: "",
        });
    };

  return (
    <div className="max-w-4xl mx-auto p-6">
    <Navbar />
      <h1 className="text-3xl font-bold text-center mb-6">Lost Items</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={lostItem.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={lostItem.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="dateLost"
              className="block text-sm font-medium text-gray-700"
            >
              Date Lost:
            </label>
            <input
              type="datetime-local"
              id="dateLost"
              name="dateLost"
              value={lostItem.dateLost}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <button onClick={addLostItem} className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default LostPage;