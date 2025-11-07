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
        w={{ base: "100%", md: "auto" }}
      >
        <Text className={s.heroProjectTitle}>Наши проекты</Text>
        <Text className={s.heroProjectDescription}>
          Профессиональное строительство и ремонт любой сложности. Современные
          технологии, опытная команда, гарантия качества.
        </Text>
        <Flex className={s.heroProjectTab} gap={{ base: "0.25rem", sm: "0" }}>
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
