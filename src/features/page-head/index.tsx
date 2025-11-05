import { Box, Flex, Input, Text } from "@mantine/core"
import React from "react"

import IconSearch from "../../shared/assets/images/icons/icon-search.svg"
import s from "./index.module.scss"

interface PageHeadProps {
  title: string
  subtitle: string
  description1: string
  description2: string
  search?: boolean
}

export const PageHead = ({
  title,
  subtitle,
  description1,
  description2,
  search = false,
}: PageHeadProps) => {
  return (
    <>
      <Box className={s.pageHeaderContainer}>
        <Flex mb={"3.5rem"}>
          <Flex
            direction={"column"}
            align={"flex-start"}
            gap={"2rem"}
            className={s.pageHeader}
            w={"50%"}
          >
            <Text className={"title-section"}>{title}</Text>
            <Text className={s.pageHeaderDescription}>{subtitle}</Text>
          </Flex>
          <Flex
            direction={"column"}
            align={"flex-start"}
            className={s.pageHeader}
            w={"50%"}
          >
            <Text className={s.pageHeaderDescriptionRight}>{description1}</Text>
            <Text className={s.pageHeaderDescriptionRight}>{description2}</Text>
          </Flex>
        </Flex>
        {search && (
          <Input
            leftSection={<IconSearch />}
            className={s.pageHeaderSearch}
            classNames={{
              section: s.pageHeaderSearchSection,
            }}
          />
        )}
      </Box>
    </>
  )
}
