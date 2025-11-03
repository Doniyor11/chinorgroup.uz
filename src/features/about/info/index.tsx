import { Box, Button, Flex, Text } from "@mantine/core"
import Image from "next/image"
import React from "react"

import ImageAbout from "@/shared/assets/images/about.png"

import s from "./index.module.scss"

const dataResults = [
  {
    title: "12",
    description: "Месяцев средний срок строительства",
  },
  {
    title: "7+",
    description: "Лет гарантии на построенный дом",
  },
  {
    title: "180+",
    description: "Домов построили с 2012 года",
  },
  {
    title: "180+",
    description: "Домов построили с 2012 года",
  },
]

type ResultItem = {
  title: string
  description: string
}

export const AboutInfo = () => {
  return (
    <>
      <Box className={s.aboutInfoContainer}>
        <Flex mb={"3.5rem"}>
          <Flex
            direction={"column"}
            align={"flex-start"}
            gap={"2rem"}
            className={s.aboutInfo}
            w={"50%"}
          >
            <Text className={"title-section"}>О компании</Text>
            <Text className={s.aboutInfoDescription}>
              Полный спектр строительных услуг для <br /> реализации проектов
              любой сложности
            </Text>
            <Button className={"button-green"}>Остваить заявку</Button>
          </Flex>
          <Flex
            direction={"column"}
            align={"flex-start"}
            className={s.aboutInfo}
            w={"50%"}
          >
            <Text className={s.aboutInfoDescriptionRight}>
              Мы стремимся сделать ваш опыт в сфере недвижимости плавным,
              выгодным и без стресса. Наша команда преданных своему делу
              профессионалов, обладающая многолетним опытом, поможет вам
              уверенно ориентироваться на рынке недвижимости.
            </Text>
            <Text className={s.aboutInfoDescriptionRight}>
              Будь то покупка, продажа или аренда — мы рядом, чтобы предложить
              индивидуальный подход и помочь вам достичь ваших целей.
            </Text>
          </Flex>
        </Flex>
        {/*  */}
        <Flex direction={"column"} align={"center"} gap={"2.25rem"}>
          <Box className={s.aboutInfoImageBox}>
            <Image
              src={ImageAbout}
              alt={"About Us"}
              width={1260}
              height={723}
            />
          </Box>
          <Flex gap={"1.5rem"} w={"100%"}>
            <AboutInfoResult items={dataResults} />
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

const AboutInfoResult: React.FC<{ items: ResultItem[] }> = ({ items }) => {
  return (
    <>
      {items.map((item, idx) => (
        <Flex
          key={idx}
          direction={"column"}
          align={"flex-start"}
          gap={"0.5rem"}
          bg={"#F4F4F5"}
          className={s.aboutInfoImageCaptionBox}
        >
          <Text className={s.aboutInfoImageCaptionTitle}>{item.title}</Text>
          <Text className={s.aboutInfoImageCaptionDescription}>
            {item.description}
          </Text>
        </Flex>
      ))}
    </>
  )
}
