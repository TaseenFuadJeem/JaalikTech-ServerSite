import { signOut } from 'firebase/auth';
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import auth from '../../All-Components/Others/firebase.init';
import logo from '../../Assets/Icons/JaalikTech SVG logo horizon.svg';

const Dashboard = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

        Swal.fire({
            title: `Are you sure for logout?`,
            showCancelButton: true,
            icon: 'warning',
            confirmButtonText: 'Logout',
            denyButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('accessToken');
                signOut(auth);
                navigate("/");
                Swal.fire('Logout Successful', '', 'success')
            };
        })

    }

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col pt-28">
                {/* <!-- Navbar --> */}
                <div className="w-full navbar bg-white fixed top-0 z-50">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2"><img className='w-40' src={logo} alt="" /></div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal">
                            {/* <!-- Navbar menu content here --> */}
                            <li tabIndex={0}>
                                <span>
                                    Appointments
                                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                                </span>
                                <ul className="p-2 bg-gray-100">
                                    <li className='my-2 text-sm'><NavLink to="/dashboard/">All Bookings</NavLink></li>
                                    <li className='my-2 text-sm'><NavLink to="/dashboard/pending-appointments">Pending Bookings</NavLink></li>
                                    <li className='my-2 text-sm'><NavLink to="/dashboard/completed-appointments">Completed Bookings</NavLink></li>
                                </ul>
                            </li>
                            <li className='my-2'><NavLink to="/dashboard/manage-articles-and-blogs">Articles and Blogs</NavLink></li>
                        </ul>
                        <button onClick={() => handleLogout()} className="btn btn-primary text-white mx-2">Log out</button>
                    </div>
                </div>
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100">
                    {/* <!-- Sidebar content here --> */}
                    <li tabIndex={0}>
                        <span>
                            Appointments
                            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                        </span>
                        <ul className="p-2 bg-gray-100">
                            <li className='my-2 text-sm'><NavLink to="/dashboard/">All Bookings</NavLink></li>
                            <li className='my-2 text-sm'><NavLink to="/dashboard/pending-appointments">Pending Bookings</NavLink></li>
                            <li className='my-2 text-sm'><NavLink to="/dashboard/completed-appointments">Completed Bookings</NavLink></li>
                        </ul>
                    </li>
                    <li className='my-2'><NavLink to="/dashboard/manage-articles-and-blogs">Articles and Blogs</NavLink></li>

                </ul>

            </div>
        </div>
    );
};

export default Dashboard;