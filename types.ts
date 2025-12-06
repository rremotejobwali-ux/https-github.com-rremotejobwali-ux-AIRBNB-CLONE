export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  // Added 'Treehouse' to the union type
  type: 'Entire home' | 'Private room' | 'Shared room' | 'Villa' | 'Cabin' | 'Treehouse';
  location: string;
  city: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  amenities: string[];
  host: {
    name: string;
    avatar: string;
    superhost: boolean;
  };
  details: {
    guests: number;
    bedrooms: number;
    beds: number;
    baths: number;
  };
  reviewsList: Review[];
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'cancelled';
  dateBooked: string;
}

export interface SearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}