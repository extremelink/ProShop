import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";


const SearchBox = () => {
    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();
    const [ keyword, setKeyword] = useState(urlKeyword || '');
    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/search/${keyword}`);
            setKeyword('')
        }else{
            navigate('/');
        }
    }
    return (
    <Form onSubmit={ submitHandler } className='d-flex' >
        <FaSearch />
            <Form.Control
            type='text'
            name='q'
            placeholder='Search Products...'
            className='search-input mr-sm-2 ml-sm-5'
            value={keyword}
            onChange={(e) =>setKeyword(e.target.value)}
            ></Form.Control>
        <Button type='submit' variant='outline-light' className='p-2 mx-2 search-button'>Search</Button>
    </Form>

)
}

export default SearchBox