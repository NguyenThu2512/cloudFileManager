'use client'
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SideNavBar from "../components/SideNavBar";
import SearchBar from "@/components/SearchBar";
import FolderList from "@/components/Folder/FolderList";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import app from "@/Config/FirebaseConfig";
import FileList from "@/components/File/FileList";

export default function Home() {
  const {data: session} = useSession()
  const router=useRouter()
  const db = getFirestore(app);
  const [folderList, setFolderList]=useState([])
  const [fileList, setFileList]=useState([])
  useEffect(()=>{
    if(!session){
      router.push("/login")
    }else{
      console.log({session})
      getFolderList();
      getFileList()
    }
  }, [session])

  async function getFolderList(){
    setFolderList([])
    const q = query(collection(db, "folders"), where("createdBy", "==", session?.user?.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFolderList(folderList=>[...folderList,doc.data() ])
    });
  }
  async function getFileList(){
    setFileList([])
    const q = query(collection(db, "files"), where("createdBy", "==", session?.user?.email), where("parentFolderId", "==", ""));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log({doc})
      setFileList(fileList=>[...fileList,{ id: doc.id, ...doc.data() } ])
    });
  }
  
  return (
    <div className="p-5">
      <FolderList folderList={folderList}/>
      <FileList fileList={fileList}/>
    </div>
  );
}
