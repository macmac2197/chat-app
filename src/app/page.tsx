import { db } from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  await db.set("hello", "hello");

  return <div className="text-red-500">My Realtime Chat Application</div>;
}
