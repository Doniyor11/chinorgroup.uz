import { Box, Flex, Grid, Text } from "@mantine/core"
import Image from "next/image"
import React from "react"

import Image1 from "@/shared/assets/images/blog-image2.png"

import s from "./index.module.scss"

export const BlogContainer = () => {
  return (
    <>
      <Box className={s.blogContainer}>
        <Flex direction={"column"} gap={"1rem"} mb={"2rem"}>
          <Text className={s.blogCardTitle}>Если вы пропустили это</Text>
          <Text className={s.blogCardDescription}>
            Вот коллекция интересных статей, которые вы, возможно, еще не
            видели. Не упустите важную информацию и последние тенденции, которые
            могут расширить ваши знания.
          </Text>
        </Flex>

        <Grid gutter={{ base: "1rem", sm: "1.25rem", md: "1.5rem" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 4 }} key={item}>
              <Flex direction={"column"} gap={"1rem"} className={s.blogCard}>
                <Box className={s.blogCardImage}>
                  <Image src={Image1} alt={""} />
                </Box>
                <Text className={s.blogCardDate}>May 16, 2024</Text>
                <Text className={s.blogCardInfo}>
                  8 стильных идей дизайна открытой кухни типа 36
                </Text>
              </Flex>
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </>
  )
}
