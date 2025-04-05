"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

interface LostItem {
  id: number;
  name: string;
  description: string;
  dateLost: string;
}

const FoundPage = () => {
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/lost-items');
        const data: LostItem[] = response.data;
        setLostItems(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching lost items.');
      } finally {
        setLoading(false);
      }
    };

    fetchLostItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(lostItems);
  return (
    <div>
      <h1>Lost Items</h1>
      {lostItems.length === 0 ? (
        <p>No lost items found.</p>
      ) : (
        <ul>
          {lostItems.map((item) => (
            <li key={item.id}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>Date Lost: {new Date(item.dateLost).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FoundPage;