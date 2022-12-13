import { Route, Routes } from 'react-router-dom';
import './App.css';
import Bookings from './Resources/Pages/Dashboard/Bookings';
import Dashboard from './Resources/Pages/Dashboard/Dashboard';
import Login from './Resources/Pages/Login';

function App() {
  return (
    <section className='h-screen bg-image bg-no-repeat bg-cover bg-center bg-fixed'>

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<Bookings />} />
          <Route path='manage-articles-and-blogs' element={<Bookings />} />
        </Route>
      </Routes>

    </section>
  );
}

export default App;
