const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('app', { title: 'My express app', message:'Hello' });
});

module.exports = router;