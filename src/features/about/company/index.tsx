import { Box, Grid, Text } from "@mantine/core"
import Image from "next/image"
import React from "react"

import Image1 from "@/shared/assets/images/about2.jpg"

import s from "./index.module.scss"

export const Company = () => {
  return (
    <Box className={s.company}>
      <Grid gutter={{ base: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" }}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Text className={s.companyTitle} mb={{ base: "1rem", md: "1.5rem" }}>
            Chinor Group Development
          </Text>
          <Text
            className={s.companyDescription}
            mb={{ base: "1rem", md: "1.5rem" }}
          >
            Chinor Group Development — современная строительная компания,
            уверенно зарекомендовавшая себя на рынке недвижимости Ташкента.
            Основное направление деятельности — возведение жилых комплексов с
            акцентом на качество строительства, продуманную архитектуру и
            благоприятную городскую среду. Один из ключевых проектов застройщика
            — Jomiy Residence, расположенный в перспективном районе города.
            Комплекс включает дома в 14 и 16 этажей с квартирами различной
            площади, выполненными по монолитно-каркасной технологии.
          </Text>
          <Text className={s.companyDescription}>
            Просторные помещения, высокие потолки, энергоэффективные материалы и
            развитая инфраструктура делают этот проект привлекательным как для
            инвесторов, так и для семей. Компания предлагает гибкие условия
            покупки: рассрочку и ипотеку, а также своевременные сроки сдачи
            объектов. Chinor Group Development стремится создать комфортное и
            безопасное жильё для тех, кто ценит практичность и надежность.
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
