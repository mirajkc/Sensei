import { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";
import toast from 'react-hot-toast'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_SECRET_URL;
const AppContext = createContext();

export const AppContextContainer = ({ children }) => {

  //* all user useState 
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [cartItemsDetails, setCartItemsDetails] = useState({
  cartItems: [],
  totalCartAmount: 0,
  totalCartItems: 0,
  discountedAmount: 0
  });


  //* all seller useState 
  const [sellerLoggedIn , setIsSellerLoggedIn]  = useState(false)
  const [sellerDetails ,  setSellerDetails] = useState(null)

  //* all admin details 
  const [  isAdmin , setIsAdmin  ] = useState(false)
  const [adminData , setAdminData ] = useState([])

  //* loading state
  const [loading, setLoading] = useState(false)


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
        setSellerDetails(data.seller);
        
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

  //* add to cart
const addCartItem = async (courseId) => {
  try {
    setLoading(true);
    const { data } = await axios.post(`/api/cart/addtocart/${courseId}`);
    if (data.success) {
      toast.success(data.message);
      getCartDetails();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};

//* buy now
const buyNow = async( courseId ) => {
    try {
    setLoading(true);
    const { data } = await axios.post(`/api/cart/addtocart/${courseId}`);
    if (data.success) {
      getCartDetails();
    } else {
      console.log(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
} 

//* remove from cart
const removeCartItem = async (courseId) => {
  try {
    setLoading(true);
    const { data } = await axios.delete(`/api/cart/removefromcart/${courseId}`);
    if (data.success) {
      toast.success(data.message);
      getCartDetails();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};


  //* get cart details
  const getCartDetails = async() => {
    try {
      const {data} = await axios.get('/api/cart/getCartDetails')
      if(data.success){
        setCartItemsDetails(data)
      }else{
        console.log(data.message);  
      }
      
    } catch (error) {
      console.log(data.message);
    }
  }

  //* all useEffect call on default page reload 
  useEffect(() => {
    authenticateUser();
    authenticateSeller();
    authenticateAdmin()
    getCartDetails()
  }, []);

  const value = { theme, setTheme, loggedIn, setIsLoggedIn, userDetails , sellerLoggedIn ,setIsSellerLoggedIn
    ,sellerDetails,isAdmin , adminData ,loading, cartItemsDetails ,addCartItem,removeCartItem,getCartDetails ,  
    buyNow , authenticateSeller , authenticateUser
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);
export default useAppContext;
