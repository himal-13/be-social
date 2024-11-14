'use client'

import React from 'react'
import { FaHeart,  } from 'react-icons/fa'
import { BiComment, } from 'react-icons/bi'
import PoppupOver from './PoppupOver'
import { IoIosShareAlt } from 'react-icons/io'
import { useUserContext } from '@/utils/UserContext'

interface Post{
    content:string,
    likes:number,
    user:string,
    postedDate:string,
    share:number,
    email:string,
    comment:number
    id?:string

}

interface PostProps{
    post:Post,
    handleDelete:()=>void,
    handleEdit:()=>void
}

const Post = ({post,handleDelete,handleEdit}:PostProps) => {
    const{currentUser} = useUserContext()

  return (
    <div className="shadow-2xl my-4 p-2" >
        <section className='flex justify-between'>
            <h1>{post.email??'Anonymous user'}</h1>
            {post.email ===currentUser?.email?<PoppupOver id={post.id??''} content={post.content} handleDelete={handleDelete} handleEdit={handleEdit}/>:<></>}
        </section>
        <section className='pb-3 shadow-md'>
            <h3>{post.content}</h3>
        </section>
            <section className='flex justify-around text-center mt-3'>
            <span className='cursor-pointer'><FaHeart/>{post.likes}</span>
            <span className='cursor-pointer'><BiComment/>{post.comment}</span>
            <span className='cursor-pointer'><IoIosShareAlt/>{post.share}</span>
        </section>
    </div>
  )
}

export default Post
