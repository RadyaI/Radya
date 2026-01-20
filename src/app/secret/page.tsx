"use client"

import CursorFollower from "@/components/learning/UI/CursorFollower"
import { Cat } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

export default function secret() {

    const [toggle, setToggle] = useState(false)

    const getClicked = () => {
        toast("Curiga")
        setToggle(true)
        setTimeout(() => {
            setToggle(false)
            toast("😼")
        }, 1000);
    }

    return (
        <>
            <Toaster
                position="top-right"
            />
            <CursorFollower></CursorFollower>
            <div className="bg-black w-full h-screen cursor-none flex justify-center items-center">
                {toggle && (<div className="absolute rounded-lg w-100 h-100 md:w-140 md:h-140">
                    <Image fill src="https://i.pinimg.com/736x/72/1f/cc/721fccffcb558397ac6af7f360d7fe4d.jpg" alt="Curiga"></Image>
                </div>)}
                {!toggle && (<div onClick={getClicked} className="flex flex-col justify-center items-center rounded-lg w-20 h-20">
                    <Cat className="text-orange-400 w-10 h-10"></Cat>
                    <p className="text-white text-sm font-mono">Clik Me</p>
                </div>)}
            </div>
        </>
    )
}