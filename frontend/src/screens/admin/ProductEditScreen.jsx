import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../slices/productApiSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { toast } from 'react-toastify'

const ProductEditScreen = () => {
    const { id:productId } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [ brand, setBrand ] = useState('');
    const[countInStock, setCountInStock] = useState('')
    const [category, setCategory ] = useState('');
    const [description, setDescription] = useState('');

    const { data: product, isLoading, refetch, error} = useGetProductDetailsQuery(productId); 
    console.log(product);

    const [ updateProduct , { isLoading: loadingUpdate }]= useUpdateProductMutation();
    
    const [ uploadProductImage , {isLoading:loadingUpload}]= useUploadProductImageMutation();
    
    const navigate = useNavigate();

    useEffect(()=>{
        if(product){
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCountInStock(product.countInStock);
            setCategory(product.category);
            setDescription(product.description);
        }
    },[product])

    const submitHandler= async (e) =>{
        e.preventDefault();
        const updatedProduct = {
            productId,
            name,
            price,
            image,
            brand,
            countInStock,
            category,
            description
        }
       try{
        await updateProduct(updatedProduct);
        refetch()
        toast.success('Product Updated!');
        navigate('/admin/productlist')
       }catch(err){
        toast.error(err?.data?.message || err.message);
       }
    }

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image' , e.target.files[0]);
        try{
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        }catch (err){
            toast.error(err?.data?.message || err.message);
        }
    }

  return (
    <>
    <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
    </Link>
    <FormContainer>
        <h1>Edit Product</h1>
        { loadingUpdate && <Loader />}
        {isLoading ? <Loader /> : error 
        ? <Message variant='danger'>{error}</Message>
        :(
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-2'>
            <Form.Label>Update Name</Form.Label>
            <Form.Control
            type='text'
            placeholder='Enter Name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            ></Form.Control>
        </Form.Group>
        <Form.Group controlId='price' className='my-2'>
            <Form.Label>Enter Price</Form.Label>
            <Form.Control
                type='number'
                placeholder='Enter Price'
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
            >
            </Form.Control>
        </Form.Group>
        <Form.Group controlId='image' className='my-2'>
            <Form.Label>Image</Form.Label>
            <Form.Control type='text' placeholder='Enter image url' value={ image } onChange = { (e) => setImage}></Form.Control>
            <Form.Control type='file' label='Choose file' onChange={ uploadFileHandler }></Form.Control>
        </Form.Group>
        {loadingUpload && <Loader /> }
        <Form.Group controlId='brand' className='my-2'>
            <Form.Label>Enter Brand</Form.Label>
            <Form.Control 
                type='text'
                placeholder='Enter Brand'
                value={brand}
                onChange={(e)=>setBrand(e.target.value)}
                ></Form.Control>
        </Form.Group>
            
        <Form.Group controlId='countInStock' className='my-2'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control 
                type='text'
                placeholder='Enter count in stock'
                value={countInStock}
                onChange={(e)=>setCountInStock(e.target.value)}
                ></Form.Control>
        </Form.Group>

        <Form.Group controlId='category' className='my-2'>
            <Form.Label>Category</Form.Label>
            <Form.Control 
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                ></Form.Control>
        </Form.Group>

        <Form.Group controlId='description' className='my-2'>
            <Form.Label>Description</Form.Label>
            <Form.Control 
                as='textarea'
                placeholder='Enter description'
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                ></Form.Control>
        </Form.Group>
            
            <Button type='submit' variant='primary' className='my-2'>
                Update
            </Button>
            
            </Form>
        )
    }

    </FormContainer>
    </>
  )
}

export default ProductEditScreen