declare global {
  interface Window {
    difyChatbotConfig?: {
      token: string;
    };
  }
}

'use client'

import { useEffect, useState } from 'react'
import type { User } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import styled from 'styled-components'
import { useSupabase } from '../supabase-provider'
import { useRouter } from 'next/navigation'
import Script from 'next/script'

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const supabase = useSupabase()
  const router = useRouter()
  const [activeButtons, setActiveButtons] = useState({
    'domain-selection': false,
    'customer-info': false,
    'logo-business-card': false,
    'chatbot-info': false,
    'chatbot-data': false,
    'chatbot-storage': false,
    'ai-info-tool': false,
    'ai-info-organize': false,
    'ai-document': false
  });

  const setButtonActive = (buttonKey: string, isActive: boolean) => {
    setActiveButtons(prev => ({ ...prev, [buttonKey]: isActive }));
  };

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

    // Initialize Dify chatbot configuration
    if (typeof window !== 'undefined') {
      window.difyChatbotConfig = {
        token: '2EVbZSnoP7luoOe7'
      }
    }
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
          <div className="section">
            <h2 className="section-title">ホームページ関連</h2>
            <div className="button-group">
              <Link 
                href="https://b_cVhY2jdnmNj.v0.build/"
                target="_blank"
                rel="noopener noreferrer"
                className="styled-button"
              >
                ドメイン選択
              </Link>
              <Link 
                href="#" 
                className="styled-button inactive"
              >
                カスタマー情報登録
              </Link>
              <Link 
                href="https://udify.app/chat/2EVbZSnoP7luoOe7"
                target="_blank"
                rel="noopener noreferrer"
                className="styled-button inactive"
              >
                ロゴ・名刺作成情報登録
              </Link>
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">AIサービス関連</h2>
            <div className="button-group">
              <Link 
                href="#" 
                className="styled-button inactive"
              >
                AIチャットボット用情報登録
              </Link>
              <Link 
                href="#" 
                className="styled-button inactive"
              >
                AIチャットボットデーター登録
              </Link>
              <Link 
                href="#" 
                className="styled-button inactive"
              >
                AIチャットボットファイル保存場所
              </Link>
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">仕事効率化ツール関連</h2>
            <div className="button-group">
              <Link 
                href="#" 
                className="styled-button inactive"
              >
                AIスクレイプツール
              </Link>
              <Link 
                href="#" 
                className="styled-button inactive"
              >
                AI情報整理
              </Link>
              <Link 
                href="#" 
                className="styled-button inactive"
              >
                AI資料作成
              </Link>
            </div>
          </div>
        </div>
        <button onClick={handleSignOut} className="logout-button">
          ログアウト
        </button>
      </div>
      <footer className="footer">
        <div className="footer-links">
          <Link 
            href="https://docs.google.com/forms/d/e/1FAIpQLSePpVeWRt4F_UeJfCTQUQslLi4oX0FqHN6-OCQwWzzDuA3-rw/viewform" 
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            お問い合わせ
          </Link>
          <Link 
            href="https://lifesupporthk.com/%e8%87%aa%e5%b7%b1%e7%b4%b9%e4%bb%8b/" 
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            会社概要
          </Link>
        </div>
        <div className="copyright">
          © 香港LIFESUPPORT
        </div>
        <div className="social-links">
          <Link href="#" className="social-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </Link>
          <Link href="#" className="social-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </Link>
          <Link href="#" className="social-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </Link>
        </div>
      </footer>
      {/* Dify Chatbot Scripts */}
      <Script
        src="https://udify.app/embed.min.js"
        id="2EVbZSnoP7luoOe7"
        strategy="afterInteractive"
      />
      <style jsx global>{`
        #dify-chatbot-bubble-button {
          background-color: #1C64F2 !important;
        }
        #dify-chatbot-bubble-window {
          width: 24rem !important;
          height: 40rem !important;
        }
      `}</style>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  /* 全体レイアウト */
  display: flex;                /* フレックスボックスレイアウトを使用 */
  justify-content: center;      /* 水平方向に中央揃え */
  align-items: center;          /* 垂直方向に中央揃え */
  min-height: 100vh;            /* 最小の高さをビューポートの高さに設定 */
  background-color: white;      /* 背景色を白に設定 */
  padding: 2rem;                /* 全ての側に2remのパディングを追加 */

  .card {
    /* カラー変数の定義 */
    --white: hsl(0, 0%, 100%);   /* 白色の変数を定義 */
    --black: hsl(240, 15%, 9%);  /* 濃い青黒色の変数を定義 */
    --paragraph: hsl(0, 0%, 83%);// 薄いグレーの変数を定義
    --line: hsl(240, 9%, 17%);   /* 濃いグレーの変数を定義 */
    --primary: hsl(189, 92%, 58%);// 明るい青緑色の変数を定義

    /* カードの基本スタイル */
    position: relative;         /* 相対位置指定 */
    display: flex;              /* フレックスボックスレイアウトを使用 */
    flex-direction: column;     /* 子要素を縦方向に配置 */
    gap: 1rem;                  /* 子要素間に1remの間隔を設定 */
    padding: 2rem;              /* 全ての側に2remのパディングを追加 */
    width: 90%;                 /* 幅を親要素の90%に設定 */
    max-width: 60rem;           /* 最大幅を60remに制限 */

    /* カードの背景スタイル */
    background-color: hsla(240, 15%, 9%, 1); /* 背景色を濃い青黒に設定 */
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
    /* 複雑な放射状グラデーションで動的な背景を作成 */
    border-radius: 1.5rem;      /* 角を丸く */
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); /* 軽い影を追加 */
  }

  .card__border {
    /* カードの境界線 */
    overflow: hidden;           /* はみ出た部分を隠す */
    pointer-events: none;       /* マウスイベントを無効化 */
    position: absolute;         /* 絶対位置指定 */
    z-index: -10;               /* メインコンテンツの背後に配置 */
    top: 50%;                   /* 上端を親要素の中央に */
    left: 50%;                  /* 左端を親要素の中央に */
    transform: translate(-50%, -50%); /* 中央に配置 */
    width: calc(100% + 2px);    /* 親要素より2px広く */
    height: calc(100% + 2px);   /* 親要素より2px高く */
    background-image: linear-gradient(
      0deg,
      hsl(0, 0%, 100%) -50%,
      hsl(0, 0%, 40%) 100%
    );                          /* 白から灰色へのグラデーション */
    border-radius: 1.5rem;      /* 角を丸く */
  }

  .card__border::before {
    /* 光る効果のアニメーション用の要素 */
    content: "";                /* 疑似要素のコンテンツ */
    pointer-events: none;       /* マウスイベントを無効化 */
    position: fixed;            /* 固定位置 */
    z-index: 200;               /* 他の要素の前面に配置 */
    top: 50%;                   /* 上端をビューポートの中央に */
    left: 50%;                  /* 左端をビューポートの中央に */
    transform: translate(-50%, -50%); /* 中央に配置 */
    width: 200%;                /* 親要素の2倍の幅 */
    height: 10rem;              /* 高さを10remに設定 */
    background-image: linear-gradient(
      0deg,
      hsla(0, 0%, 100%, 0) 0%,
      hsl(189, 100%, 50%) 40%,
      hsl(189, 100%, 50%) 60%,
      hsla(0, 0%, 40%, 0) 100%
    );                          /* 透明から青、青から透明へのグラデーション */
    animation: rotate 8s linear infinite; /* 回転アニメーションを適用 */
  }

  @keyframes rotate {
    /* 360度回転アニメーション */
    to {
      transform: translate(-50%, -50%) rotate(360deg); /* 360度回転 */
    }
  }

  /* タイトルと段落のスタイル */
  .card_title__container .card_title {
    font-size: 2rem;            /* フォントサイズを2remに設定 */
    color: var(--white);        /* テキスト色を白に設定 */
    text-align: center;         /* テキストを中央揃え */
    margin-bottom: 0.5rem;      /* 下部に0.5remのマージンを追加 */
  }

  .card_title__container .card_paragraph {
    font-size: 1rem;            /* フォントサイズを1remに設定 */
    color: var(--paragraph);    /* テキスト色を薄いグレーに設定 */
    text-align: center;         /* テキストを中央揃え */
    margin-bottom: 1rem;        /* 下部に1remのマージンを追加 */
  }

  /* 線のスタイル */
  .line {
    width: 100%;                /* 幅を親要素いっぱいに */
    height: 0.1rem;             /* 高さを0.1remに設定 */
    background-color: var(--line); /* 背景色を濃いグレーに設定 */
    border: none;               /* ボーダーを削除 */
    margin: 1rem 0;             /* 上下に1remのマージンを追加 */
  }

  /* 機能リストのスタイル */
  .features-list {
    display: flex;              /* フレックスボックスレイアウトを使用 */
    flex-direction: column;     /* 子要素を縦方向に配置 */
    gap: 2rem;                  /* 子要素間に2remの間隔を設定 */
  }

  /* セクションのスタイル */
  .section {
    display: flex;              /* フレックスボックスレイアウトを使用 */
    flex-direction: column;     /* 子要素を縦方向に配置 */
    gap: 1rem;                  /* 子要素間に1remの間隔を設定 */
  }

  /* セクションタイトルのスタイル */
  .section-title {
    color: var(--primary);      /* テキスト色を明るい青緑に設定 */
    font-size: 1.2rem;          /* フォントサイズを1.2remに設定 */
    font-weight: bold;          /* フォントを太字に */
    text-align: center;         /* テキストを中央揃え */
    margin-bottom: 0.5rem;      /* 下部に0.5remのマージンを追加 */
  }

  /* ボタングループのスタイル */
  .button-group {
    display: grid;              /* グリッドレイアウトを使用 */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* レスポンシブなグリッド列を設定 */
    gap: 3rem;                  /* グリッドアイテム間に1remの間隔を設定 */
  }

  /* スタイル付きボタンのスタイル */
  .styled-button {
    cursor: pointer;            /* マウスオーバー時にポインターカーソルを表示 */
    padding: 0.75rem;           /* 全ての側に0.75remのパディングを追加 */
    width: 100%;                /* 幅を親要素いっぱいに */
    background-image: linear-gradient(
      0deg,
      hsl(189, 92%, 58%),
      hsl(189, 99%, 26%) 100%
    );                          /* 青緑のグラデーション背景 */
    font-size: 1rem;            /* フォントサイズを1remに設定 */
    color: var(--white);        /* テキスト色を白に設定 */
    border: 0;                  /* ボーダーを削除 */
    border-radius: 9999px;      /* 完全な丸みを持たせる */
    box-shadow: inset 0 -2px 25px -4px var(--white); /* 内側に白い光沢効果を追加 */
    text-align: center;         /* テキストを中央揃え */
    text-decoration: none;      /* テキストの下線を削除 */
    transition: all 0.3s ease;  /* すべてのプロパティに0.3秒のスムーズな遷移効果を適用 */
  }

  .styled-button.inactive {
    cursor: not-allowed;
    pointer-events: none;
    background-image: linear-gradient(
      0deg,
      hsl(0, 0%, 40%),
      hsl(0, 0%, 20%) 100%
    );
    box-shadow: none;
    opacity: 0.7;
  }

  .styled-button.inactive:hover {
    transform: none;
    box-shadow: none;
  }


  /* スタイル付きボタンのホバー効果 */
  .styled-button:hover {
    transform: translateY(-2px); /* ホバー時に2px上に移動（浮き上がり効果） */
    box-shadow: inset 0 -2px 25px -4px var(--white), 0 4px 8px rgba(0, 0, 0, 0.2); /* ホバー時に影を強調 */
  }

  /* ログアウトボタンのスタイル */
  .logout-button {
    margin-top: 1rem;           /* 上部に1remのマージンを追加 */
    cursor: pointer;            /* マウスオーバー時にポインターカーソルを表示 */
    padding: 0.75rem;           /* 全ての側に0.75remのパディングを追加 */
    width: 100%;                /* 幅を親要素いっぱいに */
    background-image: linear-gradient(
      0deg,
      hsl(0, 92%, 58%),
      hsl(0, 99%, 26%) 100%
    );                          /* 赤色のグラデーション背景 */
    font-size: 1rem;            /* フォントサイズを1remに設定 */
    color: var(--white);        /* テキスト色を白に設定 */
    border: 0;                  /* ボーダーを削除 */
    border-radius: 9999px;      /* 完全な丸みを持たせる */
    box-shadow: inset 0 -2px 25px -4px var(--white); /* 内側に白い光沢効果を追加 */
    transition: all 0.3s ease;  /* すべてのプロパティに0.3秒のスムーズな遷移効果を適用 */
  }

  /* ログアウトボタンのホバー効果 */
  .logout-button:hover {
    transform: translateY(-2px); /* ホバー時に2px上に移動（浮き上がり効果） */
    box-shadow: inset 0 -2px 25px -4px var(--white), 0 4px 8px rgba(0, 0, 0, 0.2); /* ホバー時に影を強調 */
  }

  /* タブレットサイズ以上の画面用レイアウト */
  @media (min-width: 768px) {
    .button-group {
      grid-template-columns: repeat(2, 1fr); /* 中画面では2列のグリッドに */
    }
  }

  /* デスクトップサイズの画面用レイアウト */
  @media (min-width: 1024px) {
    .button-group {
      grid-template-columns: repeat(3, 1fr); /* 大画面では3列のグリッドに */
    }
  }

  /* Add these styles to ensure the chatbot doesn't overlap with the dashboard content */
  position: relative;
  min-height: 100vh;
  padding-bottom: 60px; /* Adjust this value based on the height of your chatbot button */

  #dify-chatbot-bubble-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }

  #dify-chatbot-bubble-window {
    position: fixed;
    bottom: 80px;
    right: 20px;
    z-index: 1001;
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: var(--black);
    border-top: 1px solid var(--line);
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }
  }

  .footer-links {
    display: flex;
    gap: 2rem;
    padding-left: 3rem; /* 左側の余白を追加 */

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding-left: 0; /* モバイル表示時は中央揃えのままにする */
    }
  }

  .footer-link {
    color: var(--white);
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.3s ease;
  }

  .footer-link:hover {
    color: var(--primary);
  }
　.copyright {
    color: var(--paragraph);
    font-size: 0.7rem; /* 変更箇所 */
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .social-links {
    display: flex;
    gap: 1rem;
  }

  .social-link {
    color: var(--white);
    transition: color 0.3s ease;
  }

  .social-link:hover {
    color: var(--primary);
  }

  @media (max-width: 768px) {
    .footer {
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }

    .footer-links {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
  }
`