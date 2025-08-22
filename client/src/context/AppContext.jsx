import { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_SECRET_URL;

const AppContext = createContext();

export const AppContextContainer = ({ children }) => {

  //* all user useState 
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  //* all seller useState
  const [sellerLoggedIn , setIsSellerLoggedIn]  = useState(false)
  const [sellerDetails ,  setSellerDetails] = useState(null)

  //* all admin details 
  const [  isAdmin , setIsAdmin  ] = useState(false)
  const [adminData , setAdminData ] = useState([])


  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
 
  //* theme effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  //* authenticate user
  const authenticateUser = async () => {
    try {
      const { data } = await axios.get('/api/user/verifyUser');
      if (data.success) {
        setIsLoggedIn(true);
        setUserDetails(data.user);
      } else {
        setIsLoggedIn(false);
        console.log(data.message);
      }
    } catch (error) {
      setIsLoggedIn(false);
      console.log(error.message);
    } 
  };

  //*authenticate seller 
  const authenticateSeller = async() =>{
    try {
      const {data} = await axios.get('/api/seller/authseller')
      if (data.success) {
        setIsSellerLoggedIn(true);
        setSellerDetails(data.user);
        
      } else {
        setIsLoggedIn(false);
        console.log(data.message);
      }
    } catch (error) {
      setIsSellerLoggedIn(false);
      console.log(error.message);
    } 
  }

  //* authenticate admin 
  const authenticateAdmin = async() =>{
    try {
      const {data} = await axios.get('/api/admin/verifyadmin')
      if(!data.success){
        console.log(data.message);
        setIsAdmin(false)
      }else{
        setIsAdmin(true)
      }
      setAdminData(data.admin)
    } catch (error) {
       console.log(error.message);
    }
  }
  
  useEffect(() => {
    authenticateUser();
    authenticateSeller();
    authenticateAdmin()
  }, []);

  const value = { theme, setTheme, loggedIn, setIsLoggedIn, userDetails , sellerLoggedIn ,setIsSellerLoggedIn
    ,sellerDetails,isAdmin , adminData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);
export default useAppContext;
