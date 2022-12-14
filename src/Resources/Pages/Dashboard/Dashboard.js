import { signOut } from 'firebase/auth';
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import auth from '../../All-Components/Others/firebase.init';

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
                signOut(auth);
                navigate("/login");
                Swal.fire('Logout Successful', '', 'success')
            };
        })

    }

    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-transparent backdrop-blur">
                {/* Page content here */}
                <div className='m-7 flex justify-between'>
                    <h1 className='text-4xl text-white font-semibold'>Dashboard</h1>
                    <button onClick={() => handleLogout()} className="btn btn-primary text-white">Log out</button>
                </div>
                <Outlet />
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    {/* Sidebar content here */}
                    <li className='my-2'><NavLink to="/dashboard/">Appointment Bookings</NavLink></li>
                    <li className='my-2'><NavLink to="/dashboard/manage-articles-and-blogs">Articles and Blogs</NavLink></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;