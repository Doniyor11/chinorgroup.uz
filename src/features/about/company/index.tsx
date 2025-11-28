import { Box, Grid, Text } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import Image from "next/image"
import React from "react"

import Image1 from "@/shared/assets/images/about2.jpg"

import s from "./index.module.scss"

export const Company = () => {
  const { t } = useTranslation("common")

  return (
    <Box className={s.company}>
      <Grid gutter={{ base: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" }}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Text className={s.companyTitle} mb={{ base: "1rem", md: "1.5rem" }}>
            {t("company_title")}
          </Text>
          <Text
            className={s.companyDescription}
            mb={{ base: "1rem", md: "1.5rem" }}
          >
            {t("company_description_1")}
          </Text>
          <Text className={s.companyDescription}>
            {t("company_description_2")}
          </Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Box className={s.companyImage}>
            <Image src={Image1} alt={"About Image"} />
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  )
}
