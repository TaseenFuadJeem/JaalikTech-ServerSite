import React from 'react';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import BookingsTableRow from './BookingsTableRow';

const Bookings = () => {

    // Fetching data from database for showing all bookings
    const { data: bookings, isLoading, refetch } = useQuery("AllBookingList", () => fetch("http://localhost:5000/all-bookings")
        .then(res => res.json())
    );

    // Loading for database
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
                <h1 className='text-2xl font-semibold'>Manage All Appointments</h1>
                <h1 className='text-lg font-semibold'>Total Appointments: {bookings?.length}</h1>
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
                                <th>Appointment Date<br />(YY-MM-DD)</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {
                            bookings?.map((booking, index) =>

                                <BookingsTableRow key={booking?._id} booking={booking} index={index} refetch={refetch} />

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