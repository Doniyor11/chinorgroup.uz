import { Box, Flex, Text } from "@mantine/core"
import Image from "next/image"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import Image1 from "@/shared/assets/images/blog/1.png"
import Image2 from "@/shared/assets/images/blog/2.png"
import Image3 from "@/shared/assets/images/blog/3.png"

import s from "./styles.module.css"

const slides = [
  {
    id: 1,
    image: Image1,
    date: "June 10, 2024",
    title: "7 уникальных концепций освещения гостиной",
  },
  {
    id: 2,
    image: Image2,
    date: "May 22, 2024",
    title: "8 стильных идей дизайна открытой кухни типа 36",
  },
  {
    id: 3,
    image: Image3,
    date: "April 15, 2024",
    title: "6 вдохновляющих тем оформления спальни",
  },
  {
    id: 4,
    image: Image1,
    date: "June 10, 2024",
    title: "7 уникальных концепций освещения гостиной",
  },
  {
    id: 5,
    image: Image2,
    date: "May 22, 2024",
    title: "8 стильных идей дизайна открытой кухни типа 36",
  },
]

export const Blog = () => {
  return (
    <>
      <Box className={s.blogContainer} mb={"0.63rem"}>
        <Flex justify={"space-between"} mb={"3.5rem"}>
          <Flex w={"50%"}>
            <Text className={"title-section"} c={"#18181B"} component={"h2"}>
              Блог
            </Text>
          </Flex>
          <Flex w={"50%"} direction={"column"}>
            <Text className={s.blogDescription} component={"p"}>
              Изучите советы экспертов и креативные идеи для улучшения вашего
              жилого пространства.
            </Text>
            <Text className={s.blogDescription} component={"p"}>
              От современных дизайнов кухонь до уютного оформления спален и
              инновационных концепций освещения.
            </Text>
          </Flex>
        </Flex>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            nextEl: `.${s.swiperButtonNext}`,
            prevEl: `.${s.swiperButtonPrev}`,
          }}
          pagination={{
            el: `.${s.swiperPagination}`,
            clickable: true,
            bulletClass: s.swiperPaginationBullet,
            bulletActiveClass: s.swiperPaginationBulletActive,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className={s.slideCard}>
                <div className={s.slideImage}>
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className={s.slideContent}>
                  <div className={s.slideMeta}>
                    <span className={s.slideDate}>{slide.date}</span>
                  </div>
                  <h3 className={s.slideTitle}>{slide.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={s.swiperControls}>
          <div className={s.swiperPagination} />
          <div className={s.swiperNavigation}>
            <button className={s.swiperButtonPrev} aria-label="Previous slide">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className={s.swiperButtonNext} aria-label="Next slide">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </Box>
    </>
  )
}
