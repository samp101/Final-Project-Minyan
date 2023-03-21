import logo from './logo.svg';
import {useState, createContext} from 'react' 
import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginRegister from './components/LoginRegister'
import MainPage from './components/MainPage'
import UserSearch from './components/UserSearch'
// import ShulRegister from './components/ShulRegister';
import RegisterShul from './components/RegisterShul';
import TempShul from './components/TempShul';
import Login from './components/Login'
import UserPage from './components/UserPage'
import {Auth} from './auth/Auth'


export const AppContext = createContext(null)
function App() {
  const [shuls,setShuls] = useState([])
  const [favShuls,setFavShuls] = useState([])
  const [accessToken,setAccessToken] = useState()
  const [token,setToken] = useState({})
  return (
    <div className="App">
    
      <AppContext.Provider value={{shuls,setShuls,
                                  accessToken,setAccessToken,
                                  token,setToken,
                                  favShuls,setFavShuls}}>
        <Navbar/>
        <Routes>
          <Route path='/' element={<MainPage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register-user' element={<LoginRegister title={'Register'}/>}></Route>
          <Route path='/register-shul' element={<RegisterShul /> }></Route>
          <Route path='/temp-register-shul' element={<TempShul /> }></Route>
          <Route path='/search/:shulname' element={<UserSearch/>}></Route>
          <Route path='/userdashboard/:name' element={<UserPage />}></Route>
         </Routes>
      </AppContext.Provider>
        
    </div>
  );
}

export default App;
