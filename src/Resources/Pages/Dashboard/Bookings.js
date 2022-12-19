import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../All-Components/Common/Loading';

const Bookings = () => {

    // Fetching data from database for showing all bookings
    const { data: bookings, isLoading } = useQuery("AllBookingList", () => fetch("http://localhost:5000/all-bookings")
        .then(res => res.json())
    );

    // Loading for database
    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='bg-white mx-4 mb-4 p-4 rounded-md'>
            <h1 className='text-2xl font-semibold'>Manage All Appointments</h1>

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
                            bookings?.map((booking, index) =>

                                <tbody>
                                    <tr>
                                        <th>{index + 1}</th>
                                        <td>{booking?.name}</td>
                                        <td>{booking?.email}</td>
                                        <td>{booking?.country}</td>
                                        <td>{booking?.phone}</td>
                                        <td>{booking?.date}</td>
                                        <td><button className="btn btn-xs btn-warning capitalize text-white">{booking?.status}</button></td>
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

export default Bookings;