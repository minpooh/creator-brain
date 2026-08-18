# User Flow

## Goal

사용자가 자신의 기존 콘텐츠를 등록하거나
첫 콘텐츠 기획을 위한 질문답변 후,
AI 분석을 통해 자신의 콘텐츠 정체성과 강점을 발견한 뒤
다음 콘텐츠를 기획할 수 있도록 합니다.

## Main User Flow

### New User

서비스 접속
↓
Login / Sign Up
↓
Creator Status 확인
↓
┌─────────────────────────────┐
│                             │
이미 콘텐츠를 만들고 있음     아직 콘텐츠가 없음
│                             │
↓                             ↓
Content Registration      Starter Questions
↓                             ↓
Content List              Starter Identity
↓                             │
AI Analysis                   │
↓                             │
Creator Identity              │
↓                             │
Content Direction ←───────────┘
↓
Content Ideas
↓
Content Planning

### Returning User

Login
↓
Dashboard
↓
Content List
↓
┌─────────────────────────┐
│                         │
│ 콘텐츠 추가              │ AI Analysis
│                         │
↓                         ↓
Content Registration    Analysis Result
↓                         │
Content List ←─────────────┘

## Screens



### 01. Landing

Creator Brain의 서비스 목적과 주요 기능을 소개합니다.

사용자가 서비스의 가치를 이해하고
로그인 또는 회원가입을 할 수 있도록 합니다.

- Creator Brain 소개
- 주요 기능 소개
- Login
- Sign Up



### 02. Login / Sign Up

사용자가 로그인하거나 회원가입할 수 있습니다.

MVP에서는 Google OAuth를 우선 지원합니다.

로그인한 사용자는 자신의 콘텐츠와
AI 분석 결과를 저장하고 관리할 수 있습니다.

### 03. Dashboard

사용자의 현재 콘텐츠 분석 상태와
Creator Brain 사용 상태를 한눈에 보여줍니다.

사용자의 상태에 따라 다음 행동을 안내합니다.

#### 콘텐츠가 없는 사용자

- Creator Starter 시작
- 관심사 및 경험 입력
- 초기 Creator Identity 생성



#### 콘텐츠를 등록 중인 사용자

- 현재 등록된 콘텐츠 수
- 분석까지 필요한 콘텐츠 수
- 콘텐츠 추가



#### AI 분석이 가능한 사용자

- 분석 가능한 콘텐츠 수
- AI 분석 시작



#### 분석이 완료된 사용자

- Creator Identity 요약
- Content Pillar 요약
- Content Direction
- 추천 콘텐츠 아이디어



### 04. Starter Questions

아직 콘텐츠를 제작하지 않은 사용자가
자신의 관심사와 경험을 바탕으로
콘텐츠 제작을 시작할 수 있도록 돕습니다.

사용자의 답변을 바탕으로
AI가 초기 Creator Identity와
콘텐츠 방향을 생성합니다.

- 관심사
- 좋아하는 주제
- 경험 및 강점
- 사람들이 자주 묻는 것
- 만들고 싶은 콘텐츠



### 05. Content Registration

사용자가 기존에 제작한 콘텐츠를 등록합니다.

- 콘텐츠 URL
- 이미지
- 제목
- 설명
- 조회수
- 좋아요

여러 개의 콘텐츠를 등록할 수 있습니다.

콘텐츠 등록이 완료되면
Content List에서 확인할 수 있습니다.

### 06. Content List

사용자가 Creator Brain에 등록한 콘텐츠를
확인하고 관리합니다.

등록된 콘텐츠의 기본 정보와
성과 데이터를 확인할 수 있습니다.

- 콘텐츠 목록
- 콘텐츠 상세 정보
- 조회수
- 좋아요
- 분석 상태
- 콘텐츠 추가

분석에 필요한 콘텐츠가 충분히 등록되면
AI Analysis를 시작할 수 있습니다.

### 07. AI Analysis

등록된 콘텐츠를 AI가 분석합니다.

분석 항목:

- 콘텐츠 주제
- 콘텐츠 유형
- 콘텐츠 특징
- 콘텐츠 패턴
- 콘텐츠 강점

분석이 완료되면
Creator Identity 및 분석 결과를 확인할 수 있습니다.

### 08. Creator Identity

AI 분석 결과를 바탕으로
사용자의 Creator Identity를 보여줍니다.

사용자가 자신의 콘텐츠를 통해
어떤 크리에이터인지 이해할 수 있도록 합니다.

- Creator Identity
- Content Pillar
- Content Strength
- Content Pattern

