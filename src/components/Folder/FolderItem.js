import Image from 'next/image'
import React from 'react'

export default function FolderItem({folder}) {
  return (
    <div className="border rounded-lg p-5 shadow h-[13  0px] mt-3 w-full hover:scale-105 cursor-pointer ">
      <Image src='/folder.png' alt='folder' width={40} height={40}/>
      <h2 className="line-clamp-2">{folder.name}</h2>
    </div>
  )
}
