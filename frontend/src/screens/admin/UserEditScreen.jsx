import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { toast } from 'react-toastify'
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../slices/usersApiSlice'

const UserEditScreen = () => {
    const { id:userId } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const {data:user , isLoading, refetch, error} = useGetUserDetailsQuery(userId);

    const [updateUser, {isLoading:loadingUpdate}] = useUpdateUserMutation(userId);
    const navigate = useNavigate();

    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    },[user])

    const submitHandler= async (e) =>{
        e.preventDefault();
        console.log(name,email,isAdmin);
        try {
            await updateUser({ userId,name,email,isAdmin })
            toast.success('User updated successfully')
            refetch();
            navigate('/admin/userlist');
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
        console.log('submit');

    }

  return (
    <>
    <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
    </Link>
    <FormContainer>
        <h1>Edit Product</h1>
        { loadingUpdate && <Loader />}
        {isLoading ? <Loader /> : error 
        ? <Message variant='danger'>{error?.data?.message || error.message || 'Something Went Wrong!'}</Message>
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
        <Form.Group controlId='email' className='my-2'>
            <Form.Label>Enter Email</Form.Label>
            <Form.Control
                type='email'
                placeholder='Enter Price'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            >
            </Form.Control>
        </Form.Group> 
        <Form.Group controlId='isAdmin'>
            <Form.Label>isAdmin</Form.Label>
            <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e)=>setIsAdmin(e.target.checked)}
            >
        </Form.Check>
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

export default UserEditScreen