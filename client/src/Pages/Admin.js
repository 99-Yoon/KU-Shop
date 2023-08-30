import React, { useState, useEffect, useRef } from 'react';
import AllCard from '../Components/AllCard';
import Pagination from "../Components/Pagination";
import axios from 'axios';
import catchError from '../utils/catchErrors';
import { Row, Form, FormControl, Button, Container, Image } from 'react-bootstrap';

function Admin() {
    const [search, setSearch] = useState({ word: '' })
    const [productlist, setProductlist] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [error, setError] = useState('')
    const per = 9;

    useEffect(() => {
        getProductlist()
    }, [])

    useEffect(() => {
        if (search.word == '') {
            getProductlist()
        } else {
            handleSearch()
        }
    }, [currentPage])

    async function getProductlist() {
        try {
            setError('')
            setSearch({ word: '' })
            const response = await axios.get(`/api/product/getproduct/all?page=${currentPage}`)
            console.log(response.data)
            setProductlist(response.data.productPiece)
            setTotalPage(Math.ceil(response.data.totalCount / per))
        } catch (error) {
            catchError(error, setError)
        }
    }

    async function handleSearch(e) {
        console.log("handleSearch")
        e.preventDefault()
        try {
            setError('')
            const response = await axios.get(`/api/product/getproduct/all?product=${search.word}&page=${currentPage}`)
            setProductlist(response.data.productPiece)
            setTotalPage(Math.ceil(response.data.totalCount / per))
            console.log("Search===", response.data.productPiece)
        } catch (error) {
            catchError(error, setError)
        }
    }

    function handleChange(event) {
        setSearch({ word: event.target.value })
    }

    // async function handleSubmit(e) {
    //     e.preventDefault()
    //     try {
    //         setError('')
    //         if (currentPage != 1) {
    //             setCurrentPage(1)
    //         }
    //         const response = await axios.get(`/api/product/getproduct/all?product=${search.word}&page=${currentPage}`)
    //         setProductlist(response.data.productPiece)
    //         // setLength(response.data.length)
    //     } catch (error) {
    //         catchError(error, setError)
    //     } finally {
    //         searchref.current.value = ''
    //     }
    // }

    if (error) {
        alert(`${error}`)
        setError('')
    }

    return (
        <Container>
            <style type="text/css">
                {`
                @font-face {
                    font-family: 'Jal_Onuel';
                    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/Jal_Onuel.woff') format('woff');
                    font-weight: normal;
                    font-style: normal;
                }
                body{font-family:'Jal_Onuel'}

                .btn {
                    background-color: #CDC5C2;
                    border-color: #CDC5C2;
                }
                .btn:hover {
                    background-color: #91877F;
                    border-color: #91877F;
                }
                .btn-primary.focus, .btn-primary:focus {
                    background-color: #91877F;
                    border-color: #91877F;
                    box-shadow: 0 0 0 0;
                }
                .btn-primary:not(:disabled):not(.disabled):active, .show>.btn-primary.dropdown-toggle {
                    background-color: #91877F;
                    border-color: #91877F;
                }
                `}
            </style>
            <Row className="justify-content-end mx-0 my-5">
                <Form onSubmit={handleSearch}>
                    <Form.Row>
                        <FormControl type="text" onChange={handleChange} placeholder="Search" style={{ width: "13rem" }} />
                        <Button type="submit" className="px-2 mr-2">
                            <img src="icon/search.svg" width="20" height="20" />
                        </Button>
                    </Form.Row>
                </Form>
                <Button sm={2} xs={6} type="button" href="/regist" className="">상품 등록</Button>
            </Row>
            <Row className="justify-content-center m-5">
                {productlist.length > 0 ? productlist.map(pro => (
                    <AllCard id={pro._id} name={pro.pro_name} price={pro.price} main_img={pro.main_imgUrl} />
                )) : (
                    <Image src="/sryimready.jpg" className='m-5'
                        style={{ objectFit: "contain", width: "45vw", height: "45vh" }}></Image>
                )}
            </Row>
            <Pagination currentPage={currentPage} totalPages={totalPage} handlePage={setCurrentPage} />
        </Container>
    )
}

export default Admin