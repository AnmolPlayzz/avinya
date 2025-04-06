"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { scholarships } from "./scholarship";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/library/pagination/pagination";

const ScholarshipPage = () => {
  const [filterData, ] = useState<any[]>(scholarships);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, ] = useState<string | null>(null);

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg font-semibold">
        Error: {error}
      </div>
    );
  }

  // Calculate pagination data
  const componentsPerPage = 6;
  const totalPages = Math.ceil(filterData.length / componentsPerPage);

  // Get current components
  const indexOfLastComponent = currentPage * componentsPerPage;
  const indexOfFirstComponent = indexOfLastComponent - componentsPerPage;
  const currentComponents = filterData.slice(indexOfFirstComponent, indexOfLastComponent);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`Page changed to ${page}`);
  };

  return (
    <div className={styles.main}>
      <div className={styles.navigationBar}>
        <Link href="/scholarship-suggestions" className={styles.findMatchingButton}>
          Find Matching Scholarships
        </Link>
      </div>
      
      <h1 className={styles.head}>
        Available Scholarships
      </h1>
      
      {scholarships.length === 0 ? (
        <p className="text-center text-gray-600">No scholarships found.</p>
      ) : (
        <div style={{
          maxWidth: "1200px",
        }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div style={{
            position: "fixed",
            left: "50%",
            bottom: "20px",
            transform: "translate(-50%, 0)",
            zIndex: "40",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(21,21,21,0.73)",
            borderRadius: "5px",
            border: "1px solid rgba(63, 63, 63, 0.73)",
          }}>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
          {currentComponents.map((scholarship, index) => (
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
      )}
    </div>
  );
};

export default ScholarshipPage;