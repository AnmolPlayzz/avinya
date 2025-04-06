"use client";
import axios from "axios";
import { useRef, useState, useCallback, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Webcam from "react-webcam";
import styles from "./NutritionPage.module.css";
import Button from "@/components/library/buttons/button";
import SingleInput from "@/components/library/Inputs/SingleInput/singleInput";
import Chat from "@/components/chat-bot/page";

const NutritionPage = () => {
  const [barcode, setBarcode] = useState<string>("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<string>("environment");
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const webcamRef = useRef<Webcam>(null);

  // Get available camera devices
  useEffect(() => {
    async function getDevices() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setDevices(videoDevices);

        // Set default device if available
        if (videoDevices.length > 0) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error("Error getting media devices:", error);
      }
    }

    getDevices();
  }, []);

  const fetchNutrition = async () => {
    if (!barcode || barcode.trim() === "") {
      setError("Please enter a valid barcode.");
      return;
    }

    setIsCapturing(true);

    try {
      const response = await axios.get(
          `https://world.openfoodfacts.org/api/v2/product/${barcode.trim()}.json`
      );
      console.log(response.data);

      if (response.data.status === 0) {
        setError("Product not found. Please try another barcode.");
        setData(null);
      } else {
        setData(response.data);
        setError(null);
      }
    } catch (error: any) {
      console.error("Error fetching nutrition data:", error);
      setData(null);
      setError(
          error.message || "Failed to fetch nutrition data. Please try again."
      );
    } finally {
      setIsCapturing(false);
    }
  };

  const sendToGemini = useCallback(async () => {
    if (!webcamRef.current) {
      setError("Camera not initialized. Please refresh the page.");
      return;
    }

    setIsCapturing(true);

    try {
      const imageSrc = webcamRef.current.getScreenshot();

      if (!imageSrc) {
        setError("Failed to capture image. Please try again.");
        setIsCapturing(false);
        return;
      }

      const genAI = new GoogleGenerativeAI("AIzaSyC8nH8h04EFA8uyK-BfPIHowCJA2uZHly8");
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const parts = [
        {
          text: "Find and return only the barcode number from this image. Return just the digits with no additional text or explanations.",
        },
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: imageSrc.split(",")[1],
          },
        },
      ];

      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
      });
      const response = await result.response;
      const text = await response.text();
      console.log("Gemini response:", text);

      // Extract only numbers from the response
      const extractedBarcode = text.replace(/\D/g, '');

      if (!extractedBarcode) {
        setError("No barcode detected. Please try again with a clearer image.");
      } else {
        setBarcode(extractedBarcode);
        // Auto-fetch nutrition data after successful barcode capture
        setTimeout(() => {
          fetchNutrition();
        }, 300);
      }
    } catch (error: any) {
      console.error("Error sending to Gemini:", error);
      setError("Failed to process the image. Please try again.");
    } finally {
      setIsCapturing(false);
    }
  }, [webcamRef]);

  const toggleCamera = () => {
    setFacingMode(facingMode === "environment" ? "user" : "environment");
  };

  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeviceId(e.target.value);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
      <div className={styles.main}>
        <h1 className={styles.head}>NutriScan</h1>
        <div style={{
          display: "grid",
          gap: "10px",
          justifyItems: "center",
          width: "100%",
          maxWidth: "1000px",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        }}>
          <div className={styles.webcamSection}>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                mirrored={facingMode === "user"} // Only mirror for selfie camera
                className={styles.webcam}
                videoConstraints={{
                  facingMode: selectedDeviceId ? undefined : facingMode,
                  deviceId: selectedDeviceId ? {exact: selectedDeviceId} : undefined,
                  width: {ideal: 1280},
                  height: {ideal: 720},
                  aspectRatio: 4 / 3
                }}
            />
            <div className={styles.cameraControls}>
              {devices.length > 1 && (
                  <select
                      value={selectedDeviceId}
                      onChange={handleDeviceChange}
                      className={styles.select}
                  >
                    {devices.map((device) => (
                        <option key={device.deviceId} value={device.deviceId}>
                          {device.label || `Camera ${devices.indexOf(device) + 1}`}
                        </option>
                    ))}
                  </select>
              )}

              <Button
                  disabled={isCapturing}
                  text="Switch Camera"
                  onClick={toggleCamera}
                  variant="Secondary"
                  width={180}
                  height={40}
              />
            </div>

            <Button
                text={isCapturing ? "Processing..." : "Scan Barcode"}
                onClick={sendToGemini}
                variant="Primary"
                disabled={isCapturing}
                width={180}
                height={40}
            />
          </div>
          <div className={styles.flexContainer} style={{

          }}>

            <h1 className={styles.heading}>Nutrition Information</h1>

            <SingleInput
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                holder="Enter barcode here"
            />
            <Button
                text={isCapturing ? "Fetching..." : "Get Nutrition"}
                onClick={fetchNutrition}
                variant="Outline"
                width={180}
                height={40}
                disabled={isCapturing || !barcode}
            />
            {error && <div className={styles.errorBox}>{error}</div>}

            {data && data.product && (
                <div className={styles.productCard}>
                  {data.product.image_url && (
                      <img
                          src={data.product.image_url}
                          alt={data.product.product_name || "Product image"}
                          className={styles.productImage}
                      />
                  )}
                  <div className={styles.productInfo}>
                    <h2 className={styles.subHeading}>
                      {data.product.product_name || "Unknown Product"}
                    </h2>
                    <p>
                      <strong>Brand:</strong> {data.product.brands || "N/A"}
                    </p>
                    <p>
                      <strong>Ingredients:</strong>{" "}
                      {data.product.ingredients_text || "Not available"}
                    </p>
                    <h3 className={styles.nutritionHeading}>Nutrition Facts</h3>
                    <div className={styles.nutritionGrid}>
                      <p>
                        <strong>Calories:</strong>{" "}
                        {data.product.nutriments?.energy_value
                            ? `${data.product.nutriments.energy_value} ${data.product.nutriments.energy_unit || 'kcal'}`
                            : "N/A"}
                      </p>
                      <p>
                        <strong>Protein:</strong>{" "}
                        {data.product.nutriments?.proteins
                            ? `${data.product.nutriments.proteins}${data.product.nutriments.proteins_unit || 'g'}`
                            : "N/A"}
                      </p>
                      <p>
                        <strong>Fat:</strong>{" "}
                        {data.product.nutriments?.fat
                            ? `${data.product.nutriments.fat}${data.product.nutriments.fat_unit || 'g'}`
                            : "N/A"}
                      </p>
                      <p>
                        <strong>Carbs:</strong>{" "}
                        {data.product.nutriments?.carbohydrates
                            ? `${data.product.nutriments.carbohydrates}${data.product.nutriments.carbohydrates_unit || 'g'}`
                            : "N/A"}
                      </p>
                      <p>
                        <strong>Sugar:</strong>{" "}
                        {data.product.nutriments?.sugars
                            ? `${data.product.nutriments.sugars}${data.product.nutriments.sugars_unit || 'g'}`
                            : "N/A"}
                      </p>
                      <p>
                        <strong>Fiber:</strong>{" "}
                        {data.product.nutriments?.fiber
                            ? `${data.product.nutriments.fiber}${data.product.nutriments.fiber_unit || 'g'}`
                            : "N/A"}
                      </p>
                      <p>
                        <strong>Salt:</strong>{" "}
                        {data.product.nutriments?.salt
                            ? `${data.product.nutriments.salt}${data.product.nutriments.salt_unit || 'g'}`
                            : "N/A"}
                      </p>
                    </div>

                    {data.product.nutriscore_grade && (
                        <p>
                          <strong>Nutri-Score:</strong> {data.product.nutriscore_grade.toUpperCase()}
                        </p>
                    )}
                  </div>
                </div>
            )}
          </div>
        </div>

        {/* Chat Popup Button */}
        <div className={styles.chatButtonWrapper} style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 999
        }}>
          <Button
              text={isChatOpen ? "Close Chat" : "Open Chat"}
              onClick={toggleChat}
              variant="Outline"
              width={150}
              disabled={false}
              height={50}
          />
        </div>

        {/* Chat Popup */}
        {isChatOpen && (
            <div className={styles.chatPopupOverlay} style={{
              position: "fixed",
              bottom: "80px",
              right: "20px",
              width: "350px",
              height: "500px",
              backgroundColor: "black",
              boxShadow: "0 0 20px rgba(0,0,0,0.2)",
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden"
            }}>
              <div className={styles.chatPopupHeader} style={{
                padding: "10px 15px",
                backgroundColor: "rgba(114,114,114,0.28)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <h3 style={{ margin: 0 }}>Chat Assistant</h3>
                <button
                    onClick={toggleChat}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "18px",
                      cursor: "pointer"
                    }}
                >
                  ✕
                </button>
              </div>
              <div className={styles.chatPopupContent} style={{
                flex: 1,
                overflow: "auto"
              }}>
                <Chat />
              </div>
            </div>
        )}
      </div>
  );
};

export default NutritionPage;
