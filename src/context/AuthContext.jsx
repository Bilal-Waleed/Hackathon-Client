import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthcontextProvider = ({children}) => {
  const [User, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = cookies.get('token');
    const fetchUser = async () => {
      try {
        if (token) {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null); 
      }finally{
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{User, setUser, isLoading}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthcontextProvider;