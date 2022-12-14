import { Route, Routes } from 'react-router-dom';
import './App.css';
import RequireAuth from './Resources/All-Components/Component/RequireAuth';
import Articles from './Resources/Pages/Dashboard/Articles';
import Bookings from './Resources/Pages/Dashboard/Bookings';
import CompletedBookings from './Resources/Pages/Dashboard/CompletedBookings';
import Dashboard from './Resources/Pages/Dashboard/Dashboard';
import Home from './Resources/Pages/Dashboard/Home';
import PendingBookings from './Resources/Pages/Dashboard/PendingBookings';
import Login from './Resources/Pages/Login';

function App() {
  return (
    <section className='bg-image bg-no-repeat bg-cover bg-center bg-fixed'>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>}>
          <Route index element={<Bookings />} />
          <Route path='pending-appointments' element={<PendingBookings />} />
          <Route path='completed-appointments' element={<CompletedBookings />} />
          <Route path='manage-articles-and-blogs' element={<Articles />} />
        </Route>
      </Routes>

    </section>
  );
}

export default App;
