import { Box, Flex, Text } from "@mantine/core"
import Image from "next/image"
import React from "react"
// Import Swiper styles
import "swiper/css"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import IconStar from "@/shared/assets/images/icons/reviews-start.svg"
import ImageUser from "@/shared/assets/images/user-image.png"

import s from "./index.module.scss"

export const Reviews = () => {
  return (
    <>
      <Box className={s.reviews}>
        <Flex align={"flex-start"} className={s.reviewsTop}>
          <Box w={"50%"}>
            <Text className={'title-section'} c={'#fff'}>Отзывы клиентов</Text>
          </Box>
          <Box w={"50%"}>
            <Text className={s.reviewsHeadDescription}>
              Мы стремимся сделать ваш опыт в сфере недвижимости плавным,
              выгодным и без стресса. Наша команда преданных своему делу
              профессионалов, обладающая многолетним опытом, поможет вам
              уверенно ориентироваться на рынке недвижимости.
            </Text>
          </Box>
        </Flex>

        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            nextEl: `.${s.swiperButtonNext}`,
            prevEl: `.${s.swiperButtonPrev}`,
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
          {[1, 2, 3, 4, 5].map(() => (
            <SwiperSlide>
              <Flex
                className={s.reviewsItem}
                direction={"column"}
                gap={"2.25rem"}
              >
                <Flex gap={"0.62rem"}>
                  <Box className={s.reviewsItemStar}>
                    <IconStar />
                  </Box>
                </Flex>

                <Text className={s.reviewsDescription}>
                  "Chinor Group выполнили строительство нашего офисного здания
                  точно в срок и с высоким качеством. Профессиональная команда!"
                </Text>

                <Flex gap={"0.75rem"} align={"center"}>
                  <Box className={s.reviewsUserImage}>
                    <Image src={ImageUser} alt={""} />
                  </Box>
                  <Flex direction={"column"} gap={"0.12rem"}>
                    <Text className={s.reviewsAuthor}>Алишер Каримов</Text>
                    <Text className={s.reviewsAuthorPosition}>
                      Директор компании
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={s.swiperControls}>
          <div className={s.swiperPagination} />
          <div className={s.swiperNavigation}>
            <button className={s.swiperButtonPrev} aria-label="Previous slide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25.5 15C25.5 15.6213 24.9963 16.125 24.375 16.125L8.41812 16.125L14.6547 22.0641C15.1026 22.4947 15.1166 23.2069 14.6859 23.6547C14.2553 24.1026 13.5431 24.1166 13.0953 23.6859L4.84525 15.8109C4.62466 15.5988 4.5 15.306 4.5 15C4.5 14.694 4.62466 14.4012 4.84525 14.1891L13.0953 6.31406C13.5431 5.88342 14.2553 5.89739 14.6859 6.34525C15.1166 6.79312 15.1026 7.5053 14.6547 7.93594L8.41812 13.875L24.375 13.875C24.9963 13.875 25.5 14.3787 25.5 15Z"
                  fill="#808080"
                />
              </svg>
            </button>
            <button className={s.swiperButtonNext} aria-label="Next slide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="#808080"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.5 15C4.5 14.3787 5.00368 13.875 5.625 13.875L21.5819 13.875L15.3453 7.93593C14.8974 7.50529 14.8834 6.79312 15.3141 6.34525C15.7447 5.89738 16.4569 5.88342 16.9047 6.31406L25.1547 14.1891C25.3753 14.4012 25.5 14.694 25.5 15C25.5 15.306 25.3753 15.5988 25.1547 15.8109L16.9047 23.6859C16.4569 24.1166 15.7447 24.1026 15.3141 23.6547C14.8834 23.2069 14.8974 22.4947 15.3453 22.0641L21.5819 16.125L5.625 16.125C5.00368 16.125 4.5 15.6213 4.5 15Z"
                  fill="#808080"
                />
              </svg>
            </button>
          </div>
        </div>
      </Box>
    </>
  )
}
