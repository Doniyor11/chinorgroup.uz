import { Box, Button, Flex, Text } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import Image from "next/image"
import React from "react"

import ImageAbout from "@/shared/assets/images/about.jpg"
import { useModalStore } from "@/shared/store/modal-store.ts"

import s from "./index.module.scss"

type ResultItem = {
  title: string
  description: string
}

export const AboutInfo = () => {
  const { t } = useTranslation("common")
  const { openModal } = useModalStore()

  const dataResults = [
    {
      title: t("about_stat_1_title"),
      description: t("about_stat_1_desc"),
    },
    {
      title: t("about_stat_2_title"),
      description: t("about_stat_2_desc"),
    },
    {
      title: t("about_stat_3_title"),
      description: t("about_stat_3_desc"),
    },
    {
      title: t("about_stat_4_title"),
      description: t("about_stat_4_desc"),
    },
  ]

  return (
    <>
      <Box className={s.aboutInfoContainer}>
        <Flex
          mb={{ base: "2rem", sm: "2.5rem", md: "3rem", lg: "3.5rem" }}
          direction={{ base: "column", lg: "row" }}
          gap={{ base: "2rem", lg: "0" }}
        >
          <Flex
            direction={"column"}
            align={"flex-start"}
            gap={{ base: "1.5rem", md: "2rem" }}
            className={s.aboutInfo}
            w={{ base: "100%", lg: "50%" }}
          >
            <Text className={"title-section"}>{t("about_title")}</Text>
            <Text
              className={s.aboutInfoDescription}
              dangerouslySetInnerHTML={{ __html: t("about_subtitle") }}
            />
            <Button className={"button-green"} onClick={openModal}>
              {t("about_contact_button")}
            </Button>
          </Flex>
          <Flex
            direction={"column"}
            align={"flex-start"}
            gap={{ base: "1rem", md: "0" }}
            className={s.aboutInfo}
            w={{ base: "100%", lg: "50%" }}
          >
            <Text
              className={s.aboutInfoDescriptionRight}
              dangerouslySetInnerHTML={{ __html: t("about_description_1") }}
            />
            <br />
          </Flex>
        </Flex>
        {/*  */}
        <Flex direction={"column"} align={"center"} gap={"2.25rem"}>
          <Box className={s.aboutInfoImageBox}>
            <Image
              src={ImageAbout}
              alt={"About Us"}
              width={1260}
              height={723}
            />
          </Box>
          <Flex
            gap={{ base: "0.75rem", sm: "1rem", md: "1.5rem" }}
            w={"100%"}
            wrap="wrap"
          >
            <AboutInfoResult items={dataResults} />
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

const AboutInfoResult: React.FC<{ items: ResultItem[] }> = ({ items }) => {
  return (
    <>
      {items.map((item, idx) => (
        <Flex
          key={idx}
          direction={"column"}
          align={"flex-start"}
          gap={"0.5rem"}
          bg={"#F4F4F5"}
          className={s.aboutInfoImageCaptionBox}
        >
          <Text className={s.aboutInfoImageCaptionTitle}>{item.title}</Text>
          <Text className={s.aboutInfoImageCaptionDescription}>
            {item.description}
          </Text>
        </Flex>
      ))}
    </>
  )
}
