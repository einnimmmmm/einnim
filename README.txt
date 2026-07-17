STAYSYNC Sales CRM v2

현재 구조
- React 19 + TypeScript + Vite
- Tailwind CSS
- React Leaflet
- vite-plugin-pwa 기반 PWA
- 기존 단일 index.html 구현은 old/ 폴더에 보관

구현 기능
- 대표 미팅 정보
- 관심도 0~5단계
- 태그 검색
- 방문일지 누적 저장
- 방문 타임라인
- 최근 방문일/방문횟수 자동 계산
- 다음 방문일
- 5,000개 이상 대응을 위한 마커 클러스터 및 지연 로딩
- 업장 추가/수정/삭제
- 전체 백업/복원
- PWA 설치 및 오프라인 앱 셸

GitHub 업로드
압축을 풀고 저장소 루트의 기존 파일을 모두 이 파일들로 교체한 뒤 Commit changes를 누르세요.


[v2.1]
- 관심도 삭제
- 계약상태(미접촉/상담중/대표미팅/검토중/보류/도입완료/영업제외) 추가
- 진행 액션 체크리스트 추가
- 주황색 안내 박스 삭제


[v2.1.1] 지도 클러스터 CDN이 실패해도 데이터와 목록이 표시되도록 복구. 전체 업장 수 자동 표시. 기존 localStorage 키 유지.

[v2.2.0] 단일 index.html 앱을 React + TypeScript + Vite 프로젝트로 전환. 기존 구현은 old/ 폴더로 이동.
