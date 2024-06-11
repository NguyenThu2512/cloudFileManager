'use client'
import app from '@/Config/FirebaseConfig';
import FileList from '@/components/File/FileList';
import UploadFileModal from '@/components/File/UploadFileModal';
import FolderList from '@/components/Folder/FolderList';
import { ParentFolderContext } from '@/context/ParentFolderContext';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import {  useRouter, useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'


export default function FolderDetail() {

  const searchParams = useSearchParams()
  const name=searchParams.get('name');
  const id=searchParams.get('id');
  const db = getFirestore(app);
  const router=useRouter()
  console.log({id})
  const {data: session} =useSession()
  const {parentFolder, setParentFolder}=useContext(ParentFolderContext);
  const [folderList, setFolderList] = useState([]);
  const [fileList, setFileList] = useState([]);
  useEffect(()=>{
    setParentFolder(id)
  }, [])
  useEffect(()=>{
    if(!session){
      router.push("/login")
    }else{
      getFolderList();
      getFileList()
    }
  }, [session])


  async function getFolderList(){
    setFolderList([])
    const q = query(collection(db, "folders"), where("createdBy", "==", session?.user?.email), where("parentFolderId", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
       setFolderList(folderList=>[...folderList,doc.data() ])
      // console.log(doc.id, " => ", doc.data());
    });
  }
  async function getFileList(){
    setFileList([])
    const q = query(collection(db, "files"), where("createdBy", "==", session?.user?.email), where("parentFolderId", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
       setFileList(fileList=>[...fileList,{ id: doc.id, ...doc.data() } ])
      // console.log(doc.id, " => ", doc.data());
    });
  }


  return (
    <div>
      <h2 className="font-bold text-2xl my-3">{name}</h2>
      <FolderList folderList={folderList}/>
      <FileList fileList={fileList}/>
    </div>
  )
}