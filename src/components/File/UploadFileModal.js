import app from '@/Config/FirebaseConfig'
import { ParentFolderContext } from '@/context/ParentFolderContext'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";


export default function UploadFileModal({closeModal}) {
    const db= getFirestore(app)
    const {data: session}=useSession()
    const docId=Date.now().toString()
    const {parentFolder, setParentFolder}=useContext(ParentFolderContext)
    const storage = getStorage();


    async function onFileUpload(file){
        const fileRef = ref(storage, 'files/'+file.name);
        uploadBytes(fileRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
          }).then((resp)=>{
            getDownloadURL(fileRef).then(async(downloadURL) => {
                console.log('File available at', downloadURL);
                const newFile={
                    name: file.name,
                    type: file.name.split('.')[1],
                    size: file.size,
                    modifiedAt: file.lastModified,
                    createdBy: session.user.email,
                    parentFolderId: parentFolder,
                    imageUrl: downloadURL
                    
                }
                await setDoc(doc(db, "files", docId), newFile);
            });
          })
        closeModal(true)
        toast.success("Add folder successfully!")
    }
  return (
    <div className="modal-box">
        <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div className='flex flex-col gap-2 justify-center items-center h-[200px] bg-gray-100 border-2 rounded-lg border-gray-200 m-3 '>
            <div>
                <label htmlFor="uploadFile">
                    <input type="file" id="uploadFile" className='hidden' onChange={e=> onFileUpload(e.target.files[0])} />
                    <FontAwesomeIcon icon={faCloudUploadAlt} className="text-3xl"/>
                </label>
            </div>
            <p><b>Click to upload</b> or drag and drop</p>
            <p className='font-light text-sm'>SVG, PNG, JPG, or GIF(MAX, 800x400px)</p>
        </div>
        
    </div>
  )
}
