import React from 'react';
import Swal from 'sweetalert2';

const PendingBookingsRow = ({ booking, index, refetch }) => {

    // Function for update the status
    const updateStatus = () => {

        const url = `http://localhost:5000/update-status/${booking?._id}`

        Swal.fire({
            title: 'Are you sure?',
            text: "This appointment will be marked as successful.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'I Understand'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(url, {
                    method: 'PUT',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ status: "Completed" })
                }).then(response => response.json()).then(result => {
                    if (result) {
                        Swal.fire(
                            'Appointment Completed',
                            'You marked this appointment successful',
                            'success'
                        );
                        refetch();
                    } else {
                        Swal.fire(
                            'Wait..',
                            'Something went wrong, Please try again letter',
                            'error'
                        );
                    };
                });
            };
        });

    };

    return (
        <tbody>
            <tr>
                <th>{index + 1}</th>
                <td>{booking?.name}</td>
                <td>{booking?.email}</td>
                <td>{booking?.country}</td>
                <td>{booking?.phone}</td>
                <td>{booking?.date}</td>
                <td>{booking?.status === "Pending" ? <button onClick={() => updateStatus()} className="btn btn-xs btn-warning capitalize text-white">{booking?.status}</button> : <button className="btn btn-xs btn-success capitalize text-white">Completed</button>}</td>
            </tr>
        </tbody>
    );
};

export default PendingBookingsRow;