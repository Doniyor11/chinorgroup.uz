import { Box, Grid, Text } from "@mantine/core"
import Image from "next/image"
import React from "react"

import Image1 from "@/shared/assets/images/about2.png"

import s from "./index.module.scss"

export const Company = () => {
  return (
    <Box className={s.company}>
      <Grid gutter={"3rem"}>
        <Grid.Col span={6}>
          <Text className={s.companyTitle}>
            Прокладывая путь к <br /> совершенству в строительстве недвижимости
            ради вашего <br /> будущего.
          </Text>
          <Text className={s.companyDescription}>
            В компании Chinor мы стремимся преобразить сферу недвижимости,
            предлагая инновационные и устойчивые решения в строительстве. Наша
            миссия — создавать исключительные пространства, которые вдохновляют,
            дают силу и улучшают жизнь тех, кто живёт, работает и инвестирует в
            них.
          </Text>

          <Text className={s.companyDescription}>
            От современных жилых комплексов до динамичных коммерческих объектов
            — каждый наш проект отражает нашу преданность совершенству.
            Руководствуясь видением создания долговечной ценности, мы уделяем
            приоритетное внимание качеству, функциональности и дизайну, чтобы
            наши объекты выдерживали испытание временем.
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Box className={s.companyImage}>
            <Image src={Image1} alt={"About Image"} />
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  )
}
