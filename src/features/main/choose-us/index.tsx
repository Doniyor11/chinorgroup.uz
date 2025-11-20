import { Box, Grid, Text } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import React from "react"

import s from "./index.module.scss"

export const ChooseUs = () => {
  const { t } = useTranslation("common")

  const data = [
    {
      number: t("choose_us_reason_1"),
      title: t("choose_us_reason_1_title"),
      description: t("choose_us_reason_1_desc"),
    },
    {
      number: t("choose_us_reason_2"),
      title: t("choose_us_reason_2_title"),
      description: t("choose_us_reason_2_desc"),
    },
    {
      number: t("choose_us_reason_3"),
      title: t("choose_us_reason_3_title"),
      description: t("choose_us_reason_3_desc"),
    },
  ]

  return (
    <>
      <Box className={s.choose}>
        <Text className={"title-section"} c={"#FFF"} ta={"center"}>
          {t("choose_us_title")}
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
