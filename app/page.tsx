'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0 10px;
    color: white;
    text-shadow: 2px 2px rgb(116, 116, 116);
    text-transform: uppercase;
    cursor: pointer;
    border: solid 2px black;
    letter-spacing: 1px;
    font-weight: 600;
    font-size: 17px;
    background-color: #31afeb;
    border-radius: 50px;
    position: relative;
    overflow: hidden; /* Added overflow: hidden; */
    transition: all 0.5s ease;
  }

  button:active {
    transform: scale(0.9);
    transition: all 100ms ease;
  }

  button .background-image {
    position: absolute;
    top: 20%; /* この行が画像の垂直位置を制御しています *
    left: 0;
    width: 50%;
    height: 50%; /* Updated height */
    object-fit: cover;
    z-index: 1;
    opacity: 0.5;
  }

  button .content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: relative;
    z-index: 2;
  }

  .play {
    transition: all 0.5s ease;
    transition-delay: 300ms;
  }

  .now {
    position: absolute;
    left: -10px; /* ここを0から10pxに変更しました */
    transform: translateX(-100%);
    transition: all 0.5s ease;
    z-index: 2;
  }

  button:hover .now {
    transform: translateX(2px);
    transition-delay: 300ms;
  }

  button:hover .play {
    transform: translateX(200%);
    transition-delay: 300ms;
  }
`

const CustomButton = ({ onClick }) => {
  return (
    <StyledWrapper>
      <button onClick={onClick}>
        <Image
          src="/lifesupport-hongkong-logo.png"
          alt="Background Logo"
          width={400}
          height={200}
          className="background-image"
        />
        <div className="content">
          <span className="now">ログイン</span>
          <span className="play">サービス開始</span>
        </div>
      </button>
    </StyledWrapper>
  )
}

export default function Login() {
  const [supabase] = useState(() => createClientComponentClient())

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard`
      }
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-6 space-y-8">
        <div className="flex flex-col items-center space-y-6">
          <Image 
            src="/lifesupport-hongkong-logo.png" 
            alt="Life Support Hong Kong Logo" 
            width={80}
            height={80}
            className="object-contain"
          />
          
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-white">OAuth UI デモ</h1>
            <p className="text-lg text-blue-200">ようこそLIFESUPPORT-AI部門へ</p>
          </div>
        </div>

        <div className="flex justify-center space-y-4">
          <CustomButton onClick={handleGoogleLogin} />
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          現在認証はGoogleアカウントのみとなっております
        </p>
      </div>
    </div>
  )
}