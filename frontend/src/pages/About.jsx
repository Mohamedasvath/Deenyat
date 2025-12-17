import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { Heart, Users, BookOpen, Star, MessageSquare } from "lucide-react"; // Fixed icons
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const AboutPage = () => {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  const handleAdd = () => {
    if (!comment.trim()) return toast.error("Comment can't be empty!");
    toast.success("Message Sent!");
    setComment(""); 
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen flex flex-col items-center">

      {/* HERO SECTION */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative w-full max-w-7xl mx-auto pt-10 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-12 rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://www.islamicity.org/global/images/photo/IC-Articles/qurantasbihIC__800x533.JPG"
            alt="Islamic Items"
            className="object-cover w-full h-full opacity-60"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-10 pt-10">
          <motion.div variants={itemVariants}>
            <h1 className="text-gray-300 text-sm tracking-wider">Deeniyat: Islamic Essentials</h1>
            <p className="mt-6 text-white text-5xl sm:text-6xl font-sans leading-tight">
              Embrace Faith<br />
              <span className="font-serif italic text-yellow-400 text-6xl sm:text-7xl pt-5">
                With Knowledge & Devotion
              </span>
            </p>
            <p className="mt-6 text-gray-300 text-opacity-80 leading-relaxed max-w-md">
              Explore a curated collection of Islamic items like Qur’an books, prayer mats, ID cards, and more to enrich your spiritual and daily life.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <button
                onClick={() => navigate("/products")}
                className="px-6 py-3 bg-yellow-500 text-black rounded-full text-lg font-semibold hover:bg-yellow-600 transition"
              >
                Explore Islamic Items
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="px-6 py-3 border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white hover:text-black transition"
              >
                Contact Us
              </button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="hidden lg:block">
            <img
              src="https://islamonline.net/wp-content/uploads/2022/04/Muslim-man-reciting-Quran-.jpg"
              className="w-full h-auto rounded-3xl shadow-xl"
              alt="Islamic Items"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* STORY SECTION */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full my-12 px-4 sm:px-0"
      >
        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-3xl font-bold text-yellow-400">Our Journey</h3>
          <p className="text-lg text-gray-300">
            Deeniyat started with the vision of providing authentic Islamic essentials, from Qur’an books to prayer mats, to support daily worship and learning.
          </p>
          <p className="text-lg text-gray-300">
            We collaborate with trusted suppliers to ensure quality, durable, and spiritually meaningful products.
          </p>
          <p className="text-lg text-gray-400 italic">
            “Our mission: make Islamic knowledge and essentials accessible, meaningful, and empowering for everyone.”
          </p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <img
            src="https://thumbs.dreamstime.com/b/islamic-book-quran-wodden-board-rosary-aladdin-lamp-ramadan-eid-concept-holy-islamic-book-quran-wodden-118229102.jpg"
            alt="Islamic Essentials"
            className="rounded-3xl object-cover w-full"
          />
        </motion.div>
      </motion.div>

      {/* STATS */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        className="grid grid-cols-1 md:grid-cols-4 w-full max-w-6xl gap-8 text-center my-12 px-4 sm:px-0"
      >
        <motion.div variants={itemVariants} className="p-8 bg-white/5 rounded-3xl shadow-xl border border-white/10">
          <Heart size={48} className="text-yellow-400 mx-auto mb-4" />
          <h3 className="text-4xl font-bold text-yellow-300">25K+</h3>
          <p className="text-gray-400 mt-2">Satisfied Customers</p>
        </motion.div>

        <motion.div variants={itemVariants} className="p-8 bg-white/5 rounded-3xl shadow-xl border border-white/10">
          <BookOpen size={48} className="text-yellow-400 mx-auto mb-4" />
          <h3 className="text-4xl font-bold text-yellow-300">4,500+</h3>
          <p className="text-gray-400 mt-2">Books Sold</p>
        </motion.div>

        <motion.div variants={itemVariants} className="p-8 bg-white/5 rounded-3xl shadow-xl border border-white/10">
          <Users size={48} className="text-pink-400 mx-auto mb-4" />
          <h3 className="text-4xl font-bold text-pink-300">15K+</h3>
          <p className="text-gray-400 mt-2">Returning Shoppers</p>
        </motion.div>

        <motion.div variants={itemVariants} className="p-8 bg-white/5 rounded-3xl shadow-xl border border-white/10">
          <Star size={48} className="text-pink-400 mx-auto mb-4" />
          <h3 className="text-4xl font-bold text-pink-300">10K+</h3>
          <p className="text-gray-400 mt-2">Prayer Mats Delivered</p>
        </motion.div>
      </motion.div>

      {/* COMMENT SECTION */}
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="w-full max-w-4xl my-16 px-4 sm:px-0">
        <motion.h2 variants={itemVariants} className="text-3xl font-bold flex items-center gap-3 mb-6">
          <MessageSquare className="text-yellow-400" /> Share Your Thoughts
        </motion.h2>
        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            placeholder="Write your comment..."
            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-gray-200"
          ></textarea>
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl transition"
          >
            Send Message
          </button>
        </motion.div>
      </motion.div>

      {/* BACK BUTTON */}
      <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mt-12 mb-12">
        <Button
          onClick={() => navigate("/")}
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #f59e0b, #ef4444)",
            borderRadius: "30px",
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            textTransform: "none",
          }}
        >
          Back to Home
        </Button>
      </motion.div>

    </div>
  );
};

export default AboutPage;
