import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import PropertyCard from './components/PropertyCard';
import PropertyDetails from './components/PropertyDetails';
import SearchModal from './components/SearchModal';
import { MOCK_PROPERTIES, AMENITIES_LIST } from './constants';
import { Property, Booking } from './types';

function App() {
  const [view, setView] = useState<'home' | 'bookings'>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  // Filters
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter(p => {
      // Category Filter
      if (activeCategory !== 'All' && p.type !== activeCategory && activeCategory !== 'Trending') {
         if (activeCategory === 'Trending' && p.rating < 4.9) return false;
         if (activeCategory !== 'Trending') return false;
      }

      // Location Search
      if (searchFilters.location) {
        const loc = searchFilters.location.toLowerCase();
        if (!p.city.toLowerCase().includes(loc) && !p.location.toLowerCase().includes(loc)) {
          return false;
        }
      }

      // Guest Capacity
      if (p.details.guests < searchFilters.guests) {
        return false;
      }

      return true;
    });
  }, [searchFilters, activeCategory]);

  const handleBook = (property: Property, checkIn: string, checkOut: string, guests: number, totalPrice: number) => {
    const newBooking: Booking = {
      id: Date.now().toString(),
      propertyId: property.id,
      propertyTitle: property.title,
      propertyImage: property.images[0],
      checkIn,
      checkOut,
      guests,
      totalPrice,
      status: 'confirmed',
      dateBooked: new Date().toISOString()
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const categories = ['All', 'Entire home', 'Cabin', 'Villa', 'Treehouse', 'Trending'];

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onNavigate={setView} 
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-8 max-w-[1600px] mx-auto">
        
        {view === 'home' && (
          <>
            {/* Categories / Filters Bar */}
            <div className="flex items-center gap-8 overflow-x-auto pb-4 mb-6 scrollbar-hide">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex flex-col items-center gap-2 min-w-[64px] cursor-pointer group ${activeCategory === cat ? 'text-black' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  <div className={`text-2xl ${activeCategory === cat ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                    {cat === 'All' && <i className="fa-solid fa-border-all"></i>}
                    {cat === 'Entire home' && <i className="fa-solid fa-house"></i>}
                    {cat === 'Cabin' && <i className="fa-solid fa-tree"></i>}
                    {cat === 'Villa' && <i className="fa-solid fa-water-ladder"></i>}
                    {cat === 'Treehouse' && <i className="fa-brands fa-pagelines"></i>}
                    {cat === 'Trending' && <i className="fa-solid fa-fire"></i>}
                  </div>
                  <span className={`text-xs font-semibold whitespace-nowrap pb-2 border-b-2 ${activeCategory === cat ? 'border-black' : 'border-transparent group-hover:border-gray-300'}`}>
                    {cat}
                  </span>
                </button>
              ))}
            </div>

            {/* Listings Grid */}
            {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredProperties.map(property => (
                    <PropertyCard 
                    key={property.id} 
                    property={property} 
                    onClick={setSelectedProperty} 
                    />
                ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <div className="text-gray-400 text-6xl mb-4">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">No matches found</h3>
                    <p className="text-gray-500">Try adjusting your search for a broader area.</p>
                    <button 
                        onClick={() => {
                            setSearchFilters({location: '', checkIn: '', checkOut: '', guests: 1});
                            setActiveCategory('All');
                        }}
                        className="mt-4 text-rose-500 font-semibold underline"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
          </>
        )}

        {view === 'bookings' && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">My Trips</h1>
            {bookings.length === 0 ? (
              <div className="border border-dashed border-gray-300 rounded-xl p-12 text-center">
                <p className="text-gray-500 mb-4">No trips booked... yet!</p>
                <button 
                  onClick={() => setView('home')}
                  className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Start exploring
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map(booking => (
                  <div key={booking.id} className="flex flex-col md:flex-row gap-6 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white">
                    <div className="w-full md:w-48 h-32 flex-shrink-0">
                      <img src={booking.propertyImage} className="w-full h-full object-cover rounded-lg" alt="" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-xl mb-1">{booking.propertyTitle}</h3>
                            <p className="text-gray-500 text-sm mb-2">Booking ID: {booking.id}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                            {booking.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                        <div>
                            <span className="block text-gray-500">Check-in</span>
                            <span className="font-semibold">{booking.checkIn}</span>
                        </div>
                        <div>
                            <span className="block text-gray-500">Checkout</span>
                            <span className="font-semibold">{booking.checkOut}</span>
                        </div>
                        <div>
                            <span className="block text-gray-500">Guests</span>
                            <span className="font-semibold">{booking.guests}</span>
                        </div>
                        <div>
                            <span className="block text-gray-500">Total</span>
                            <span className="font-semibold">${booking.totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Modals */}
      {selectedProperty && (
        <PropertyDetails 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)}
          onBook={handleBook}
        />
      )}

      {isSearchOpen && (
        <SearchModal 
          onClose={() => setIsSearchOpen(false)} 
          onSearch={(filters) => {
            setSearchFilters(filters);
            setView('home');
          }} 
        />
      )}
    </div>
  );
}

export default App;
