import { Property } from './types';

export const AMENITIES_LIST = [
  'Wifi', 'Kitchen', 'Washer', 'Dryer', 'Air conditioning', 'Heating',
  'Dedicated workspace', 'TV', 'Hair dryer', 'Iron', 'Pool', 'Hot tub',
  'Free parking', 'EV charger', 'Crib', 'Gym', 'BBQ grill', 'Breakfast',
  'Indoor fireplace', 'Smoking allowed'
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'p1',
    title: 'Modern Minimalist Loft in Downtown',
    description: 'Experience the city like a local in this stunning minimalist loft. Featuring floor-to-ceiling windows with panoramic city views, a fully equipped chef\'s kitchen, and high-speed fiber internet. Perfect for business travelers or couples looking for a chic urban getaway.',
    type: 'Entire home',
    location: 'Downtown, Seattle, WA',
    city: 'Seattle',
    price: 185,
    rating: 4.92,
    reviews: 128,
    images: [
      'https://picsum.photos/id/1/800/600',
      'https://picsum.photos/id/201/800/600',
      'https://picsum.photos/id/180/800/600',
      'https://picsum.photos/id/366/800/600'
    ],
    amenities: ['Wifi', 'Kitchen', 'Air conditioning', 'Dedicated workspace', 'TV', 'Washer', 'Dryer'],
    host: {
      name: 'Sarah Jenkins',
      avatar: 'https://picsum.photos/id/64/100/100',
      superhost: true
    },
    details: { guests: 2, bedrooms: 1, beds: 1, baths: 1 },
    reviewsList: [
      { id: 'r1', author: 'Michael', avatar: 'https://picsum.photos/id/1005/50/50', rating: 5, date: '2023-10-15', comment: 'Absolutely stunning views and a perfect location. Sarah was a great host!' },
      { id: 'r2', author: 'Jessica', avatar: 'https://picsum.photos/id/338/50/50', rating: 4, date: '2023-09-22', comment: 'Great place, a bit noisy on weekends due to downtown location but otherwise perfect.' }
    ]
  },
  {
    id: 'p2',
    title: 'Cozy A-Frame Cabin in the Woods',
    description: 'Escape to nature in this charming A-frame cabin. Surrounded by towering pines, this secluded retreat features a wood-burning fireplace, a large wraparound deck, and easy access to hiking trails. Disconnect and recharge in this peaceful sanctuary.',
    type: 'Cabin',
    location: 'Mount Rainier, WA',
    city: 'Ashford',
    price: 250,
    rating: 4.85,
    reviews: 84,
    images: [
      'https://picsum.photos/id/10/800/600',
      'https://picsum.photos/id/15/800/600',
      'https://picsum.photos/id/28/800/600'
    ],
    amenities: ['Indoor fireplace', 'Kitchen', 'Free parking', 'BBQ grill', 'Heating', 'Self check-in'],
    host: {
      name: 'David Woods',
      avatar: 'https://picsum.photos/id/91/100/100',
      superhost: false
    },
    details: { guests: 4, bedrooms: 2, beds: 3, baths: 1 },
    reviewsList: [
        { id: 'r3', author: 'Elena', avatar: 'https://picsum.photos/id/449/50/50', rating: 5, date: '2023-11-02', comment: 'Magical weekend. The fireplace is amazing.' }
    ]
  },
  {
    id: 'p3',
    title: 'Luxury Beachfront Villa with Pool',
    description: 'Indulge in luxury at this spectacular beachfront villa. Steps away from the white sandy beaches, this property boasts a private infinity pool, outdoor dining area, and spacious interiors with modern decor. The ultimate vacation destination for families and groups.',
    type: 'Villa',
    location: 'Malibu, CA',
    city: 'Malibu',
    price: 1200,
    rating: 4.98,
    reviews: 42,
    images: [
      'https://picsum.photos/id/287/800/600',
      'https://picsum.photos/id/235/800/600',
      'https://picsum.photos/id/204/800/600'
    ],
    amenities: ['Wifi', 'Pool', 'Hot tub', 'Kitchen', 'Free parking', 'Beach access', 'Air conditioning', 'Gym'],
    host: {
      name: 'Elena Rodriguez',
      avatar: 'https://picsum.photos/id/338/100/100',
      superhost: true
    },
    details: { guests: 8, bedrooms: 4, beds: 5, baths: 3.5 },
    reviewsList: [
        { id: 'r4', author: 'Tom', avatar: 'https://picsum.photos/id/1062/50/50', rating: 5, date: '2023-08-10', comment: 'Worth every penny. The pool is incredible.' }
    ]
  },
  {
    id: 'p4',
    title: 'Chic Studio in Le Marais',
    description: 'Stay in the heart of Paris in this beautifully renovated studio. Located in the historic Le Marais district, you are walking distance to cafes, boutiques, and museums. Features original exposed beams and modern amenities.',
    type: 'Entire home',
    location: 'Le Marais, Paris, France',
    city: 'Paris',
    price: 145,
    rating: 4.75,
    reviews: 215,
    images: [
      'https://picsum.photos/id/435/800/600',
      'https://picsum.photos/id/364/800/600',
      'https://picsum.photos/id/259/800/600'
    ],
    amenities: ['Wifi', 'Kitchen', 'Heating', 'Hair dryer', 'Iron'],
    host: {
      name: 'Jean-Pierre',
      avatar: 'https://picsum.photos/id/177/100/100',
      superhost: true
    },
    details: { guests: 2, bedrooms: 0, beds: 1, baths: 1 },
    reviewsList: []
  },
  {
    id: 'p5',
    title: 'Sunny Loft near Central Park',
    description: 'Bright and airy loft located just two blocks from Central Park. High ceilings, large windows, and eclectic art make this space unique. Enjoy the convenience of New York City living with a touch of artistic flair.',
    type: 'Entire home',
    location: 'Upper West Side, New York, NY',
    city: 'New York',
    price: 290,
    rating: 4.88,
    reviews: 96,
    images: [
      'https://picsum.photos/id/512/800/600',
      'https://picsum.photos/id/515/800/600',
      'https://picsum.photos/id/520/800/600'
    ],
    amenities: ['Wifi', 'Air conditioning', 'Kitchen', 'TV', 'Elevator', 'Heating'],
    host: {
      name: 'Emily Chen',
      avatar: 'https://picsum.photos/id/836/100/100',
      superhost: false
    },
    details: { guests: 3, bedrooms: 1, beds: 2, baths: 1 },
    reviewsList: []
  },
   {
    id: 'p6',
    title: 'Eco-Friendly Treehouse Retreat',
    description: 'Fulfill your childhood dreams in this sustainable treehouse. Nestled in the canopy, it offers a truly unique experience with nature. Solar powered, composting toilet, and rain shower. A true off-grid adventure.',
    type: 'Treehouse',
    location: 'Portland, OR',
    city: 'Portland',
    price: 195,
    rating: 4.95,
    reviews: 156,
    images: [
      'https://picsum.photos/id/619/800/600',
      'https://picsum.photos/id/622/800/600',
      'https://picsum.photos/id/625/800/600'
    ],
    amenities: ['Free parking', 'Heating', 'Essentials', 'Breakfast', 'Fire extinguisher'],
    host: {
      name: 'Oliver Green',
      avatar: 'https://picsum.photos/id/996/100/100',
      superhost: true
    },
    details: { guests: 2, bedrooms: 1, beds: 1, baths: 0.5 },
    reviewsList: []
  }
];
