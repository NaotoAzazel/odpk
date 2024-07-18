"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import { AboutCollege } from "@/components/cards/about-college-card";
import { aboutCollege } from "@/config/cards";

export function AboutCollegeCardsSwiper() {
  return (
    <Swiper
      className="cursor-grab mt-6"
      style={{ overflow: "visible" }}
      freeMode={true}
      slidesPerView={5}
      spaceBetween={20}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }}
    >
      {aboutCollege.map((text, i) => (
        <SwiperSlide key={i} style={{ height: "auto" }}>
          <AboutCollege text={text} index={i + 1} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
