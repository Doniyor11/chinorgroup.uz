import { Box, Flex, Text } from "@mantine/core"
import React from "react"

import s from "./index.module.scss"

export const PriceInfo = () => {
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
            <Text className={"title-section"}>Цены на услуги</Text>
            <Text className={s.aboutInfoDescription}>
              Прозрачное ценообразование и <br /> индивидуальный подход к
              каждому <br /> проекту
            </Text>
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
      </Box>
    </>
  )
}
