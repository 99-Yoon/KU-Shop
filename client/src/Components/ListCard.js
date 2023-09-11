import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

function ListCard(props) {

    if (props.status === 'list') {
        return (
            <Card id={props.id} className="m-3" style={{ width: "18rem" }}>
                <Card.Img variant="top" src={props.main_img && `/images/${props.main_img}`} style={{ objectFit: "contain", height: "22rem" }} />
                <Card.Body>
                    <Card.Title style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{props.name}</Card.Title>
                    <Card.Text>{props.price} 원</Card.Text>
                </Card.Body>
            </Card>
        )
    } else if (props.status === 'recommend') {
        return (
            <Card id={props.id} className="mx-2" style={{ width: "10rem" }}>
                <Card.Img variant="top" src={props.main_img && `/images/${props.main_img}`} style={{ objectFit: "contain", maxHeight: "10rem" }} />
                <Card.Body className="px-2">
                    <Card.Title className='h6' style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{props.name}</Card.Title>
                    <Card.Text className='h6'>{props.price} 원</Card.Text>
                </Card.Body>
            </Card>
        )
    } else if (props.status === 'order') {
        return (
            <Card >
                <Card.Title className="font-weight-bold mt-4 text-center"> 주문 현황</Card.Title>
                {
                    props.ordered.map((e) => (
                        <Card.Body className='m-1'>
                            {e.products.length > 1 ?
                                <Card.Header className="font-weight-bold mb-3 text-center" style={{ background: '#F7F3F3' }}>
                                    {e.products[0].productId.pro_name} 외 {e.products.length - 1}개
                                </Card.Header>
                                : (
                                    <Card.Header className="font-weight-bold mb-3 text-center" style={{ background: '#F7F3F3' }}>
                                        {e.products[0].productId.pro_name}
                                    </Card.Header>)}
                            <Card.Text>
                                <Col className='justify-content-center'>
                                    <Row className='justify-content-center' >
                                        <>
                                            <Col sm={3} xs={5} className='p-1'><li>주문번호 :</li></Col>
                                            <Col sm={8} xs={6} className='p-1'><strong>{e._id}</strong></Col>
                                        </>
                                        <Col sm={3} xs={5} className='p-1'><li>결제금액 :</li></Col>
                                        <Col sm={8} xs={6} className='p-1'><strong>{e.total}원</strong></Col>

                                        <Col sm={3} xs={5} className='p-1'><li>배송지 :</li></Col>
                                        <Col sm={8} xs={6} className='p-1'><strong> {e.receiverInfo.address}</strong> <br />( {e.receiverInfo.address2} )</Col>

                                        <Col sm={3} xs={5} className='p-1'><li>주문날짜 :</li></Col>
                                        <Col sm={8} xs={6} className='p-1'><strong>{e.createdAt.substring(0, 10)}</strong></Col>
                                    </Row>
                                </Col>
                            </Card.Text>
                        </Card.Body>
                    )
                    )
                }
            </Card>
        )
    } else if (props.status === 'cart') {
        return (
            <>
                {props.cart.map((e) => (
                    <Card>
                        <Row className="mx-1">
                            <Col xs={2} sm={2} className="text-center my-auto">
                                <input className="" type="checkbox" name={String(e._id)} onChange={props.checkedCart} />
                            </Col>
                            <Col className="text-center">
                                <Card.Img className="img-fluid" variant="top" src={e.productId.main_imgUrl && `/images/${e.productId.main_imgUrl}`} style={{ width: '20rem' }} />
                            </Col>
                            <Col md={6} className="p-2">
                                <Card.Body>
                                    <input type="image" name={String(e._id)} alt="삭제버튼" src="https://img.icons8.com/fluent-systems-regular/24/000000/close-window.png" className="float-right" onClick={props.deleteCart} />
                                    <Card.Title className="font-weight-bold mt-3">{e.productId.pro_name}</Card.Title>
                                    <Card.Text className="mb-0">가격: {e.productId.price}원</Card.Text>
                                    <Card.Text className="mb-0">옵션: {e.size}/{e.color}</Card.Text>
                                    <Card.Text >수량</Card.Text>
                                    <div>
                                        <input type="image" name={String(e._id)} alt="마이너스" src="https://img.icons8.com/ios-glyphs/20/000000/minus-math.png" className="align-middle" onClick={props.minusNum} />
                                        <input type="number" style={{ width: '30px' }} className="text-center align-middle mx-1" placeholder={e.count} value={e.count} readOnly></input>
                                        <input type="image" name={String(e._id)} alt="플러스" src="https://img.icons8.com/ios-glyphs/20/000000/plus-math.png" className="align-middle" onClick={props.plusNum} />
                                    </div>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                ))
                }
            </>
        )
    } else if (props.status === 'payment') {
        return (
            <>
                {props.cart.map((e) => (
                    <Card>
                        <Row className="mx-1">
                            <Col className="text-center">
                                <Card.Img className="img-fluid" variant="top" src={e.productId.main_imgUrl && `/images/${e.productId.main_imgUrl}`} style={{ width: '20rem' }} />
                            </Col>
                            <Col md={6} className="p-2">
                                <Card.Body>
                                    <input type="image" name={String(e._id)} alt="삭제버튼" src="https://img.icons8.com/fluent-systems-regular/24/000000/close-window.png" className="float-right" onClick={props.deleteOrder} />
                                    <Card.Title className="font-weight-bold mt-3">{e.productId.pro_name}</Card.Title>
                                    <Card.Text>가격: {e.productId.price}원</Card.Text>
                                    <Card.Text>옵션: {e.size}/{e.color}</Card.Text>
                                    <Card.Text>수량: {e.count}</Card.Text>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                ))
                }
            </>
        )
    }
}

export default ListCard