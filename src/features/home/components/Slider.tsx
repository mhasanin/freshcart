"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

import sliderImg_1 from "@/assets/images/home-slider-1.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = () => {
  const slides = [
    {
      id: 1,
      title: "Fresh Products Delivered to your Door",
      description: "Get 20% off your first order",
      btn1Text: "Shop Now",
      btn1Link: "/products",
      btn2Text: "View Deals",
      btn2Link: "/deals",
      textBgHover: "hover:text-green-600",
    },
    {
      id: 2,
      title: "Premium Quality Guaranteed",
      description: "Fresh from farm to your table",
      btn1Text: "Shop Now",
      btn1Link: "/products",
      btn2Text: "Learn More",
      btn2Link: "/about",
      textBgHover: "hover:text-blue-500",
    },
    {
      id: 3,
      title: "Fast & Free Delivery",
      description: "Same day delivery available",
      btn1Text: "Order Now",
      btn1Link: "/products",
      btn2Text: "Delivery Info",
      btn2Link: "/delivery",
      textBgHover: "hover:text-purple-500",
    },
  ];

  return (
    <div className="relative w-full custom-slider-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              style={{
                backgroundImage: `url(${sliderImg_1.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="h-100 flex items-center justify-center"
            >
              <div className="overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
                <div className="container h-full content-center mx-auto px-4">
                  <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                    {slide.title}
                  </h2>
                  <p className="text-white mb-4">{slide.description}</p>
                  <div className="mt-4">
                    <Link
                      href={slide.btn1Link}
                      className={`btn bg-white border-2 border-white/50 text-green-500 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 ${slide.textBgHover}`}
                    >
                      {slide.btn1Text}
                    </Link>
                    <Link
                      href={slide.btn2Link}
                      className="btn bg-transparent border-2 border-white/50 text-white ml-2 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 hover:bg-white/10"
                    >
                      {slide.btn2Text}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <div className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </Swiper>
    </div>
  );
};

export default Slider;
