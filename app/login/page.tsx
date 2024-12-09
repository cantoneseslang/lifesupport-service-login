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

  .button.google {
    max-width: 320px;
    display: flex;
    padding: 0.5rem 1.4rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    vertical-align: middle;
    align-items: center;
    border-radius: 0.5rem;
    border: 1px solid rgba(50, 50, 80, 0.25);
    gap: 0.75rem;
    color: #ffffff;
    background-color: rgb(50, 50, 80);
    cursor: pointer;
    transition: all 0.6s ease;
    text-decoration: none;
  }

  .button.google svg {
    height: 24px;
    width: 24px;
    fill: #fff;
    margin-right: 0.5rem;
  }

  .button.google:hover {
    transform: scale(1.02);
    background-color: rgb(90, 90, 120);
    box-shadow: 0 2px 4px rgba(90, 90, 120, 0.1);
  }

  .button.google:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 40, 0.3);
  }

  .button.google:active {
    transform: scale(0.98);
    opacity: 0.8;
  }

  @media (max-width: 480px) {
    .button.google {
      max-width: 100%;
    }
  }
`

export default function Login() {
  const [supabase] = useState(() => createClientComponentClient())

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard`,
      },
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

        <button className="button google" onClick={handleGoogleLogin}>
          <svg viewBox="0 0 256 262" preserveAspectRatio="xMidYMid" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              fill="#4285F4"
            />
            <path
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              fill="#34A853"
            />
            <path
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              fill="#FBBC05"
            />
            <path
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              fill="#EB4335"
            />
          </svg>
          Continue with Google
        </button>

        <p className="info-text">
          現在認証はGoogleアカウントのみとなっております
        </p>
      </div>
    </StyledWrapper>
  )
}