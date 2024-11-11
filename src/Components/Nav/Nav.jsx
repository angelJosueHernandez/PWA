import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { FiMenu } from 'react-icons/fi';
import { IoCloseSharp } from 'react-icons/io5';
import { useAuth } from '../Contexts/AuthContexts';
import { navLinks, authLinks } from '../../Data/Data';
import { LuLogOut } from 'react-icons/lu';
import { FaUserCircle } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { Avatar, Badge, Space, message } from 'antd';
import './Nav.css';
import {
  IconButton,
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Card,
} from '@material-tailwind/react';
import avatar from '@material-tailwind/react';
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from '@heroicons/react/24/solid';
import Cookies from 'js-cookie';

const profileMenuItems = [
  { label: 'Mi Perfil', icon: UserCircleIcon, path: 'Perfil' },
  { label: 'Ayuda', icon: LifebuoyIcon, path: 'Conocenos' },
];

export default function Nav() {
  const [isNavLinksShowing, setIsNavLinksShowing] = useState(false);
  const {
    setIsAuthenticated,
    isAuthenticated,
    setCorreoCookieUser,
    setIdCookieUser,
    setNombreCookieUser,
  } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [avatarColor, setAvatarColor] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Referencia al menú

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    localStorage.setItem('Autentificado', 'false');
    message.loading('Cerrando Sesión', 1.5).then(() => {
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setIsAuthenticated(false);
      navigate('/Iniciar Sesion');
    });
  };

  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchData = () => {
      const token = Cookies.get('jwt');
      if (token) {
        try {
          fetch('https://api-beta-mocha-59.vercel.app/verifyToken', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
            credentials: 'include',
          })
            .then((response) => response.json())
            .then((result) => {
              if (result.mensaje === 'Token válido') {
                const decodedToken = jwtDecode(token);
                setIsAuthenticated(decodedToken.IsAuthenticated);
                setUserName(decodedToken.nombre);
                setCorreoCookieUser(decodedToken.correo);
                setIdCookieUser(decodedToken.id);
                setNombreCookieUser(decodedToken.nombre);

                const storedColor = localStorage.getItem('avatarColor');
                const color = storedColor ? storedColor : getRandomColor();
                setAvatarColor(color);
                localStorage.setItem('avatarColor', color);
              } else {
                setIsAuthenticated(false);
              }
            })
            .catch((error) => {
              console.error('Error al verificar el token:', error);
              setIsAuthenticated(false);
            });
        } catch (error) {
          console.error('Error al decodificar el token JWT:', error);
          setIsAuthenticated(false);
        }
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000); // 5 minutos

    return () => clearInterval(interval);
  }, [setIsAuthenticated]);

  // Cerrar el menú automáticamente cuando se hace clic fuera de él en modo responsivo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isNavLinksShowing && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsNavLinksShowing(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNavLinksShowing]);

  const getRandomColor2 = () => {
    const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
    const randomIndex = Math.floor(Math.random() * colorList.length);
    return colorList[randomIndex];
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    let isDark = true;

    while (isDark) {
      color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }

      const r = parseInt(color.substring(1, 3), 16);
      const g = parseInt(color.substring(3, 5), 16);
      const b = parseInt(color.substring(5, 7), 16);

      // Calculate the luminance of the color
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

      // Check if the color is bright enough
      if (luminance > 128) {
        isDark = false;
      }
    }

    return color;
  };

  return (
    <nav className="navShadow">
      <div className="container nav-container" ref={menuRef}>
        <Link to={'/'} className="logo">
          <img src={Logo} alt="Logo" />
        </Link>
        <ul
          className={`nav-links ${isNavLinksShowing ? 'navLinksShow' : 'navLinksHide'}`}
        >
          {navLinks.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setIsNavLinksShowing(false)} // Cierra el menú al hacer clic en una opción
              >
                <item.icon className="icon-navs" />
                <span className="name-navs">{item.name}</span>
              </NavLink>
            </li>
          ))}
          {isAuthenticated ? (
            <>
              <li>
                <div className="MenuDes">
                  <Menu
                    open={isMenuOpen}
                    handler={setIsMenuOpen}
                    placement="bottom-end"
                  >
                    <MenuHandler>
                      <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto menuUser"
                      >
                        <Avatar
                          variant="circular"
                          size="sm"
                          alt={userName}
                          className="border border-white-900 p-0.5"
                          style={{
                            backgroundColor: avatarColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '20px',
                              color: 'white',
                              marginLeft: '-10px',
                            }}
                          >
                            {userName && userName.charAt(0).toUpperCase()}
                          </span>
                        </Avatar>
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          className={`h-3 w-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                        />
                      </Button>
                    </MenuHandler>
                    <MenuList className="p-1 menuUser">
                      {profileMenuItems.map(({ label, icon, path }, key) => (
                        <NavLink to={path} key={label} onClick={closeMenu}>
                          <MenuItem className="flex items-center gap-2 rounded menu-item hover:bg-gray-500/10 focus:bg-gray-500/10 active:bg-gray-500/10">
                            {React.createElement(icon, {
                              className: 'h-5 w-5 md:h-6 md:w-6 lg:h-6 lg:w-6 colorM',
                              strokeWidth: 2,
                            })}
                            <Typography
                              as="span"
                              variant="small"
                              className="font-normal colorM"
                            >
                              {label}
                            </Typography>
                          </MenuItem>
                        </NavLink>
                      ))}
                      {isAuthenticated && (
                        <MenuItem
                          onClick={() => {
                            closeMenu();
                            handleLogout();
                          }}
                          className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10 menu-item2"
                        >
                          <PowerIcon
                            className= 'h-5 w-5 md:h-6 md:w-6 lg:h-6 lg:w-6'
                            strokeWidth={2}
                            color="red"
                          />
                          <Typography
                            as="span"
                            variant="small"
                            className="font-normal "
                            color="red"
                          >
                            Cerrar Sesión
                          </Typography>
                        </MenuItem>
                      )}
                    </MenuList>
                  </Menu>
                </div>
              </li>
            </>
          ) : (
            authLinks.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <item.icon className="icon-navs" />
                  <span className="name-navs">{item.name}</span>
                </NavLink>
              </li>
            ))
          )}
        </ul>
        <button
          className="menu-button"
          onClick={() => setIsNavLinksShowing(!isNavLinksShowing)}
        >
          {!isNavLinksShowing ? <FiMenu /> : <IoCloseSharp />}
        </button>
      </div>
    </nav>
  );
}
