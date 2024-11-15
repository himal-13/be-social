
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LucideDelete } from "lucide-react";
import { BsThreeDots } from "react-icons/bs";

interface Props{
    handleEdit:()=>void,
    handleDelete:()=>void,
    content:string,
    id:string
}
  

const PoppupOver = ({handleDelete}:Props) => {

  
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <span><BsThreeDots /></span>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuGroup>
        <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
          Delete
          <DropdownMenuShortcut ><LucideDelete/></DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Keyboard shortcuts
          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>   
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default PoppupOver
