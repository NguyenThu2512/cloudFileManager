'use client'
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const {data:session} = useSession()
    const router=useRouter()
    useEffect(()=>{
        if(session){
            router.push('/')
        }
    }, [session])
  return (
    <div className="flex justify-center items-center mt-[50%]">
      <button className='bg-blue-400 p-2 rounded-lg px-3 text-white' onClick={()=>signIn()}>
        Login with Google
      </button>
    </div>
  )
}
