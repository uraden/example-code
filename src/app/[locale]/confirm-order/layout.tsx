"use client"
import { ChildrenProps } from '@/types'
import React from 'react'

const ConfirmOrderLayout = ({ children }: ChildrenProps) => {
  
    return (
    <div className="flex items-center justify-center h-screen">
      {children}
    </div>
  )
}

export default ConfirmOrderLayout