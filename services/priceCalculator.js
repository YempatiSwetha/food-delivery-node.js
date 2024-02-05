// services/priceCalculator.js
const { Pricing } = require('../models');

class PriceCalculator {
  async calculatePrice(zone, organizationId, itemType, totalDistance) {
    const pricing = await Pricing.findOne({
      where: { zone, organization_id: organizationId, type: itemType },
    });

    if (!pricing) {
      throw new Error('No pricing found for the given organization, zone, and item type');
    }

    const basePrice = pricing.fix_price;
    const perKmPrice = pricing.km_price;
    const baseDistance = pricing.base_distance_in_km;

    let totalPrice = basePrice;

    if (totalDistance > baseDistance) {
      const extraDistance = totalDistance - baseDistance;
      totalPrice += perKmPrice * extraDistance;
    }

    return totalPrice;
  }
}

module.exports = PriceCalculator;

