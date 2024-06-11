import React from 'react'
import FileItem from './FileItem'

export default function FileList({fileList}) {
    console.log(fileList)
  return (
    <div className="p-5 bg-white mt-4 rounded-lg">
      <h2 className="text-17px font-bold items-center">Recent Files</h2>
      <div className="grid grid-cols-4 border-b text-gray-400 mt-3">
        <div className="col-span-2">Name</div>
        <div>Modified</div>
        <div>Size</div>
      </div>
      <div className='flex flex-col gap-3 text-sm'>
        {
            fileList && fileList.length > 0?
            fileList.map((item, key)=>(
                <FileItem key={key} file={item}/>
            )):
            <div>Files is empty</div>
        }
      </div>
    </div>
  )
}
