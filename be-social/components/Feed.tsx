import posts from '@/utils/Dummypost'
import React from 'react'
import { BiComment,  BiShareAlt } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { FaThumbsUp } from 'react-icons/fa'

const Feed = () => {
  return (
    <main>
      <div className="my-3 p-2 shadow-md rounded-md">
        <h3 className='py-3 px-1 rounded-md shadow-sm'>Post Something</h3>
        <section className='flex justify-center items-center gap-2'>
          <CgProfile className='text-3xl'/>
          <input type="text" placeholder='Write something' className='w-5/6 px-3 py-2' />
          <button className='rounded-md bg-blue-600 text-white px-3 py-2'>post</button>
        </section>
      </div>
        
        <div className="">
          {posts.map((post)=>(
            <div className="shadow-2xl my-4" key={post.id}>
             <section className='flex justify-between'>
                <h1>{post.accountName}</h1>
                <h4>{post.postedDate.toString().substring(4,11)}</h4>
             </section>
             <section>
                <h3>{post.content}</h3>
             </section>
             <section className='flex gap-3 text-center'>
                <span><FaThumbsUp/>{post.likes}</span>
                <span><BiComment/>{post.commentsCount}</span>
                <span><BiShareAlt/>{post.shares}</span>
             </section>
            </div>
          ))}
        </div>

    </main>
  )
}

export default Feed
