import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../All-Components/Others/firebase.init';

const Home = () => {

    const [user] = useAuthState(auth);

    return (
        <div className="hero min-h-screen">
            <div className="hero-overlay bg-opacity-50"></div>
            <div className="hero-content text-center text-neutral-content">
                <div>
                    <h1 className="mb-5 text-5xl text-white font-bold">Welcome to JaalikTech.com Control Panel</h1>
                    <p className="mb-5 text-white">This website is intended just for JaalikTech's website. Please click the link below to gain access to the dashboard.</p>
                    {
                        user ?
                            <Link to="/dashboard" className="btn btn-primary text-white">Go to dashboard</Link>
                            :
                            <Link to="/login" className="btn btn-primary text-white">Go to dashboard</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;