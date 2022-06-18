const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

//check
const attempt = [];

router.get('/:ticker/inc', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  const url = process.env.AVURL + 'INCOME_STATEMENT&symbol=' + ticker + '&apikey=' + process.env.AVKEY7;

  axios.get(url)
  .then(response => {
    res.json(response.data);
  })

});

router.get('/:ticker/sma', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  const url = process.env.AVURL + 'SMA&symbol=' + ticker + '&interval=weekly&time_period=200&series_type=open&apikey=' + process.env.AVKEY6;

  axios.get(url)
  .then(response => {
    res.json(response.data);
  })
});

router.get('/:ticker/eps', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  const url = process.env.AVURL + 'EARNINGS&symbol=' + ticker + '&apikey=' + process.env.AVKEY5;

  axios.get(url)
  .then(response => {
    res.json(response.data);
  })
  
});

router.get('/:ticker/cf', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  const url = process.env.AVURL + 'CASH_FLOW&symbol=' + ticker + '&apikey=' + process.env.AVKEY4;

  axios.get(url)
  .then(response => {
    res.json(response.data);
  })
});

router.get('/:ticker/bal', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  const url = process.env.AVURL + 'BALANCE_SHEET&symbol=' + ticker + '&apikey=' + process.env.AVKEY3;

  axios.get(url)
  .then(response => {
    res.json(response.data);
  })
});

router.get('/:ticker/price', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  const url = process.env.AVURL + 'TIME_SERIES_DAILY&symbol=' + ticker + '&apikey=' + process.env.AVKEY2;

  axios.get(url)
  .then(response => {
    res.json(response.data);
  })
})

router.get('/:ticker', (req, res) => {
  attempt.push({ time: new Date().getMinutes() });
  const l = attempt.length;
  const check1 = attempt.length >= 2;

  const renderData = () => {
    const ticker = req.params.ticker.toUpperCase();
    const url = process.env.AVURL + 'OVERVIEW&symbol=' + ticker + '&apikey=' + process.env.AVKEY1;
  
    axios.get(url)
    .then(response => {
      const resultData = response.data;
      resultData["Ismaxedout"] = false;
      res.json(resultData);
    })
  }

  if (attempt.length > 2) {
    if (attempt[l-1].time === attempt[l-3].time) {
      console.log("cutting it too close");
      const failsafeResponse = { Ismaxedout: true };
      res.json(failsafeResponse);
    } else {
      renderData();
    }
  } else {
    renderData();
  }
  
});

module.exports = router;