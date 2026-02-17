import React from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'

function TableColAscDsc({onClick}: {onClick?: () => void}) {
  return (
    <div>
      <button className="flex flex-col cursor-pointer" onClick={onClick}>
            <IoMdArrowDropdown className=" rotate-180" />
            <IoMdArrowDropdown />
          </button>
    </div>
  )
}

export default TableColAscDsc
