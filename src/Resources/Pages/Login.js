import React, { useEffect } from 'react';
import Loading from '../All-Components/Common/Loading';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../All-Components/Others/firebase.init';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

    const { register, formState: { errors }, handleSubmit } = useForm();

    const navigate = useNavigate();

    useEffect(() => {

        if (error?.message === "Firebase: Error (auth/wrong-password).") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'You entered a wrong password',
                showConfirmButton: false,
                timer: 2000
            })
        };

        if (error?.message === "Firebase: Error (auth/invalid-email).") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Invalid Email',
                showConfirmButton: false,
                timer: 2000
            })
        };

        if (error?.message === "Firebase: Error (auth/user-not-found).") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'No user found. Please check your E-mail',
                showConfirmButton: false,
                timer: 2000
            })
        };
    }, [error?.message])

    const onSubmit = async data => {
        await signInWithEmailAndPassword(data.email, data.password);

        const email = data.email;

        fetch("http://localhost:5000/login", {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email })
        }).then(response => response.json()).then(result => {
            if (result.success) {
                localStorage.setItem('accessToken', result.accessToken);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate("/dashboard");
            }
        });
    };

    return (
        <section>

            {
                loading ?

                    <Loading />

                    :

                    <div className="hero min-h-screen">
                        <div className="hero-overlay bg-opacity-50"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div>
                                <div className='mx-auto glass p-9 rounded-xl'>

                                    <p className='text-center font-bold my-3 text-white'>ADMIN LOGIN</p>

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-white">Email</span>
                                            </label>
                                            <input type="email" placeholder="Admin Email" className="input input-bordered text-black" {...register("email", {
                                                required: {
                                                    value: true,
                                                    message: "Email is required"
                                                },
                                                pattern: {
                                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                                    message: "Provide a valid email"
                                                }
                                            })} />
                                            <label className="label">
                                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                            </label>
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-white">Password</span>
                                            </label>
                                            <input type="password" placeholder="Admin Password" className="input input-bordered text-black" {...register("password", {
                                                required: {
                                                    value: true,
                                                    message: "Password is required"
                                                },
                                                minLength: {
                                                    value: 6,
                                                    message: "Minimum 6 characters required"
                                                }
                                            })} />
                                            <label className="label">
                                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                            </label>
                                        </div>

                                        <input type="submit" value='Log in' className="btn text-white w-full mt-3" />
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
            }
        </section>
    );
};

export default Login;