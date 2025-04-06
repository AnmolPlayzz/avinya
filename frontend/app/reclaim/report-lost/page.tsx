"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SingleInput from "@/components/library/Inputs/SingleInput/singleInput";
import styles from "./lostPage.module.css";
import Button from "@/components/library/buttons/button";

interface ItemData {
  name: string;
  description: string;
  dateLost: string;
  dateFound: string;
  location: string;
}

const ReportPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"lost" | "found">("lost");
  const [itemData, setItemData] = useState<ItemData>({
    name: "",
    description: "",
    dateLost: "",
    dateFound: "",
    location: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItemData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleTabChange = (tab: "lost" | "found") => {
    setActiveTab(tab);
    setItemData({
      name: "",
      description: "",
      dateLost: "",
      dateFound: "",
      location: "",
    });
    setImageFile(null);
    setSuccessMessage("");
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", itemData.name);
      formData.append("description", itemData.description);
      formData.append("location", itemData.location);

      if (activeTab === "lost") {
        formData.append("date", itemData.dateLost || "");
      } else {
        formData.append("date", itemData.dateFound || "");
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const endpoint =
        activeTab === "lost"
          ? "https://avinya-iv0j.onrender.com/api/v1/lost-and-found/lost-input"
          : "https://avinya-iv0j.onrender.com/api/v1/lost-and-found/found-input";

      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      setSuccessMessage(
        `${activeTab === "lost" ? "Lost" : "Found"} item reported successfully!`
      );

      setTimeout(() => {
        router.push(
          activeTab === "lost" ? "/reclaim/report-found" : "/reclaim/report-found"
        );
      }, 2000);
    } catch (err: any) {
      console.error(
        `Error adding ${activeTab} item:`,
        err.message || `An error occurred while adding the ${activeTab} item.`
      );
    }
  };

  const dateField = activeTab === "lost" ? "dateLost" : "dateFound";
  const dateLabel = activeTab === "lost" ? "Date Lost:" : "Date Found:";
  const isFormValid =
    itemData.name &&
    itemData.description &&
    (activeTab === "lost" ? itemData.dateLost : itemData.dateFound) &&
    itemData.location;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {activeTab === "lost" ? "Report Lost Item" : "Report Found Item"}
      </h1>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.button} ${activeTab === "lost" ? styles.active : ""}`}
          onClick={() => handleTabChange("lost")}
        >
          Report Lost
        </button>
        <button
          className={`${styles.button} ${activeTab === "found" ? styles.active : ""}`}
          onClick={() => handleTabChange("found")}
        >
          Report Found
        </button>
      </div>
      <p className={styles.subtitle}>
        Please fill out the form below to report a {activeTab} item.
      </p>

      <div className={styles.formWrapper}>
        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}
        <form className={styles.form} onSubmit={submitForm}>
          <div>
            <label htmlFor="name" className={styles.label}>Name:</label>
            <SingleInput
              name="name"
              type="text"
              holder="Enter the item's name"
              value={itemData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description" className={styles.label}>Description:</label>
            <SingleInput
              name="description"
              type="text"
              holder="Provide a brief description"
              value={itemData.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor={dateField} className={styles.label}>{dateLabel}</label>
            <SingleInput
              name={dateField}
              type="datetime-local"
              value={itemData[dateField] as string}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="location" className={styles.label}>Location:</label>
            <SingleInput
              name="location"
              type="text"
              holder={`Enter the location where the item was ${activeTab}`}
              value={itemData.location}
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
            onClick={submitForm}
            disabled={!isFormValid}
          />
        </form>
      </div>
    </div>
  );
};

export default ReportPage;
