import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function SearchBar() {
  return (
    <div>
      <div className="p-2 bg-gray-100 rounded-lg">
        <FontAwesomeIcon icon={faSearch} className="mr-2"/>
        <input type="text" placeholder="Search" className="bg-transparent  outline-none border-none" onKeyDown={(e)=> e.key=='Enter' && console.log(e.target.value)} />
      </div>
    </div>
  )
}
