'use client'

import { useEffect, useState } from 'react'
import type { User } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import styled from 'styled-components'
import { Check } from 'lucide-react'
import { useSupabase } from '../supabase-provider'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const supabase = useSupabase()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) throw error
        if (user) {
          setUser(user)
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        router.push('/login')
      }
    }
    getUser()
  }, [supabase, router])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-400"></div>
      </div>
    )
  }

  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__border" />
        <div className="card_title__container">
          <span className="card_title">ダッシュボード</span>
          <p className="card_paragraph">ようこそ、{user.email}さん！</p>
        </div>
        <hr className="line" />
        <div className="features-list">
          <div className="feature-group">
            <Link href="/domain-selection" className="styled-button">
              ドメイン選択
            </Link>
            <div className="feature-items">
              <div className="feature-item">
                <span className="check">
                  <Check className="check-icon" />
                </span>
                <span className="feature-text">お好きなドメインから選択可能</span>
              </div>
              <div className="feature-item">
                <span className="check">
                  <Check className="check-icon" />
                </span>
                <span className="feature-text">自動DNS設定完了</span>
              </div>
            </div>
          </div>
          
          <div className="feature-group">
            <Link href="/customer-info" className="styled-button">
              カスタマー情報登録
            </Link>
            <div className="feature-items">
              <div className="feature-item">
                <span className="check">
                  <Check className="check-icon" />
                </span>
                <span className="feature-text">基本情報の簡単入力</span>
              </div>
              <div className="feature-item">
                <span className="check">
                  <Check className="check-icon" />
                </span>
                <span className="feature-text">ホームページへの自動反映</span>
              </div>
            </div>
          </div>
          
          <div className="feature-group">
            <Link href="/chatbot-data" className="styled-button">
              AIチャットボットデータ作成
            </Link>
            <div className="feature-items">
              <div className="feature-item">
                <span className="check">
                  <Check className="check-icon" />
                </span>
                <span className="feature-text">業務内容に最適化</span>
              </div>
              <div className="feature-item">
                <span className="check">
                  <Check className="check-icon" />
                </span>
                <span className="feature-text">24時間自動応答対応</span>
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleSignOut} className="logout-button">
          ログアウト
        </button>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: white;
  padding: 2rem;

  .card {
    --white: hsl(0, 0%, 100%);
    --black: hsl(240, 15%, 9%);
    --paragraph: hsl(0, 0%, 83%);
    --line: hsl(240, 9%, 17%);
    --primary: hsl(189, 92%, 58%);

    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    width: 90%;
    max-width: 60rem;
    background-color: hsla(240, 15%, 9%, 1);
    background-image: radial-gradient(
        at 88% 40%,
        hsla(240, 15%, 9%, 1) 0px,
        transparent 85%
      ),
      radial-gradient(at 49% 30%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
      radial-gradient(at 14% 26%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
      radial-gradient(at 0% 64%, hsl(189, 99%, 26%) 0px, transparent 85%),
      radial-gradient(at 41% 94%, hsl(189, 97%, 36%) 0px, transparent 85%),
      radial-gradient(at 100% 99%, hsl(188, 94%, 13%) 0px, transparent 85%);
    border-radius: 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .card__border {
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    z-index: -10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    background-image: linear-gradient(
      0deg,
      hsl(0, 0%, 100%) -50%,
      hsl(0, 0%, 40%) 100%
    );
    border-radius: 1.5rem;
  }

  .card__border::before {
    content: "";
    pointer-events: none;
    position: fixed;
    z-index: 200;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200%;
    height: 10rem;
    background-image: linear-gradient(
      0deg,
      hsla(0, 0%, 100%, 0) 0%,
      hsl(189, 100%, 50%) 40%,
      hsl(189, 100%, 50%) 60%,
      hsla(0, 0%, 40%, 0) 100%
    );
    animation: rotate 8s linear infinite;
  }

  @keyframes rotate {
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  .card_title__container .card_title {
    font-size: 2rem;
    color: var(--white);
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .card_title__container .card_paragraph {
    font-size: 1rem;
    color: var(--paragraph);
    text-align: center;
    margin-bottom: 1rem;
  }

  .line {
    width: 100%;
    height: 0.1rem;
    background-color: var(--line);
    border: none;
    margin: 1rem 0;
  }

  .features-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .feature-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .feature-items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0 1rem;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .check {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;
    height: 1.5rem;
    background-color: var(--primary);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .check-icon {
    width: 1rem;
    height: 1rem;
    color: var(--black);
  }

  .feature-text {
    font-size: 0.7rem;
    color: var(--paragraph);
  }

  .styled-button {
    cursor: pointer;
    padding: 0.75rem;
    width: 100%;
    background-image: linear-gradient(
      0deg,
      hsl(189, 92%, 58%),
      hsl(189, 99%, 26%) 100%
    );
    font-size: 1rem;
    color: var(--white);
    border: 0;
    border-radius: 9999px;
    box-shadow: inset 0 -2px 25px -4px var(--white);
    text-align: center;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .styled-button:hover {
    transform: translateY(-2px);
    box-shadow: inset 0 -2px 25px -4px var(--white), 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .logout-button {
    margin-top: 1rem;
    cursor: pointer;
    padding: 0.75rem;
    width: 100%;
    background-image: linear-gradient(
      0deg,
      hsl(0, 92%, 58%),
      hsl(0, 99%, 26%) 100%
    );
    font-size: 1rem;
    color: var(--white);
    border: 0;
    border-radius: 9999px;
    box-shadow: inset 0 -2px 25px -4px var(--white);
    transition: all 0.3s ease;
  }

  .logout-button:hover {
    transform: translateY(-2px);
    box-shadow: inset 0 -2px 25px -4px var(--white), 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 768px) {
    .features-list {
      flex-direction: row;
      justify-content: space-between;
      align-items: stretch;
    }

    .feature-group {
      width: 30%;
    }
  }
`