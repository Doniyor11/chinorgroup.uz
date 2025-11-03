import { Box, Button, Input, Text, Textarea } from "@mantine/core"
import React from "react"

import s from "./styles.module.scss"

export const Contact = () => {
  return (
    <>
      <Box className={s.contactWrapper}>
        <Box className={s.contactWrapperLeft}>
          <Text className={s.contactWrapperTitle}>
            Нужна помощь в поиске уютного дома?
          </Text>
          <Text className={s.contactWrapperDescription}>
            Не стесняйтесь связаться с нами и начните свой путь к дому мечты. Мы
            поможем вам на каждом этапе!
          </Text>
        </Box>
        <Box className={s.contactWrapperRight}>
          <Input.Wrapper label="ФИО" className={s.wrapperInput}>
            <Input placeholder="First name" />
          </Input.Wrapper>
          <Input.Wrapper label="Номер телефона" className={s.wrapperInput}>
            <Input placeholder="+998 (55) 000-0000" />
          </Input.Wrapper>
          <Textarea
            label="Сообщение"
            placeholder="Leave us a message..."
            minRows={5}
            className={s.wrapperInput}
          />
          <Button className={"button-black"} fullWidth>
            Отправить
          </Button>
        </Box>
      </Box>
    </>
  )
}
