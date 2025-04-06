"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Button from "@/components/library/buttons/button";
import Image from "next/image";
import { scholarships } from "../scholarships/scholarship";

const ResumeUploadPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentComponents, setCurrentComponents] = useState<any[]>(scholarships.slice(0, 4)); // Initialize with the first 4 scholarships

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedImage(file || null);
    setError(null);
    setSuccess(false);
  };
  
  const handlePythonBackend = async () => {
    setLoading(true);
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
      console.log("Success:", data.recommendations);
      setCurrentComponents(data.recommendations);

      setSuccess(true);
      setLoading(false);
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
          {!loading ?
            <Button
            onClick={handlePythonBackend}
            disabled={isSubmitting}
            text="Upload Resume"
            variant="Primary"
            width={160}
            /> :  <Button
            onClick={handlePythonBackend}
            disabled={isSubmitting}
            text="Uploading..."
            variant="Primary"
            width={160}
            /> 
          }
          
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

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {currentComponents?.length>0 && currentComponents.map((scholarship, index) => (
  <div
              key={index}
              className={styles.card}
            >
              <div className="p-4" style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}>
                <div style={{
                  width: "100px",
                  height: "100px",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "10px",
                }}>
                  <Image
                    src={scholarship.image}
                    alt={scholarship.name}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    />
                </div>
                <h2 style={{
                  fontWeight: "800",
                  fontSize: "24px",
                }}>
                  {scholarship.name}
                </h2>
                <div style={{
                  display: "flex",
                  marginTop: "30px",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  padding: "5px 10px",
                  backgroundColor: "rgba(21,21,21,0.73)",
                  borderRadius: "5px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  marginBottom: "8px",
                }}>
                  <p style={{
                    fontSize: "18px",
                    fontWeight: "800",
                    color: "#ffffff",
                    marginBottom: "5px",
                  }}>
                    Award
                  </p>
                  <p style={{
                    fontSize: "14px",
                    fontWeight: "300",
                    color: "#ffffff",
                    marginBottom: "5px",
                  }}>
                    {scholarship.award}
                  </p>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  padding: "5px 10px",
                  backgroundColor: "rgba(21,21,21,0.73)",
                  borderRadius: "5px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  marginBottom: "8px",
                }}>
                  <p style={{
                    fontSize: "18px",
                    fontWeight: "800",
                    color: "#ffffff",
                    marginBottom: "5px",
                  }}>
                    Eligibility
                  </p>
                  <p style={{
                    fontSize: "14px",
                    fontWeight: "300",
                    color: "#ffffff",
                    marginBottom: "5px",
                  }}>
                    {scholarship.eligibility}
                  </p>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  padding: "5px 10px",
                  backgroundColor: "rgba(21,21,21,0.73)",
                  borderRadius: "5px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  marginBottom: "8px",
                }}>
                  <p style={{
                    fontSize: "18px",
                    fontWeight: "800",
                    color: "#ffffff",
                    marginBottom: "5px",
                  }}>
                    Tentative Date
                  </p>
                  <p style={{
                    fontSize: "14px",
                    fontWeight: "300",
                    color: "#ffffff",
                    marginBottom: "5px",
                  }}>
                    {scholarship.tentative_date}
                  </p>
                </div>
                {scholarship.deadline && <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  padding: "5px 10px",
                  backgroundColor: "rgba(21,21,21,0.73)",
                  borderRadius: "5px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  marginBottom: "8px",
                }}>
                  <p style={{
                    fontSize: "18px",
                    fontWeight: "800",
                    color: "#ffffff",
                    marginBottom: "5px",
                  }}>
                    Deadline
                  </p>
                  <p style={{
                    fontSize: "14px",
                    fontWeight: "300",
                    color: "#ffffff",
                    marginBottom: "5px",
                  }}>
                    {scholarship.deadline}
                  </p>
                </div>}
                <a
                  href={scholarship.link}
                  style={{
                    marginTop: "auto",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.lmLink}
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
                  </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadPage;