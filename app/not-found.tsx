import Link from "next/link";
import "./globals.css";
import Image from "next/image";
import icon from "@/app/icon.png";

export default function NotFound() {
  return (
    <main
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "0.5rem",
          padding: "1rem",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <Image
            src={icon}
            alt="LanguageAI Icon"
            width={300}
            height={300}
            style={{ width: 80, height: 80 }}
          />
        </div>
        <h1
          style={{
            marginBottom: "1rem",
            marginTop: 0,
            textAlign: "center",
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#1f2937",
          }}
        >
          Oops!
        </h1>
        <p
          style={{
            marginBottom: "2rem",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            color: "#4b5563",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "32rem",
          }}
        >
          The page you are looking for could not be found.
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link
            href="/"
            style={{
              backgroundColor: "#EE0768",
              borderRadius: "0.375rem",
              padding: "0.5rem 1.25rem",
              fontSize: "0.875rem",
              fontWeight: "bold",
              color: "#ffffff",
              transition: "background-color 0.2s",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}
