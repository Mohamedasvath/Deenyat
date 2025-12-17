import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination, Navigation, Autoplay } from "swiper/modules";
import { Box, Typography } from "@mui/material";

const Carousel = () => {
  return (
    <Box className="w-full py-10 bg-[#0f0f0f] text-white">
      <Swiper
        style={{
          "--swiper-pagination-color": "#FFD700",
        }}
        speed={900}
        parallax={true}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 2800 }}
        modules={[Parallax, Pagination, Navigation, Autoplay]}
        className="w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="relative h-[350px] sm:h-[450px] md:h-[550px] bg-cover bg-center"
            data-swiper-parallax="-300"
            style={{
              backgroundImage: "url('/carousel/img1.jpg')",
            }}
          ></div>

          <Typography
            variant="h4"
            className="absolute bottom-10 left-10 font-bold"
            data-swiper-parallax="-100"
          >
            Premium Fashion Collection
          </Typography>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="relative h-[350px] sm:h-[450px] md:h-[550px] bg-cover bg-center"
            data-swiper-parallax="-300"
            style={{
              backgroundImage: "url('https://media.istockphoto.com/id/2062995221/photo/holy-quran.webp?a=1&b=1&s=612x612&w=0&k=20&c=GNy6kuaxEe5_pQLzslpER6puMKIBwMyjux7Z4FoU1L4=')",
            }}
          ></div>

          <Typography
            variant="h4"
            className="absolute bottom-10 left-10 font-bold"
            data-swiper-parallax="-100"
          >
            Quaran And Islamic Books
          </Typography>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="relative h-[350px] sm:h-[450px] md:h-[550px] bg-cover bg-center"
            data-swiper-parallax="-300"
            style={{
              backgroundImage: "url('/carousel/img3.jpg')",
            }}
          ></div>

          <Typography
            variant="h4"
            className="absolute bottom-10 left-10 font-bold"
            data-swiper-parallax="-100"
          >
            Modern & Sleek Designs
          </Typography>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default Carousel;
