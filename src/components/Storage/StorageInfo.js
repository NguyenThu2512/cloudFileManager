'use client'
import app from '@/Config/FirebaseConfig';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

export default function StorageInfo() {
    const {data: session}=useSession()
    const db= getFirestore(app)
    let totalSize=0;
    const[totalSizeUsed, setTotalSizeUsed]=useState(0)

    useEffect(()=>{
        if(session){
            getAllFiles()
        }
    }, [session])

    async function getAllFiles(){
        const q = query(collection(db, "files"), where("createdBy", "==", session?.user?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            totalSize=totalSize + doc.data()['size']
        });
        const total=(totalSize/1024**2).toFixed(2) + " MB"
        setTotalSizeUsed(total)
      }
  return (
    <div className="mt-7">
        <h2><span className="font-bold text-xl">{totalSizeUsed} </span> used of <span className="font-bold text-xl">5 GB</span></h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5 flex">
            <div className="bg-blue-600 h-2.5 w-[25%]"></div>
            <div className="bg-green-600 h-2.5 w-[35%]"></div>
            <div className="bg-yellow-400 h-2.5 w-[15%]"></div>

        </div>
      
    </div>
  )
}
