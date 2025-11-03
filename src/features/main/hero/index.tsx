import { Box, Button, Flex, Text } from "@mantine/core"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useRef, useState } from "react"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import hero1 from "@/shared/assets/images/hero-slider/post 6.webp"
import hero2 from "@/shared/assets/images/hero-slider/post 8.webp"
import ImageGif from "@/shared/assets/images/rekla,a.gif"

import s from "./index.module.scss"

export const Hero = () => {
  return (
    <Box className={s.hero}>
      <Flex direction={"column"} gap={"0.62rem"} className={s.heroLeft}>
        <Box className={s.heroInfo}>
          <Text component={"h1"} className={s.heroTitle}>
            При 100% оплате — скидка <br /> 20% на квартиру!
          </Text>
          <Text component={"h1"} className={s.heroDescription}>
            Профессиональное строительство и ремонт любой сложности. Современные
            технологии, опытная команда, гарантия качества.
          </Text>
          <Button bg={"#fff"} w={"11.375rem"} className={s.heroButton}>
            Выбрать квартиру
          </Button>
        </Box>
        <Box className={s.heroInfo} bg={"#fff"}>
          <Text component={"h1"} className={s.heroSaleDescription}>
            До 1 декабря приобретайте наши коттеджи «Riverside» в рассрочку и
            получите шанс выиграть
          </Text>
          <Text component={"h1"} className={s.heroSaleTitle}>
            мебель и бытовую <br /> технику в подарок!
          </Text>
          <Button bg={"#F4F4F5"} className={s.heroButton}>
            Получить консультацию
          </Button>
          <Box className={s.heroGifBox}>
            <Image src={ImageGif} alt={"gif"} width={213} height={156} />
          </Box>
        </Box>
      </Flex>
      <Box className={s.heroRight}>
        <HeroSlider />
      </Box>
    </Box>
  )
}

const slides = [
  {
    image: hero1,
    title: "Строим будущее вместе с вами",
    subtitle:
      "Профессиональное строительство и ремонт любой сложности. Современные технологии, опытная команда, гарантия качества.",
  },
  {
    image: hero2,
    title: "Строим будущее вместе с вами",
    subtitle:
      "Профессиональное строительство и ремонт любой сложности. Современные технологии, опытная команда, гарантия качества.",
  },
]

const HeroSlider = () => {
  const swiperRef = useRef<SwiperType>()
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className={s.heroSlider}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex)
        }}
        className={s.heroSlider}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={s.slide}>
              <Image
                src={slide.image}
                alt={slide.title}
                className={s.slideImage}
              />
              <div className={s.overlay} />
              <div className={s.content}>
                <Text className={s.title}>{slide.title}</Text>
                <Text className={s.subtitle}>{slide.subtitle}</Text>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Box className={s.navigationContainer}>
        <Link href={""} className={s.button}>
          Подробнее
        </Link>
        <Flex className={s.navigationWrapper}>
          <Button
            className={s.navButton}
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </Button>

          <div className={s.pagination}>
            {slides.map((_, index) => (
              <div
                key={index}
                className={`${s.paginationBullet} ${
                  index === activeIndex ? s.paginationBulletActive : ""
                }`}
                onClick={() => swiperRef.current?.slideTo(index)}
              />
            ))}
          </div>

          <Button
            className={s.navButton}
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </Button>
        </Flex>
      </Box>
    </div>
  )
}
