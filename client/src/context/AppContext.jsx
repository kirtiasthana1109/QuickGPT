
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

// Backend URL (set in .env: VITE_SERVER_URL)
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Fetch logged-in user
  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user/data', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUser(data.user);
      } else {
        toast.error(data.message || 'Failed to load user');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to load user');
    } finally {
      setLoadingUser(false);
    }
  };

  const fetchUsersChats = async () => {
    try {
      const { data } = await axios.get('/api/chat/get', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setChats(data.chats);

        if (data.chats.length === 0) {
          await createNewChat();
          return fetchUsersChats();
        } else {
          setSelectedChat(data.chats[0]);
        }
      } else {
        toast.error(data.message || 'Failed to load chats');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to load chats');
    }
  };

  const createNewChat = async () => {
    try {
      if (!user) return toast('Login to create a new chat');
      navigate('/');
      await axios.get('/api/chat/create', {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchUsersChats();
    } catch (error) {
      toast.error(error.message || 'Failed to create chat');
    }
  };

  // Theme handling
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // When user changes, load chats or reset
  useEffect(() => {
    if (user) {
      fetchUsersChats();
    } else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [user]);

  // When token changes, fetch user or reset state
  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser(null);
      setLoadingUser(false);
    }
  }, [token]);

  const value = {
    navigate,
    user,
    setUser,
    fetchUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    theme,
    setTheme,
    createNewChat,
    loadingUser,
    token,
    setToken,
    fetchUsersChats,
    axios,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// hook
export const useAppContext = () => useContext(AppContext);
