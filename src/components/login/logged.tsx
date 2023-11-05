import getSession from "@/lib/auth"
import PopOver from "./PopOver"
import PopOverUserHandler from "./PopOverUserHandler"
import Link from "next/link"
import { Button } from "../ui/button"
import { UserCircle2 } from "lucide-react"
import Image from "next/image"

export default async function Logged() {

    const session= await getSession()

    if (!session) return (
        <Link href="/login"><Button variant="outline">Login</Button></Link>
    )

    const { user } = session
    if (!user.email) return <div>User email not found</div>

    const avatar= user.image ? 
        <Image className="rounded-full w-20" src={user?.image} width={116} height={35} alt="User image" /> : 
        // <p className="font-bold cursor-pointer hover:opacity-80 bg-first-color rounded-full text-white w-12 h-12 flex justify-center items-center text-3xl">{user.email.substring(0,1).toUpperCase()}</p>
        <svg viewBox="0 0 25.397 23.5" xmlns="http://www.w3.org/2000/svg" className="user-avatar"><path d="m12.699 1.3743e-5a12.68 12.68 0 0 0-6.63 23.5v-3.44a6.63 6.63 0 1 1 13.26 0v3.44a12.68 12.68 0 0 0-6.63-23.5zm0 12.08a4.34 4.34 0 1 1 4.34-4.34 4.34 4.34 0 0 1-4.34 4.34z" fill="currentColor"></path></svg>

    return (<PopOver trigger={avatar} body={<PopOverUserHandler />} />)
}
