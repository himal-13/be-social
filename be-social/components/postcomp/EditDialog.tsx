import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { useEffect, useState } from "react"
import { BiEdit } from "react-icons/bi"
import { Button } from "../ui/button"
import { Input } from "postcss"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/services/Firebase"

interface Prop{
    content:string,
    id:string
}
  
  
  const EditDialog = ({content,id}:Prop) => {
    const[inputValue,setInputValue]= useState('')

    useEffect(()=>{
        setInputValue(content)

    },[])

    const handleUpdate =async()=>{
      // try{
      //   const postRef = doc(db,'post',id)
      //   await updateDoc(postRef,)

      // }catch(e:any){
      //   console.log(e.code)
      // }

    }
    return (
        <Dialog >
        <DialogTrigger className="flex gap-2 justify-center py-2 w-full" >Edit <BiEdit/></DialogTrigger>
        <DialogContent className="m-0 p-0" >
          <DialogHeader>
            <DialogTitle className="pt-3">Edit the post</DialogTitle>
            <DialogDescription className="pb-3">
              <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} className="px-4 py-2 rounded-md my-3 mx-2"/>
              <DialogClose asChild>
              <Button type="submit" onClick={handleUpdate}>Save</Button>
              </DialogClose>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
    )
  }
  
  export default EditDialog
