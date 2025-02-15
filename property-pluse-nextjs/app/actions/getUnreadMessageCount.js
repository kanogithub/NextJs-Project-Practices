'use server'
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser"

async function getUnreadMessageCount() {
  await connectDB()
  
  const session = await getSessionUser()
  if (session === null) return { count: 0 }

  const { userId } = session
  const count = await Message.countDocuments({
    recipient: userId,
    read: false
  })

  return { count }
}

export default getUnreadMessageCount