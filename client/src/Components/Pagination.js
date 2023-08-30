import { Pagination } from "react-bootstrap";
import React from 'react';

function Paginations({ currentPage, totalPages, handlePage }) {
    return (
        <Pagination className="d-flex justify-content-center">
            <style type="text/css">
                {`
                @font-face {
                    font-family: 'Jal_Onuel';
                    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/Jal_Onuel.woff') format('woff');
                    font-weight: normal;
                    font-style: normal;
                }
                body{font-family:'Jal_Onuel'}

                .page-link, .page-link:hover {
                    color: #91877F;
                    margin: 0;
                    border: 0;
                }

                .page-link:focus {
                    box-shadow: 0 0 0 0;
                }

                .page-item.active .page-link {
                    background-color: #CDC5C2;
                    border-color: #CDC5C2;
                    color: #fff;
                }
                `}
            </style>
            <Pagination.First onClick={() => handlePage(1)} />
            {currentPage === 1
                ? <Pagination.Prev disabled />
                : <Pagination.Prev onClick={() => handlePage(currentPage - 1)} />}
            {currentPage > 2 && <Pagination.Item onClick={() => handlePage(currentPage - 2)}>{currentPage - 2}</Pagination.Item>}
            {currentPage > 1 && <Pagination.Item onClick={() => handlePage(currentPage - 1)}>{currentPage - 1}</Pagination.Item>}
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {(totalPages - currentPage) > 0 && <Pagination.Item onClick={() => handlePage(currentPage + 1)}>{currentPage + 1}</Pagination.Item>}
            {(totalPages - currentPage) > 1 && <Pagination.Item onClick={() => handlePage(currentPage + 2)}>{currentPage + 2}</Pagination.Item>}
            {totalPages === currentPage
                ? <Pagination.Next disabled />
                : <Pagination.Next onClick={() => handlePage(currentPage + 1)} />}
            <Pagination.Last onClick={() => handlePage(totalPages)} />
        </Pagination>
    )
}

export default Paginations