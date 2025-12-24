"use client"
import { loggedInState } from "@/state/atom";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";


export default function Signin(){
    const router = useRouter();
    const [Email, setEmail] = useState<string>("");
    const [Password, setPassword] = useState<string>("");
    const [showPass , setShowPass] = useState<boolean>(false);
    const [loginAtom, setLoginAtom]= useRecoilState(loggedInState);

    useEffect (()=> {
        if (loginAtom == true) {
            router.push("/");
        }
    }, [loginAtom])

    const loginfun = async ()=>{
        if(!Email || !Password){
            alert("Fill Credential")
        }
        else{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/signin`,{
                email : Email, 
                password : Password,
            })
            if(response.data){
                localStorage.setItem("token" , response.data.token);
                setLoginAtom(true);
                router.push("/")
            }
        }
    }
    return (
        <div className="pb-20 text-black ">
            <div className="h-full flex flex-col justify-center">
                <div className="flex justify-center">
                    <div className="flex flex-col border border-zinc-600 rounded-lg px-10 py-10">
                        <div className=" text-center text-2xl font-bold font-serif mb-4 text-black">Signin</div>
                        <label className="my-2 text-black">Email</label>
                        <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="mb-8 border border-black rounded-md py-2 px-2  w-[300px] text-black" placeholder="cat@nitp.ac.in"/>

                        <label className="my-2 text-black">Password</label>
                        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} className="border border-black rounded-md py-2 px-2  w-[300px] text-black" placeholder="********"/>
                        <div className="mb-6 mt-2">
                                <button onClick={()=>setShowPass(!showPass)} className={` ${showPass? "text-blue-600": "text-zinc-600"} underline`}>Show Password</button>
                                <div className={`${(showPass && Password.length > 0)? "flex": "hidden"} border border-black rounded-md py-2 px-2  w-[300px]`}>{Password}</div>
                        </div>
                        <div className="mt-8 flex justify-center">
                            <button onClick={()=> loginfun()} className="border px-4 py-2 rounded-lg border-zinc-500 text-black hover:text-blue-900 hover:border-blue-900 active:text-white">Login</button>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}