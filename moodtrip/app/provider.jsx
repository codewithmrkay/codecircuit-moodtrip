"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect } from 'react'

function Provider({children}) {
    const {user}=useUser()
    useEffect(()=>{
        user && CreatNewUser()
    },[user])
    const CreatNewUser = async()=>{
        const result = await axios.post('./api/user',{
            name:user?.firstName,
            email:user?.primaryEmailAddress?.emailAddress
        })
        console.log(result.data)
    }
  return (
    <div className='font-[baby]'>
        {children}
    </div>
  )
}

export default Provider