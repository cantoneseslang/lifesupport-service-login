'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Image from 'next/image'
import { Shield } from 'lucide-react'
import Link from 'next/link'

export default function Login() {
  const [supabase] = useState(() => createClientComponentClient())

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
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">セキュリティーログイン</h1>
            </div>
            <p className="text-sm text-blue-200">OAuth 2.0認証プロトコルを使用</p>
            <p className="text-xs text-blue-300">安全な認証システムで個人情報を保護します</p>
          </div>
        </div>

        {/* Googleログインの同じスタイルを適用したカスタムログインボタン */}
        <Link href="/custom-login" className="block w-full !bg-white hover:!bg-gray-50 !text-gray-900 !border-0 !shadow-lg h-12 flex items-center justify-center rounded-lg transition-colors">
          カスタムログイン
        </Link>

        {/* SupabaseによるGoogleログイン */}
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#3b82f6',
                  brandAccent: '#2563eb',
                }
              }
            },
            className: {
              container: 'w-full',
              button: '!bg-white hover:!bg-gray-50 !text-gray-900 !border-0 !shadow-lg !h-12',
              label: 'hidden',
              input: 'hidden',
              divider: 'hidden',
              message: 'hidden',
            },
          }}
          localization={{
            variables: {
              sign_in: {
                social_provider_text: "Googleでログイン",
              },
              sign_up: {
                social_provider_text: "Googleでログイン",
              },
            },
          }}
          providers={['google']}
          view="sign_in"
          showLinks={false}
          onlyThirdPartyProviders={true}
          redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard`}
        />
      </div>
    </div>
  )
}