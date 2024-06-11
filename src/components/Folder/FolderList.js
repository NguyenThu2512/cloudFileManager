'use client'
import React from 'react'
import FolderItem from './FolderItem'
import { useRouter } from 'next/navigation';

export default function FolderList({folderList}) {
  console.log({folderList})
  const router = useRouter();

  function onClickFolder(item){
    // router.push({
    //   pathname: `/folders/${item.id}`,
    //   query: { name: item.name }
    // }).catch(err => {
    //   console.error("Error navigating:", err);
    // });
    router.push(`/folders/${item.id}?name=${item.name}&id=${item.id}`)

  }

  return (
    <div className='bg-white p-5 mt-5  rounded-lg'>
      <h2 className='text-17px font-bold items-center'>Recent folder
        <span className='float-right text-blue-400 font-normal'>View All</span>
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
        {
          folderList && folderList.length>0?
            folderList.map((item, index)=>(
                <div key={index} onClick={()=>onClickFolder(item)}>
                  <FolderItem folder={item} />
                </div>
            ))
          :
          <div>Folder is Empty</div>
        }
        
      </div>
    </div>
  )
}
