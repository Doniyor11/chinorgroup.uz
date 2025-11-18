import { Box, Button, Input, Modal, Text, Textarea } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import React, { useState } from "react"

import { sendToTelegram } from "@/shared/api"
import { useModalStore } from "@/shared/store/modal-store"

import s from "./styles.module.scss"

export const ModalForm = () => {
  const { isOpen, closeModal } = useModalStore()
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
      await sendToTelegram(formData)

      notifications.show({
        title: "Muvaffaqiyatli!",
        message: "Xabaringiz yuborildi. Tez orada siz bilan bog'lanamiz!",
        color: "green",
      })

      // Reset form and close modal
      setFormData({ name: "", phone: "", message: "" })
      closeModal()
    } catch (error) {
      console.error("Error:", error)
      notifications.show({
        title: "Xatolik",
        message:
          error instanceof Error
            ? error.message
            : "Xabar yuborishda xatolik yuz berdi",
        color: "red",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      title={
        <Text size="2rem" fw={500} c={"#18181B"}>
          Отправьте заявку
        </Text>
      }
      centered
      size="45rem"
      p={"2.5rem"}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        className={s.modalWrapperRight}
      >
        <Input.Wrapper label="Ismingiz" className={s.modalWrapperInput}>
          <Input
            placeholder="To'liq ismingiz?"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </Input.Wrapper>
        <Input.Wrapper
          label="Telefon raqamingiz"
          className={s.modalWrapperInput}
        >
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
          className={s.modalWrapperInput}
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
    </Modal>
  )
}
