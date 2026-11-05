/**
 * TazaaConnect Centralized Mock Data
 * Single source of truth for mock data across all Phase 1 views.
 */

export const MOCK_KPIS = {
  activeFarms: {
    title: 'Active Farms',
    value: '24',
    label: 'Registered Urban Farms & Co-ops',
    sub: 'Registered Urban Farms & Co-ops',
    change: '+4 this month',
    trend: 'up'
  },
  availableSurplus: {
    title: 'Available Surplus',
    value: '1,840 kg',
    label: 'Perishable Produce Diverted Today',
    sub: 'Perishable Produce Diverted Today',
    change: '380 kg added today',
    trend: 'up'
  },
  deficitZones: {
    title: 'Food Deficit Zones',
    value: '7',
    label: 'Targeted High-Need Neighborhoods',
    sub: 'Targeted High-Need Neighborhoods',
    change: '2 Critical Priority',
    trend: 'neutral'
  },
  activeMatches: {
    title: 'Active Matches',
    value: '18',
    label: 'Bodega & Corner Store Dispatches',
    sub: 'Bodega & Corner Store Dispatches',
    change: '98.2% fulfillment rate',
    trend: 'up'
  }
};

export const MOCK_DEFICIT_ZONES = [
  {
    id: 'zone-1',
    name: 'South Ward 4 (East District)',
    deficitIndex: 92,
    priority: 'Critical Need',
    population: '24,500',
    supermarketAccessMiles: 2.8,
    unmetWeeklyProduceKg: 620,
    topDemandedProduce: ['Leafy Greens', 'Vine Tomatoes', 'Onions', 'Apples'],
    activeStoresInNeed: 6,
    statusColor: 'bg-rose-500'
  },
  {
    id: 'zone-2',
    name: 'Highland Heights (Ward 7)',
    deficitIndex: 86,
    priority: 'Critical Need',
    population: '18,200',
    supermarketAccessMiles: 2.4,
    unmetWeeklyProduceKg: 450,
    topDemandedProduce: ['Spinach', 'Carrots', 'Apples', 'Peppers'],
    activeStoresInNeed: 5,
    statusColor: 'bg-rose-500'
  },
  {
    id: 'zone-3',
    name: 'Riverdale Junction',
    deficitIndex: 78,
    priority: 'High Priority',
    population: '15,400',
    supermarketAccessMiles: 1.9,
    unmetWeeklyProduceKg: 310,
    topDemandedProduce: ['Potatoes', 'Sweet Corn', 'Cabbage'],
    activeStoresInNeed: 4,
    statusColor: 'bg-amber-500'
  },
  {
    id: 'zone-4',
    name: 'Metro North Corridor',
    deficitIndex: 74,
    priority: 'High Priority',
    population: '31,000',
    supermarketAccessMiles: 2.1,
    unmetWeeklyProduceKg: 380,
    topDemandedProduce: ['Bell Peppers', 'Kale', 'Cucumbers'],
    activeStoresInNeed: 7,
    statusColor: 'bg-amber-500'
  },
  {
    id: 'zone-5',
    name: 'West Valley Flats',
    deficitIndex: 65,
    priority: 'Moderate Need',
    population: '12,800',
    supermarketAccessMiles: 1.6,
    unmetWeeklyProduceKg: 190,
    topDemandedProduce: ['Squash', 'Oranges', 'Root Greens'],
    activeStoresInNeed: 3,
    statusColor: 'bg-emerald-500'
  }
];

export const MOCK_TODAYS_DEFICITS = [
  {
    id: 'def-1',
    neighborhood: 'South Ward 4 (East District)',
    priority: 'Critical Need',
    severityScore: 92,
    population: '24,500',
    distanceToSupermarketMiles: 2.8,
    unmetTodayKg: 420,
    mostNeededProduce: ['Leafy Greens', 'Vine Tomatoes', 'Onions'],
    participatingStores: 6,
    status: 'Surplus Dispatched',
    urgencyColor: 'rose'
  },
  {
    id: 'def-2',
    neighborhood: 'Highland Heights (Ward 7)',
    priority: 'Critical Need',
    severityScore: 86,
    population: '18,200',
    distanceToSupermarketMiles: 2.4,
    unmetTodayKg: 310,
    mostNeededProduce: ['Spinach', 'Carrots', 'Apples'],
    participatingStores: 5,
    status: 'Matching in Progress',
    urgencyColor: 'rose'
  },
  {
    id: 'def-3',
    neighborhood: 'Riverdale Junction',
    priority: 'High Priority',
    severityScore: 78,
    population: '15,400',
    distanceToSupermarketMiles: 1.9,
    unmetTodayKg: 240,
    mostNeededProduce: ['Potatoes', 'Sweet Corn', 'Cabbage'],
    participatingStores: 4,
    status: 'Allocated',
    urgencyColor: 'amber'
  },
  {
    id: 'def-4',
    neighborhood: 'Metro North Corridor',
    priority: 'High Priority',
    severityScore: 74,
    population: '31,000',
    distanceToSupermarketMiles: 2.1,
    unmetTodayKg: 380,
    mostNeededProduce: ['Bell Peppers', 'Kale', 'Cucumbers'],
    participatingStores: 7,
    status: 'Pending Supply',
    urgencyColor: 'amber'
  },
  {
    id: 'def-5',
    neighborhood: 'West Valley Flats',
    priority: 'Moderate Need',
    severityScore: 65,
    population: '12,800',
    distanceToSupermarketMiles: 1.6,
    unmetTodayKg: 190,
    mostNeededProduce: ['Squash', 'Oranges', 'Root Greens'],
    participatingStores: 3,
    status: 'Sufficient Stock',
    urgencyColor: 'emerald'
  }
];

export const MOCK_SURPLUS_LISTINGS = [
  {
    id: 'prod-101',
    name: 'Heirloom Vine Tomatoes',
    farm: 'Skyline Rooftop Farm',
    farmer: 'Marcus Vance',
    location: 'Downtown North (1.2 mi away)',
    distanceMiles: 1.2,
    quantity: '180 kg',
    pricePerKg: 1.65,
    commercialPrice: 3.40,
    category: 'Vegetables',
    qualityScore: 96,
    qualityTier: 'Tier 1 Premium',
    harvestTime: 'Harvested 6h ago',
    gemmaVerified: true,
    solanaCertified: true,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    description: 'Vine-ripened organic tomatoes with high natural brix sweetness and firm cellular walls.'
  },
  {
    id: 'prod-102',
    name: 'Fresh Curly Dinosaur Kale',
    farm: 'Green Haven Community Garden',
    farmer: 'Elena Rostova',
    location: 'East Riverview (1.8 mi away)',
    distanceMiles: 1.8,
    quantity: '95 kg',
    pricePerKg: 1.20,
    commercialPrice: 2.75,
    category: 'Leafy Greens',
    qualityScore: 94,
    qualityTier: 'Tier 1 Premium',
    harvestTime: 'Harvested this morning',
    gemmaVerified: true,
    solanaCertified: true,
    image: 'https://images.unsplash.com/photo-1524179091875-bf99a9a6fa57?auto=format&fit=crop&w=600&q=80',
    description: 'Pesticide-free Tuscan curly kale bunches, pre-bundled and hydro-cooled.'
  },
  {
    id: 'prod-103',
    name: 'Sweet Crisp Honeycrisp Apples',
    farm: 'Urban Orchard Initiative',
    farmer: 'Devon Patel',
    location: 'Westside Beltway (2.4 mi away)',
    distanceMiles: 2.4,
    quantity: '320 kg',
    pricePerKg: 1.85,
    commercialPrice: 4.10,
    category: 'Fruits',
    qualityScore: 91,
    qualityTier: 'Tier 2 Fresh Grade',
    harvestTime: 'Harvested yesterday',
    gemmaVerified: true,
    solanaCertified: true,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
    description: 'Sweet, juicy orchard surplus with minor aesthetic size variations but pristine flavor.'
  },
  {
    id: 'prod-104',
    name: 'Tri-Color Bell Peppers',
    farm: 'Apex Hydroponic Sheds',
    farmer: 'Sarah Lin',
    location: 'Midtown Hub (0.9 mi away)',
    distanceMiles: 0.9,
    quantity: '140 kg',
    pricePerKg: 1.70,
    commercialPrice: 3.80,
    category: 'Vegetables',
    qualityScore: 95,
    qualityTier: 'Tier 1 Premium',
    harvestTime: 'Harvested 3h ago',
    gemmaVerified: true,
    solanaCertified: true,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80',
    description: 'Crisp red, yellow, and orange bell peppers grown under LED spectrum hydroponics.'
  },
  {
    id: 'prod-105',
    name: 'Fresh Rainbow Organic Carrots',
    farm: 'Terra Nova Urban Soil Lab',
    farmer: 'James Wilson',
    location: 'South Belt (2.1 mi away)',
    distanceMiles: 2.1,
    quantity: '210 kg',
    pricePerKg: 1.10,
    commercialPrice: 2.50,
    category: 'Root Vegetables',
    qualityScore: 93,
    qualityTier: 'Tier 1 Premium',
    harvestTime: 'Harvested 10h ago',
    gemmaVerified: true,
    solanaCertified: true,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80',
    description: 'Sweet baby rainbow carrots with crisp tops intact, washed in triple-filtered rain catch.'
  },
  {
    id: 'prod-106',
    name: 'Baby Spinach & Herb Blend',
    farm: 'Beacon Hill Community Co-Op',
    farmer: 'Maya Thorne',
    location: 'North Hill (1.5 mi away)',
    distanceMiles: 1.5,
    quantity: '75 kg',
    pricePerKg: 1.45,
    commercialPrice: 3.20,
    category: 'Leafy Greens',
    qualityScore: 97,
    qualityTier: 'Tier 1 Premium',
    harvestTime: 'Harvested 4h ago',
    gemmaVerified: true,
    solanaCertified: true,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80',
    description: 'Tender baby spinach leaves mixed with fresh organic basil sprigs.'
  }
];

// Alias for backwards-compatibility
export const MOCK_MARKETPLACE_LISTINGS = MOCK_SURPLUS_LISTINGS;

export const MOCK_RECOMMENDED_MATCH = {
  id: 'match-8841',
  matchScore: 98,
  algorithmRating: 'Optimal Proximity & Demand Alignment',
  rating: 'Optimal Proximity & Demand Alignment',
  produce: 'Heirloom Vine Tomatoes',
  quantity: '120 kg',
  farm: {
    name: 'Skyline Rooftop Farm',
    operator: 'Marcus Vance',
    distance: '1.2 miles away',
    reputation: 99,
    solanaBadge: 'Solana Verified Producer'
  },
  buyer: {
    name: 'Al-Madina Local Fresh Grocers',
    owner: 'Tariq Hashmi',
    neighborhood: 'South Ward 4 (Critical Deficit Zone)',
    distance: '1.2 miles (8 min electric van transit)',
    reputation: 98,
    solanaBadge: 'Solana Verified Neighborhood Buyer'
  },
  pricePerKg: 1.65,
  commercialMarketPrice: 3.40,
  savingsTotal: '$210.00 saved (51% wholesale discount)',
  savingsSummary: '$210.00 saved (51% wholesale discount)',
  quality: 'Tier 1 Premium (96/100 by Gemma 4)',
  freshnessEstimate: '5-7 days optimal shelf-life',
  carbonReducedKg: '38.4 kg CO2e diverted from interstate freight',
  matchReason: 'Direct alignment: High surplus of vine tomatoes matches urgent 120 kg deficit in Ward 4, within 1.2-mile radius.'
};

export const MOCK_TRUST_ENTITIES = [
  {
    name: 'Skyline Rooftop Farm',
    type: 'Urban Producer',
    walletShort: '7xKp...9J2q',
    reputationScore: 99,
    completedDeals: 142,
    onChainStatus: 'Verified On-Chain',
    badge: 'Tier 1 Anchor Producer',
    escrowReady: true
  },
  {
    name: 'Al-Madina Local Fresh Grocers',
    type: 'Local Store Buyer',
    walletShort: '3vMn...8LtP',
    reputationScore: 98,
    completedDeals: 87,
    onChainStatus: 'Verified On-Chain',
    badge: 'Affordable Food Champion',
    escrowReady: true
  },
  {
    name: 'Green Haven Community Garden',
    type: 'Community Co-Op',
    walletShort: '9rQz...4WbC',
    reputationScore: 97,
    completedDeals: 64,
    onChainStatus: 'Verified On-Chain',
    badge: 'Zero-Waste Pioneer',
    escrowReady: true
  },
  {
    name: 'Bodega 24 Express',
    type: 'Corner Store Buyer',
    walletShort: '2pXy...5KdF',
    reputationScore: 96,
    completedDeals: 52,
    onChainStatus: 'Verified On-Chain',
    badge: 'Fresh Oasis Partner',
    escrowReady: true
  }
];

export const GEMMA_SAMPLE_PREVIEWS = [
  {
    id: 'sample-1',
    label: 'Sample: Vine Tomatoes',
    produceName: 'Heirloom Vine Tomatoes',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    qualityScore: 96,
    tier: 'Tier 1 (Premium Fresh)',
    shelfLife: '6-8 days',
    defects: '1.2% minor blemish',
    freshnessMetrics: {
      firmness: '95%',
      colorVibrancy: '98%',
      stemHydration: '92%'
    },
    gemmaVerdict: 'Exceptional firmness & brix. Harvested <8 hours ago. Safe for premium distribution.'
  },
  {
    id: 'sample-2',
    label: 'Sample: Organic Kale',
    produceName: 'Fresh Curly Dinosaur Kale',
    image: 'https://images.unsplash.com/photo-1524179091875-bf99a9a6fa57?auto=format&fit=crop&w=600&q=80',
    qualityScore: 94,
    tier: 'Tier 1 (Premium Fresh)',
    shelfLife: '5-7 days',
    defects: '0.8% edge yellowing',
    freshnessMetrics: {
      firmness: '93%',
      colorVibrancy: '96%',
      stemHydration: '94%'
    },
    gemmaVerdict: 'Deep chlorophyllic pigmentation, crisp cellular turgor. No pesticide residue patterns.'
  },
  {
    id: 'sample-3',
    label: 'Sample: Crisp Apples',
    produceName: 'Honeycrisp Apples',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
    qualityScore: 91,
    tier: 'Tier 2 (Fresh Grade)',
    shelfLife: '10-14 days',
    defects: '3.4% cosmetic skin variance',
    freshnessMetrics: {
      firmness: '91%',
      colorVibrancy: '89%',
      stemHydration: '88%'
    },
    gemmaVerdict: 'High internal crispness despite non-uniform surface sizing. Perfect for neighborhood retail.'
  }
];
