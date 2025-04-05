"use client";

import { useState } from "react";
import axios from "axios";
import SingleInput from "@/components/library/Inputs/SingleInput/singleInput";
import styles from "./lostPage.module.css";
import Button from "@/components/library/buttons/button";

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLostItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const addLostItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", lostItem.name);
      formData.append("description", lostItem.description);
      formData.append("dateLost", lostItem.dateLost);
      formData.append("location", lostItem.location);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await axios.post(
        "https://avinya-iv0j.onrender.com/lost-items",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setSuccessMessage("Lost item added successfully!");
    } catch (err: any) {
      console.error(
        "Error adding lost item:",
        err.message || "An error occurred while adding the lost item."
      );
    }

    // Reset state
    setLostItem({
      name: "",
      description: "",
      dateLost: "",
      location: "",
    });
    setImageFile(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Report Lost Item</h1>
      <p className={styles.subtitle}>
        Please fill out the form below to report a lost item.
      </p>
      <div className={styles.formWrapper}>
        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}
        <form className={styles.form} onSubmit={addLostItem}>
          <div>
            <label htmlFor="name" className={styles.label}>Name:</label>
            <SingleInput
              type="text"
              holder="Enter the item's name"
              value={lostItem.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description" className={styles.label}>Description:</label>
            <SingleInput
              type="text"
              holder="Provide a brief description"
              value={lostItem.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="dateLost" className={styles.label}>Date Lost:</label>
            <SingleInput
              type="datetime-local"
              holder=""
              value={lostItem.dateLost}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="location" className={styles.label}>Location:</label>
            <SingleInput
              type="text"
              holder="Enter the location where the item was lost"
              value={lostItem.location}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="image" className={styles.label}>Image:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.fileInput}
            />
          </div>
          <Button
            text="Submit"
            variant="Primary"
            onClick={addLostItem}
            disabled={!lostItem.name || !lostItem.description || !lostItem.dateLost || !lostItem.location}
          />
        </form>
      </div>
    </div>
  );
};

export default LostPage;
