'use client'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

export default function UserInfo() {
    const {data: session}= useSession()
  return (
    <div className="flex items-center gap-3">
        <Image src={session?.user?.image} width={45} height={45} className="rounded-full" alt={'user'}/>
        <div>
            <h2 className="text-[15px] font-bold">{session?.user?.name}</h2>
            <h2 className="text-[13px] text-gray-400">{session?.user?.email}</h2>
        </div>
        <div className="bg-blue-300 p-2 rounded-xl cursor-pointer">
            <FontAwesomeIcon icon={faCog}/>
        </div>
      
    </div>
  )
}
