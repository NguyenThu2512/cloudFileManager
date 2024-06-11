'use client'
import app from '@/Config/FirebaseConfig';
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import { useSession } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast';
import { ParentFolderContext } from '@/context/ParentFolderContext';


export default function CreateFolderModal() {
    const [folderName, setFolderName] = useState("")
    const db = getFirestore(app);
    const {data: session}=useSession()
    const docId=Date.now().toString()
    const {parentFolder, setParentFolder}=useContext(ParentFolderContext)
    async function onCreateFolder(){
        await setDoc(doc(db, "folders", docId), {
            name: folderName,
            id: docId,
            createdBy: session?.user?.email,
            parentFolderId: parentFolder  
        });
        toast.success("Add folder successfully!")
    }

  return (
    <div className="modal-box">
        <form method="dialog" className='modal-box p-9 items-center'>
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <div className='flex flex-col justify-center gap-3 w-ful items-center'>
                <Image src={'/folder.png'} alt="folder" width={50} height={50}/>
                <input type="text" placeholder='Folder Name' className="p-2 border outline-none rounded-md w-full" onChange={(e)=> setFolderName(e.target.value)}/>
                <button className='bg-blue-600 text-white p-2 px-3 w-full rounded-lg' onClick={()=>onCreateFolder()}>Create</button>
            </div>
        </form>
        
    </div>
  )
}
