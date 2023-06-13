
import './App.css';
import CreatePost from './components/CreatePost/CreatePost';
import Home from './components/Home/Home';
import Manufacturer from './components/Manufacturer/Manufacturer';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Transporter from './components/Transporter/Transporter';
import Details from './components/details/Details';
import Details2 from './components/details/Details2';
import Login from './components/login-register/Login';
import Register from './components/login-register/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/create" element={<PrivateRoute Child={Manufacturer}/>} />
          <Route path="/transporter" element={<PrivateRoute Child={Transporter}/>} />
          <Route path="/manufacture" element={<PrivateRoute Child={Home}/>} />
          <Route path="/details/:id" element={<PrivateRoute Child={Details}/>} />
          <Route path="/details2/:id" element={<PrivateRoute Child={Details2}/>} />
          {/* <Route path="/create" element={<PrivateRoute Child={CreatePost}/>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
