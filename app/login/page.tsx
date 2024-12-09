'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import styled from 'styled-components';

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

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0.5rem 1.4rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: bold;
    text-transform: uppercase;
    background-color: #31afeb;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  button:hover {
    background-color: #2395d4;
  }
`;

export default function Login() {
  const router = useRouter();
  const session = useSession();
  const supabase = useSupabaseClient();

  // 認証済みの場合、ダッシュボードにリダイレクト
  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard`,
        },
      });

      if (error) {
        console.error('Google Login Error:', error);
        alert('ログイン中にエラーが発生しました。もう一度お試しください。');
      }
    } catch (err) {
      console.error('Unexpected Error:', err);
      alert('予期しないエラーが発生しました。');
    }
  };

  return (
    <StyledWrapper>
      <div className="content">
        <div className="logo-container">
          <Image
            src="/lifesupport-hongkong-logo.png"
            alt="Life Support Hong Kong Logo"
            width={80}
            height={80}
          />
          <p className="welcome-text">ようこそLIFESUPPORTへ</p>
        </div>
        <button onClick={handleGoogleLogin}>Googleでログイン</button>
        <p className="welcome-text">
          現在認証はGoogleアカウントのみとなっております
        </p>
      </div>
    </StyledWrapper>
  );
}