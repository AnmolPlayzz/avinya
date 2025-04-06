"use client";

import { useState } from "react";
import SingleInput from "@/components/library/Inputs/SingleInput/singleInput";
import styles from "../reclaim/report-lost/lostPage.module.css";
import Button from "@/components/library/buttons/button";

interface ItemData {
    name: string;
    description: string;
}

const EventPage = () => {
    const [itemData, setItemData] = useState<ItemData>({
        name: "",
        description: "",
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

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", itemData.name);
            formData.append("discription", itemData.description);

            if (imageFile) {
                formData.append("image", imageFile);
            }

            const endpoint = "https://positive-elna-hackathonorg123-25128812.koyeb.app/api/v1/events/"

            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
                // Fetch automatically sets the correct Content-Type with boundary for FormData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            setSuccessMessage(
                `Event added successfully!`
            );

        } catch (err: any) {
            console.error(
                `Error adding event:`,
                err.message || `An error occurred while adding the event.`
            );
        }
    };

    const isFormValid =
        itemData.name &&
        itemData.description;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Add a new Event.
            </h1>
            <p className={styles.subtitle}>
                Please fill out the form below to add a new event.
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
                            holder="Enter the event's name"
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

export default EventPage;
