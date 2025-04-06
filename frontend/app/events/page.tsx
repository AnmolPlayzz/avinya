"use client"
import styles from "./page.module.css";
import {useEffect, useState} from "react";
import axios from "axios";
import Loader from "@/components/library/loader/loader";
import {Agdasima} from "next/dist/compiled/@next/font/dist/google";
import Image from "next/image";

type EventData = {
    id: number,
    name_of_event: string,
    description: string,
    image_url: string,
}

export default function Page() {
    const [events, setEvents] = useState<EventData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchLostItems = async () => {
            try {
                const response = await axios.get('https://positive-elna-hackathonorg123-25128812.koyeb.app/api/v1/events');
                const data: EventData[] = response.data.data;
                setEvents(data);
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

    return (<div className={styles.main}>
        <h1 className={styles.head}>Events</h1>
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
            gap: "20px",
        }}>
            {events.map((event: EventData) => (
                <div key={event.id} className={styles.card}>
                    <div style={{
                        width: "120px",
                        height: "120px",
                        position: "relative",
                    }}>
                        <Image fill={true} style={{
                            objectFit: "cover",
                            objectPosition: "center",
                            borderRadius: "10px",
                            border: "1px solid rgba(63, 63, 63, 0.73)",
                            overflow: "hidden",
                        }} src={event.image_url} alt={event.name_of_event} />
                    </div>
                    <div style={{
                        width: "100%",
                    }}>
                        <h2 style={{
                            fontWeight: "900",
                            fontSize: "24px",
                            marginBottom: "10px",
                        }}>{event.name_of_event}</h2>
                        <p style={{
                            fontWeight: "300",
                            fontSize: "16px",
                            marginTop: "10px",
                        }}>{event.description}</p>
                    </div>
                </div>
            ))}
        </div>

    </div>)
}