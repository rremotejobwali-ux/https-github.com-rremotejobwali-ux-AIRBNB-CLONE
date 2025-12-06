import React, { useState } from 'react';
import { Property } from '../types';
import { askGeminiTravelAssistant } from '../services/geminiService';

interface PropertyDetailsProps {
  property: Property;
  onClose: () => void;
  onBook: (property: Property, checkIn: string, checkOut: string, guests: number, total: number) => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, onClose, onBook }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showAiChat, setShowAiChat] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights * property.price : 0;
  };

  const total = calculateTotal();
  const serviceFee = Math.round(total * 0.12);
  const cleaningFee = 50;
  const grandTotal = total + serviceFee + cleaningFee;

  const handleBook = () => {
    if (!checkIn || !checkOut) return;
    onBook(property, checkIn, checkOut, guests, grandTotal);
    setBookingSuccess(true);
    setTimeout(() => {
        setBookingSuccess(false);
        onClose();
    }, 2000);
  };

  const handleAskAi = async () => {
    if (!aiQuestion.trim()) return;
    setIsAiLoading(true);
    const response = await askGeminiTravelAssistant(aiQuestion, property);
    setAiResponse(response);
    setIsAiLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center z-10 max-w-7xl mx-auto w-full">
         <button 
           onClick={onClose}
           className="p-2 hover:bg-gray-100 rounded-full transition"
         >
           <i className="fa-solid fa-chevron-left text-lg"></i>
         </button>
         <div className="flex gap-4 text-sm text-gray-500">
            <span className="underline cursor-pointer hover:text-gray-800">Share</span>
            <span className="underline cursor-pointer hover:text-gray-800">Save</span>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-6">
          <i className="fa-solid fa-star text-gray-900"></i>
          <span className="font-semibold text-gray-900">{property.rating}</span>
          <span>·</span>
          <span className="underline font-semibold text-gray-900 cursor-pointer">{property.reviews} reviews</span>
          <span>·</span>
          <span className="underline font-semibold text-gray-900 cursor-pointer">{property.location}</span>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-xl overflow-hidden mb-8 h-[300px] md:h-[400px]">
          <div className="h-full">
            <img src={property.images[0]} className="w-full h-full object-cover hover:opacity-95 transition" alt="Main" />
          </div>
          <div className="hidden md:grid grid-cols-2 gap-2 h-full">
            <img src={property.images[1]} className="w-full h-full object-cover hover:opacity-95 transition" alt="2" />
            <img src={property.images[2]} className="w-full h-full object-cover hover:opacity-95 transition" alt="3" />
            <img src={property.images[3]} className="w-full h-full object-cover hover:opacity-95 transition" alt="4" />
             <div className="relative h-full">
                <img src={property.images[0]} className="w-full h-full object-cover hover:opacity-95 transition opacity-70" alt="More" />
                <button className="absolute bottom-4 right-4 bg-white text-gray-900 px-3 py-1.5 text-sm font-semibold rounded border border-gray-900 shadow-sm hover:bg-gray-100">
                    Show all photos
                </button>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Column: Details */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-center py-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold mb-1">{property.type} hosted by {property.host.name}</h2>
                <p className="text-gray-500 text-sm">
                  {property.details.guests} guests · {property.details.bedrooms} bedrooms · {property.details.beds} beds · {property.details.baths} baths
                </p>
              </div>
              <img src={property.host.avatar} alt={property.host.name} className="w-14 h-14 rounded-full object-cover border border-gray-200" />
            </div>

            <div className="py-8 border-b border-gray-200">
                <div className="flex items-start gap-4 mb-4">
                    <i className="fa-solid fa-door-open text-2xl text-gray-700 mt-1"></i>
                    <div>
                        <h3 className="font-semibold">Self check-in</h3>
                        <p className="text-gray-500 text-sm">Check yourself in with the keypad.</p>
                    </div>
                </div>
                {property.host.superhost && (
                    <div className="flex items-start gap-4 mb-4">
                        <i className="fa-solid fa-medal text-2xl text-gray-700 mt-1"></i>
                        <div>
                            <h3 className="font-semibold">{property.host.name} is a Superhost</h3>
                            <p className="text-gray-500 text-sm">Superhosts are experienced, highly rated hosts.</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="py-8 border-b border-gray-200">
                <h2 className="text-xl font-semibold mb-4">About this place</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            <div className="py-8 border-b border-gray-200">
                <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
                <div className="grid grid-cols-2 gap-4">
                    {property.amenities.map(amenity => (
                        <div key={amenity} className="flex items-center gap-3 text-gray-700">
                             <i className="fa-solid fa-check text-gray-400"></i>
                             <span>{amenity}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Gemini AI Integration */}
            <div className="py-8 mt-6 bg-rose-50 rounded-2xl p-6 border border-rose-100">
                <div className="flex items-center gap-2 mb-4">
                    <i className="fa-solid fa-robot text-rose-500 text-2xl"></i>
                    <h2 className="text-xl font-semibold text-gray-900">AI Travel Assistant</h2>
                </div>
                <p className="text-gray-600 mb-4 text-sm">Ask Gemini about the local area, activities, or specifics about this property type.</p>
                
                {!showAiChat ? (
                    <button 
                        onClick={() => setShowAiChat(true)}
                        className="bg-white border border-gray-300 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 shadow-sm transition"
                    >
                        Ask a question
                    </button>
                ) : (
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                        {aiResponse && (
                            <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-800 leading-relaxed border border-gray-100">
                                <span className="font-semibold block mb-1 text-rose-500">Gemini:</span>
                                {aiResponse}
                            </div>
                        )}
                        <div className="flex gap-2">
                            <input 
                                type="text"
                                value={aiQuestion}
                                onChange={(e) => setAiQuestion(e.target.value)}
                                placeholder="E.g., Is this location good for hiking?"
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                                onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                            />
                            <button 
                                onClick={handleAskAi}
                                disabled={isAiLoading}
                                className="bg-rose-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-rose-600 disabled:opacity-50"
                            >
                                {isAiLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-paper-plane"></i>}
                            </button>
                        </div>
                    </div>
                )}
            </div>
          </div>

          {/* Right Column: Booking Card */}
          <div className="md:col-span-1">
            <div className="sticky top-28 bg-white border border-gray-200 rounded-xl shadow-xl p-6">
              <div className="flex justify-between items-baseline mb-4">
                <div>
                   <span className="text-2xl font-bold">${property.price}</span>
                   <span className="text-gray-500"> night</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                   <i className="fa-solid fa-star text-xs"></i>
                   <span className="font-semibold">{property.rating}</span>
                   <span className="text-gray-500 underline">({property.reviews})</span>
                </div>
              </div>

              <div className="border border-gray-400 rounded-lg overflow-hidden mb-4">
                <div className="flex border-b border-gray-400">
                   <div className="flex-1 border-r border-gray-400 p-2">
                      <label className="block text-xs font-bold text-gray-700 uppercase">Check-in</label>
                      <input 
                        type="date" 
                        value={checkIn} 
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full text-sm outline-none text-gray-600 bg-transparent cursor-pointer"
                      />
                   </div>
                   <div className="flex-1 p-2">
                      <label className="block text-xs font-bold text-gray-700 uppercase">Checkout</label>
                      <input 
                        type="date" 
                        value={checkOut} 
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full text-sm outline-none text-gray-600 bg-transparent cursor-pointer"
                      />
                   </div>
                </div>
                <div className="p-2">
                   <label className="block text-xs font-bold text-gray-700 uppercase">Guests</label>
                   <select 
                     className="w-full text-sm outline-none bg-transparent cursor-pointer"
                     value={guests}
                     onChange={(e) => setGuests(Number(e.target.value))}
                   >
                     {[...Array(property.details.guests)].map((_, i) => (
                        <option key={i+1} value={i+1}>{i+1} guest{i > 0 ? 's' : ''}</option>
                     ))}
                   </select>
                </div>
              </div>

              <button 
                className="w-full bg-rose-500 text-white font-bold py-3 rounded-lg hover:bg-rose-600 active:scale-95 transition mb-4 relative overflow-hidden"
                onClick={handleBook}
              >
                {bookingSuccess ? (
                    <span className="flex items-center justify-center gap-2">
                        <i className="fa-solid fa-check"></i> Booked!
                    </span>
                ) : 'Reserve'}
              </button>
              
              {!bookingSuccess && (
                <p className="text-center text-gray-500 text-sm mb-4">You won't be charged yet</p>
              )}

              {total > 0 && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                        <span className="underline">${property.price} x {Math.round(total/property.price)} nights</span>
                        <span>${total}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span className="underline">Cleaning fee</span>
                        <span>${cleaningFee}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span className="underline">Service fee</span>
                        <span>${serviceFee}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-gray-900 text-lg">
                        <span>Total</span>
                        <span>${grandTotal}</span>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
