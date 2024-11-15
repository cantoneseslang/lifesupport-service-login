'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: black;
  color: white;

  .content {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .welcome-text {
    font-size: 1.125rem;
    color: #bfdbfe;
    text-align: center;
  }

  .info-text {
    font-size: 0.875rem;
    color: #9ca3af;
    text-align: center;
  }

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
    overflow: hidden;
    transition: all 0.5s ease;
  }

  .button-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .google-icon {
    width: 10px;
    height: 10px;
  }
`

const CustomButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
      </svg>
      <span>Googleでログイン</span>
    </button>
  );
};

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
    <StyledWrapper>
      <div className="content">
        <div className="logo-container">
          <Image 
            src="/lifesupport-hongkong-logo.png" 
            alt="Life Support Hong Kong Logo" 
            width={80}
            height={80}
            className="object-contain"
          />
          <p className="welcome-text">ようこそLIFESUPPORT-AI部門へ</p>
        </div>

        <CustomButton onClick={handleGoogleLogin} />

        <p className="info-text">
          現在認証はGoogleアカウントのみとなっております
        </p>
      </div>
    </StyledWrapper>
  )
}