"use client";

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "./globals.css"
import { Provider } from 'react-redux';



const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
