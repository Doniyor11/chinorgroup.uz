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
        <Flex
          mb={{ base: "2rem", sm: "2.5rem", md: "3rem", lg: "3.5rem" }}
          direction={{ base: "column", lg: "row" }}
          gap={{ base: "2rem", lg: "0" }}
        >
          <Flex
            direction={"column"}
            align={"flex-start"}
            gap={{ base: "1.5rem", md: "2rem" }}
            className={s.aboutInfo}
            w={{ base: "100%", lg: "50%" }}
          >
            <Text className={"title-section"}>Kompaniya haqida</Text>
            <Text className={s.aboutInfoDescription}>
              Qurilish sohasida 10+ yillik tajriba <br /> va 2000+ mamnun
              mijozlar
            </Text>
            <Button className={"button-green"}>Biz bilan bog'laning</Button>
          </Flex>
          <Flex
            direction={"column"}
            align={"flex-start"}
            gap={{ base: "1rem", md: "0" }}
            className={s.aboutInfo}
            w={{ base: "100%", lg: "50%" }}
          >
            <Text className={s.aboutInfoDescriptionRight}>
              Chinor Group-da biz mijozlarimizning orzularini amalga oshirishga
              bag'ishlanganmiz. Biz ko'chmas mulk bozorida ishonchli hamkor
              sifatida tanilganmiz, mijozlarimizga eng yaxshi xizmatlarni taqdim
              etamiz va ularning ehtiyojlarini birinchi o'ringa qo'yamiz.
            </Text>
            <br />
            <Text className={s.aboutInfoDescriptionRight}>
              Bizning jamoamiz yuqori malakali mutaxassislardan iborat bo'lib,
              ular har bir loyihani diqqat bilan boshqaradi va mijozlarimizga
              individual yondashuvni ta'minlaydi. Bizning maqsadimiz - sizning
              ishonchingizni qozonish va sizga eng yaxshi xizmatni taqdim etish.
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
          <Flex
            gap={{ base: "0.75rem", sm: "1rem", md: "1.5rem" }}
            w={"100%"}
            wrap="wrap"
          >
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
