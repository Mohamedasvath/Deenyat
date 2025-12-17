import React, { useRef, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const OfferBanner = () => {
  const bannerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Parallax scroll effect
    gsap.to(bannerRef.current, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <Box
      ref={bannerRef}
      sx={{
        position: "relative",
        py: { xs: 12, sm: 16 },
        px: { xs: 4, sm: 8 },
        borderRadius: 3,
        overflow: "hidden",
        background: "linear-gradient(135deg, #1a237e, #3949ab)", // Calm deep-blue gradient
        color: "#fff",
        textAlign: "center",
      }}
    >
      {/* Decorative Islamic-style elements */}
      <Box
        sx={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.2)",
          top: -50,
          left: -50,
          filter: "blur(80px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.15)",
          bottom: -80,
          right: -80,
          filter: "blur(100px)",
        }}
      />

      {/* Banner Content */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          mb: 3,
          fontSize: { xs: "28px", sm: "36px", md: "48px" },
          letterSpacing: 1,
        }}
      >
        Special Islamic Collection
      </Typography>

      <Typography
        variant="h6"
        sx={{
          mb: 6,
          fontSize: { xs: "15px", sm: "18px", md: "20px" },
          opacity: 0.9,
          lineHeight: 1.6,
        }}
      >
        Explore authentic <strong>Qur’an, Deeniyat books, prayer mats</strong>, and other Islamic products with special offers.
      </Typography>

      {/* Call-to-Action Button */}
      <Button
        variant="contained"
        onClick={() => navigate("/products")} // Navigate to products page
        sx={{
          py: 2,
          px: 6,
          borderRadius: 3,
          background: "#ffe082", // Soft gold
          color: "black", // Deep blue text
          fontWeight: 700,
          fontSize: { xs: "14px", sm: "16px", md: "18px" },
          boxShadow: "0px 8px 15px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "#ffd54f",
            transform: "scale(1.05)",
          },
        }}
      >
        Browse Products
      </Button>

      {/* Decorative Pattern (Optional) */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20250320/pngtree-illuminated-open-quran-on-wooden-rehal-with-divine-light-image_17115329.jpg')",
          opacity: 0.05,
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};

export default OfferBanner;
