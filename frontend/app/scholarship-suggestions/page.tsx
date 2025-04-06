"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Button from "@/components/library/buttons/button";
import { scholarships } from "./scholarship";

const ResumeUploadPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedImage(file || null);
    setError(null);
    setSuccess(false);
  };
  
  const handlePythonBackend = async () => {
    if (!selectedImage) {
      setError("Please select an image");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("resume", selectedImage);

      const res = await fetch("https://philosophical-swan-tanmay-personal-cd9d5e36.koyeb.app/recommend", {
        method: "POST",
        body: formData,
      });
      console.log("Response from Python backend:", res);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Success:", data);
      setSuccess(true);
      // Handle the response data here
    } catch (error: any) {
      console.error("Error fetching data from Python backend:", error);
      setError(error.message || "Failed to process resume");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.main}>
      
      <h1 className={styles.title}>
        Find Matching Scholarships
      </h1>
      
      <div className={styles.uploadContainer}>
        <p className={styles.uploadDescription}>
          Upload your resume to find scholarships that match your qualifications and background
        </p>
        
        <div className={styles.formContainer}>
          <input 
            type="file" 
            accept="image/png, image/jpeg, image/jpg" 
            onChange={handleImageChange}
            className={styles.fileInput}
          />
          
          <Button
            onClick={handlePythonBackend}
            disabled={isSubmitting}
            text="Upload Resume"
            variant="Primary"
            width={160}
        />
          
          {error && (
            <div className="text-center text-red-500 text-lg font-semibold mt-4">
              Error: {error}
            </div>
          )}
          
          {success && (
            <div className="text-center text-green-500 text-lg font-semibold mt-4">
              Resume processed successfully! Check eligible scholarships below.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadPage;