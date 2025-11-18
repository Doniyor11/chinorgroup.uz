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
import { useModalStore } from "@/shared/store/modal-store"

import s from "./index.module.scss"

export const Hero = () => {
  const { openModal } = useModalStore()
  return (
    <Box className={s.hero}>
      <Flex direction={"column"} gap={"0.62rem"} className={s.heroLeft}>
        <Box className={s.heroInfo}>
          <Text component={"h1"} className={s.heroTitle}>
            Korobka narxida <br /> ta'mirlangan xonadonlar!
          </Text>
          <Text component={"h2"} className={s.heroDescription}>
            Chinor Groupning yangi Jomiy Residence loyihasidan ajoyib
            imkoniyatni qo'ldan boy ber bermang! Qulay infrotuzilma va ijtimoiy
            obyektlarga yaqin turar joy!
          </Text>
          <Button bg={"#fff"} w={"11.375rem"} className={s.heroButton}>
            Batafsil ma'lumot
          </Button>
        </Box>
        <Box className={s.heroInfo} bg={"#fff"}>
          <Text component={"h3"} className={s.heroSaleDescription}>
            49.000.000 so'm boshlang'ich to`lov bilan xonadon egasiga aylaning!
          </Text>
          <Text component={"h3"} className={s.heroSaleTitle}>
            Oshxona jixozlari <br /> sovg'aga beriladi!
          </Text>
          <Button bg={"#F4F4F5"} className={s.heroButton} onClick={openModal}>
            Ariza qoldirish
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
    title: "Ildizi mustahkam, fayzli uylar quramiz",
    subtitle:
      "Chinor Group 10 yillik tajribaga ega qurilish kompaniyasi bo'lib, sifat va ishonchlilikni birinchi o'ringa qo'yadi.",
  },
  {
    image: hero2,
    title: "Yoqrin kelajak uchun sifatli uy-joylar",
    subtitle:
      "Chinor Group shu kungacha 7ta loyihani qurib o'z egalariga topshirgan. O'zbeskitonda 1000 dan ortiq ishchi o'rinlari yaratgan",
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
          Batafsil
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
