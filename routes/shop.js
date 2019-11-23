const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('navigated to /');
    res.send('Navigated to /');
});

module.exports = router;