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

![ERD설계도](https://github.com/99-Yoon/KU-Shop/blob/10210b164929215180761d51edc1437657044e06/docs/database.png)

## 4. 핵심 기능

이 서비스에서의 핵심 기능은 장바구니 기능과 상품추천 기능 입니다.

### 4-1. 장바구니

장바구니는 사용자가 회원가입을 할 때 사용자마다 한 개씩 만들어집니다. (Cart : User = 1 : 1)  
사용자는 상품을 바로 구매할 수도 있지만, 상품들을 장바구니에 담은 후 원하는 상품들을 골라 한 번에 구매할 수 있습니다.

<details>
<summary><b>장바구니 설명 펼치기</b></summary>
<div markdown="1">

### 장바구니(1) - 전체 흐름

### 장바구니(2) - frontend 코드 설명

### 장바구니(3) - backend 코드 설명

</div>
</details>

### 4-2 선호할 만한 상품 추천

<details>
<summary><b>상품 추천 기능 설명 펼치기</b></summary>
<div markdown="1">

</div>
</details>

</br>

## 5. 트러블 슈팅 및 회고

결제기능을 제대로 구현해내지 못한 아쉬움

## 기타

- server
  port: 3001
  실행: npm run dev

- client
  port: localhost:3000
  실행: npm start
