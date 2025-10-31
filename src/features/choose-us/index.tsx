import { Box, Flex, Text } from "@mantine/core"
import React from "react"

import s from "./index.module.scss"

const data = [
  {
    number: "Причина 01",
    title: "Качество",
    description:
      "Once you've found properties that catch your eye, save them to your account or make a shortlist. This allows you to compare and revisit your favorites as you make your decision.",
  },
  {
    number: "Причина 02",
    title: "Опыт",
    description:
      "Once you've found properties that catch your eye, save them to your account or make a shortlist. This allows you to compare and revisit your favorites as you make your decision.",
  },
  {
    number: "Причина 03",
    title: "Надежность",
    description:
      "Once you've found properties that catch your eye, save them to your account or make a shortlist. This allows you to compare and revisit your favorites as you make your decision.",
  },
]

export const ChooseUs = () => {
  return (
    <>
      <Box className={s.choose}>
        <Text className={s.chooseTitle}>Почему выбирают нас</Text>

        <Flex gap={"1.87rem"}>
          {data.map((item, index) => (
            <Box className={s.chooseBox} key={index}>
              <Text className={s.chooseBoxTitle}>{item.number}</Text>
              <Box className={s.chooseBoxInner}>
                <Text className={s.chooseBoxInnerTitle}>{item.title}</Text>
                <Text className={s.chooseBoxDescription}>
                  {item.description}
                </Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </>
  )
}
