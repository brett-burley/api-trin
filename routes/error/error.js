const express = require('express');
const router = express.Router();

// custom override of express 404/error messages for security purposes

router.use((req, res, next) => {
  res.status(404).send("Sorry not found")
})


router.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Server Error')
})


module.exports = router;
