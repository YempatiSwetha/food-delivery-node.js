// calculators/priceCalculator.js
const { Pool } = require('pg');

class PriceCalculator {
  static async calculatePrice(zone, organization_id, item_type, total_distance) {
    console.log('Calculating price...');
    // Retrieve the price rules for the given organization and item type from the database
    const priceRules = await this.getPriceRulesFromDatabase(organization_id, item_type);

    // Log input parameters
    console.log('Input Parameters:', { zone, organization_id, item_type, total_distance });
    console.log('Price calculated successfully');
    return price * zoneMultiplier;

    // Calculate the price based on the price rules and the total distance
    let price = 0;
    let selectedRule = null;

    for (const rule of priceRules) {
      if (total_distance >= rule.min_distance && total_distance <= rule.max_distance) {
        price = rule.base_price;
        selectedRule = rule;
        // Log selected rule
        console.log('Selected Rule:', selectedRule);
        break;
      }
    }

    // Apply the zone multiplier to the base price
    const zoneMultiplier = this.getZoneMultiplier(zone);
    // Log zone multiplier
    console.log('Zone Multiplier:', zoneMultiplier);

    // Calculate additional distance cost
    const additionalDistance = Math.max(total_distance - selectedRule.max_distance, 0);
    const additionalCost = additionalDistance * selectedRule.km_price;

    price += additionalCost;

    return price * zoneMultiplier;
  }

  static async getPriceRulesFromDatabase(organization_id, item_type) {
    const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: 5432, // Change as needed
    });

    const query = {
      text: 'SELECT * FROM pricing WHERE organization_id = $1 AND item_type = $2',
      values: [organization_id, item_type],
    };

    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error fetching price rules from the database:', error.message);
      throw error;
    } finally {
      pool.end();
    }
  }

  static getZoneMultiplier(zone) {
    // Replace this with your actual logic to determine the zone multiplier
    const zoneMultipliers = {
      A: 1.0,
      B: 1.1,
      C: 1.2,
      D: 1.3,
    };

    return zoneMultipliers[zone] || 1.0;
  }
}

module.exports = PriceCalculator;
