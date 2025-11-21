import { Box, Flex, Text } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import React, { useState } from "react"

import s from "./index.module.scss"

export const HeroProject = () => {
  const { t } = useTranslation("common")
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    t("hero_project_tab_all"),
    t("hero_project_tab_residential"),
    t("hero_project_tab_commercial"),
    t("hero_project_tab_renovation"),
  ]

  return (
    <Box className={s.heroProject}>
      <Flex
        direction="column"
        align="center"
        justify="center"
        className={s.heroProjectContent}
        w={{ base: "100%", md: "auto" }}
      >
        <Text className={s.heroProjectTitle}>{t("hero_project_title")}</Text>
        <Text className={s.heroProjectDescription}>
          {t("hero_project_description")}
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
