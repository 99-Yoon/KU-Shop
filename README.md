# 💡KU# (KU Shop)

- 인터넷 쇼핑몰 사이트

</br>

## 1. 제작 기간 및 참여 인원

- 2020년 12월 20일 ~ 2월 4일
- 김수빈(팀장), 윤지원(팀원), 이재연(팀원), 박상호(팀원)

</br>

## 2. 기술 스택

#### `Front-End`

- javascript
- React
- react-router-dom
- Bootstrap

#### `Back-End`

- Mongo DB
- mongoose
- express
- bcryptjs
- jsonwebtoken

</br>

## 3. ERD 설계

![ERD설계도](https://github.com/99-Yoon/KU-Shop/blob/636c367017d43d97690936dd9b29986c705a39e3/docs/database.png)

## 4. 핵심 기능

이 서비스에서의 핵심 기능은 페이지네이션과 장바구니 입니다.

### 4-1 Pagination

페이지네이션은 어느 사이트에서든 쓸 수 있는 기본적인 기능임과 동시에 핵심적인 기능입니다.  
다른 코드들을 참고하지 않고 직접 만들어 보았습니다.  
페이지네이션 버튼 UI는 react-bootstrap의 Pagination을 사용했습니다.

<details>
<summary><b>페이지네이션 설명 펼치기</b></summary>
<div markdown="1">

### 페이지 구성

한 페이지에 9개의 상품이 들어갈 수 있도록 per의 값을 9로 설정합니다.  
그리고 상품을 DB에서 front로 불러올 때 모두 불러오는 것이 아닌 9개씩 불러올 수 있도록 skip과 limit를 활용해 주었습니다.

### 페이지네이션 바

react-bootstrap의 Pagination 컴포넌트를 사용했습니다.
Pagination에는 First, Prev, Item, Next, Last가 있습니다.

</div>
</details>

### 4-2 장바구니

<details>
<summary><b>장바구니 설명 펼치기</b></summary>
<div markdown="1">

</div>
</details>

</br>

## 5. 트러블 슈팅

## 기타

- server
  port: 3001
  실행: npm run dev

- client
  port: localhost:3000
  실행: npm start
