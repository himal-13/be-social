'use client'
import { db } from '@/services/Firebase'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Post from './postcomp/Post'
import AddPostMenu from './postcomp/AddPostMenu'
import SkeletonCom from './postcomp/SkeletonCom'

export interface PostType{
  content:string,
  likes:number,
  user:string,
  postedDate:string,
  share:number,
  email:string,
  id?:string
  comment:number

}

const Feed = () => {

  const[posts,setPosts] = useState<PostType[]>([])
  const[isLoading,setIsLoading]= useState(false)

  const fetchItems =async()=>{
    setIsLoading(true)
    try{
      const quarySnapShot = await getDocs(collection(db,'posts'));
      const postArray:PostType[] = quarySnapShot.docs.map((d)=>({
        id:d.id,
        ...d.data(),
      })) as PostType[];
      setPosts(postArray)

    }
    catch(e:any){
      console.log(e)
  }finally{
    setIsLoading(false)
  }
  }

  useEffect(()=>{
   
    fetchItems()

  },[])

  const handlePostDelete=async(id:string)=>{
    setIsLoading(true)
    try{
      const postRef = doc(db,'posts',id)
      await deleteDoc(postRef)
      await fetchItems()
    }catch{
      console.log('cant delete something wrong')
    }finally{


      setIsLoading(false)

    }

    

  }
  const handlePostEdit =async(id:string)=>{

  }
  return (
    <main className=' ml-[10vw] md:ml-0'>
       <AddPostMenu fetchPosts={async()=>await fetchItems()}/>
        {
          isLoading?(
            [1,2,3,4,5].map((list)=>(
              <SkeletonCom key={list}/>
            ))
          ):(

         
        <div className="">
          {posts.map((post)=>(
            <Post handleEdit={()=>post.id && handlePostEdit(post.id)} handleDelete={()=>post.id && handlePostDelete(post.id)} post={post} key={post.id}/>
          ))}
        </div>
 )
}
    </main>
  )
}

export default Feed
