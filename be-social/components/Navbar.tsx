'use client'

import { auth } from "@/services/Firebase";
import { useUserContext } from "@/utils/UserContext";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CgFeed, CgProfile } from "react-icons/cg";
import { GoSignOut } from "react-icons/go";
import { MdEvent } from "react-icons/md";
import { TbFriends,} from "react-icons/tb";

const Navbar =()=>{
    const{currentUser} = useUserContext()
    const router = useRouter()

    const handleSignout = async()=>{

        await signOut(auth)
        router.push('/auth/login')
    }

    return(
        <nav className="w-[300px] rounded-md shadow-md p-2 min-h-[100vh] mt-4 hidden md:block">
            <div className="flex items-center gap-2 my-2 py-2 shadow-sm">
                <CgProfile className="text-3xl"/>
                <section className="text-sm">
                    <h3>{currentUser?.displayName}</h3>
                    <h4 className="text-xs opacity-75">{currentUser?.email}</h4>
                </section>
            </div>
            <ul className="flex flex-col gap-[5px]">
                <li><Link href={'/'} className="flex gap-2 items-center px-2 py-[5px] hover:bg-gray-500 rounded-md"><CgFeed/>Feed</Link></li>
                <li><Link href={'/'} className="flex gap-2 items-center px-2 py-[5px] hover:bg-gray-500 rounded-md"><TbFriends/>Friends</Link></li>
                <li><Link href={'/'} className="flex gap-2 items-center px-2 py-[5px] hover:bg-gray-500 rounded-md"><MdEvent/>Events</Link></li>
                <li><span onClick={handleSignout} className="flex gap-2 items-center px-2 py-[5px] hover:bg-gray-500 rounded-md cursor-pointer"><GoSignOut/>Signout</span></li>

                
            </ul>
        </nav>
    )
}
export default Navbar;
