const { Router } = require('express');
const router = Router();

// Require of path to send the html index file
const path = require('path');

// Test base page
router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../static/html/index.html'));
});

module.exports = router;