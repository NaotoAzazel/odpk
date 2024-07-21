"use client";

import "swiper/css";
import "swiper/css/scrollbar";

import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";

import { Post } from "@/types";
import { NewsCard } from "@/components/cards/news-card";

export function NewsCardsSwiper({ news }: { news: Post[] }) {
  return (
    <Swiper
      scrollbar={{
        hide: false,
        draggable: true,
      }}
      modules={[Scrollbar]}
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
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      }}
    >
      {news.map((item, i) => (
        <SwiperSlide key={i} className="mb-5">
          <NewsCard post={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
