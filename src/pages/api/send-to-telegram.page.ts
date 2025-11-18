import type { NextApiRequest, NextApiResponse } from 'next'

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

const TELEGRAM_BOT_TOKEN = '7976656548:AAGI9XRJW6q7LbENh9vcEsawH2bFeKEiqr4'
const TELEGRAM_CHAT_ID = '633078634'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    const { name, phone, message }: ContactFormData = req.body

    // Validation
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Ism va telefon raqami majburiy'
      })
    }

    // Format message for Telegram
    const telegramMessage = `
🔔 Yangi murojaat!

👤 Ism: ${name}
📞 Telefon: ${phone}
💬 Xabar: ${message || 'Xabar yo\'qoldirilmagan'}

📅 Vaqt: ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}
    `.trim()

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML',
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Telegram API error:', data)
      return res.status(500).json({
        success: false,
        error: 'Xabar yuborishda xatolik yuz berdi'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Xabar muvaffaqiyatli yuborildi!'
    })
  } catch (error) {
    console.error('Error sending to Telegram:', error)
    return res.status(500).json({
      success: false,
      error: 'Server xatosi'
    })
  }
}