import React from 'react';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import PendingBookingsRow from './PendingBookingsRow';

const PendingBookings = () => {

    // Fetching data from database for showing all pending appointments
    const { data: pendingBookings, isLoading, refetch } = useQuery("pendingBookings", () => fetch("http://localhost:5000/pending-appointments")
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
                <h1 className='text-2xl font-semibold'>Manage All Pending Appointments</h1>
                <h1 className='text-lg font-semibold'>Total Pending Appointments: {pendingBookings?.length}</h1>
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
                            pendingBookings?.map((booking, index) =>

                                <PendingBookingsRow key={booking?._id} booking={booking} index={index} refetch={refetch} />

                            )
                        }
                        {/*  */}
                    </table>
                </div>
            </div>

        </div>
    );
};

export default PendingBookings;