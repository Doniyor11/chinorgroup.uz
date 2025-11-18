type ContactFormData = {
  name: string
  phone: string
  message: string
}

const TELEGRAM_BOT_TOKEN = "7976656548:AAGI9XRJW6q7LbENh9vcEsawH2bFeKEiqr4"
const TELEGRAM_CHAT_ID = "-4957015270"

export const sendToTelegram = async (data: ContactFormData): Promise<void> => {
  const { name, phone, message } = data

  // Format message for Telegram
  const telegramMessage = `🔔 Yangi murojaat!

👤 Ism: ${name}
📞 Telefon: ${phone}
💬 Xabar: ${message || "Xabar qoldirilmagan"}

📅 Vaqt: ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" })}`

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

  const response = await fetch(telegramUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: telegramMessage,
    }),
  })

  const result = await response.json()

  if (!response.ok) {
    console.error("Telegram API error:", result)
    throw new Error(result.description || "Xabar yuborishda xatolik yuz berdi")
  }
}
