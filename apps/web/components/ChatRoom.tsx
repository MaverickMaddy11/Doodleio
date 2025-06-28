import { BACKEND_URL } from "../config";
import axios from "axios";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(roomId: string) {
  const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);

  return response.data.messages;
}

export async function ChatRoom(id: string) {
  console.log(id);
  console.log(id);

  //@ts-ignore
  console.log(id.id);
  //@ts-ignore
  const message = await getChats(id.id);
  console.log("this is the message ");
  console.log(message);
  return <ChatRoomClient messages={message} id={id}></ChatRoomClient>;
}
