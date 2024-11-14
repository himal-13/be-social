import React from 'react'
import { Skeleton } from '../ui/skeleton'

const SkeletonCom = () => {
  return (
   <div className="">
            <Skeleton className="w-[80px] h-[20px] rounded-full my-2" />
            <Skeleton className="w-[200px] h-[40px] rounded-full my-2" />
            <div className="flex gap-3">
            <Skeleton className="w-[10px] h-[10px] rounded-full" />
            <Skeleton className="w-[10px] h-[10px] rounded-full" />
            <Skeleton className="w-[10px] h-[10px] rounded-full" />

            </div>



   </div>
  )
}

export default SkeletonCom
