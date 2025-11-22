import { Box, Button, Flex, Text } from "@mantine/core"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useTranslation from "next-translate/useTranslation"
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
  const { t } = useTranslation("common")
  const { openModal } = useModalStore()
  return (
    <Box className={s.hero}>
      <Flex direction={"column"} gap={"0.62rem"} className={s.heroLeft}>
        <Box className={s.heroInfo}>
          <Text
            component={"h1"}
            className={s.heroTitle}
            dangerouslySetInnerHTML={{ __html: t("hero_title") }}
          />
          <Text component={"h2"} className={s.heroDescription}>
            {t("hero_description")}
          </Text>
          <Button bg={"#fff"} w={"11.375rem"} className={s.heroButton}>
            {t("hero_button_details")}
          </Button>
        </Box>
        <Box className={s.heroInfo} bg={"#fff"}>
          <Text component={"h3"} className={s.heroSaleDescription}>
            {t("hero_sale_description")}
          </Text>
          <Text
            component={"h3"}
            className={s.heroSaleTitle}
            dangerouslySetInnerHTML={{ __html: t("hero_sale_title") }}
          />
          <Button bg={"#F4F4F5"} className={s.heroButton} onClick={openModal}>
            {t("hero_button_request")}
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

const HeroSlider = () => {
  const { t } = useTranslation("common")
  const swiperRef = useRef<SwiperType>()
  const [activeIndex, setActiveIndex] = useState(0)

  const slides = [
    {
      image: hero1,
      title: t("hero_slider_1_title"),
      subtitle: t("hero_slider_1_subtitle"),
    },
    {
      image: hero2,
      title: t("hero_slider_2_title"),
      subtitle: t("hero_slider_2_subtitle"),
    },
  ]

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
          {t("hero_slider_button")}
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
