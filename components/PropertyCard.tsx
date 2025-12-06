import React from 'react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onClick: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <div 
      className="group cursor-pointer flex flex-col gap-2"
      onClick={() => onClick(property)}
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-200">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-3 right-3 text-white/70 hover:text-white hover:scale-110 transition">
          <i className="fa-regular fa-heart text-2xl drop-shadow-md"></i>
        </button>
        {property.host.superhost && (
          <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded text-xs font-bold shadow-sm">
            Superhost
          </div>
        )}
      </div>

      <div className="flex justify-between items-start mt-1">
        <h3 className="font-semibold text-gray-900 truncate pr-2">{property.location}</h3>
        <div className="flex items-center gap-1 text-sm">
          <i className="fa-solid fa-star text-sm"></i>
          <span>{property.rating}</span>
        </div>
      </div>
      
      <p className="text-gray-500 text-sm truncate">{property.type} • {property.city}</p>
      <p className="text-gray-500 text-sm">Oct 15 - 20</p>
      
      <div className="mt-1 flex items-baseline gap-1">
        <span className="font-semibold text-gray-900">${property.price}</span>
        <span className="text-gray-900">night</span>
      </div>
    </div>
  );
};

export default PropertyCard;
