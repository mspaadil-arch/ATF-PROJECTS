import twilio from 'twilio'

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)

export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export const sendSmsOtp = async (phone: string, code: string): Promise<void> => {
  const message = `Your ATF Projects Worker Portal OTP is: ${code}. Valid for 10 minutes. Do not share with anyone.`

  if (process.env.NODE_ENV === 'development') {
    console.log(`[OTP DEV] Sending to +91${phone}: ${code}`)
    return
  }

  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE,
    to: `+91${phone}`,
  })
}
