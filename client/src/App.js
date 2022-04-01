import './App.css';
import { Route, Routes } from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import MainPage from './components/pages/homePage/MainPage';
import Register from './components/pages/userPage/Register';
import Login from './components/pages/userPage/LoginPage';
import Admin from './components/pages/admin/admin';
import NewProduct from './components/pages/productsPage/NewProduct';
import ModifyProduct from './components/pages/productsPage/ModifyProduct';
import DeleteProduct from './components/pages/productsPage/DeleteProduct';
import ListProduct from './components/pages/productsPage/ListProduct';
import NewLesson from './components/pages/lessonsPage/NewLesson';
import ModifyLesson from './components/pages/lessonsPage/ModifyLesson';
import DeleteLesson from './components/pages/lessonsPage/DeleteLesson';
import ListLesson from './components/pages/lessonsPage/ListLesson';
import NewTeacher from './components/pages/teachersPage/NewTeacher'
import ModifyTeacher from './components/pages/teachersPage/ModifyTeacher';
import DeleteTeacher from './components/pages/teachersPage/DeleteTeacher';
import ListTeacher from './components/pages/teachersPage/ListTeacher';
import ListUser from './components/pages/userPage/ListUser';
import DeleteUser from './components/pages/userPage/deleteUser';
import NewReserve from './components/pages/ReservePages/NewReserve';


function App() {
  return (
    <div className="App">
      
      <Routes>  
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<MainPage />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/newProduct' element={<NewProduct />} />
        <Route path='/modifyProduct' element={<ModifyProduct />} />
        <Route path='/deleteProduct' element={<DeleteProduct />} />
        <Route path='/listProduct' element={<ListProduct />} />
        <Route path='/newLesson' element={<NewLesson />} />
        <Route path='/modifyLesson' element={<ModifyLesson />} />
        <Route path='/deleteLesson' element={<DeleteLesson />} />
        <Route path='/listLesson' element={<ListLesson />} />
        <Route path='/newTeacher' element={<NewTeacher />} />
        <Route path='/modifyTeacher' element={<ModifyTeacher />} />
        <Route path='/deleteTeacher' element={<DeleteTeacher />} />
        <Route path='/listTeacher' element={<ListTeacher />} />
        <Route path='/listUser' element={<ListUser />} />
        <Route path='/deleteUser' element={<DeleteUser />} />
        <Route path='/newReserve' element={<NewReserve />} />
      </Routes>
         
     
    </div>
  );
}

export default App;
