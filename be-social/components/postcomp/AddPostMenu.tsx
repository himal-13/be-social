import React, { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { PostType } from '../Feed'
import { useUserContext } from '@/utils/UserContext'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/services/Firebase'

interface props{
  fetchPosts:()=>void
}

const AddPostMenu = ({fetchPosts}:props) => {
    const{currentUser} = useUserContext()
    const[postInput,setPostInput] = useState('')

    let loading = false;

    const handleAddPost=async()=>{
      loading=true
        if(postInput.trim()!=='' && loading){
            const newPost:PostType = {content:postInput,likes:0,user:currentUser?.displayName??'Anonymous user',email:currentUser?.email??'',comment:0,postedDate:Date.now().toString(),share:0,}

            try{
                const docRef = await addDoc(collection(db,'posts'),newPost)
                setPostInput('')
            }catch(e:any){
                console.log(e)
            }
        }
        fetchPosts();
        loading= false
    }
  return (
    <div className="my-3 p-2 shadow-md rounded-md">
    <h3 className=' px-1 rounded-md'>Post Something</h3>
    <section className='flex justify-center items-center gap-2'>
      <CgProfile className='text-3xl'/>
      <input type="text" placeholder='Write something' className='w-5/6 px-3 py-2' value={postInput} onChange={(e)=>setPostInput(e.target.value)} />
      <button className='rounded-md bg-blue-600 text-white px-3 py-2' onClick={handleAddPost}>post</button>
    </section>
  </div>
  )
}

export default AddPostMenu
