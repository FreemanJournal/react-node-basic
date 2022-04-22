import React from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
export default function Authorization({ signIn }) {


    const onSubmitHandler = (event) => {
        event.preventDefault();
        const name = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const user = { name, email, password }
        //send data to database
        fetch('http://localhost:5000/user', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                toast.info(`${data.name} saved successfully in server`)
                event.target.reset();
            })

    }


    return (
        <div className='w-96 md:w-4/12 mx-auto mt-16'>

            <ToastContainer />
            <div className="text-center">
                <h2 className='text-4xl text-slate-600 font-semibold'>{signIn ? 'Welcome Back' : 'Welcome to Gerald Blog'}</h2>
                {/* <Link to={signIn ? '/signUp' : '/signIn'} className='my-3 block text-emerald-500'>{signIn ? 'Need an account?' : 'Have an account?'}</Link> */}
            </div>
            <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className=" flex flex-col gap-5">
                    {!signIn && <div>
                        <label htmlFor="username" className="sr-only">
                            Name
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                            placeholder="Username"
                        />
                    </div>}
                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                        />
                    </div>

                </div>
                {/* <p>{errorMessage}</p> */}
                <div>
                    <button
                        type="submit"
                        className="w-24 group relative flex justify-center ml-auto py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-400 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                        {signIn ? 'Sign In' : 'Sign Up'}
                    </button>
                </div>
            </form>
            <div className="">
                <Link to='/' className='py-2 px-4 w-52  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md'>Home</Link>
            </div>

        </div>
    )
}
