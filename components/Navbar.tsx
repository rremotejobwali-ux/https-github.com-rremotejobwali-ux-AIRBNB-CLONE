import React from 'react';

interface NavbarProps {
  onNavigate: (view: string) => void;
  onSearchClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, onSearchClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer flex items-center gap-2" 
            onClick={() => onNavigate('home')}
          >
            <i className="fa-brands fa-airbnb text-rose-500 text-3xl"></i>
            <span className="text-rose-500 font-bold text-xl hidden md:block">StayNext</span>
          </div>

          {/* Search Bar - Condensed */}
          <div 
            className="hidden md:flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer py-2.5 px-4"
            onClick={onSearchClick}
          >
            <div className="px-4 border-r border-gray-300 text-sm font-semibold text-gray-900">Anywhere</div>
            <div className="px-4 border-r border-gray-300 text-sm font-semibold text-gray-900">Any week</div>
            <div className="px-4 text-sm text-gray-500">Add guests</div>
            <div className="bg-rose-500 text-white p-2 rounded-full ml-2 w-8 h-8 flex items-center justify-center">
              <i className="fa-solid fa-magnifying-glass text-xs"></i>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-full">
              Switch to hosting
            </div>
            <div className="hidden md:block cursor-pointer hover:bg-gray-100 p-2 rounded-full">
               <i className="fa-solid fa-globe text-gray-600 text-lg"></i>
            </div>
            <div 
              className="flex items-center gap-3 border border-gray-300 rounded-full p-1 pl-3 hover:shadow-md transition cursor-pointer"
              onClick={() => onNavigate('bookings')}
            >
              <i className="fa-solid fa-bars text-gray-600"></i>
              <div className="bg-gray-500 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center overflow-hidden">
                <i className="fa-solid fa-user text-xs"></i>
              </div>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
