import React from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#111",
        color: "#fff",
        py: 8,
        px: { xs: 3, md: 10 },
      }}
    >
      <Grid container spacing={4}>
        {/* About */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Deenyat
          </Typography>
          <Typography variant="body2" sx={{ color: "grey.400" }}>
            Premium products and services with fast delivery and excellent customer support.
          </Typography>
        </Grid>

        {/* Company Links */}
        <Grid item xs={6} md={2}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Company
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <RouterLink
              to="/about"
              style={{ color: "grey", textDecoration: "none" }}
            >
              About Us
            </RouterLink>
            <RouterLink
              to="/contact"
              style={{ color: "grey", textDecoration: "none" }}
            >
              Contact Us
            </RouterLink>
            <RouterLink
              to="/blog"
              style={{ color: "grey", textDecoration: "none" }}
            >
              Blog
            </RouterLink>
          </Box>
        </Grid>

        {/* Support Links */}
        <Grid item xs={6} md={2}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Support
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <RouterLink
              to="/help-center"
              style={{ color: "grey", textDecoration: "none" }}
            >
              Help Center
            </RouterLink>
            <RouterLink
              to="/terms"
              style={{ color: "grey", textDecoration: "none" }}
            >
              Terms of Service
            </RouterLink>
            <RouterLink
              to="/privacy"
              style={{ color: "grey", textDecoration: "none" }}
            >
              Privacy Policy
            </RouterLink>
          </Box>
        </Grid>

        {/* Social Icons */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton href="#" sx={{ color: "#fff", "&:hover": { color: "#1DA1F2" } }}>
              <FaTwitter />
            </IconButton>
            <IconButton href="#" sx={{ color: "#fff", "&:hover": { color: "#4267B2" } }}>
              <FaFacebookF />
            </IconButton>
            <IconButton href="#" sx={{ color: "#fff", "&:hover": { color: "#E1306C" } }}>
              <FaInstagram />
            </IconButton>
            <IconButton href="#" sx={{ color: "#fff", "&:hover": { color: "#0077B5" } }}>
              <FaLinkedinIn />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Copyright */}
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          mt: 6,
          color: "grey.500",
          
        }}
      >
        © {new Date().getFullYear()} Deenyat. All rights reserved.<br /><div className="mt-3">
           💓 Built by <span className=" p-2 font-bold  rounded-3xl ">Mohamed Asvath</span>
        </div>
       
      </Typography>
    </Box>
  );
};

export default Footer;
