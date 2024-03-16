# 📅 Plan Assistant

## 🌴 프로젝트 소개

    - 복잡하고 많은 일정들을 언제해야할지 효율적으로 추천해주는 웹앱
    - 사용자마다 원하는 가치에 맞게 일정을 추천 (사용자 맞춤 알고리즘으로 사용자마다 추천 우선순위 및 반영이 다 다름)
    - 일정 추천 시에 교통정보를 함께 제공하고 이동하는 시간을 고려해서 일정을 추천 (이동시간 고려 위치기반 추천 시스템)
    - 추천방식 : Greedy 알고리즘을 자체적으로 만들어서 구현
    - 추천한 일정을 수정하여 가중치를 사용자에 맞게 더 정교하게 적용가능

## 🛠️ 기술 스택

- PWA
- React

## 🎨 프로젝트 데모

![Untitled (13)](https://github.com/plan-assistant/FE/assets/48922050/d6526996-8097-439e-a8ff-5fe8c1df8661)
![Untitled (15)](https://github.com/plan-assistant/FE/assets/48922050/0761fd92-9034-4592-9a05-f8a9627f84d2)
- 로그인화면과 캘린더화면
    - 캘린더 화면에서 날짜 선택시에 그 날에 해당하는 Plan을 확인할 수 있음

![Untitled (1)](https://github.com/plan-assistant/FE/assets/48922050/7dcd800f-b7ae-4228-bd22-003e07778ece)
![Untitled (2)](https://github.com/plan-assistant/FE/assets/48922050/92bac8bb-0a32-400d-a747-2a88144cb9b2)
- TodoList와 PlannedList페이지

![Untitled (3)](https://github.com/plan-assistant/FE/assets/48922050/ddc57313-8884-43a9-afe7-97cd2a4bf4ab)
![Untitled (4)](https://github.com/plan-assistant/FE/assets/48922050/5aceae63-6c2a-4557-9f6b-670d1d4e68e0)
- 일정 추가 모달
    - Todo 추가에서는 제목, 마감기한, 중요도, 카테고리, 장소를 입력받는다
    - Plan 추가에서는 제목, 시작날짜, 종료날짜, 카테고리, 장소를 입력받는다
    - 카테고리는 직접 추가가 가능
    - 장소값은 구글지도API를 통해서 장소값을 받아옴
    - 수정, 삭제, 작업완료 등의 기능도 구현

![Untitled (5)](https://github.com/plan-assistant/FE/assets/48922050/d575e518-7aa5-4435-8b6a-65db2512278b)
![Untitled (6)](https://github.com/plan-assistant/FE/assets/48922050/8d4b5691-81e1-4875-81c6-257e43783e53)
![Untitled (7)](https://github.com/plan-assistant/FE/assets/48922050/e4cff175-1fbf-4318-abcc-c53576d9df7d)
![Untitled (8)](https://github.com/plan-assistant/FE/assets/48922050/ae8a8f3c-f7e3-4306-bfba-9f0566b2e299)
- 설정페이지
    - 일정 현황, 내 정보, AI 일정추천 우선순위, 일정기록 초기화, 로그아웃, 회원탈퇴 등의 기능
    - 우선순위는 0.3, 0.25, 0.2, 0.15, 0.1로 초기화한 후에 일정 추천을 받아서 일정을 수정하게 되면 자동으로 가중치가 변경

![Untitled (9)](https://github.com/plan-assistant/FE/assets/48922050/4bab9b08-5dca-4204-928e-a22ae631b9e1)
![Untitled (10)](https://github.com/plan-assistant/FE/assets/48922050/7a3ceb90-f867-46b4-8f18-59b507ccfaea)
- 일정 추천 모달
    - 3일 ~ 7일까지 일정을 추천받을 수 있음
    - 다음과 같이 Plan과 Todo를 통해서 일정을 추천
    - 원하는 일정을 시간표에서 직접 위치를 드래그로 옮겨서 저장가능

![Untitled (11)](https://github.com/plan-assistant/FE/assets/48922050/0f280717-3c73-4d3d-b560-a4b27b465bf5)
![Untitled (12)](https://github.com/plan-assistant/FE/assets/48922050/bf1e3fee-f885-4aae-8ff7-7e157742f19b)
- 일정 확인
    - 추천받은 일정 및 현재 존재하는 일정들을 통합하여 일정을 확인할 수 있음
    - 교통정보도 확인가능
        - 세부 교통정보 분단위로 확인가능
