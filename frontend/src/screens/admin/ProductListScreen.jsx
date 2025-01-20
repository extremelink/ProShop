import React from 'react'
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from '../../slices/productApiSlice';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Paginate from '../../components/Paginate';

const ProductListScreen = () => {
    const { pageNumber } = useParams()
    const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber });
    const [ createProduct , { isLoading: loadingCreate} ] = useCreateProductMutation() ;
    const [ deleteProduct, {isLoading: loadingDelete} ] = useDeleteProductMutation();

    const deleteHandler = async (id) => {
        console.log('delete', id);
        if(window.confirm('Are you sure you want to delete this product?')){
            try{
                await deleteProduct(id);
                refetch();
                toast.success('Product Deleted!')
            }catch(err){
                toast.error(err?.data?.message || err.error);
            }
        }
    }
    const createProductHandler = async () =>{
        if(window.confirm('Are you sure you want to create a new product?')){
            try{
                await createProduct();
                refetch()
                toast.success('Product Created!')
            }catch(err){
                toast.error(err?.data?.message || err.error);
            }
        }
    }

  return (
    <>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-end'>
                <Button className='btn-sm m-3' onClick={createProductHandler}>
                    <FaEdit /> Create Product
                </Button>
            </Col>
        </Row>

        { loadingCreate && <Loader />}
        { loadingDelete && <Loader /> }
       { isLoading ? <Loader /> : error ? <Message variant ='danger'>
        {error}
       </Message> : (
        <>
            <Table striped hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.products.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <Link to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm mx-2'>
                                        <FaEdit />
                                    </Button>
                                </Link>
                                <Button vairant='danger' 
                                    className='btnn-sm' 
                                    onClick={ ()=> deleteHandler(product._id) }>
                                        <FaTrash />
                                    </Button>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </Table>
            <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
       )}

    </>
  )
}

export default ProductListScreen