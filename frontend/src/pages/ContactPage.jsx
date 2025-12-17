import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const api = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${api}/contact`, formData);

      toast.success("Your message has been sent successfully! 🚀", {
        duration: 2000,
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Try again!", {
        duration: 2000,
      });
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="min-h-screen  bg-[#0d0d0d] text-white px-6 py-16 flex flex-col items-center"
    >
      <motion.h1 variants={fadeUp} className="text-5xl font-bold text-center mb-2 my-10">
        Get in <span className="text-yellow-400">Touch</span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="text-gray-400 text-lg text-center max-w-2xl mb-14"
      >
        We're here to help! Reach out anytime and our support team will get back within 24 hours.
      </motion.p>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
        
        {/* LEFT SIDE INFO */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" className="space-y-6">

          {/* PHONE */}
          <motion.div variants={fadeUp} whileHover={{ scale: 1.03 }}>
            <Card sx={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "22px",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
            }}>
              <CardContent className="flex items-start gap-4">
                <Phone size={36} className="text-yellow-400" />
                <div>
                  <Typography variant="h6" className="text-yellow-300">Phone</Typography>
                  <Typography className="text-gray-400">+91 98765 43210</Typography>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* EMAIL */}
          <motion.div variants={fadeUp} whileHover={{ scale: 1.03 }}>
            <Card sx={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "22px",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
            }}>
              <CardContent className="flex items-start gap-4">
                <Mail size={36} className="text-pink-400" />
                <div>
                  <Typography variant="h6" className="text-pink-300">Email</Typography>
                  <Typography className="text-gray-400">support@fashionhub.com</Typography>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* LOCATION */}
          <motion.div variants={fadeUp} whileHover={{ scale: 1.03 }}>
            <Card sx={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "22px",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
            }}>
              <CardContent className="flex items-start gap-4">
                <MapPin size={36} className="text-green-400" />
                <div>
                  <Typography variant="h6" className="text-green-300">Location</Typography>
                  <Typography className="text-gray-400">Chennai, Tamil Nadu, India</Typography>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </motion.div>

        {/* RIGHT SIDE FORM */}
        <motion.form
          onSubmit={handleSubmit}
          variants={fadeUp}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg shadow-xl space-y-6"
        >

          {/* INPUT FIX (SPACING ADDED) */}
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            InputProps={{ sx: { marginY: "10px" } }}
            sx={{
              "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#555" } },
              input: { color: "white" },
              label: { color: "#ccc" },
            }}
          />

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{ sx: { marginY: "10px" } }}
            sx={{
              "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#555" } },
              input: { color: "white" },
              label: { color: "#ccc" },
            }}
          />

          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            InputProps={{ sx: { marginY: "10px" } }}
            sx={{
              "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#555" } },
              input: { color: "white" },
              label: { color: "#ccc" },
            }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            InputProps={{ sx: { marginY: "10px" } }}
            sx={{
              "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#555" } },
              textarea: { color: "white" },
              label: { color: "#ccc" },
            }}
          />

          <div className="pt-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  paddingY: "12px",
                  fontSize: "1.1rem",
                  borderRadius: "12px",
                  background: "linear-gradient(90deg, #f59e0b, #ec4899)",
                  textTransform: "none",
                }}
              >
                Send Message
              </Button>
            </motion.div>
          </div>

        </motion.form>

      </div>

      {/* GOOGLE MAP FIXED */}
      <motion.div variants={fadeUp} className="mt-16 w-full max-w-6xl">
        <iframe
          title="map"
          className="w-full h-[350px] rounded-3xl border border-white/10 shadow-xl"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31096.97906333063!2d80.2206!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265df01efa469%3A0xdebcdce40938e3c!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000"
          loading="lazy"
          allowFullScreen=""
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>

    </motion.div>
  );
};

export default Contact;
