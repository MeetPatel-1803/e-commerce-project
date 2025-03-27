export const USER_ROLE = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  VENDOR: 'vendor'
};

export const RATINGS = {
  MIN: 1,
  MAX: 5
};

export const RESPONSE_CODE = {
  SUCCESS: 200,
  SUCCESS_NEW_RESOURCE: 201,
  SUCCESS_WITHOUT_RESPONSE: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  UPGRADE_REQUIRED: 426,
  INTERNAL_SERVER: 500,
  MAINTENANCE: 503,
  TOKEN_INAVLID: 498
};

export const TAGS = [
  'New Arrival',
  'Best Seller',
  'Limited Edition',
  'Trending',
  'Discounted',
  'Featured',
  'Exclusive'
];

export const META_CODE = {
  SUCCESS: 1,
  FAIL: 0
};

export const PRODUCT_CATEGORIES = {
  ELECTRONICS: {
    name: 'Electronics',
    subcategories: [
      'Smartphones & Accessories',
      'Laptops & Computers',
      'Wearable Technology (Smartwatches, Fitness Trackers)',
      'Cameras & Photography Equipment',
      'Audio & Headphones',
      'Gaming Consoles & Accessories',
      'Home Appliances',
      'TV & Home Entertainment'
    ]
  },
  FASHION: {
    name: 'Fashion & Apparel',
    subcategories: [
      'Men’s Clothing',
      'Women’s Clothing',
      'Children’s Clothing',
      'Shoes & Footwear',
      'Bags & Accessories',
      'Jewelry & Watches',
      'Sunglasses & Eyewear',
      'Activewear & Sportswear'
    ]
  },
  BEAUTY: {
    name: 'Beauty & Personal Care',
    subcategories: [
      'Skincare',
      'Haircare',
      'Makeup & Cosmetics',
      'Fragrances',
      'Personal Care & Hygiene',
      'Shaving & Grooming',
      'Health & Wellness Supplements',
      'Beauty Tools & Accessories'
    ]
  },
  HOME_FURNITURE: {
    name: 'Home & Furniture',
    subcategories: [
      'Furniture (Sofas, Chairs, Tables)',
      'Home Decor (Wall Art, Clocks, Rugs)',
      'Kitchen Appliances & Utensils',
      'Bedding & Linen (Sheets, Pillows, Comforters)',
      'Lighting (Lamps, Ceiling Lights)',
      'Storage & Organization (Shelves, Cabinets)',
      'Garden & Outdoor Furniture',
      'Cleaning & Household Supplies'
    ]
  },
  SPORTS_OUTDOORS: {
    name: 'Sports & Outdoors',
    subcategories: [
      'Sports Equipment (Bikes, Balls, etc.)',
      'Outdoor Gear (Tents, Backpacks, Sleeping Bags)',
      'Fitness & Exercise Equipment',
      'Outdoor Clothing & Footwear',
      'Water Sports Equipment',
      'Camping & Hiking Gear',
      'Hunting & Fishing Gear'
    ]
  },
  TOYS_GAMES: {
    name: 'Toys & Games',
    subcategories: [
      'Action Figures',
      'Dolls & Stuffed Animals',
      'Board Games & Puzzles',
      'Educational Toys',
      'Baby & Toddler Toys',
      'Video Games & Consoles',
      'Arts & Crafts Supplies'
    ]
  },
  FOOD_BEVERAGES: {
    name: 'Food & Beverages',
    subcategories: [
      'Gourmet Foods',
      'Snacks & Sweets',
      'Organic & Health Foods',
      'Beverages (Coffee, Tea, Soft Drinks)',
      'Spices & Seasonings',
      'Specialty Diet Foods (Gluten-Free, Vegan)',
      'Alcohol & Wine',
      'Baby Food & Formula'
    ]
  },
  HEALTH_WELLNESS: {
    name: 'Health & Wellness',
    subcategories: [
      'Vitamins & Supplements',
      'Fitness & Exercise Equipment',
      'Medical Supplies',
      'First Aid & Personal Care',
      'Wellness Devices (Thermometers, Blood Pressure Monitors)',
      'Aromatherapy & Massage',
      'Mental Health & Stress Relief'
    ]
  },
  BOOKS_STATIONERY: {
    name: 'Books & Stationery',
    subcategories: [
      'Books (Fiction, Non-Fiction, Educational)',
      'E-books & Audiobooks',
      'Notebooks & Journals',
      'Office Supplies (Pens, Pencils, Highlighters)',
      'Arts & Crafts Materials',
      'School Supplies',
      'Greeting Cards & Stationery'
    ]
  },
  AUTOMOTIVE_TOOLS: {
    name: 'Automotive & Tools',
    subcategories: [
      'Car Accessories & Parts',
      'Motorcycle & Bike Parts',
      'Tires & Wheels',
      'Garage & Workshop Tools',
      'Auto Maintenance & Repair',
      'Car Electronics (GPS, Dash Cams)',
      'Motorcycle Helmets & Gear'
    ]
  },
  BABY_KIDS: {
    name: 'Baby & Kids',
    subcategories: [
      'Baby Clothing & Footwear',
      'Baby Gear (Strollers, Car Seats)',
      'Feeding & Nursing',
      'Diapers & Potty Training',
      'Baby Safety & Health',
      'Toys & Games for Kids',
      'Maternity Wear'
    ]
  },
  PET_SUPPLIES: {
    name: 'Pet Supplies',
    subcategories: [
      'Pet Food & Treats',
      'Pet Clothing & Accessories',
      'Pet Care & Health',
      'Pet Toys',
      'Pet Training & Behavior',
      'Aquarium & Fish Supplies',
      'Bird & Small Animal Supplies'
    ]
  },
  ART_COLLECTIBLES: {
    name: 'Art & Collectibles',
    subcategories: [
      'Fine Art & Paintings',
      'Collectible Figurines',
      'Antiques',
      'Handcrafted Goods',
      'Sculptures & Statues',
      'Photography',
      'Memorabilia'
    ]
  },
  OFFICE_SUPPLIES: {
    name: 'Office Supplies & Equipment',
    subcategories: [
      'Office Furniture (Desks, Chairs)',
      'Office Electronics (Printers, Scanners)',
      'Filing & Organization',
      'Business Stationery',
      'Whiteboards & Bulletin Boards',
      'Office Lighting'
    ]
  },
  TRAVEL_LUGGAGE: {
    name: 'Travel & Luggage',
    subcategories: [
      'Luggage & Suitcases',
      'Travel Accessories (Pillows, Locks, Tags)',
      'Backpacks & Travel Bags',
      'Travel Clothing',
      'Travel Gear (Sleep Masks, Earplugs, etc.)',
      'Camping & Outdoor Travel Gear'
    ]
  },
  GIFTS_OCCASIONS: {
    name: 'Gifts & Special Occasions',
    subcategories: [
      'Personalized Gifts',
      'Holiday Decorations',
      'Wedding & Party Supplies',
      'Birthday Gifts',
      'Greeting Cards & Wrapping Paper',
      'Flowers & Chocolates'
    ]
  },
  DIY_HOME_IMPROVEMENT: {
    name: 'DIY & Home Improvement',
    subcategories: [
      'Power Tools & Hand Tools',
      'Paints & Paint Supplies',
      'Building Materials',
      'Plumbing Supplies',
      'Electrical Equipment',
      'Garden Tools & Supplies',
      'Home Renovation & Improvement'
    ]
  },
  TECHNOLOGY_GADGETS: {
    name: 'Technology & Gadgets',
    subcategories: [
      'Smart Home Devices (Smart Plugs, Smart Bulbs)',
      'VR Headsets & Accessories',
      'Drones & Aerial Photography',
      'Robotics & Automation',
      'Computer Accessories (Keyboards, Mice)',
      'Wearable Tech (Fitness Trackers, Smartwatches)'
    ]
  }
};

export const ORDER_STATUS = {
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled'
};

export const PAYMENT_STATUS = {
  PENDING: 'Pending',
  PAID: 'Paid'
};
