const properties = [
  // San Francisco properties (10)
  {
    id: 1, title: "Modern Downtown Loft", price: 450000,
    address: "123 Main St", city: "San Francisco", state: "CA", zipcode: "94102",
    latitude: 37.7749, longitude: -122.4194, bedrooms: 2, bathrooms: 2, sqft: 1200,
    propertyType: "Apartment", yearBuilt: 2015, lotSize: null,
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400"],
    description: "Beautiful loft with stunning city views and modern finishes.",
    features: ["Hardwood Floors", "Parking", "Pet Friendly"]
  },
  {
    id: 2, title: "Victorian Townhouse", price: 890000,
    address: "456 Castro St", city: "San Francisco", state: "CA", zipcode: "94114",
    latitude: 37.7609, longitude: -122.4350, bedrooms: 3, bathrooms: 2, sqft: 1800,
    propertyType: "Townhouse", yearBuilt: 1905, lotSize: 2000,
    images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400"],
    description: "Charming Victorian with original details and modern updates.",
    features: ["Original Moldings", "Garden", "Fireplace"]
  },
  {
    id: 3, title: "Pacific Heights Condo", price: 1200000,
    address: "789 Broadway", city: "San Francisco", state: "CA", zipcode: "94109",
    latitude: 37.7958, longitude: -122.4290, bedrooms: 3, bathrooms: 3, sqft: 2100,
    propertyType: "Condo", yearBuilt: 2010, lotSize: null,
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400"],
    description: "Luxury condo with panoramic bay views.",
    features: ["Bay Views", "Concierge", "Gym", "Rooftop"]
  },
  {
    id: 4, title: "Mission District Flat", price: 650000,
    address: "222 Valencia St", city: "San Francisco", state: "CA", zipcode: "94103",
    latitude: 37.7684, longitude: -122.4216, bedrooms: 2, bathrooms: 1, sqft: 950,
    propertyType: "Apartment", yearBuilt: 1960, lotSize: null,
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400"],
    description: "Hip Mission flat near great restaurants and shops.",
    features: ["In-unit Laundry", "Bike Storage", "Deck"]
  },
  {
    id: 5, title: "Nob Hill Penthouse", price: 2500000,
    address: "1000 California St", city: "San Francisco", state: "CA", zipcode: "94108",
    latitude: 37.7918, longitude: -122.4129, bedrooms: 4, bathrooms: 4, sqft: 3500,
    propertyType: "Condo", yearBuilt: 2018, lotSize: null,
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"],
    description: "Spectacular penthouse with 360-degree views.",
    features: ["360° Views", "Private Terrace", "Butler's Kitchen", "Smart Home"]
  },
  {
    id: 6, title: "Sunset District Bungalow", price: 780000,
    address: "333 Irving St", city: "San Francisco", state: "CA", zipcode: "94122",
    latitude: 37.7640, longitude: -122.4686, bedrooms: 2, bathrooms: 1, sqft: 1100,
    propertyType: "House", yearBuilt: 1945, lotSize: 2500,
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400"],
    description: "Cozy bungalow in the sought-after Sunset District.",
    features: ["Garage", "Garden", "Attic Storage"]
  },
  {
    id: 7, title: "SOMA Studio", price: 380000,
    address: "555 Folsom St", city: "San Francisco", state: "CA", zipcode: "94105",
    latitude: 37.7853, longitude: -122.3964, bedrooms: 0, bathrooms: 1, sqft: 550,
    propertyType: "Apartment", yearBuilt: 2020, lotSize: null,
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400"],
    description: "Modern studio in the heart of SOMA tech corridor.",
    features: ["High Ceilings", "Polished Concrete", "EV Charging"]
  },
  {
    id: 8, title: "Richmond District Home", price: 1100000,
    address: "100 Clement St", city: "San Francisco", state: "CA", zipcode: "94118",
    latitude: 37.7826, longitude: -122.4638, bedrooms: 4, bathrooms: 3, sqft: 2400,
    propertyType: "House", yearBuilt: 1928, lotSize: 3000,
    images: ["https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=400"],
    description: "Spacious family home in the quiet Richmond District.",
    features: ["Large Backyard", "Updated Kitchen", "2-Car Garage"]
  },
  {
    id: 9, title: "Hayes Valley Micro Unit", price: 420000,
    address: "77 Octavia Blvd", city: "San Francisco", state: "CA", zipcode: "94102",
    latitude: 37.7762, longitude: -122.4238, bedrooms: 1, bathrooms: 1, sqft: 480,
    propertyType: "Apartment", yearBuilt: 2019, lotSize: null,
    images: ["https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400"],
    description: "Efficient micro unit in trendy Hayes Valley.",
    features: ["Murphy Bed", "Built-in Storage", "Juliet Balcony"]
  },
  {
    id: 10, title: "Twin Peaks Retreat", price: 950000,
    address: "200 Twin Peaks Blvd", city: "San Francisco", state: "CA", zipcode: "94114",
    latitude: 37.7530, longitude: -122.4477, bedrooms: 3, bathrooms: 2, sqft: 1600,
    propertyType: "House", yearBuilt: 1955, lotSize: 3500,
    images: ["https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=400"],
    description: "Tranquil retreat with spectacular city views.",
    features: ["City Views", "Deck", "Original Hardwood", "Fireplace"]
  },
  // Los Angeles properties (10)
  {
    id: 11, title: "Beverly Hills Mansion", price: 4500000,
    address: "100 Rodeo Dr", city: "Los Angeles", state: "CA", zipcode: "90210",
    latitude: 34.0736, longitude: -118.4004, bedrooms: 6, bathrooms: 7, sqft: 8000,
    propertyType: "House", yearBuilt: 2005, lotSize: 15000,
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400"],
    description: "Iconic Beverly Hills estate with pool and guest house.",
    features: ["Pool", "Guest House", "Home Theater", "Wine Cellar"]
  },
  {
    id: 12, title: "Venice Beach Bungalow", price: 1350000,
    address: "25 Abbot Kinney Blvd", city: "Los Angeles", state: "CA", zipcode: "90291",
    latitude: 33.9850, longitude: -118.4695, bedrooms: 2, bathrooms: 2, sqft: 1100,
    propertyType: "House", yearBuilt: 1965, lotSize: 2800,
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400"],
    description: "Beachside bungalow steps from Venice Beach.",
    features: ["Beach Access", "Outdoor Shower", "Surfboard Storage"]
  },
  {
    id: 13, title: "Silver Lake Craftsman", price: 990000,
    address: "444 Sunset Blvd", city: "Los Angeles", state: "CA", zipcode: "90026",
    latitude: 34.0874, longitude: -118.2694, bedrooms: 3, bathrooms: 2, sqft: 1500,
    propertyType: "House", yearBuilt: 1925, lotSize: 4000,
    images: ["https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400"],
    description: "Restored Craftsman in hip Silver Lake neighborhood.",
    features: ["Original Built-ins", "Front Porch", "Mature Trees"]
  },
  {
    id: 14, title: "Downtown LA Loft", price: 720000,
    address: "888 S Figueroa St", city: "Los Angeles", state: "CA", zipcode: "90017",
    latitude: 34.0522, longitude: -118.2596, bedrooms: 1, bathrooms: 2, sqft: 1300,
    propertyType: "Loft", yearBuilt: 1920, lotSize: null,
    images: ["https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400"],
    description: "Industrial chic loft in converted historic building.",
    features: ["Exposed Brick", "14ft Ceilings", "Polished Concrete Floors"]
  },
  {
    id: 15, title: "Malibu Oceanfront", price: 5800000,
    address: "1 Pacific Coast Hwy", city: "Los Angeles", state: "CA", zipcode: "90265",
    latitude: 34.0370, longitude: -118.6919, bedrooms: 4, bathrooms: 5, sqft: 3200,
    propertyType: "House", yearBuilt: 2012, lotSize: 6000,
    images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400"],
    description: "Stunning oceanfront home with direct beach access.",
    features: ["Ocean Views", "Private Beach", "Infinity Pool", "Chef's Kitchen"]
  },
  {
    id: 16, title: "Hollywood Hills Modern", price: 2200000,
    address: "555 Mulholland Dr", city: "Los Angeles", state: "CA", zipcode: "90046",
    latitude: 34.1184, longitude: -118.3695, bedrooms: 3, bathrooms: 3, sqft: 2800,
    propertyType: "House", yearBuilt: 2015, lotSize: 8000,
    images: ["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400"],
    description: "Sleek modern home with panoramic city views.",
    features: ["Infinity Pool", "City Views", "Open Floor Plan", "Smart Home"]
  },
  {
    id: 17, title: "Koreatown High-Rise", price: 480000,
    address: "3400 Wilshire Blvd", city: "Los Angeles", state: "CA", zipcode: "90010",
    latitude: 34.0610, longitude: -118.3109, bedrooms: 2, bathrooms: 2, sqft: 1050,
    propertyType: "Condo", yearBuilt: 2008, lotSize: null,
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"],
    description: "Modern condo with city views and building amenities.",
    features: ["Rooftop Pool", "Gym", "Doorman", "Parking"]
  },
  {
    id: 18, title: "Pasadena Victorian", price: 1150000,
    address: "100 Orange Grove Blvd", city: "Los Angeles", state: "CA", zipcode: "91103",
    latitude: 34.1478, longitude: -118.1445, bedrooms: 4, bathrooms: 3, sqft: 2900,
    propertyType: "House", yearBuilt: 1895, lotSize: 7500,
    images: ["https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400"],
    description: "Grand Victorian with period details near Rose Bowl.",
    features: ["Period Details", "Large Lot", "Bonus Room", "Detached Garage"]
  },
  {
    id: 19, title: "Culver City Townhome", price: 875000,
    address: "9000 Venice Blvd", city: "Los Angeles", state: "CA", zipcode: "90232",
    latitude: 34.0211, longitude: -118.3965, bedrooms: 3, bathrooms: 2, sqft: 1650,
    propertyType: "Townhouse", yearBuilt: 2011, lotSize: null,
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"],
    description: "Modern townhome near Sony Studios and great dining.",
    features: ["Attached Garage", "Private Patio", "Rooftop Deck"]
  },
  {
    id: 20, title: "Long Beach Marina Condo", price: 595000,
    address: "200 Marina Dr", city: "Los Angeles", state: "CA", zipcode: "90803",
    latitude: 33.7701, longitude: -118.1937, bedrooms: 2, bathrooms: 2, sqft: 1100,
    propertyType: "Condo", yearBuilt: 1995, lotSize: null,
    images: ["https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=400"],
    description: "Waterfront condo with marina and ocean views.",
    features: ["Marina Views", "Boat Slip", "Community Pool", "Tennis Courts"]
  },
  // New York properties (10)
  {
    id: 21, title: "Manhattan Luxury Penthouse", price: 8500000,
    address: "432 Park Ave", city: "New York", state: "NY", zipcode: "10022",
    latitude: 40.7616, longitude: -73.9727, bedrooms: 4, bathrooms: 5, sqft: 4200,
    propertyType: "Penthouse", yearBuilt: 2016, lotSize: null,
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400"],
    description: "Ultra-luxury penthouse with skyline views in Midtown.",
    features: ["Central Park Views", "Private Elevator", "Chef's Kitchen", "Smart Home"]
  },
  {
    id: 22, title: "Brooklyn Brownstone", price: 2100000,
    address: "55 Prospect Park W", city: "New York", state: "NY", zipcode: "11215",
    latitude: 40.6681, longitude: -73.9744, bedrooms: 4, bathrooms: 3, sqft: 2800,
    propertyType: "Townhouse", yearBuilt: 1890, lotSize: 2000,
    images: ["https://images.unsplash.com/photo-1549517045-bc93de075e53?w=400"],
    description: "Stunning brownstone across from Prospect Park.",
    features: ["Original Details", "Garden", "Parlor Floor", "Modern Kitchen"]
  },
  {
    id: 23, title: "Upper West Side Pre-War", price: 1450000,
    address: "100 Riverside Dr", city: "New York", state: "NY", zipcode: "10024",
    latitude: 40.7872, longitude: -73.9854, bedrooms: 3, bathrooms: 2, sqft: 1700,
    propertyType: "Apartment", yearBuilt: 1930, lotSize: null,
    images: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400"],
    description: "Classic pre-war apartment with Hudson River views.",
    features: ["Pre-War Details", "River Views", "Doorman", "Storage"]
  },
  {
    id: 24, title: "SoHo Cast Iron Loft", price: 3200000,
    address: "150 Mercer St", city: "New York", state: "NY", zipcode: "10012",
    latitude: 40.7228, longitude: -74.0010, bedrooms: 2, bathrooms: 2, sqft: 2200,
    propertyType: "Loft", yearBuilt: 1880, lotSize: null,
    images: ["https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400"],
    description: "Authentic SoHo loft with original cast iron details.",
    features: ["Cast Iron Details", "12ft Ceilings", "Artist Work Space", "Private Entrance"]
  },
  {
    id: 25, title: "Williamsburg Studio", price: 580000,
    address: "200 Bedford Ave", city: "New York", state: "NY", zipcode: "11211",
    latitude: 40.7175, longitude: -73.9608, bedrooms: 0, bathrooms: 1, sqft: 620,
    propertyType: "Apartment", yearBuilt: 2014, lotSize: null,
    images: ["https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=400"],
    description: "Chic studio in the heart of Williamsburg.",
    features: ["Exposed Brick", "Rooftop Access", "Bike Room", "Pet Friendly"]
  },
  {
    id: 26, title: "Tribeca Duplex", price: 4800000,
    address: "75 Hudson St", city: "New York", state: "NY", zipcode: "10013",
    latitude: 40.7183, longitude: -74.0095, bedrooms: 3, bathrooms: 3, sqft: 3000,
    propertyType: "Apartment", yearBuilt: 1920, lotSize: null,
    images: ["https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400"],
    description: "Magnificent duplex loft in prime Tribeca location.",
    features: ["Double Height Ceilings", "Private Terrace", "Chef's Kitchen"]
  },
  {
    id: 27, title: "Harlem Brownstone", price: 1200000,
    address: "300 W 135th St", city: "New York", state: "NY", zipcode: "10030",
    latitude: 40.8163, longitude: -73.9483, bedrooms: 5, bathrooms: 3, sqft: 3200,
    propertyType: "Townhouse", yearBuilt: 1910, lotSize: 2200,
    images: ["https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=400"],
    description: "Beautiful Harlem brownstone with rental income potential.",
    features: ["Rental Unit", "Original Fireplace", "Garden", "Full Basement"]
  },
  {
    id: 28, title: "Queens Forest Hills Tudor", price: 985000,
    address: "100 Greenway S", city: "New York", state: "NY", zipcode: "11375",
    latitude: 40.7190, longitude: -73.8448, bedrooms: 3, bathrooms: 2, sqft: 1800,
    propertyType: "House", yearBuilt: 1935, lotSize: 5000,
    images: ["https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400"],
    description: "Charming Tudor-style home in Forest Hills Gardens.",
    features: ["Tudor Architecture", "Private Garden", "1-Car Garage", "Quiet Cul-de-sac"]
  },
  {
    id: 29, title: "Financial District Studio", price: 650000,
    address: "30 Wall St", city: "New York", state: "NY", zipcode: "10005",
    latitude: 40.7069, longitude: -74.0089, bedrooms: 0, bathrooms: 1, sqft: 700,
    propertyType: "Apartment", yearBuilt: 2005, lotSize: null,
    images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400"],
    description: "Sleek studio steps from Wall Street.",
    features: ["Floor-to-Ceiling Windows", "24hr Doorman", "Concierge", "Gym"]
  },
  {
    id: 30, title: "Astoria Greek Revival", price: 875000,
    address: "31-01 Ditmars Blvd", city: "New York", state: "NY", zipcode: "11105",
    latitude: 40.7728, longitude: -73.9301, bedrooms: 3, bathrooms: 2, sqft: 1500,
    propertyType: "House", yearBuilt: 1940, lotSize: 3500,
    images: ["https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400"],
    description: "Detached home in vibrant Astoria neighborhood.",
    features: ["Large Lot", "Updated Baths", "Driveway", "Near Subway"]
  },
  // Additional properties 
  {
    id: 31, title: "Haight-Ashbury Victorian", price: 1050000,
    address: "555 Haight St", city: "San Francisco", state: "CA", zipcode: "94117",
    latitude: 37.7720, longitude: -122.4312, bedrooms: 3, bathrooms: 2, sqft: 1700,
    propertyType: "House", yearBuilt: 1898, lotSize: 2800,
    images: ["https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=400"],
    description: "Iconic Victorian in the historic Haight-Ashbury district.",
    features: ["Period Architecture", "Bay Windows", "Updated Kitchen"]
  },
  {
    id: 32, title: "Echo Park Modern", price: 850000,
    address: "1234 Echo Park Ave", city: "Los Angeles", state: "CA", zipcode: "90026",
    latitude: 34.0782, longitude: -118.2616, bedrooms: 2, bathrooms: 2, sqft: 1200,
    propertyType: "House", yearBuilt: 2018, lotSize: 3200,
    images: ["https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400"],
    description: "Newly built modern home near Echo Park Lake.",
    features: ["Open Floor Plan", "ADU Ready", "Solar Panels", "Electric Car Charger"]
  },
  {
    id: 33, title: "Chelsea High Line Condo", price: 2800000,
    address: "500 W 23rd St", city: "New York", state: "NY", zipcode: "10011",
    latitude: 40.7469, longitude: -74.0044, bedrooms: 2, bathrooms: 2, sqft: 1400,
    propertyType: "Condo", yearBuilt: 2015, lotSize: null,
    images: ["https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400"],
    description: "Luxury condo overlooking the High Line in Chelsea.",
    features: ["High Line Views", "Terrace", "Concierge", "Fitness Center"]
  },
  {
    id: 34, title: "Marina District Condo", price: 920000,
    address: "3000 Broderick St", city: "San Francisco", state: "CA", zipcode: "94123",
    latitude: 37.7999, longitude: -122.4375, bedrooms: 2, bathrooms: 2, sqft: 1100,
    propertyType: "Condo", yearBuilt: 2001, lotSize: null,
    images: ["https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400"],
    description: "Bright Marina condo with bay and Golden Gate views.",
    features: ["Bay Views", "Golden Gate Views", "Parking", "Storage"]
  },
  {
    id: 35, title: "Studio City Ranch", price: 1650000,
    address: "4000 Coldwater Canyon", city: "Los Angeles", state: "CA", zipcode: "91604",
    latitude: 34.1486, longitude: -118.3825, bedrooms: 4, bathrooms: 3, sqft: 2600,
    propertyType: "House", yearBuilt: 1958, lotSize: 9000,
    images: ["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400"],
    description: "Ranch-style home in the hills of Studio City.",
    features: ["Pool", "Large Lot", "Mountain Views", "Bonus Room"]
  }
];

export const amenities = [
  { id: 1, name: "Central Park", type: "park", latitude: 40.7829, longitude: -73.9654 },
  { id: 2, name: "Golden Gate Park", type: "park", latitude: 37.7694, longitude: -122.4862 },
  { id: 3, name: "Griffith Park", type: "park", latitude: 34.1366, longitude: -118.2942 },
  { id: 4, name: "UCSF Medical Center", type: "hospital", latitude: 37.7631, longitude: -122.4579 },
  { id: 5, name: "Cedars-Sinai", type: "hospital", latitude: 34.0756, longitude: -118.3800 },
  { id: 6, name: "NYU Langone", type: "hospital", latitude: 40.7422, longitude: -73.9745 },
  { id: 7, name: "Whole Foods Market SF", type: "grocery", latitude: 37.7787, longitude: -122.4128 },
  { id: 8, name: "Trader Joe's LA", type: "grocery", latitude: 34.0625, longitude: -118.3585 },
  { id: 9, name: "Fairway Market NYC", type: "grocery", latitude: 40.7636, longitude: -73.9845 },
  { id: 10, name: "SF Ferry Building Marketplace", type: "market", latitude: 37.7956, longitude: -122.3935 }
];

export default properties;
