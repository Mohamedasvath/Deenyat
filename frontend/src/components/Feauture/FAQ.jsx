import React, { useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy. Products must be unused and in original packaging. Refunds are processed within 5-7 business days.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 3-5 business days, while express shipping takes 1-2 business days.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping times and fees vary based on destination.",
  },
  {
    question: "How can I track my order?",
    answer:
      "After your order is shipped, you will receive a tracking number via email to monitor your delivery status.",
  },
];

const FAQSection = () => {
  const faqRefs = useRef([]);

  useEffect(() => {
    faqRefs.current.forEach((el, index) => {
      gsap.from(el, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: index * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
    });
  }, []);

  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        px: { xs: 4, md: 10 },
        backgroundColor: "#000000",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: 700, mb: 8, fontSize: { xs: "28px", md: "36px" } }}
        className="text-white"
      >
        Frequently Asked Questions
      </Typography>

      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            ref={(el) => (faqRefs.current[index] = el)}
            sx={{
              mb: 3,
              borderRadius: 2,
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-content-${index}`}
              id={`faq-header-${index}`}
            >
              <Typography sx={{ fontWeight: 600, fontSize: { xs: "16px", md: "18px" } }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: "text.secondary", fontSize: { xs: "14px", md: "16px" } }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default FAQSection;
