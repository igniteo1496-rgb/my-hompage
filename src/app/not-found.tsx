import Link from 'next/link'
import { Button } from '@/components/ui'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5">
      <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">페이지를 찾을 수 없습니다</h2>
      <p className="text-gray-500 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Link href="/">
        <Button>홈으로 돌아가기</Button>
      </Link>
    </div>
  )
}
