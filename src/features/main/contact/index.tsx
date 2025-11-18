import { Box, Button, Input, Text, Textarea } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import React, { useState } from "react"

import s from "./styles.module.scss"

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.phone) {
      notifications.show({
        title: "Xatolik",
        message: "Iltimos, ism va telefon raqamini kiriting",
        color: "red",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/send-to-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        notifications.show({
          title: "Muvaffaqiyatli!",
          message: "Xabaringiz yuborildi. Tez orada siz bilan bog'lanamiz!",
          color: "green",
        })
        // Reset form
        setFormData({ name: "", phone: "", message: "" })
      } else {
        notifications.show({
          title: "Xatolik",
          message: data.error || "Xabar yuborishda xatolik yuz berdi",
          color: "red",
        })
      }
    } catch (error) {
      console.error("Error:", error)
      notifications.show({
        title: "Xatolik",
        message: "Xabar yuborishda xatolik yuz berdi",
        color: "red",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Box className={s.contactWrapper}>
        <Box className={s.contactWrapperLeft}>
          <Text className={s.contactWrapperTitle}>
            Sizga mos uyni topishga yordam beramiz!
          </Text>
          <Text className={s.contactWrapperDescription}>
            Biz bilan bog'laning va mutaxassislarimiz sizga eng yaxshi
            yechimlarni taklif etadi.
          </Text>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          className={s.contactWrapperRight}
        >
          <Input.Wrapper label="Ismingiz" className={s.wrapperInput}>
            <Input
              placeholder="To'liq ismingiz?"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </Input.Wrapper>
          <Input.Wrapper label="Telefon raqamingiz" className={s.wrapperInput}>
            <Input
              placeholder="+998 (55) 000-0000"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </Input.Wrapper>
          <Textarea
            label="Xabar qoldiring"
            placeholder="Talab va istaklaringizni yozib qoldiring"
            minRows={5}
            className={s.wrapperInput}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
          <Button
            type="submit"
            className={"button-black"}
            fullWidth
            loading={isLoading}
            disabled={isLoading}
          >
            Jo'natish
          </Button>
        </Box>
      </Box>
    </>
  )
}
