import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import catchErrors from '../utils/catchErrors';
import { Form, Col, Container, Button, Row, Alert } from 'react-bootstrap';

const INIT_USER = {
    name: '',
    number: '',
    id: '',
    password: '',
    password2: '',
    tel: '',
    email: ''
}

function Signup() {
    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [validated, setValidated] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        try {
            setError('')
            const response = await axios.post('/api/users/signup', user)
            console.log(response.data)
            setSuccess(true)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    function checkPassword(event) {
        const p1 = user.password
        const p2 = user.password2
        if (p1 !== p2) {
            event.preventDefault();
            event.stopPropagation();
            alert('비밀번호가 일치하지 않습니다.')
            return false
        } else {
            return true
        }
    }

    if (success) {
        alert('회원가입 되었습니다.')
        return <Redirect to='/login' />
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={6} xs={10} className="border" style={{ background: '#F7F3F3' }}>
                    <h2 className="text-center pt-3 m-4">Sign Up</h2>
                    <Form
                        noValidate validated={validated}
                        onSubmit={handleSubmit}
                        className="p-4">
                        <Form.Group as={Row} controlId="formBasicName">
                            <Form.Label column sm="4">
                                이 름    </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    required type="text"
                                    name="name"
                                    placeholder="홍길동"
                                    value={user.name}
                                    onChange={handleChange} />
                                <Form.Control.Feedback type="invalid" >이름을 입력하세요. </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicNumber">
                            <Form.Label column sm="4" >
                                주민등록번호    </Form.Label>
                            <Row style={{ width: '300px' }} className='px-3'>
                                <Col sm="6" xs='5' className='pr-1'>
                                    <Form.Control
                                        className='pl-2 pr-0'
                                        required type="text"
                                        name="birth"
                                        maxLength="6"
                                        placeholder="990101"
                                        value={user.birth}
                                        onChange={handleChange} />
                                    <Form.Control.Feedback type="invalid" >주민등록번호 입력하세요. </Form.Control.Feedback>
                                </Col>
                                <strong className='pt-2 d-flex align-items-flex-start'>-</strong>
                                <Col md="2" xs='3' className='px-2'>
                                    <Form.Control
                                        className='pl-2 pr-0'
                                        required type="text"
                                        name="sex"
                                        placeholder="1"
                                        maxLength="1"
                                        value={user.sex}
                                        onChange={handleChange} />
                                </Col>
                                <strong className='pt-2 d-flex align-items-flex-start'>* * * * * *</strong>
                            </Row>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicId">
                            <Form.Label column sm="4" >
                                아이디    </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    required type="text"
                                    name="id"
                                    placeholder="아이디"
                                    value={user.id}
                                    onChange={handleChange} />
                                <Form.Control.Feedback type="invalid" >아이디를 입력하세요. </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicPassword">
                            <Form.Label column sm="4" >
                                비밀번호    </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="비밀번호"
                                    value={user.password}
                                    required
                                    onChange={handleChange} />
                                <Form.Control.Feedback type="invalid" >비밀번호를 입력하세요. </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicPassword2">
                            <Form.Label column sm="4" >
                                비밀번호 확인   </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="password"
                                    name="password2"
                                    placeholder="비밀번호 확인"
                                    value={user.password2}
                                    required
                                    onChange={handleChange} />
                                <Form.Control.Feedback type="invalid" >비밀번호를 한번 더 입력하세요.</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicEmail">
                            <Form.Label column sm="4" >
                                이메일   </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    required type="email"
                                    name="email"
                                    placeholder="Hong@gmail.com"
                                    value={user.email}
                                    onChange={handleChange} />
                                <Form.Control.Feedback type="invalid" >이메일을 입력하세요.</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicTel">
                            <Form.Label column sm="4">
                                휴대전화   </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    required type="text"
                                    name="tel"
                                    placeholder="01012341234"
                                    value={user.tel}
                                    onChange={handleChange} />
                                <Form.Control.Feedback type="invalid" >휴대전화를 입력하세요.</Form.Control.Feedback>
                                <Row className='text-end pl-3 mt-1'><small >' - ' 를 제외하고 입력해주세요.</small></Row>
                            </Col>
                        </Form.Group>
                        {error && <Alert variant='danger'>{error}</Alert>}

                        <Button
                            style={{ background: '#91877F', borderColor: '#91877F', margin: 'auto' }} type="submit" block
                            onClick={checkPassword} >
                            Sign Up
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Signup