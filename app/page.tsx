import { redirect } from 'next/navigation';

export default function Home() {
  // トップページにアクセスした場合、ログインページへリダイレクト
  redirect('/login');
}