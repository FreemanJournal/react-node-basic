import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs'
import swal from 'sweetalert';
import { toast, ToastContainer } from 'react-toastify';

export default function Home() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUser(data))
  }, [])

  const updateHandler = (id)=>{
    navigate(`user/update/${id}`)
  }

  const deleteHandler = (id, name) => {
    swal(`Are you want to delete ${name}?`, {
      icon: "warning",
      button: "Yes",
      dangerMode: true,
    })
      .then((value) => {
        if (!value) return;
        fetch(`http://localhost:5000/user/${id}`, {
          method: "DELETE"
        })
          .then((res) => res.json())
          .then(data => {
            if (data.result.deletedCount === 1) {
              toast.success(`${name} successfully deleted.`);
              setUser(prev => prev.filter(item => item._id !== id))
            } else {
              toast.error("No user matched. Deleted 0 users.");
            }
          })
      });



  }

  return (

    <div className='flex flex-col gap-10  items-center'>
      <ToastContainer />
      <div className="container flex flex-col mx-auto w-full items-center justify-center bg-white  rounded-lg shadow">
        <ul className="flex flex-col divide divide-y">
          {
            user?.map(item => {
              const { _id, name, email } = item
              return (
                <li className="flex flex-row" key={_id}>
                  <div className="select-none cursor-pointer flex flex-1 items-center p-4">
                    <div className="flex-1 pl-1 mr-16">
                      <div className="font-medium ">
                        {name}
                      </div>
                      <div className="text-gray-600  text-sm">
                        Developer
                      </div>
                    </div>
                    <div className=" flex flex-col gap-4 justify-center items-end">
                      <div className="text-gray-600  text-xs ">
                        {email}
                      </div>
                      <div className=" flex gap-4">
                        <button onClick={() => deleteHandler(_id, name)} className='py-1 px-2  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white  transition ease-in duration-100 text-center  font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md'>Delete</button>
                        <button onClick={() => updateHandler(_id)} className='py-1 px-2  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white  transition ease-in duration-100 text-center  font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md'>Update User</button>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })
          }

        </ul>

      </div>
      <div className="">
        <Link to='/user/add' className='py-2 px-4 w-52  bg-emerald-500 hover:bg-emerald-500 focus:ring-embg-emerald-500 focus:ring-offset-pink-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md'> Add New User</Link>

      </div>
    </div>


  )
}
