import { Box, Flex, Input, Text } from "@mantine/core"
import React from "react"

import IconSearch from "../../shared/assets/images/icons/icon-search.svg"
import s from "./index.module.scss"

interface PageHeadProps {
  title: string
  subtitle: string
  description: string
  search?: boolean
}

export const PageHead = ({
  title,
  subtitle,
  description,
  search = false,
}: PageHeadProps) => {
  return (
    <>
      <Box className={s.pageHeaderContainer}>
        <Flex
          mb={{
            base: search ? "2rem" : "0",
            sm: search ? "2.5rem" : "0",
            md: search ? "3rem" : "0",
            lg: search ? "3.5rem" : "0",
          }}
          direction={{ base: "column", lg: "row" }}
          gap={{ base: "2rem", lg: "1.2rem" }}
        >
          <Flex
            direction={"column"}
            align={"flex-start"}
            gap={{ base: "1.5rem", md: "2rem" }}
            className={s.pageHeader}
            w={{ base: "100%", lg: "50%" }}
          >
            <Text className={"title-section"}>{title}</Text>
            <Text className={s.pageHeaderDescription}>{subtitle}</Text>
          </Flex>
          <Flex
            direction={"column"}
            align={"flex-start"}
            gap={{ base: "1rem", md: "0" }}
            className={s.pageHeader}
            w={{ base: "100%", lg: "50%" }}
          >
            {description && (
              <Text
                className={s.pageHeaderDescriptionRight}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
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
