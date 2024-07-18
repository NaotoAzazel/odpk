"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { priorityCards, collegeInfoCards } from "@/config/cards";

import { PriorityCard } from "@/components/cards/priority-card";
import { StatsCard } from "@/components/cards/stats-card";

export function SwiperCards() {
  return (
    <>
      <Swiper
        className="cursor-grab mt-6"
        style={{ overflow: "visible" }}
        freeMode={true}
        slidesPerView={3}
        spaceBetween={20}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        {priorityCards.map((item, i) => (
          <SwiperSlide key={i} style={{ height: "auto" }}>
            <PriorityCard content={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        className="cursor-grab mt-6"
        style={{ overflow: "visible" }}
        freeMode={true}
        slidesPerView={4}
        spaceBetween={20}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {collegeInfoCards.map((item, i) => (
          <SwiperSlide key={i} style={{ height: "auto" }}>
            <StatsCard content={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
