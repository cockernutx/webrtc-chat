"use client";

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "./globals.css"
import { Provider } from 'react-redux';
import { ChatContext } from './lib/ChatContext';
import { useContext, useState } from 'react';



const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const context = useContext(ChatContext);
  const [instanceName, setInstanceName] = useState<string>("");
  const [peerName, setPeerName] = useState<string>("");
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>(new RTCPeerConnection());
  const [dataChannel, setDataChannel] = useState<RTCDataChannel | undefined>(undefined); 

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={inter.className}><ChatContext.Provider value={{instanceName, peerConnection, peerName, dataChannel, setDataChannel, setInstanceName, setPeerConnection, setPeerName}}>{children}</ChatContext.Provider></body>
    </html>
  )
}
