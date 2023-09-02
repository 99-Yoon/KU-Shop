import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ListCard from '../Components/ListCard';
import Pagination from "../Components/Pagination";
import axios from 'axios';
import catchError from '../utils/catchErrors';
import { Container, Row, Col, Form, FormControl, Button, Dropdown, ButtonGroup, Image } from 'react-bootstrap';

function ProductsList({ match }) {
    const [search, setSearch] = useState({ word: '' })
    const [sortingName, setSortingName] = useState('정렬')
    const [mainCategory, setMainCategory] = useState(match.params.main.toUpperCase())
    const [subCategory, setSubCategory] = useState([])
    const [selectSubCategory, setSelectSubCategory] = useState('')
    const [productlist, setProductlist] = useState([])
    const [length, setLength] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [error, setError] = useState('')
    const searchref = useRef(null)
    const per = 9;

    useEffect(() => {
        setMainCategory(match.params.main.toUpperCase())
        setSelectSubCategory('')
        setCurrentPage(1)
    }, [match.params.main])


    useEffect(() => {
        getSubsCategories()
        getProductlist()
    }, [mainCategory])

    useEffect(() => {
        if (search.word == '') {
            getProductlist()
        } else if (selectSubCategory != '') {
            changePageforSubname()
        } else {
            setSelectSubCategory('')
            searchList()
        }
    }, [currentPage])

    async function searchList() {
        try {
            setError('')
            const response = await axios.get(`/api/product/getproduct/main/${mainCategory}?product=${search.word}&page=${currentPage}`)
            setProductlist(response.data.productsPiece)
            setLength(response.data.length)
        } catch (error) {
            catchError(error, setError)
        }
    }

    function handleChange(event) {
        setSearch({ word: event.target.value })
    }

    async function handleSearch(e) {
        e.preventDefault()
        try {
            setError('')
            if (currentPage != 1) {
                setCurrentPage(1)
            }
            const response = await axios.get(`/api/product/getproduct/main/${mainCategory}?product=${search.word}&page=${currentPage}`)
            setProductlist(response.data.productsPiece)
            setLength(response.data.length)
        } catch (error) {
            catchError(error, setError)
        } finally {
            searchref.current.value = ''
        }
    }

    async function getSubsCategories() {
        try {
            setError('')
            const response = await axios.get(`/api/categories/sub/${mainCategory}`)
            setSubCategory(Object.values(response.data)[0])
        } catch (error) {
            catchError(error, setError)
        }
    }

    async function getProductlist() {
        try {
            setError('')
            setSearch({ word: '' })
            const response = await axios.get(`/api/product/getproduct/main/${mainCategory}?page=${currentPage}`)
            setProductlist(response.data.productsPiece)
            setLength(response.data.length)
        } catch (error) {
            catchError(error, setError)
        }
    }

    async function handleSort(method) {
        if (method === "purchase") {
            productlist.sort(function (a, b) {
                if (a.purchase > b.purchase) {
                    return -1;
                }
                if (a.purchase < b.purchase) {
                    return 1;
                }
                return 0;
            });
            setSortingName("인기상품")
        } else if (method === "newest") {
            productlist.sort(function (a, b) {
                if (a.createdAt > b.createdAt) {
                    return -1;
                }
                if (a.createdAt < b.createdAt) {
                    return 1;
                }
                return 0;
            });
            setSortingName("신상품")
        } else if (method === "lowest") {
            productlist.sort(function (a, b) {
                if (a.price > b.price) {
                    return 1;
                }
                if (a.price < b.price) {
                    return -1;
                }
                return 0;
            });
            setSortingName("낮은가격")
        } else {
            productlist.sort(function (a, b) {
                if (a.price > b.price) {
                    return -1;
                }
                if (a.price < b.price) {
                    return 1;
                }
                return 0;
            });
            setSortingName("높은가격")
        }
    }

    async function changePageforSubname() {
        try {
            setError('')
            setSearch({ word: '' })
            const response = await axios.get(`/api/product/getproduct/sub?subname=${selectSubCategory}&page=${currentPage}`)
            setProductlist(response.data.productsPiece)
            setLength(response.data.length)
        } catch (error) {
            catchError(error, setError)
        }
    }

    async function handleSubname(e) {
        const subname = e.target.name
        setSelectSubCategory(e.target.name)
        try {
            setError('')
            setSearch({ word: '' })
            const response = await axios.get(`/api/product/getproduct/sub?subname=${subname}&page=${currentPage}`)
            setProductlist(response.data.productsPiece)
            setLength(response.data.length)
        } catch (error) {
            catchError(error, setError)
        }
    }

    if (error) {
        alert(`${error}`)
        setError('')
        searchref.current.value = ''
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

                a, a:hover, a:active {
                    color: #000;
                    text-decoration: none;
                }
                .btn {
                    background-color: #CDC5C2;
                    border-color: #CDC5C2;
                    border-radius: 0;
                }
                .btn:hover, .btn-primary:focus {
                    background-color: #91877F;
                    border-color: #91877F;
                    box-shadow: 0 0 0 0;
                }
                .btn-primary:not(:disabled):not(.disabled):active, .show>.btn-primary.dropdown-toggle {
                    background-color: #91877F;
                    border-color: #91877F;
                }
                .dropdown-item {
                    color: #91877F;
                }
                .dropdown-item:hover, .dropdown-item:active {
                    background-color: #91877F;
                    color: #fff;
                }
                `}
            </style>
            <Row className="justify-content-center" >
                <Col className='px-3'>
                    <div className="text-center">
                        <h1 style={{ fontSize: "5.5vmax" }} className="text-center m-1 py-3">{mainCategory}</h1>
                        <ButtonGroup className="mb-3" style={{ display: "inline" }}>
                            {subCategory.map(el => (<Button className="m-1" style={{ fontSize: "1.5vw" }} name={el} onClick={handleSubname}>{el}</Button>))}
                        </ButtonGroup>
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-end mx-0 mt-5 mb-3">
                <Form inline onSubmit={handleSearch} className="justify-content-end mx-0 my-2">
                    <FormControl ref={searchref} type="text" onChange={handleChange} placeholder="Search" style={{ width: "12rem" }} />
                    <Button type="submit" className="px-2 m1-1">
                        <img src="/icon/search.svg" width="20" height="20" />
                    </Button>
                </Form>
                <Dropdown className="my-2">
                    <Dropdown.Toggle className="mx-1">{sortingName}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as="button" onClick={() => handleSort('purchase')}>인기상품</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => handleSort('newest')}>신상품</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => handleSort('lowest')}>낮은가격</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => handleSort('highest')}>높은가격</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Row>
            <Row md={8} sm={12} className="justify-content-center m-2">
                {productlist.length > 0 ?
                    productlist.map(pro => (
                        <Link to={{
                            pathname: `/product/${pro._id}`,
                            state: {
                                id: pro._id,
                                name: pro.pro_name,
                                price: pro.price,
                                colors: pro.colors,
                                sizes: pro.sizes,
                                description: pro.description,
                                main_img: pro.main_imgUrl,
                                detail_imgs: pro.detail_imgUrls
                            }
                        }}>
                            <ListCard id={pro._id} name={pro.pro_name} price={pro.price} main_img={pro.main_imgUrl} status={'list'} />
                        </Link>
                    ))
                    : (
                        <Image src="/sryimready.jpg" className='m-5'
                            style={{ objectFit: "contain", width: "45vw", height: "45vh" }}></Image>
                    )
                }
            </Row>
            {productlist.length > 0 ? <Pagination currentPage={currentPage} totalPages={Math.ceil(length / per)} handlePage={setCurrentPage} /> : ''}
        </Container>
    )
}

export default ProductsList