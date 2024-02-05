const axios = require('axios');

axios.post('http://localhost:3000/api/v1/pricing/calculate', {
    zone: 'central',
    organization_id: '005',
    item_type: 'perishable',
    total_distance: 12
})
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        if (error.response) {
            // The request was made, but the server responded with an error status code
            console.error('Error Response Data:', error.response.data);
            console.error('Error Response Status:', error.response.status);
            console.error('Error Response Headers:', error.response.headers);
        } else if (error.request) {
            // The request was made, but no response was received
            console.error('No response received. Request details:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', error.message);
        }
    });
