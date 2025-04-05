import styles from "./loader.module.css";

export default function Loader() {
    return <div style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#000000"
    }}>
        <p>
            Loading...
        </p>
        <div className={styles.loader}>

        </div>
    </div>
}