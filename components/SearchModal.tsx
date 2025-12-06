import React, { useState } from 'react';

interface SearchModalProps {
  onClose: () => void;
  onSearch: (filters: { location: string; checkIn: string; checkOut: string; guests: number }) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose, onSearch }) => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ location, checkIn, checkOut, guests });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-32" onClick={onClose}>
      <div className="bg-white w-full max-w-3xl rounded-3xl p-6 shadow-2xl animate-fade-in-down" onClick={e => e.stopPropagation()}>
        <div className="flex items-center bg-gray-100 rounded-full border border-gray-200">
          <div className="flex-1 px-6 py-3 hover:bg-gray-200 rounded-full transition cursor-pointer relative group">
            <label className="block text-xs font-bold text-gray-800">Where</label>
            <input 
              type="text" 
              placeholder="Search destinations" 
              className="bg-transparent outline-none text-sm text-gray-600 w-full placeholder-gray-400"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              autoFocus
            />
          </div>
          <div className="w-px h-8 bg-gray-300"></div>
          <div className="flex-1 px-6 py-3 hover:bg-gray-200 rounded-full transition cursor-pointer">
            <label className="block text-xs font-bold text-gray-800">Check-in</label>
            <input 
                type="date"
                className="bg-transparent outline-none text-sm text-gray-600 w-full"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="w-px h-8 bg-gray-300"></div>
          <div className="flex-1 px-6 py-3 hover:bg-gray-200 rounded-full transition cursor-pointer">
            <label className="block text-xs font-bold text-gray-800">Check-out</label>
            <input 
                type="date"
                className="bg-transparent outline-none text-sm text-gray-600 w-full"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div className="w-px h-8 bg-gray-300"></div>
          <div className="flex-1 pl-6 pr-2 py-2 hover:bg-gray-200 rounded-full transition cursor-pointer flex items-center">
            <div className="flex-1">
                 <label className="block text-xs font-bold text-gray-800">Who</label>
                 <select 
                    value={guests} 
                    onChange={e => setGuests(Number(e.target.value))}
                    className="bg-transparent outline-none text-sm text-gray-600 w-full appearance-none"
                 >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4+ Guests</option>
                 </select>
            </div>
            <button 
                onClick={handleSubmit}
                className="bg-rose-500 hover:bg-rose-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition transform active:scale-95"
            >
                <i className="fa-solid fa-magnifying-glass text-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
