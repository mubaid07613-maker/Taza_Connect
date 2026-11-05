/**
 * Snowflake CoCo — Demand Intelligence Service Abstraction
 * 
 * Provides predictive hyper-local food demand, supply gap projections,
 * and deficit severity rankings.
 * 
 * Note: For the hackathon MVP, this module returns a realistic local demo dataset
 * structured identically to the output of a Snowflake CoCo (Cortex / Compute) SQL query.
 * It is clearly labeled as a demo dataset and is modularly ready for live Snowflake connection.
 */

// Realistic Demo Dataset representing output of Snowflake CoCo predictive models
export const MOCK_SNOWFLAKE_COCO_DATA = [
  {
    id: 'coco-001',
    neighborhood: 'North District',
    produce: 'Romaine Lettuce',
    day: 'Thursday',
    predicted_demand_kg: 180,
    available_supply_kg: 92,
    deficit_kg: 88,
    deficit_score: 94,
    priority: 'High'
  },
  {
    id: 'coco-002',
    neighborhood: 'West District',
    produce: 'Tomatoes',
    day: 'Friday',
    predicted_demand_kg: 240,
    available_supply_kg: 165,
    deficit_kg: 75,
    deficit_score: 72,
    priority: 'Medium'
  },
  {
    id: 'coco-003',
    neighborhood: 'South District',
    produce: 'Spinach',
    day: 'Saturday',
    predicted_demand_kg: 120,
    available_supply_kg: 48,
    deficit_kg: 72,
    deficit_score: 89,
    priority: 'High'
  },
  {
    id: 'coco-004',
    neighborhood: 'East District',
    produce: 'Baby Carrots',
    day: 'Wednesday',
    predicted_demand_kg: 160,
    available_supply_kg: 70,
    deficit_kg: 90,
    deficit_score: 92,
    priority: 'High'
  },
  {
    id: 'coco-005',
    neighborhood: 'North District',
    produce: 'Bell Peppers',
    day: 'Tuesday',
    predicted_demand_kg: 110,
    available_supply_kg: 70,
    deficit_kg: 40,
    deficit_score: 62,
    priority: 'Medium'
  },
  {
    id: 'coco-006',
    neighborhood: 'Central Ward',
    produce: 'Organic Kale',
    day: 'Monday',
    predicted_demand_kg: 95,
    available_supply_kg: 45,
    deficit_kg: 50,
    deficit_score: 68,
    priority: 'Medium'
  },
  {
    id: 'coco-007',
    neighborhood: 'South District',
    produce: 'Sweet Potatoes',
    day: 'Sunday',
    predicted_demand_kg: 140,
    available_supply_kg: 95,
    deficit_kg: 45,
    deficit_score: 58,
    priority: 'Medium'
  }
];

export const snowflakeCoCoService = {
  /**
   * Fetches full demand intelligence records
   */
  async getDemandRecords() {
    return [...MOCK_SNOWFLAKE_COCO_DATA];
  },

  /**
   * Returns highest-priority food deficits
   */
  async getHighestPriorityDeficits() {
    return MOCK_SNOWFLAKE_COCO_DATA
      .filter(item => item.priority === 'High' || item.priority === 'Critical')
      .sort((a, b) => b.deficit_score - a.deficit_score);
  },

  /**
   * Aggregates deficits by neighborhood
   */
  async getDeficitByNeighborhood() {
    const map = new Map();

    for (const row of MOCK_SNOWFLAKE_COCO_DATA) {
      const existing = map.get(row.neighborhood) || {
        totalDemand: 0,
        totalSupply: 0,
        totalDeficit: 0,
        topProduce: row.produce,
        maxDef: 0,
        priority: row.priority
      };

      existing.totalDemand += row.predicted_demand_kg;
      existing.totalSupply += row.available_supply_kg;
      existing.totalDeficit += row.deficit_kg;

      if (row.deficit_kg > existing.maxDef) {
        existing.maxDef = row.deficit_kg;
        existing.topProduce = row.produce;
      }
      if (row.priority === 'High') {
        existing.priority = 'High';
      }

      map.set(row.neighborhood, existing);
    }

    return Array.from(map.entries()).map(([neighborhood, stats]) => ({
      neighborhood,
      totalDemandKg: stats.totalDemand,
      totalSupplyKg: stats.totalSupply,
      totalDeficitKg: stats.totalDeficit,
      highestDeficitProduce: stats.topProduce,
      priority: stats.priority
    }));
  },

  /**
   * Aggregates deficits across days of the week
   */
  async getDeficitByDayOfWeek() {
    const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const map = new Map();

    for (const d of daysOrder) {
      map.set(d, { totalDeficit: 0, topProduce: 'None', topNeighborhood: 'None', maxDef: 0 });
    }

    for (const row of MOCK_SNOWFLAKE_COCO_DATA) {
      const current = map.get(row.day);
      current.totalDeficit += row.deficit_kg;
      if (row.deficit_kg > current.maxDef) {
        current.maxDef = row.deficit_kg;
        current.topProduce = row.produce;
        current.topNeighborhood = row.neighborhood;
      }
    }

    return daysOrder.map(day => ({
      day,
      totalDeficitKg: map.get(day).totalDeficit,
      topDeficitProduce: map.get(day).topProduce,
      topDeficitNeighborhood: map.get(day).topNeighborhood
    }));
  },

  /**
   * Returns the primary predictive insight
   */
  getPrimaryInsight() {
    return 'North District is predicted to experience its highest Romaine Lettuce deficit on Thursday.';
  }
};

export default snowflakeCoCoService;
