'use client'

import { loggedInState } from '@/state/atom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function Appbar() {
  const [isLoggedIn, setisLoggedIn] = useRecoilState(loggedInState)

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
    <div className="text-zinc-900 z-30 fixed w-full shadow shadow-slate-600 top-0 h-16 px-4">
      <div className="flex justify-between items-center h-full">
        <div>Alpha Nodus</div>
        <div>Job Application</div>

        <div className="flex gap-4">
          {!isLoggedIn && (
            <button className="font-medium">Admin</button>
          )}

          {isLoggedIn && (
            <button className="font-medium">See Application</button>
          )}
        </div>
      </div>
    </div>
  );
}