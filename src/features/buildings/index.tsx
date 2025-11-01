import { Flex, Select, Text } from "@mantine/core"
import React from "react"

import s from "./index.module.scss"

export const Buildings = () => {
  return (
    <>
      <Flex>
        <Text className={'title-section'} c={'#18181B'}>Новостройки</Text>
        <Select
          className={s.buldingsSelect}
          data={[
            { value: "all", label: "в Ташкенте" },
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
          ]}
        ></Select>
      </Flex>
    </>
  )
}
