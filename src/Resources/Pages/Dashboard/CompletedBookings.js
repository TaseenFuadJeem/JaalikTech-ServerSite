import React from 'react';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

const CompletedBookings = () => {

    // Fetching data from database for showing all completed appointments
    const { data: completedBookings, isLoading } = useQuery("completedBookings", () => fetch("http://localhost:5000/completed-appointments")
        .then(res => res.json())
    );

    if (isLoading) {
        Swal.fire({
            title: 'Connecting to the server',
            html: 'Please wait...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });
    } else { Swal.close() }

    return (
        <div className='bg-white mx-4 mb-4 p-4 rounded-md'>

            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-semibold'>Manage All Completed Appointments</h1>
                <h1 className='text-lg font-semibold'>Total Completed Appointments: {completedBookings?.length}</h1>
            </div>

            <div className='mt-5'>
                <div className="overflow-x-auto border rounded-lg">
                    <table className="table table-compact w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Country</th>
                                <th>Phone Num</th>
                                <th>Appointment Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {
                            completedBookings?.map((booking, index) =>

                                <tbody>
                                    <tr>
                                        <th>{index + 1}</th>
                                        <td>{booking?.name}</td>
                                        <td>{booking?.email}</td>
                                        <td>{booking?.country}</td>
                                        <td>{booking?.phone}</td>
                                        <td>{booking?.date}</td>
                                        <td><button className="btn btn-xs btn-success capitalize text-white">{booking?.status}</button></td>
                                    </tr>
                                </tbody>

                            )
                        }
                        {/*  */}
                    </table>
                </div>
            </div>

        </div>
    );
};

export default CompletedBookings;