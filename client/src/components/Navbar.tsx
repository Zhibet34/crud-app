import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { FiUser, FiMenu, FiX } from 'react-icons/fi';
import { HiOutlineLogout } from "react-icons/hi";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Form from '../pages/Form';
import View from '../pages/View';
import Registration from '@/pages/Registration';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    // Add your logout logic here
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <header className="bg-teal-500 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className='flex items-center gap-4'>
              <button 
                className='md:hidden text-gray-300 hover:text-white focus:outline-none'
                onClick={toggleMenu}
                aria-label='Toggle menu'
              >
                {isMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
              </button>
              <Link to='/' className='flex items-center gap-2'>
                <span className='text-xl font-bold capitalize italic'>Date Night</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList className='gap-2'>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link 
                      to='/' 
                      className='text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-lg italic font-medium'
                    >
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link 
                      to='/view' 
                      className='text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md italic text-lg font-medium'
                    >
                      View
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link 
                      to='/form' 
                      className='text-gray-300 hover:bg-gray-400 hover:text-white px-3 py-2 rounded-md italic text-lg font-medium'
                    >
                      Form
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* User/Auth Button */}
            <button 
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              onClick={isLoggedIn ? handleLogout : undefined}
            >
              {isLoggedIn ? (
                <HiOutlineLogout size={30} className="text-gray-300 hover:text-white" />
              ) : (
                <Link to='/login'>
                  <FiUser size={30} className="text-gray-500 hover:text-white center" />
                </Link>
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <NavigationMenu className='md:hidden mt-4 pb-4'>
              <NavigationMenuList className="flex flex-col gap-1">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link 
                      to='/'
                      className='block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                      onClick={closeMenu}
                    >
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link 
                      to='/view'
                      className='block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                      onClick={closeMenu}
                    >
                      View
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link 
                      to='/form'
                      className='block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                      onClick={closeMenu}
                    >
                      Form
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link 
                      to='/login'
                      className='block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                      onClick={closeMenu}
                    >
                      {isLoggedIn ? 'Logout' : 'Login'}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
      </header>

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/view" element={<View />} />
          <Route path='/view/:id' element={<View />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/form' element={<Form />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default Navbar;