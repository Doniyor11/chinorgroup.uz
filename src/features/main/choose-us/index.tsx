import { Box, Grid, Text } from "@mantine/core"
import React from "react"

import s from "./index.module.scss"

const data = [
  {
    number: "Sabab 1",
    title: "Sifat",
    description:
      "Chinor Group uylari zamonaviy arxitektura va yuqori sifatli materiallardan foydalanish bilan ajralib turadi. Har bir detalga e'tibor beriladi, bu esa sizga qulay va bardoshli uy ta'minlaydi.",
  },
  {
    number: "Sabab 2",
    title: "Tajriba",
    description:
      "Kompaniyamiz 10 yildan ortiq tajribaga ega bo'lib, ko'plab muvaffaqiyatli loyihalarni amalga oshirdi. Biz mijozlarimizning ehtiyojlarini tushunamiz va ularning orzularini ro'yobga chiqarishga yordam beramiz.",
  },
  {
    number: "Sabab 3",
    title: "Ishonch",
    description:
      "Chinor Group mijozlari bilan uzoq muddatli munosabatlarni o'rnatishga intiladi. Bizning maqsadimiz - sizning ishonchingizni qozonish va sizga eng yaxshi xizmatni taqdim etish.",
  },
]

export const ChooseUs = () => {
  return (
    <>
      <Box className={s.choose}>
        <Text className={"title-section"} c={"#FFF"} ta={"center"}>
          Nega bizni tanlashadi?
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
