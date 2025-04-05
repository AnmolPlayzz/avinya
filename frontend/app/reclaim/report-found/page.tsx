"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from "@/components/library/loader/loader";
import styles from "./page.module.css";
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
        const response = await axios.get('https://avinya-iv0j.onrender.com/api/v1/lost-and-found');
        const data: LostItem[] = response.data.data;
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
    return <Loader />
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(lostItems);
  return (
    <div style={{
      margin: "120px auto",
      padding: "0 40px",
      width: "100%",
      maxWidth: "1000px",
    }}>
      <h1 className={styles.header}>Reclaim Items</h1>
      {lostItems.length === 0 ? (
        <p>No lost items found.</p>
      ) : (
        <ul>
          {lostItems.map((item,i) => (
            <li key={i}>
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