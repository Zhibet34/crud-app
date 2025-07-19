import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { useState } from 'react';
import { FiUser, FiMenu, FiX } from 'react-icons/fi';
import Home from '../pages/Home'
import Login from '../pages/Login';
import Form from '../pages/Form';
import View from '../pages/View';
import {
   NavigationMenu,
   NavigationMenuList,
   NavigationMenuItem,
   NavigationMenuLink
  } from "@/components/ui/navigation-menu"


function Navbar(){
    const [isMenuOpen, SetIsMenuOpen] = useState(false)
    const handleViewClick = ()=>{
        SetIsMenuOpen(false);
        setTimeout(() => {
            console.log('the window reloaded')
            window.location.reload(); // Then reload after a tiny delay
        });
    }
    return(
        <BrowserRouter>
            <header  className="bg-teal-500 text-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className='flex items-center gap-4'>
                            <button className='md:hidden text-gray-300 hover:text-white focus:outline-none'
                            onClick={()=> SetIsMenuOpen(!isMenuOpen)}
                            aria-label='Toggle menu'>
                                {isMenuOpen ? <FiX size={30}/>: <FiMenu size={30}/>}
                            </button>
                            <Link to='/' className='flex items-center gap-2 '>
                                <span className='text-xl front-bold capitalize italic'>d.n.i</span>
                            </Link>
                        </div>
                        <NavigationMenu className="hidden md:block">
                            <NavigationMenuList className='gap-2'>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to='/' 
                                        className='text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-lg italic font-medium'>
                                            Home
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to='view' 
                                        className='text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md italic text-lg font-medium'>
                                            View
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to='/login' 
                                        className='text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-lg italic font-medium'>
                                            Login
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to='/form' 
                                        className='text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md italic text-lg font-medium'>
                                            Form
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                        <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                            <FiUser size={30} className="text-gray-300 hover:text-white" />
                        </button>
                    </div>
                    {isMenuOpen && (
                        <NavigationMenu className='md:hidden mt-4 pb-4'>
                            <NavigationMenuList className="flex flex-col gap-1">
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to='/'
                                        className='block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                                        onClick={()=>SetIsMenuOpen(false)}>
                                            Home
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to='/view'
                                        className='block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                                        onClick={handleViewClick}>
                                            View
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to='/login'
                                        className='block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                                        onClick={()=>SetIsMenuOpen(false)}>
                                           Login
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to='/form'
                                        className='block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                                        onClick={()=>SetIsMenuOpen(false)}>
                                            Form
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
                    <Route path='/' element={<Home/>}/>
                    <Route path="/view" element={<View />}/>
                    <Route path='view/:id' element={<View/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='form' element={<Form/>}/>
                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default Navbar;