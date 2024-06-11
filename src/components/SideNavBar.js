'use client'
import menu from '@/data/menu'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useState } from 'react'
import CreateFolderModal from './Folder/CreateFolderModal'
import UploadFileModal from './File/UploadFileModal'

export default function SideNavBar() {

  return (
    <div className='w-[250px] px-5 bg-white h-screen sticky top-0 z-10 p-2 shadow-blue-300 shadow-md'>
        <div className=' flex justify-center'>
            <Image src={'/logo.png'} alt='logo' width={150} height={150} />
        </div>
        <button onClick={()=>document.getElementById('add_file_modal').showModal()} className='flex gap-2 items-center bg-blue-500 p-2 w-full text-white rounded-md px-3 hover:scale-105 transition-all mt-5'>
            Add new file
            <FontAwesomeIcon icon={faPlusCircle}/>
        </button>
        <button className='flex gap-2 items-center bg-sky-500 p-2 w-full text-white rounded-md px-3 hover:scale-105 transition-all mt-5' onClick={()=>document.getElementById('my_modal_3').showModal()}>
            Add new folder
            <FontAwesomeIcon icon={faPlusCircle}/>
        </button>
        <div>
          {menu.list.map((item, index)=>(
            <div key={index}>
              <div className='flex gap-2 p-2 mt-3 hover:bg-blue-400 hover:text-white rounded-md cursor-pointer'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={item.logo}
                  />
                </svg>
                <h2>{item.name}</h2>
              </div>
            </div>
          ))}
        </div>
        <dialog id="my_modal_3" className="modal">
          <CreateFolderModal/>
        </dialog>
        <dialog id="add_file_modal" className="modal">
          <UploadFileModal closeModal={()=> window.add_file_modal.close()}/>
        </dialog>
    </div>
  )
}
