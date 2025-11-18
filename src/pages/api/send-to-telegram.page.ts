import type { NextApiRequest, NextApiResponse } from "next"

type ContactFormData = {
  name: string
  phone: string
  message: string
}

type ResponseData = {
  success: boolean
  message?: string
  error?: string
}

const TELEGRAM_BOT_TOKEN = "7976656548:AAGI9XRJW6q7LbENh9vcEsawH2bFeKEiqr4"
const TELEGRAM_CHAT_ID = "-633078634" // Для групп добавляем минус

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" })
  }

  try {
    console.log("Received request body:", req.body)

    const { name, phone, message }: ContactFormData = req.body

    // Validation
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        error: "Ism va telefon raqami majburiy",
      })
    }

    // Format message for Telegram (без HTML тегов)
    const telegramMessage = `🔔 Yangi murojaat!

👤 Ism: ${name}
📞 Telefon: ${phone}
💬 Xabar: ${message || "Xabar qoldirilmagan"}

📅 Vaqt: ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" })}`

    console.log("Sending message to Telegram:", telegramMessage)

    // Send to Telegram
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

    const data = await response.json()
    console.log("Telegram API response:", data)

    if (!response.ok) {
      console.error("Telegram API error:", data)
      return res.status(500).json({
        success: false,
        error: `Telegram error: ${data.description || "Unknown error"}`,
      })
    }

    return res.status(200).json({
      success: true,
      message: "Xabar muvaffaqiyatli yuborildi!",
    })
  } catch (error) {
    console.error("Error sending to Telegram:", error)
    return res.status(500).json({
      success: false,
      error: `Server xatosi: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    })
  }
}
