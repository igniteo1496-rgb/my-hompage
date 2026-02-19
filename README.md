# Damon's Personal Homepage

개인 포트폴리오 홈페이지. Next.js 15 + TypeScript + Tailwind CSS + Notion CMS.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **CMS**: Notion API
- **Deployment**: Vercel

## Getting Started

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 아래 내용을 입력합니다:

```bash
# Notion API 설정
NOTION_API_KEY=secret_xxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxx

# 사이트 설정
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_EMAIL=your@email.com
```

### 3. Notion 데이터베이스 설정

Notion에서 데이터베이스를 생성하고 아래 속성을 추가합니다:

| 속성명 | 타입 | 설명 |
|--------|------|------|
| title | Title | 글 제목 |
| slug | Rich text | URL 슬러그 |
| category | Select | 카테고리 |
| date | Date | 발행일 |
| published | Checkbox | 발행 여부 |

Notion Integration을 생성하고 데이터베이스에 연결합니다.

### 4. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인합니다.

## 프로젝트 구조

```
src/
├── app/                 # Next.js App Router 페이지
│   ├── layout.tsx       # 루트 레이아웃
│   ├── page.tsx         # 메인 페이지
│   └── writing/         # 글 관련 페이지
├── components/          # React 컴포넌트
│   ├── layout/          # Header, Footer
│   ├── sections/        # Hero, About, Experience 등
│   ├── writing/         # WritingCard, WritingList 등
│   └── ui/              # Button, Card, Badge 등
├── lib/                 # 유틸리티 및 라이브러리
│   ├── notion/          # Notion API 연동
│   └── utils/           # 헬퍼 함수
├── types/               # TypeScript 타입 정의
└── data/                # 정적 데이터
```

## 배포

### Vercel

1. GitHub 저장소와 연결
2. 환경 변수 설정
3. 배포

```bash
npm run build
```

## Scripts

- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run start` - 프로덕션 서버 실행
- `npm run lint` - ESLint 실행
