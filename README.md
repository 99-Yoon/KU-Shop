# 💡KU# (KU Shop)

- 인터넷 쇼핑몰 사이트

</br>

# 1. 제작 기간 및 참여 인원

- 2020년 12월 20일 ~ 2월 4일
- 김수빈(팀장), 윤지원(팀원), 이재연(팀원), 박상호(팀원)

</br>

# 2. 기술 스택

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

# 3. ERD 설계

![ERD설계](https://github.com/99-Yoon/KU-Shop/blob/10210b164929215180761d51edc1437657044e06/docs/database.png)

# 4. 핵심 기능

이 서비스에서의 핵심 기능은 장바구니 기능과 상품추천 기능 입니다.

## 4-1. 장바구니

장바구니는 사용자가 회원가입을 할 때 사용자마다 한 개씩 만들어집니다. (Cart : User = 1 : 1)  
사용자는 상품을 바로 구매할 수도 있지만, 상품들을 장바구니에 담은 후 원하는 상품들을 골라 한 번에 구매할 수 있습니다.

<details>
<summary><b>장바구니 설명 펼치기</b></summary>
<div markdown="1">

### (1) 장바구니 - 전체 흐름

<img alt="장바구니 흐름1" src="https://github.com/99-Yoon/KU-Shop/blob/2fc1798ec7f8e9e80c9b532b54c64a4b8da59291/docs/shoppingCart%20flow1.png" width="300px">
<img alt="장바구니 흐름2" src="https://github.com/99-Yoon/KU-Shop/blob/2fc1798ec7f8e9e80c9b532b54c64a4b8da59291/docs/shoppingCart%20flow2.png" width="300px">

### (2) 장바구니 - frontend 코드 설명

![장바구니 Frontend1](https://github.com/99-Yoon/KU-Shop/blob/245af0b840ee6a82fefd0db795548b95ca182353/docs/shoppingCart%20front1.PNG)

원하는 옵션을 선택 후 장바구니 버튼을 누르면 addCart()가 실행됩니다.  
addCart()에서는 axios를 이용하여, 서버의 '/api/cart/addcart' 주소에 userId와 products를 put() 요청합니다.  
정상적으로 카트에 담긴 후에는 모달창이 뜨며, 장바구니로 이동 버튼을 누르면 장바구니 페이지로 이동합니다.

![장바구니 Frontend2](https://github.com/99-Yoon/KU-Shop/blob/245af0b840ee6a82fefd0db795548b95ca182353/docs/shoppingCart%20front2.PNG)

장바구니 페이지에서는 처음 렌더링 할 때 useEffect로 getCart()가 실행됩니다.  
getCart()에서는 axios를 이용하여 서버의 '/api/cart/showcart' 주소에 user(userId)을 param으로 붙여 get() 요청합니다.  
그리고 장바구니에 담긴 여러가지 상품들 중 원하는 것만 체크하여 구매할 수 있도록 checkedCart()함수를 만들었습니다.  
checkedCart()에서는 해당 항목을 checked = true (이미 체크되어 있는 경우엔 false) 로 바꾸고 checked = true인 상품들만 최종 결제 상품 목록으로 취급합니다.  
또한 최종 결제 상품 목록의 가격과 개수를 곱하고 더해서 최종 결제 가격을 표시합니다.

### (3) 장바구니 - backend 코드 설명

![장바구니 Backend](https://github.com/99-Yoon/KU-Shop/blob/cc2741d271b7a500b1938de97dac720fade8d2ee/docs/shoppingCart%20back.PNG)

장바구니에 추가하는 함수인 addCart()는 클라이언트에서 온 userId를 통해 Cart Colloection에서 해당 유저의 장바구니를 찾은 후, $push 쿼리를 이용하여 새로운 상품을 추가해줍니다.  
장바구니를 불러오는 함수인 showCart()의 경우엔 먼저 params를 통해 들어온 userId를 이용하여 userById()에서 DB에 해당 유저의 장바구니가 있는지 확인합니다.  
그 후 해당 유저의 장바구니를 불러오는데, populate()로 Product Collention에서 참조한 정보를 가져옵니다.

</div>
</details>

## 4-2 선호할 만한 상품 추천

사람들이 상품과 함께 구매한 다른 상품들을 아래쪽에 표시해,  
사용자가 다른 상품도 함께 구매할 수 있게 유도하도록 하는 기능입니다.  
MongoDB의 aggregate()를 사용하여 간단하게 구현해보았습니다.

<details>
<summary><b>상품 추천 기능 설명 펼치기</b></summary>
<div markdown="1">

### (1) 상품 추천 - 전체 흐름

MongoDB의 aggregation framework는 파이프라인의 개념을 모델로 합니다.  
DB에 저장되어 있는 문서들은 파이프라인을 거쳐 최종적으로 원하는 형태의 문서로 가공될 수 있습니다.

![전체흐름1]()

- $match
- $unwind
- $group
- $sort
- $limit
- $lookup

### (2) 상품 추천 - 적용

</div>
</details>

</br>

# 5. 트러블 슈팅 및 회고

결제기능을 제대로 구현해내지 못한 아쉬움

# 기타

- server
  port: 3001
  실행: npm run dev

- client
  port: localhost:3000
  실행: npm start
