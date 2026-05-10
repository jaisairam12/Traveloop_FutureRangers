// ── Mock Data for Traveloop ──

export const destinations = [
  { id: 1, name: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', rating: 4.8, price: '$1,200', category: 'Beach', trending: true },
  { id: 2, name: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800', rating: 4.9, price: '$2,100', category: 'Culture', trending: true },
  { id: 3, name: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800', rating: 4.7, price: '$1,800', category: 'Beach', trending: false },
  { id: 4, name: 'Swiss Alps', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800', rating: 4.9, price: '$2,500', category: 'Mountain', trending: true },
  { id: 5, name: 'Marrakech, Morocco', image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800', rating: 4.6, price: '$900', category: 'Culture', trending: false },
  { id: 6, name: 'Reykjavik, Iceland', image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800', rating: 4.8, price: '$2,800', category: 'Adventure', trending: true },
  { id: 7, name: 'Amalfi Coast, Italy', image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800', rating: 4.7, price: '$2,000', category: 'Beach', trending: false },
  { id: 8, name: 'Patagonia, Argentina', image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800', rating: 4.9, price: '$3,200', category: 'Adventure', trending: true },
  { id: 9, name: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800', rating: 4.9, price: '$3,500', category: 'Beach', trending: true },
  { id: 10, name: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800', rating: 4.8, price: '$2,300', category: 'City', trending: true },
  { id: 11, name: 'Cape Town, South Africa', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800', rating: 4.7, price: '$1,500', category: 'Adventure', trending: false },
  { id: 12, name: 'New Zealand', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=800', rating: 4.9, price: '$2,900', category: 'Adventure', trending: true },
];

export const tripRequests = [
  { id: 1, user: 'Sarah M.', avatar: '👩‍🦰', destination: 'Southeast Asia', budget: '$2,000', duration: '10 days', style: 'Adventure', status: 'open', date: '2 hours ago' },
  { id: 2, user: 'James K.', avatar: '👨‍💼', destination: 'Europe', budget: '$3,500', duration: '14 days', style: 'Cultural', status: 'open', date: '5 hours ago' },
  { id: 3, user: 'Priya R.', avatar: '👩‍💻', destination: 'Japan', budget: '$2,800', duration: '7 days', style: 'Food & Culture', status: 'matched', date: '1 day ago' },
  { id: 4, user: 'Alex T.', avatar: '🧑‍🎨', destination: 'South America', budget: '$1,500', duration: '12 days', style: 'Backpacking', status: 'open', date: '3 hours ago' },
  { id: 5, user: 'Emma L.', avatar: '👩‍🔬', destination: 'Nordic Countries', budget: '$4,000', duration: '10 days', style: 'Nature', status: 'open', date: '6 hours ago' },
];

export const testimonials = [
  { id: 1, name: 'Maria Santos', role: 'Solo Traveler', avatar: '👩‍🎤', text: 'Traveloop transformed how I plan trips. The AI quiz nailed my preferences, and I found the perfect planner within minutes!', rating: 5 },
  { id: 2, name: 'David Chen', role: 'Trip Planner', avatar: '👨‍✈️', text: 'As a professional trip planner, Traveloop connects me with travelers who actually match my expertise. Revenue up 200%!', rating: 5 },
  { id: 3, name: 'Sophie & Tom', role: 'Couple Travelers', avatar: '👫', text: 'We joined a group trip to Patagonia through Traveloop. Best travel experience of our lives, with zero planning stress.', rating: 5 },
];

export const myTrips = [
  { id: 1, name: 'Japanese Culture Explorer', destination: 'Tokyo & Kyoto', cover: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800', dates: 'Mar 15 - Mar 25, 2026', budget: '$2,800', status: 'active', travelers: 4, days: 10 },
  { id: 2, name: 'Bali Paradise Retreat', destination: 'Bali, Indonesia', cover: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', dates: 'Apr 5 - Apr 12, 2026', budget: '$1,500', status: 'planning', travelers: 2, days: 7 },
  { id: 3, name: 'Swiss Alpine Adventure', destination: 'Swiss Alps', cover: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800', dates: 'Jun 1 - Jun 8, 2026', budget: '$3,200', status: 'completed', travelers: 6, days: 7 },
  { id: 4, name: 'Greek Island Hopping', destination: 'Santorini & Mykonos', cover: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800', dates: 'Jul 10 - Jul 20, 2026', budget: '$2,200', status: 'draft', travelers: 3, days: 10 },
];

export const itineraryDays = [
  {
    day: 1, date: 'Mar 15', city: 'Tokyo',
    activities: [
      { id: 'a1', time: '09:00', title: 'Arrive at Narita Airport', type: 'transport', duration: '2h', cost: '$30', icon: '✈️' },
      { id: 'a2', time: '12:00', title: 'Check-in at Shinjuku Hotel', type: 'accommodation', duration: '1h', cost: '$150', icon: '🏨' },
      { id: 'a3', time: '14:00', title: 'Explore Shibuya Crossing', type: 'sightseeing', duration: '2h', cost: '$0', icon: '🚶' },
      { id: 'a4', time: '17:00', title: 'Ramen at Ichiran', type: 'food', duration: '1h', cost: '$15', icon: '🍜' },
      { id: 'a5', time: '19:00', title: 'Robot Restaurant Show', type: 'entertainment', duration: '2h', cost: '$80', icon: '🤖' },
    ]
  },
  {
    day: 2, date: 'Mar 16', city: 'Tokyo',
    activities: [
      { id: 'b1', time: '08:00', title: 'Tsukiji Outer Market', type: 'food', duration: '2h', cost: '$25', icon: '🐟' },
      { id: 'b2', time: '11:00', title: 'Senso-ji Temple', type: 'sightseeing', duration: '2h', cost: '$0', icon: '⛩️' },
      { id: 'b3', time: '14:00', title: 'TeamLab Borderless', type: 'entertainment', duration: '3h', cost: '$30', icon: '🎨' },
      { id: 'b4', time: '18:00', title: 'Akihabara District', type: 'shopping', duration: '2h', cost: '$50', icon: '🎮' },
    ]
  },
  {
    day: 3, date: 'Mar 17', city: 'Tokyo → Kyoto',
    activities: [
      { id: 'c1', time: '07:00', title: 'Shinkansen to Kyoto', type: 'transport', duration: '2.5h', cost: '$120', icon: '🚅' },
      { id: 'c2', time: '11:00', title: 'Check-in at Ryokan', type: 'accommodation', duration: '1h', cost: '$200', icon: '🏯' },
      { id: 'c3', time: '13:00', title: 'Fushimi Inari Shrine', type: 'sightseeing', duration: '3h', cost: '$0', icon: '⛩️' },
      { id: 'c4', time: '17:00', title: 'Gion District Walk', type: 'sightseeing', duration: '2h', cost: '$0', icon: '🎎' },
      { id: 'c5', time: '19:30', title: 'Kaiseki Dinner', type: 'food', duration: '2h', cost: '$80', icon: '🍱' },
    ]
  },
  {
    day: 4, date: 'Mar 18', city: 'Kyoto',
    activities: [
      { id: 'd1', time: '06:00', title: 'Arashiyama Bamboo Grove', type: 'sightseeing', duration: '2h', cost: '$0', icon: '🎋' },
      { id: 'd2', time: '09:00', title: 'Kinkaku-ji (Golden Pavilion)', type: 'sightseeing', duration: '1.5h', cost: '$5', icon: '🏛️' },
      { id: 'd3', time: '12:00', title: 'Nishiki Market Lunch', type: 'food', duration: '1.5h', cost: '$20', icon: '🍣' },
      { id: 'd4', time: '15:00', title: 'Tea Ceremony Experience', type: 'culture', duration: '2h', cost: '$45', icon: '🍵' },
    ]
  },
];

export const budgetData = {
  total: 2800,
  spent: 1850,
  categories: [
    { name: 'Accommodation', budget: 800, spent: 750, color: '#1A6B4A', icon: '🏨' },
    { name: 'Transport', budget: 500, spent: 380, color: '#3B82F6', icon: '✈️' },
    { name: 'Food & Dining', budget: 400, spent: 320, color: '#F59E0B', icon: '🍽️' },
    { name: 'Activities', budget: 600, spent: 280, color: '#8B5CF6', icon: '🎭' },
    { name: 'Shopping', budget: 300, spent: 120, color: '#EC4899', icon: '🛍️' },
    { name: 'Misc', budget: 200, spent: 0, color: '#6B7280', icon: '📦' },
  ],
  expenses: [
    { id: 1, item: 'Shinjuku Hotel (3 nights)', category: 'Accommodation', amount: 450, date: 'Mar 15' },
    { id: 2, item: 'Narita Express', category: 'Transport', amount: 30, date: 'Mar 15' },
    { id: 3, item: 'Robot Restaurant', category: 'Activities', amount: 80, date: 'Mar 15' },
    { id: 4, item: 'Ichiran Ramen', category: 'Food & Dining', amount: 15, date: 'Mar 15' },
    { id: 5, item: 'Shinkansen Tokyo-Kyoto', category: 'Transport', amount: 120, date: 'Mar 17' },
    { id: 6, item: 'Ryokan (2 nights)', category: 'Accommodation', amount: 300, date: 'Mar 17' },
    { id: 7, item: 'TeamLab Borderless', category: 'Activities', amount: 30, date: 'Mar 16' },
    { id: 8, item: 'Kaiseki Dinner', category: 'Food & Dining', amount: 80, date: 'Mar 17' },
  ]
};

export const packingList = [
  {
    category: 'Clothing',
    icon: '👕',
    items: [
      { id: 'p1', name: 'T-shirts (5)', checked: true },
      { id: 'p2', name: 'Pants/Jeans (3)', checked: true },
      { id: 'p3', name: 'Light jacket', checked: false },
      { id: 'p4', name: 'Comfortable walking shoes', checked: true },
      { id: 'p5', name: 'Sandals', checked: false },
      { id: 'p6', name: 'Underwear & socks (7 sets)', checked: true },
      { id: 'p7', name: 'Sleepwear', checked: false },
    ]
  },
  {
    category: 'Toiletries',
    icon: '🧴',
    items: [
      { id: 'p8', name: 'Toothbrush & toothpaste', checked: true },
      { id: 'p9', name: 'Shampoo & conditioner', checked: false },
      { id: 'p10', name: 'Sunscreen SPF 50', checked: true },
      { id: 'p11', name: 'Deodorant', checked: true },
      { id: 'p12', name: 'First-aid kit', checked: false },
    ]
  },
  {
    category: 'Electronics',
    icon: '📱',
    items: [
      { id: 'p13', name: 'Phone + charger', checked: true },
      { id: 'p14', name: 'Camera + SD cards', checked: false },
      { id: 'p15', name: 'Power bank', checked: true },
      { id: 'p16', name: 'Universal adapter', checked: false },
      { id: 'p17', name: 'Headphones', checked: true },
    ]
  },
  {
    category: 'Documents',
    icon: '📄',
    items: [
      { id: 'p18', name: 'Passport', checked: true },
      { id: 'p19', name: 'Travel insurance docs', checked: true },
      { id: 'p20', name: 'Hotel confirmations', checked: false },
      { id: 'p21', name: 'Flight tickets', checked: true },
      { id: 'p22', name: 'Emergency contacts', checked: false },
    ]
  },
  {
    category: 'Miscellaneous',
    icon: '🎒',
    items: [
      { id: 'p23', name: 'Day backpack', checked: true },
      { id: 'p24', name: 'Water bottle', checked: false },
      { id: 'p25', name: 'Snacks', checked: false },
      { id: 'p26', name: 'Travel pillow', checked: false },
      { id: 'p27', name: 'Luggage locks', checked: true },
    ]
  },
];

export const journalNotes = [
  { id: 1, day: 1, date: 'Mar 15', title: 'First Day in Tokyo!', content: 'Arrived at Narita Airport after a long flight. The express train to Shinjuku was super smooth. First impression: everything is so clean and organized! The hotel room is tiny but cozy. Shibuya Crossing at rush hour was absolutely mind-blowing — thousands of people moving in perfect harmony. Had the best ramen of my life at Ichiran. Can\'t wait for tomorrow!', mood: '🤩' },
  { id: 2, day: 2, date: 'Mar 16', title: 'Markets & Digital Art', content: 'Woke up early for Tsukiji — the fresh sushi breakfast was incredible. Senso-ji temple was beautiful but crowded. The highlight was TeamLab Borderless — spent 3 hours immersed in digital art installations. It felt like walking through a dream. Akihabara was sensory overload in the best way.', mood: '😍' },
  { id: 3, day: 3, date: 'Mar 17', title: 'Bullet Train to Kyoto', content: 'The Shinkansen experience was incredible — watching Mt. Fuji pass by at 300 km/h! Our ryokan in Kyoto is absolutely stunning. The thousand torii gates at Fushimi Inari were magical at sunset. Walking through Gion district in the evening felt like stepping back in time. Kaiseki dinner was a work of art.', mood: '✨' },
];

export const quizQuestions = [
  {
    id: 1,
    question: 'What\'s your travel style?',
    subtitle: 'Pick the vibe that resonates most with you',
    options: [
      { id: 'ts1', label: 'Adventure Seeker', desc: 'Hiking, extreme sports, off-the-beaten-path', icon: '🧗', color: '#EF4444' },
      { id: 'ts2', label: 'Culture Explorer', desc: 'Museums, history, local traditions', icon: '🏛️', color: '#8B5CF6' },
      { id: 'ts3', label: 'Relaxation Mode', desc: 'Beaches, spas, slow mornings', icon: '🏖️', color: '#3B82F6' },
      { id: 'ts4', label: 'Foodie Journey', desc: 'Street food, fine dining, cooking classes', icon: '🍜', color: '#F59E0B' },
    ]
  },
  {
    id: 2,
    question: 'What\'s your budget range?',
    subtitle: 'Per person, for the entire trip',
    options: [
      { id: 'b1', label: 'Budget Friendly', desc: 'Under $1,000', icon: '💰', color: '#22C55E' },
      { id: 'b2', label: 'Mid Range', desc: '$1,000 - $2,500', icon: '💳', color: '#3B82F6' },
      { id: 'b3', label: 'Premium', desc: '$2,500 - $5,000', icon: '💎', color: '#8B5CF6' },
      { id: 'b4', label: 'Luxury', desc: '$5,000+', icon: '👑', color: '#F59E0B' },
    ]
  },
  {
    id: 3,
    question: 'What type of destination?',
    subtitle: 'Where does your heart take you?',
    options: [
      { id: 'd1', label: 'Tropical Beach', desc: 'Sun, sand, and crystal-clear water', icon: '🏝️', color: '#06B6D4' },
      { id: 'd2', label: 'Mountain Escape', desc: 'Peaks, trails, and fresh air', icon: '🏔️', color: '#6366F1' },
      { id: 'd3', label: 'City Explorer', desc: 'Urban vibes, nightlife, architecture', icon: '🌆', color: '#EC4899' },
      { id: 'd4', label: 'Countryside', desc: 'Rolling hills, vineyards, peace', icon: '🌾', color: '#84CC16' },
    ]
  },
  {
    id: 4,
    question: 'How long is your ideal trip?',
    subtitle: 'Duration matters for the perfect plan',
    options: [
      { id: 'dur1', label: 'Quick Getaway', desc: '3-5 days', icon: '⚡', color: '#F59E0B' },
      { id: 'dur2', label: 'Week Trip', desc: '6-9 days', icon: '📅', color: '#3B82F6' },
      { id: 'dur3', label: 'Extended Journey', desc: '10-14 days', icon: '🗓️', color: '#8B5CF6' },
      { id: 'dur4', label: 'Long Adventure', desc: '15+ days', icon: '🌍', color: '#EF4444' },
    ]
  },
  {
    id: 5,
    question: 'Who are you traveling with?',
    subtitle: 'Your crew shapes the experience',
    options: [
      { id: 'g1', label: 'Solo Explorer', desc: 'Just me and the world', icon: '🧳', color: '#6366F1' },
      { id: 'g2', label: 'Couple\'s Trip', desc: 'Romantic getaway for two', icon: '💑', color: '#EC4899' },
      { id: 'g3', label: 'Friend Group', desc: 'Squad goals activated', icon: '👯', color: '#F59E0B' },
      { id: 'g4', label: 'Family Vacation', desc: 'Fun for all ages', icon: '👨‍👩‍👧‍👦', color: '#22C55E' },
    ]
  },
  {
    id: 6,
    question: 'What interests you most?',
    subtitle: 'Select your top passion',
    options: [
      { id: 'i1', label: 'Photography', desc: 'Capture stunning moments', icon: '📸', color: '#8B5CF6' },
      { id: 'i2', label: 'Wellness & Yoga', desc: 'Mind, body, soul rejuvenation', icon: '🧘', color: '#06B6D4' },
      { id: 'i3', label: 'Nightlife & Social', desc: 'Dancing, bars, meeting people', icon: '🎉', color: '#EF4444' },
      { id: 'i4', label: 'Wildlife & Nature', desc: 'Safaris, diving, eco-tourism', icon: '🦁', color: '#22C55E' },
    ]
  },
];

export const activities = [
  { id: 1, name: 'Snorkeling in Crystal Bay', category: 'Water Sports', price: '$45', rating: 4.8, duration: '3h', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400', location: 'Bali' },
  { id: 2, name: 'Temple Sunrise Tour', category: 'Culture', price: '$30', rating: 4.9, duration: '4h', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400', location: 'Kyoto' },
  { id: 3, name: 'Cooking Class', category: 'Food', price: '$55', rating: 4.7, duration: '3h', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400', location: 'Bangkok' },
  { id: 4, name: 'Mountain Hiking Trek', category: 'Adventure', price: '$60', rating: 4.6, duration: '6h', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400', location: 'Swiss Alps' },
  { id: 5, name: 'Wine Tasting Tour', category: 'Food', price: '$75', rating: 4.8, duration: '4h', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400', location: 'Tuscany' },
  { id: 6, name: 'Surfing Lessons', category: 'Water Sports', price: '$50', rating: 4.5, duration: '2h', image: 'https://images.unsplash.com/photo-1502680390548-bdbac40e4ce7?w=400', location: 'Bali' },
  { id: 7, name: 'Northern Lights Tour', category: 'Nature', price: '$120', rating: 4.9, duration: '5h', image: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=400', location: 'Iceland' },
  { id: 8, name: 'Street Art Walking Tour', category: 'Culture', price: '$20', rating: 4.4, duration: '2h', image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=400', location: 'Berlin' },
];
