import React, { useState, useEffect, useRef } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import DaumPostcode from "react-daum-postcode";
import ListCard from '../Components/ListCard';
import axios from 'axios';
import { isAuthenticated } from '../utils/auth';
import catchErrors from '../utils/catchErrors';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

function Payment({ match, location }) {
    const [cart, setCart] = useState([])
    const [order, setOrder] = useState({ products: [] })
    const [userData, setUserData] = useState({})
    const [error, setError] = useState()
    const [post, setPost] = useState([])
    const [redirect, setRedirect] = useState(null)
    const [address, setAddress] = useState("")
    const [finalPrice, setFinalPrice] = useState(0)
    const [paymentWay, setPaymentWay] = useState([])
    const [completeState, setCompleteState] = useState(false)
    const user = isAuthenticated()
    let history = useHistory();
    const preCart = []

    useEffect(() => {
        getUser()
        getCart()
    }, [user])

    useEffect(() => {
        let price = 0
        cart.map((el) => {
            price = Number(el.count) * Number(el.productId.price) + price
        })
        setFinalPrice(price)
    }, [cart])

    async function getUser() {
        const name = localStorage.getItem('name')
        const tel = localStorage.getItem('tel')
        const email = localStorage.getItem('email')
        setUserData({ name: name, tel: tel, email: email })
    }

    async function getCart() {
        try {
            setError('')
            const response = await axios.get(`/api/cart/showcart/${user}`)
            const preCart = response.data.filter((el) => el.checked === true)
            if (preCart.length) {
                setCart(preCart)
                setOrder({ products: preCart })
            } else {
                alert("주문하실 상품이 없습니다.")
                history.push("/home")
            }
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function deleteOrder(e) {
        try {
            setError('')
            const response = await axios.post('/api/cart/deletecart', {
                userId: user,
                cartId: e.target.name
            })
            const preCart = response.data.products.filter((el) => el.checked === true)
            setCart(preCart)
            setOrder({ products: preCart })
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    function handleReceiverInfo(e) {
        const { name, value } = e.target
        setOrder({ ...order, receiverInfo: { ...order.receiverInfo, [name]: value } })
    }

    function postClick() {
        if (post.length !== 0) {
            setPost([])
        }
        else {
            setPost(
                <div>
                    <DaumPostcode style={postCodeStyle} onComplete={handleComplete} autoClose={true} />
                </div>
            )
        }

    }
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";
        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress +=
                    extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
        setAddress({ full: fullAddress, code: data.zonecode });
        setOrder({ ...order, receiverInfo: { ...order.receiverInfo, address: fullAddress, postalCode: data.zonecode } })
        console.log(fullAddress);
    }

    const postCodeStyle = {
        // display: "block",
        position: "absolute",
        width: "400px",
        height: "500px",
        padding: "7px",
        zIndex: "1000"
    };

    function handleClick() {
        if (paymentWay.length !== 0) {
            setCompleteState(false)
            setPaymentWay([])
        } else {
            const bankList = (
                <Row className="justify-content-md-center">
                    <Col md={6} className="border m-5 p-5">
                        <Form>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>입금은행</Form.Label>
                                <Form.Control as="select" placeholder="입금은행을 선택하세요.">
                                    <option>농협 / 352-0559-2528-83 / 김수빈</option>
                                    <option>우리은행 / 0000-000-000000 / 이재연</option>
                                    <option>국민은행 / 111111-11-111111 / 윤대기</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formName">
                                <Form.Label>입금자</Form.Label>
                                <Form.Control type="email" placeholder="윤지원" />
                            </Form.Group>
                            <Form.Group controlId="formDay">
                                <Form.Label>입금예정일</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>)
            setPaymentWay(bankList)
        }
    }

    async function kakaopay() {
        setCompleteState("kakaopay")
        setPaymentWay(
            <div className="text-center">
                <p className=" font-weight-bold" style={{ display: 'inline' }}>'카카오페이'</p><p style={{ display: 'inline' }}>를 선택하셨습니다. </p>
                <p>주문하기를 눌러 결제를 이어가주세요.</p>
            </div>
        )
    }

    async function paymentCompleted() {
        const cartIds = []
        order.products.map((el) => {
            cartIds.push(el._id)
        })
        try {
            setError('')
            const response = await axios.post(`/api/order/addorder`, {
                userId: user,
                ...order,
                total: finalPrice + 2500
            })
            const response2 = await axios.post(`/api/cart/deletecart2`, {
                userId: user,
                cartId: cartIds
            })
            const response3 = await axios.post(`/api/product/pluspurchase`, {
                products: order.products
            })
            if (completeState === "kakaopay") {
                let itemNames = ""
                if (cart.length > 1) {
                    itemNames = cart[0].productId.pro_name + ' 외 ' + String(cart.length - 1) + '개'
                } else {
                    itemNames = cart[0].productId.pro_name
                }
                setError('')
                const response = await fetch('/api/kakaopay/test/single', {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        cid: 'TC0ONETIME',
                        partner_order_id: 'partner_order_id',
                        partner_user_id: user,
                        item_name: itemNames,
                        quantity: cart.length,
                        total_amount: finalPrice + 2500,
                        vat_amount: 200,
                        tax_free_amount: 0,
                        approval_url: 'http://localhost:3000/paymentcompleted',
                        fail_url: 'http://localhost:3000/shoppingcart',
                        cancel_url: 'http://localhost:3000/shoppingcart',
                    })
                })
                const data = await response.json()
                window.location.href = data.redirect_url
            } else {
                console.log(response.data)
                console.log(response2.data)
                console.log(response3.data)
                alert("주문이 완료되었습니다.")
                history.push('/paymentcompleted')
            }
        } catch (error) {
            catchErrors(error, setError)
            alert("주문에 실패하셨습니다. 다시 확인해주세요.")
        }
    }

    return (
        <Container>
            <h3 className="my-5 font-weight-bold text-center">주문/결제</h3>
            <div>
                <h5 className="font-weight-bold py-3 border-top border-bottom text-center" style={{ background: '#F7F3F3' }}>주문자 정보</h5>
                <Row className="justify-content-md-center">
                    <Col md={4}>
                        <Form>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>이름</Form.Label>
                                <Form.Control type="text" value={userData.name} readOnly />
                            </Form.Group>
                            <Form.Group controlId="formBasicTel">
                                <Form.Label>휴대전화</Form.Label>
                                <Form.Control type="tel" value={userData.tel} readOnly />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>이메일</Form.Label>
                                <Form.Control type="email" value={userData.email} readOnly />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
            <div>
                <h5 className="font-weight-bold py-3 border-top border-bottom text-center" style={{ background: '#F7F3F3' }}>받는사람 정보</h5>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Form>
                            <Form.Group>
                                <Form.Label>이름</Form.Label>
                                <Form.Control type="text" name="name" onChange={handleReceiverInfo}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>휴대전화</Form.Label>
                                <Form.Control type="text" name="tel" onChange={handleReceiverInfo}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicAdd">
                                <Form.Label>주소</Form.Label>
                                <Form.Row>
                                    <Col xs={4} sm={4}>
                                        <Form.Control type="text" name="postalCode" id="add" onChange={handleReceiverInfo} value={address.code} disabled={(address.code == null) ? false : true} placeholder="우편번호" required ></Form.Control>
                                    </Col>
                                    <Col >
                                        <Button style={{ background: '#91877F', borderColor: '#91877F' }} className="mx-1" onClick={postClick}>우편번호</Button>
                                        {post}
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Control type="text" name="address" id="add1" onChange={handleReceiverInfo} value={address.full} disabled={(address.code == null) ? false : true} placeholder="주소" required></Form.Control>
                                        <Form.Control type="text" name="address2" id="add2" onChange={handleReceiverInfo} placeholder="상세주소" required></Form.Control>
                                        <Form.Control.Feedback type="invalid" > 상세 주소를 입력하세요. </Form.Control.Feedback>
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
            <div>
                <h5 className="font-weight-bold py-3 border-top border-bottom text-center" style={{ background: '#F7F3F3' }}>주문상품정보</h5>
                <ListCard cart={cart} deleteOrder={deleteOrder} status={'payment'} />
            </div>
            <div className="p-5 m-3" style={{ background: '#F7F3F3' }}>
                <ul className="pl-0" style={{ listStyle: 'none' }}>
                    <li>
                        <span className="text-secondary">총 상품금액</span>
                        <span className="text-secondary float-right">{finalPrice}원</span>
                    </li>
                    <li>
                        <span className="text-secondary">배송비</span>
                        <span className="text-secondary float-right">2500원</span>
                    </li>
                </ul>
                <div className="my-1 pt-2 border-top font-weight-bold">
                    결제금액<span className="float-right">{finalPrice + 2500}원</span>
                </div>
            </div>
            <div>
                <h5 className="font-weight-bold py-3 border-top border-bottom text-center" style={{ background: '#F7F3F3' }}>결제수단</h5>
                <div className="text-center m-3">
                    <Button className="align-top m-1" variant="success" onClick={handleClick} style={{ height: '42px' }}>무통장입금</Button>
                    <Button className="align-top m-1 p-0" style={{ borderColor: "#ffeb00" }} type="button" onClick={kakaopay} alt="카카오페이"><img src="icon/payment_icon_yellow_small2.png" /></Button>
                </div>
                {paymentWay}
            </div>
            <div className="text-center">
                <Button type="button" onClick={paymentCompleted} className="px-5" style={{ background: "#91877F", borderColor: '#91877F' }} block>결제완료</Button>
            </div>
        </Container>
    )
}

export default Payment