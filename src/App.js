import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Resources/Pages/Login';

function App() {
  return (
    <section className='h-screen bg-image bg-no-repeat bg-cover bg-center bg-fixed'>

      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>

    </section>
  );
}

export default App;
