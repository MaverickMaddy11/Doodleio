import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { ChatRoom } from "../../../components/ChatRoom";

async function getRoomId(slug: string) {
  const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
  console.log(response);
  return response.data.room.id;
}

export default async function ChatRoom1({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const slug = (await params).slug;
  const roomId = await getRoomId(slug);
  console.log("room id -> ");
  console.log(roomId);
  //window.location.href = `http//localhost:3000/canvas/${roomId}`;

  //@ts-ignore
  return <ChatRoom id={roomId}></ChatRoom>;
}
