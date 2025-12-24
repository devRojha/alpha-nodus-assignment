'use client'

import { loggedInState } from '@/state/atom';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function Appbar() {
  const [isLoggedIn, setisLoggedIn] = useRecoilState(loggedInState)
  const router = useRouter();

  useEffect (()=>{
    const token = localStorage.getItem("token");
    if (!token) {
        setisLoggedIn(false);
    }
    else {
        setisLoggedIn(true);
    }
  }, [isLoggedIn])

  return (
    <div className="text-zinc-900 bg-white z-30 fixed w-full shadow shadow-slate-600 top-0 h-16 px-4">
      <div className="flex justify-between items-center h-full">
        <button onClick={()=> router.push("/")} className="font-medium">Alpha Nodus</button>

        <div className="flex gap-4">
          {!isLoggedIn && (
            <button onClick={()=> router.push("/Signin")} className="font-medium">Admin</button>
          )}

          {isLoggedIn && (
            <>
            <button onClick={()=> router.push("/Application")} className="font-medium">ADD Job</button>
            <button onClick={()=> router.push("/Application")} className="font-medium">See Application</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}