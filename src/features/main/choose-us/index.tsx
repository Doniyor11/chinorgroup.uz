import { Box, Grid, Text } from "@mantine/core"
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
        <Text className={"title-section"} c={"#FFF"} ta={"center"}>
          Почему выбирают нас
        </Text>
        <Grid gutter={{ base: "1rem", sm: "1.5rem", md: "1.87rem" }}>
          {data.map((item, index) => (
            <Grid.Col span={{ base: 12, sm: 6, lg: 4 }} key={index}>
              <Box className={s.chooseBox}>
                <Text className={s.chooseBoxTitle}>{item.number}</Text>
                <Box className={s.chooseBoxInner}>
                  <Text className={s.chooseBoxInnerTitle}>{item.title}</Text>
                  <Text className={s.chooseBoxDescription}>
                    {item.description}
                  </Text>
                </Box>
              </Box>
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </>
  )
}
