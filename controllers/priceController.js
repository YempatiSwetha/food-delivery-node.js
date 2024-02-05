/*// priceController.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const PriceCalculator = require('../calculators/priceCalculator');

const router = express.Router();

// Validate the request body
const validatePriceCalculation = [
  body('zone').notEmpty().withMessage('Zone is required'),
  body('organization_id').notEmpty().withMessage('Organization ID is required'),
  body('item_type').notEmpty().withMessage('Item type is required'),
  body('total_distance')
    .isNumeric()
    .withMessage('Total distance must be a number')
    .custom((value) => value >= 0)
    .withMessage('Total distance must be non-negative'),
];

router.post('/api/v1/pricing/calculate', validatePriceCalculation, async (req, res) => {
  console.log('Received POST request to /api/v1/pricing/calculate');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { zone, organization_id, item_type, total_distance } = req.body;
    console.log('Calculating price...');
    const price = await PriceCalculator.calculatePrice(zone, organization_id, item_type, total_distance);
    console.log('Price calculated successfully:', price);
    res.json({ total_price: price }); // Respond with the calculated total price
  } catch (error) {
    console.error('Error calculating price:', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;*/
const express = require('express');
const { body, validationResult } = require('express-validator');
const PriceCalculator = require('../calculators/priceCalculator');

const router = express.Router();

const validatePriceCalculation = [
  body('zone').notEmpty().withMessage('Zone is required'),
  body('organization_id').notEmpty().withMessage('Organization ID is required'),
  body('item_type').notEmpty().withMessage('Item type is required'),
  body('total_distance')
    .isNumeric()
    .withMessage('Total distance must be a number')
    .custom((value) => value >= 0)
    .withMessage('Total distance must be non-negative'),
];

router.post('/api/v1/pricing/calculate', validatePriceCalculation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { zone, organization_id, item_type, total_distance } = req.body;
    const price = await PriceCalculator.calculatePrice(zone, organization_id, item_type, total_distance);
    res.json({ total_price: price });
  } catch (error) {
    console.error('Error calculating price:', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

