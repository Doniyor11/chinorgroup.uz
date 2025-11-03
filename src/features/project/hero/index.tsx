import { Box, Flex, Text } from "@mantine/core"
import React, { useState } from "react"

import s from "./index.module.scss"

export const HeroProject = () => {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = ["Все проекты", "Жилые", "Коммерческие", "Ремонт"]
  return (
    <Box className={s.heroProject}>
      <Flex
        direction="column"
        align="center"
        justify="center"
        className={s.heroProjectContent}
        miw={"45.6875rem"}
        maw={"1rem"}
      >
        <Text className={s.heroProjectTitle}>Наши проекты</Text>
        <Text className={s.heroProjectDescription}>
          Профессиональное строительство и ремонт любой сложности. Современные
          технологии, опытная команда, гарантия качества.
        </Text>
        <Flex className={s.heroProjectTab}>
          {tabs.map((tab, index) => (
            <Text
              key={index}
              className={`${s.heroProjectTabItem} ${
                activeTab === index ? s.active : ""
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </Text>
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}
