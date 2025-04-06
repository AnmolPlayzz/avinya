"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from "@/components/library/loader/loader";
import styles from "./page.module.css";
import Image from "next/image";
import Button from "@/components/library/buttons/button";
import Dialog from "@/components/library/dialog-box/dialog-box";

interface LostItem {
  id: number;
  name: string;
  description: string;
  dateLost: string;
  image_url: string;
  type: string;
  date: string;
}

const FoundPage = () => {
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>("");
  const [mode, setMode] = useState<boolean>(false);

  function handleCloseDialog() {
    setShowDetails(false);
  }

  function handleOpenDialog(url: string) {
    setCurrent(url);
    setShowDetails(true);
  }
  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const response = await axios.get('https://positive-elna-hackathonorg123-25128812.koyeb.app/api/v1/lost-and-found');
        const data: LostItem[] = response.data.data;
        setLostItems(data);
      } catch (err:  unknown | never ) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An error occurred while fetching lost items.');
        }
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
        padding: "0 20px",
        width: "100%",
        maxWidth: "1000px",
      }}>
        <h1 className={styles.header}>{!mode ? "Lost" : "Found"} Items</h1>
        <div className={styles.tabs}>
          <button className={!mode ? styles.active + " " + styles.button : styles.button} onClick={() => setMode(false)}>Lost</button>
          <button className={mode ? styles.active + " " + styles.button : styles.button} onClick={() => setMode(true)}>Found</button>
        </div>
        {lostItems.length === 0 ? (
            <p>No lost/found items found.</p>
        ) : (
            <>

              <ul style={{
                display: mode ? "none" : "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
                margin: "20px 0",

              }}>
                {lostItems.map((item, i) => (item.type == "lost" ?
                        <li className={styles.card} key={i}>
                          <div className={styles.image}>
                            <Image style={{
                              objectFit: "contain",
                              objectPosition: "center",
                              borderRadius: "10px",
                              overflow: "hidden",
                              border: "1px solid rgba(87, 87, 87, 0.5)",
                            }} src={item.image_url} alt={item.description} fill/>
                          </div>
                          <h2 style={{
                            fontWeight: "900",
                            fontSize: "24px",
                            marginTop: "10px",
                          }}>{item.name}</h2>
                          <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "column",
                            padding: "5px 10px",
                            backgroundColor: "rgba(21,21,21,0.73)",
                            borderRadius: "5px",
                            marginBottom: "8px",

                          }}>
                            <p style={{
                              fontSize: "18px",
                              fontWeight: "800",
                              color: "#ffffff",
                              marginBottom: "5px",
                            }}>
                              Description
                            </p>
                            <p style={{
                              fontSize: "14px",
                              fontWeight: "300",
                              color: "#ffffff",
                              marginBottom: "5px",
                            }}>
                              {item.description}
                            </p>
                          </div>
                          <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "column",
                            padding: "5px 10px",
                            backgroundColor: "rgba(21,21,21,0.73)",
                            borderRadius: "5px",
                            marginBottom: "5px",

                          }}>
                            <p style={{
                              fontSize: "18px",
                              fontWeight: "800",
                              color: "#ffffff",
                              marginBottom: "5px",
                            }}>
                              Date Lost
                            </p>
                            <p style={{
                              fontSize: "14px",
                              fontWeight: "300",
                              color: "#ffffff",
                              marginBottom: "5px",
                            }}>
                              {new Date(item.date).toLocaleDateString()}
                            </p>

                          </div>
                          <Button width={140} height={40} text={"View Image"}
                                  onClick={() => handleOpenDialog(item.image_url)} disabled={false}
                                  variant={"Secondary"}/>

                        </li> : null
                ))}

              </ul>
              <ul style={{
                display: !mode ? "none" : "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
                margin: "20px 0",

              }}>
                {lostItems.map((item, i) => (item.type == "found" ?
                        <li className={styles.card} key={i}>
                          <div className={styles.image}>
                            <Image style={{
                              objectFit: "contain",
                              objectPosition: "center",
                              borderRadius: "10px",
                              overflow: "hidden",
                              border: "1px solid rgba(87, 87, 87, 0.5)",
                            }} src={item.image_url} alt={item.description} fill/>
                          </div>
                          <h2 style={{
                            fontWeight: "900",
                            fontSize: "24px",
                            marginTop: "10px",
                          }}>{item.name}</h2>
                          <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "column",
                            padding: "5px 10px",
                            backgroundColor: "rgba(21,21,21,0.73)",
                            borderRadius: "5px",
                            marginBottom: "8px",

                          }}>
                            <p style={{
                              fontSize: "18px",
                              fontWeight: "800",
                              color: "#ffffff",
                              marginBottom: "5px",
                            }}>
                              Description
                            </p>
                            <p style={{
                              fontSize: "14px",
                              fontWeight: "300",
                              color: "#ffffff",
                              marginBottom: "5px",
                            }}>
                              {item.description}
                            </p>
                          </div>
                          <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "column",
                            padding: "5px 10px",
                            backgroundColor: "rgba(21,21,21,0.73)",
                            borderRadius: "5px",
                            marginBottom: "5px",

                          }}>
                            <p style={{
                              fontSize: "18px",
                              fontWeight: "800",
                              color: "#ffffff",
                              marginBottom: "5px",
                            }}>
                              Date Found
                            </p>
                            <p style={{
                              fontSize: "14px",
                              fontWeight: "300",
                              color: "#ffffff",
                              marginBottom: "5px",
                            }}>
                              {new Date(item.date).toLocaleDateString()}
                            </p>

                          </div>
                          <Button width={140} height={40} text={"View Image"}
                                  onClick={() => handleOpenDialog(item.image_url)} disabled={false}
                                  variant={"Secondary"}/>

                        </li> : null
                ))}

              </ul>
            </>
        )}
        <Dialog isOpen={showDetails}>
          <div style={{
            marginBottom: "20px",
          }} className={styles.image}>
            {current && <Image style={{
              objectFit: "contain",
              objectPosition: "center",
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid rgba(87, 87, 87, 0.5)",
            }} src={current ?? ""} alt={current ?? ""} fill/>}
          </div>
          <Button text={"Close"} onClick={handleCloseDialog} disabled={false} variant={"Danger"}/>
        </Dialog>
      </div>
  );
};

export default FoundPage;