"use client";
import { useState } from "react";
import axios from "axios";
import SingleInput from "@/components/library/Inputs/SingleInput/singleInput";
import Button from "@/components/library/buttons/button";
import styles from "./InventoryPage.module.css";
import SelectMenu from "@/components/library/select-menus/select-menu";

const defaultInventory = {
  rice: 0,
  vegetables: 0,
  spices: 0,
  chicken: 0,
  lentils: 0,
  flour: 0,
  oil: 0,
  paneer: 0,
  butter: 0,
  onions: 0,
  fish: 0,
  yogurt: 0,
  sugar: 0,
  fruits: 0,
};

const dayTypeOptions = [
  { value: "regular", label: "Regular" },
  { value: "fest", label: "Fest" },
  { value: "exam", label: "Exam" },
  { value: "weekend", label: "Weekend" },
  { value: "event_weekend", label: "Event Weekend" },
  { value: "event_weekday", label: "Event Weekday" },
];

const InventoryPage = () => {
  const [inventory, setInventory] = useState<Record<string, number>>(defaultInventory);
  const [dayType, setDayType] = useState<string>("regular");
  const [predictions, setPredictions] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, item: string) => {
    const value = parseFloat(e.target.value);
    setPredictions(null);
    setInventory((prev) => ({
      ...prev,
      [item]: isNaN(value) ? 0 : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setPredictions(null);

    const payload = {
      day_type: dayType,
      inventory: inventory,
    };

    try {
      const response = await axios.post(
        "https://python-backend-xiup.onrender.com/predict",
        payload
      );
      setPredictions(response.data.predictions);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching predictions.");
    } finally {
      setLoading(false);
    }
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const isTablet = typeof window !== "undefined" && window.innerWidth < 1024;

  return (
    <div className={styles.main}>
      <h1 className={styles.head}>Inventory Prediction</h1>
      <div>
        <div className={styles.menu}>
        <SelectMenu
          defaultValue="regular"
          options={dayTypeOptions}
          onChange={(value) => {
            setDayType(value);
            setPredictions(null); 
          }}
        />
        </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {Object.entries(inventory).map(([item, value]) => (
          <div key={item} className={styles.card}>
            <label htmlFor={item} className={styles.label}>
              {item} (in kg)
            </label>
            <SingleInput
              type="number"
              holder={`Enter quantity for ${item}`}
              value={value}
              onChange={(e) => handleChange(e, item)}
            />
          </div>
        ))}
      </div>
      </div>

      <div className={styles.center}>
        <Button
          disabled={loading}
          variant="Primary"
          onClick={handleSubmit}
          text={loading ? "Submitting..." : "Submit"}
        />
      </div>

      {error && <div className={styles.error}>Error: {error}</div>}

      {predictions && (
        <div className={styles.result}>
          <h2 className={styles.resultHeading}>Predicted Inventory</h2>
          <div
            className={`${styles.grid} ${
              isMobile ? styles.grid1 : isTablet ? styles.grid2 : styles.grid3
            }`}
          >
            {Object.entries(predictions).map(([item, quantity]) => (
              <div key={item} className={styles.resultCard}>
                <h3 className={styles.label}>{item}</h3>
                <p>Predicted Quantity: {quantity} plates</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
