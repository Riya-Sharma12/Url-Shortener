import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {logout} from "@/db/apiAuth";
import {BarLoader} from "react-spinners";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import {UrlState} from "@/Context";
import useFetch from '@/hooks/useFetch';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkIcon, LogOut } from 'lucide-react';

const Header = () => {
    const navigate = useNavigate();
    const {user , fetchUser} = UrlState();
    const {loading, fn: fnLogout} = useFetch(logout);

  return (
    <>
  <nav className='py-4 flex justify-between items-center'>
    <Link to='/'>
    <img src="/logo.png" className="h-16" alt="Trimmr logo" />
    </Link>
    <div>
        {
            !user ? 
            <Button onClick={()=> navigate("/auth")}>Login</Button> 
            :
            (
                <DropdownMenu>
                <DropdownMenuTrigger  className="w-10 rounded-full overflow-hidden bg-transparent border-none outline-none ring-0 focus:ring-0 focus:outline-none ">
                <Avatar>
                <AvatarImage src={user?.user_metadata?.profile_pic}  />
                <AvatarFallback>KS</AvatarFallback>
                </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                <DropdownMenuLabel>
                {user?.user_metadata?.name}

                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" className='flex'>
                  <LinkIcon className='mr-2 h-4 w-4' />
                  My Links
                  </Link>
           
                </DropdownMenuItem>
                <DropdownMenuItem className='text-red-400'>
                <LogOut className='mr-2 h-4 w-4' />
                <span onClick={()=>{
                  fnLogout().then(()=>{
                    fetchUser();
                    navigate('/')
                  })
                 
                }}>Logout</span> 
                </DropdownMenuItem>
             </DropdownMenuContent>
             </DropdownMenu>
           
            )
        }
  
    </div>

  </nav>
  {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}

  </>
  )
}

export default Header
