# 📅 Plan Assistant

## 🌴 프로젝트 소개

- 저희 앱의 특장점
    - 복잡하고 많은 일정들을 언제해야할지 효율적으로 추천해주는 웹앱
    - 사용자마다 원하는 가치에 맞게 일정을 추천
    - 일정 추천 시에 교통정보를 함께 제공하고 이동하는 시간을 고려해서 일정을 추천
    - 추천방식은 Greedy 알고리즘을 자체적으로 만들어서 구현
    - 추천한 일정을 수정하여 가중치를 사용자에 맞게 더 정교하게 적용가능

## 🛠️ 기술 스택

- PWA
- React

## 🎨 프로젝트 데모

https://github.com/plan-assistant/FE/assets/48922050/d18babd4-4bd9-4894-a98e-86af0143bea4

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/5332b80c-ea37-4675-8e70-95c166faa2e7/9d5d4016-df38-4eb4-a4e4-7aa140403165/Untitled.png)

- 로그인화면과 캘린더화면
    - 캘린더 화면에서 날짜 선택시에 그 날에 해당하는 Plan을 확인할 수 있음

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/5332b80c-ea37-4675-8e70-95c166faa2e7/fd79b604-10f8-43d7-857a-354b9cc5cf18/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/5332b80c-ea37-4675-8e70-95c166faa2e7/42affafc-4fca-465c-83c5-471e3a1508e3/Untitled.png)

- TodoList와 PlannedList페이지

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/5332b80c-ea37-4675-8e70-95c166faa2e7/1cdae452-42fa-442d-972d-bffe394866f3/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/5332b80c-ea37-4675-8e70-95c166faa2e7/d8173677-8c9b-4ae7-912f-c7f878810ba4/Untitled.png)

- 일정 추가 모달
    - Todo 추가에서는 제목, 마감기한, 중요도, 카테고리, 장소를 입력받는다
    - Plan 추가에서는 제목, 시작날짜, 종료날짜, 카테고리, 장소를 입력받는다
    - 카테고리는 직접 추가가 가능
    - 장소값은 구글지도API를 통해서 장소값을 받아옴
    - 수정, 삭제, 작업완료 등의 기능도 구

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/5332b80c-ea37-4675-8e70-95c166faa2e7/3680ef57-ea0f-42f0-a52f-54cac11edebd/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/5332b80c-ea37-4675-8e70-95c166faa2e7/4950cefd-00d8-4287-9f9b-add2371083ca/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/5332b80c-ea37-4675-8e70-95c166faa2e7/ce06515e-01de-4825-8286-f5c856c692ea/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/5332b80c-ea37-4675-8e70-95c166faa2e7/9f15f273-10aa-449b-a8c1-95702da7c9c9/Untitled.png)

- 설정페이지
    - 일정 현황, 내 정보, AI 일정추천 우선순위, 일정기록 초기화, 로그아웃, 회원탈퇴 등의 기능
    - 우선순위는 0.3, 0.25, 0.2, 0.15, 0.1로 초기화한 후에 일정 추천을 받아서 일정을 수정하게 되면 자동으로 가중치가 변경

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/5332b80c-ea37-4675-8e70-95c166faa2e7/c574b95f-9f42-417f-aa64-72436c986684/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/5332b80c-ea37-4675-8e70-95c166faa2e7/adbc0294-7454-43c9-b81e-2fbd4fc9a5b5/Untitled.png)

- 일정 추천 모달
    - 3일 ~ 7일까지 일정을 추천받을 수 있음
    - 다음과 같이 Plan과 Todo를 통해서 일정을 추천
    - 원하는 일정을 시간표에서 직접 위치를 드래그로 옮겨서 저장가

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/5332b80c-ea37-4675-8e70-95c166faa2e7/c19bf6e6-5005-4773-9c33-1a0bd0ef8548/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/5332b80c-ea37-4675-8e70-95c166faa2e7/e832bded-2eb9-49e7-b4ff-1e65eec62e02/Untitled.png)

- 일정 확인
    - 추천받은 일정 및 현재 존재하는 일정들을 통합하여 일정을 확인할 수 있음
    - 교통정보도 확인가능
        - 세부 교통정보 분단위로 확인가능
