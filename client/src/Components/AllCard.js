import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import catchError from '../utils/catchErrors';
import { Card, Button } from 'react-bootstrap';

function AllCard({ id, name, price, main_img }) {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const cardRef = useRef(null)

    async function handleDelete() {
        const pro_id = cardRef.current.id
        try {
            setError('')
            const response = await axios.delete(`/api/product/delete?pro_id=${pro_id}`)
            alert('해당 상품을 성공적으로 삭제하였습니다.')
            setSuccess(true)
        } catch (error) {
            catchError(error, setError)
            setSuccess(false)
        }
    }

    if (success) {
        return <Redirect to="/admin" />
    }

    return (
        <Card id={id} ref={cardRef} className="m-3" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={main_img && `/images/${main_img}`} style={{ objectFit: "contain", height: "22rem" }} />
            <Card.Body>
                <Card.Title style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</Card.Title>
                <Card.Text>{price} 원</Card.Text>
                <Button className="float-right" onClick={handleDelete}>삭제</Button>
            </Card.Body>
        </Card>
    )
}

export default AllCard