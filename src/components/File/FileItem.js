import app from '@/Config/FirebaseConfig'
import { faEllipsisV, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteDoc, doc, getFirestore } from 'firebase/firestore'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast'

export default function FileItem({file}) {
    const db= getFirestore(app)
    async function handleDeleteFile(file){
        await deleteDoc(doc(db, "files", file.id)).then((resp)=>{
            toast.success("Delete file successfully")
        });
    }
  return (
    <div className="grid grid-cols-4 items-center mt-4">
        <div className="col-span-2 flex gap-2 items-center cursor-pointer" onClick={()=> window.open(file.imageUrl)}>
            <Image src={'/image.png'} alt="file" width={40} height={40} />
            {file.name}
        </div>
        <div>{moment(file.modifiedAt).format('YYYY-MM-DD')}</div>
        <div className='flex gap-8 items-center'>
            {(file.size/1024**2).toFixed(2) + " MB"}
            <span className="text-xl text-red-500 cursor-pointer" onClick={()=> handleDeleteFile(file)}><FontAwesomeIcon icon={faTrashAlt}/></span>
        </div>
    </div>
  )
}
