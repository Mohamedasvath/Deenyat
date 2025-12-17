import React, { useRef, useEffect } from "react";
import { Grid, Box, Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import { FaTruck, FaShieldAlt, FaStar, FaHeadset } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MotionCard = motion(Card);

const features = [
  {
    icon: <FaTruck size={40} />,
    title: "Fast Delivery",
    desc: "Get your products delivered within 24–48 hours.",
  },
  {
    icon: <FaShieldAlt size={40} />,
    title: "Secure Payments",
    desc: "100% secure and encrypted payment methods.",
  },
  {
    icon: <FaStar size={40} />,
    title: "Top Quality",
    desc: "We provide only premium products.",
  },
  {
    icon: <FaHeadset size={40} />,
    title: "24/7 Support",
    desc: "Our team is here to help anytime.",
  },
];

const FeaturesSection = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.to(card, {
        y: i % 2 === 0 ? 30 : -30, // alternate parallax direction
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, []);

  return (
    <Box
      sx={{
        py: 12,
        px: { xs: 3, md: 8 },
        background: "#f9f9f9",
        overflow: "hidden"
        ,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: 700, mb: 8 }}
        style={{color:'black'}}
      >
        Why Shop With Us?
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {features.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <MotionCard
              ref={(el) => (cardsRef.current[index] = el)}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    color: "#1976d2",
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  {item.icon}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {item.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturesSection;
