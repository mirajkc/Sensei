// Certificate.jsx
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import axios from 'axios'
import toast from "react-hot-toast";
import useAppContext from "../context/AppContext";
import { data, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Certificate = () => {
  const certRef = useRef(null);
  const {theme} = useAppContext()
  const {courseId} = useParams()
  const [detail,setDetails] = useState({})

  const getCertificateDetails = async() => {
    try {
      const {data} = await axios.get(`/api/user/getdetailsforcertificate/${courseId}`)
      if(!data.success){
        return toast.error(data.message)
      }
      setDetails(data.detailss)

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{getCertificateDetails()}, [courseId])

  const downloadCertificate = () => {
    if (!certRef.current) return;

    html2canvas(certRef.current, {
      useCORS: true,
      scale: 2,
      backgroundColor: "#ffffff",
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "certificate.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className={`${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      {/* Certificate container */}
      <div
        ref={certRef}
        style={{
          width: "900px",
          height: "650px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          border: "8px solid #fbbf24",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontFamily: "serif",
            fontWeight: "bold",
            color: "#1e293b",
            marginBottom: "1rem",
          }}
        >
          Certificate of Completion
        </h1>

        <p style={{ fontSize: "18px", color: "#475569", marginBottom: "0.5rem" }}>
          This certificate is proudly presented to
        </p>

        <h2
          style={{
            fontSize: "36px",
            fontFamily: "serif",
            fontWeight: "600",
            color: "#d97706",
            marginBottom: "1.5rem",
          }}
        >
          {detail?.userName  }
        </h2>

        <p style={{ fontSize: "18px", color: "#334155", marginBottom: "0.5rem" }}>
          for successfully completing the course
        </p>

        <h3
          style={{
            fontSize: "28px",
            fontFamily: "serif",
            fontWeight: "600",
            color: "#1d4ed8",
            marginBottom: "1.5rem",
          }}
        >
          {detail?.courseTitle}
        </h3>

        <p style={{ fontSize: "16px", color: "#475569", marginBottom: "1rem" }}>
          Organized and provided by
        </p>

        <h4
          style={{
            fontSize: "22px",
            fontFamily: "serif",
            fontWeight: "500",
            color: "#1e293b",
          }}
        >
          {detail?.sellerName || "Error"}
        </h4>

        {/* Footer (signature + date) */}
        <div
          style={{
            marginTop: "auto",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "0 4rem 2rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p className=" font-[cursive] font-normal tracking-tight" >{detail?.sellerName}</p>
            <div
              style={{
                width: "160px",
                height: "2px",
                backgroundColor: "#d97706",
                marginBottom: "8px",
              }}
            ></div>
            <p style={{ fontSize: "14px", color: "#475569" }}>Signature</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p>Completed On :</p>
            <div
              style={{
                width: "120px",
                height: "2px",
                backgroundColor: "#d97706",
                marginBottom: "8px",
              }}
            ></div>
            <p style={{ fontSize: "14px", color: "#475569" }}>
              { detail?.completionDate && new Date(detail.completionDate).toLocaleDateString() }
            </p>
          </div>
        </div>
      </div>

      {/* Download button */}
      <button
        onClick={downloadCertificate}
        style={{
          marginTop: "2rem",
          padding: "1rem 2.5rem",
          fontFamily: "serif",
          fontWeight: "600",
          color: "#fff",
          borderRadius: "8px",
          cursor: "pointer",
          border: "2px solid #fbbf24",
          background: "linear-gradient(135deg, #334155 0%, #1e293b 100%)",
        }}
      >
        Download Certificate
      </button>
    </div>
  );
};

export default Certificate;
