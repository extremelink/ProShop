import { Pagination } from "react-bootstrap";
import React from 'react'
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword='' }) => {
  return (
    pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x) => (
                <Pagination.Item
                    key={x+1}
                    active = {x+1 === page}
                    as={Link}
                    to={
                        !isAdmin
                        ? keyword ? `/search/${keyword}/page/${x+1}`
                        :`/page/${x+1}`
                        :`/admin/productlist/${x+1}`
                    }
                    className="pagination-item"
                    >{ x+1 }
                    </Pagination.Item>        
            ) )}
        </Pagination>
    )
  )
}

export default Paginate