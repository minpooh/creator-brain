# MVP Definition

## Goal

Creator Brain의 MVP는 사용자가 자신의 콘텐츠 또는
자신의 관심사와 경험을 바탕으로 Creator Identity를 발견하고,
앞으로의 콘텐츠 방향과 아이디어를 기획할 수 있도록 돕는 것을 목표로 합니다.

콘텐츠가 이미 있는 사용자와
아직 콘텐츠가 없는 사용자 모두 서비스를 시작할 수 있도록 합니다.

## Target User

### 1. Existing Creator

이미 콘텐츠를 제작하고 있으며,
자신의 콘텐츠 강점과 방향성을 파악하고 싶은 1인 크리에이터.

### 2. Aspiring Creator

아직 콘텐츠가 많지 않거나 제작을 시작하지 않았지만,
자신에게 맞는 콘텐츠 주제와 방향을 찾고 싶은 사용자.

## Core User Flow

### Existing Creator

콘텐츠 등록
↓
Content List
↓
AI Analysis
↓
Creator Identity
↓
Content Direction
↓
Content Ideas
↓
Content Planning

### Aspiring Creator

Starter Questions
↓
Creator Identity
↓
Content Direction
↓
Content Ideas
↓
Content Planning


## MVP Features

### 1. Authentication

사용자의 데이터를 저장하고 관리하기 위한
로그인 및 회원가입 기능을 제공합니다.

- Google OAuth

---

### 2. Creator Onboarding

사용자의 현재 콘텐츠 제작 상태에 따라
적절한 시작 경로를 제공합니다.

#### Existing Creator

기존 콘텐츠를 등록하여
AI 분석을 시작할 수 있습니다.

#### Aspiring Creator

콘텐츠가 없는 사용자는
간단한 질문에 답하여 자신의 관심사,
경험, 강점 등을 입력할 수 있습니다.

---

### 3. Content Registration

기존 콘텐츠를 Creator Brain에 등록합니다.

- Content URL
- Image
- Title
- Description
- Views
- Likes

MVP에서는 사용자가 직접 콘텐츠 정보를 입력합니다.

---

### 4. Content List

등록된 콘텐츠를 확인하고 관리합니다.

- 콘텐츠 목록
- 콘텐츠 기본 정보
- 성과 데이터
- 분석 상태
- 콘텐츠 추가

---

### 5. AI Content Analysis

등록된 콘텐츠를 AI가 분석합니다.

분석 항목:

- Content Topic
- Content Type
- Content Characteristics
- Content Pattern
- Content Strength

---

### 6. Creator Identity

AI 분석 또는 Starter Questions를 기반으로
사용자의 Creator Identity를 생성합니다.

예:

- Creator Identity
- Content Pillars
- Strengths
- Content Patterns

---

### 7. Content Direction

Creator Identity와 콘텐츠 강점을 기반으로
앞으로 발전시키면 좋을 콘텐츠 방향을 제안합니다.

---

### 8. Content Ideas

Content Direction을 기반으로
다음 콘텐츠 아이디어를 추천합니다.

사용자는 추천된 아이디어를 선택하고 저장할 수 있습니다.

---

### 9. Content Planning

선택한 콘텐츠 아이디어를
실제 제작 가능한 기획으로 발전시킵니다.

- Title
- Hook
- Key Message
- Story Flow
- Shot Ideas

완성된 기획을 저장할 수 있습니다.


## MVP Out of Scope

MVP에서는 다음 기능을 구현하지 않습니다.

- Instagram API 자동 콘텐츠 수집
- Instagram 자동 게시
- TikTok / YouTube 연동
- 경쟁자 자동 분석
- 실시간 SNS 성과 수집
- 고급 콘텐츠 성과 분석
- AI 영상 자동 생성
- AI 이미지 생성
- 팀 협업 기능
- 유료 결제
- 모바일 네이티브 앱


## MVP Success Criteria

사용자가 Creator Brain을 통해
"무엇을 만들어야 할지 모르겠다"
라는 상태에서

"나는 이런 콘텐츠를 만들 수 있고,
앞으로 이런 방향으로 발전하면 좋겠다."
라는 상태로 이동할 수 있어야 합니다.

### Existing Creator

기존 콘텐츠를 등록하고
AI 분석을 통해 자신의 Creator Identity를 확인한 후
다음 콘텐츠를 기획할 수 있어야 합니다.

### Aspiring Creator

자신의 관심사와 경험을 입력하고
초기 Creator Identity와 Content Direction을 확인한 후
첫 콘텐츠를 기획할 수 있어야 합니다.