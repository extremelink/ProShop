import React from 'react'
import Message from '../../components/Message';
import { Button, Table } from 'react-bootstrap';
import Loader from '../../components/Loader';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDeleteUserMutation, useGetUsersQuery } from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error }=useGetUsersQuery();
  const [deleteUser , {isLoading:loadingDelete}] = useDeleteUserMutation();
  console.log(users);
    
  const deleteHandler = async(id)=>{
    if(window.confirm('are you sure you want to delete this user ?')){
        try{
            const res = await deleteUser(id);
            toast.success('User Deleted!');
            console.log(res)
            refetch();
        }catch(err){
            toast.err(err?.data?.message || err.error);
        }
    }
  }

  return (
    <>
    <h1>Users</h1>
    {loadingDelete && <Loader />}
    {isLoading ? <Loader /> : error 
    ? <Message variant='danger'>{error?.data?.message || error?.error || 'Something went wrong'}
    </Message>
    : (
      <Table striped hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
              <td>
                {user.isAdmin ? (
                    <FaCheck style={{color:'green'}} />
                    ) : (
                        <FaTimes style={{color:'red'}} />
                    )}
              </td>
              <td>
                <Link to = {`/admin/user/${user._id}/edit`}>
                  <Button variant='light' className='btn-sm'>
                      <FaEdit />
                  </Button>
                </Link>
                <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                    >
                    <FaTrash style={{color:'white'}} />
                    </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
    UserListScreen
    </>
  )
}

export default UserListScreen