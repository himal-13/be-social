import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { BiEdit } from 'react-icons/bi'
import { FaDeleteLeft } from 'react-icons/fa6'
import { BsThreeDotsVertical } from 'react-icons/bs'
import EditDialog from './EditDialog'

interface Props{
    handleEdit:()=>void,
    handleDelete:()=>void,
    content:string,
    id:string
}
  

const PoppupOver = ({handleDelete,id,content}:Props) => {

  
  return (
    <Popover>
        <PopoverTrigger><BsThreeDotsVertical /></PopoverTrigger>
        <PopoverContent className='max-w-fit max-h-fit p-0 m-0'>
            <EditDialog content={content} id={id}/>
            <p className='flex gap-3 p-[5px] m-[5px] shadow-sm items-center' onClick={handleDelete}>delete <FaDeleteLeft/></p>
        </PopoverContent>
    </Popover>

  )
}

export default PoppupOver
