var express = require('express');
var router = express.Router();
var httpProxy = require('http-proxy');
var fs = require('fs');

router.get('/', function (req, res) {
  res.render('index');
});
router.get('/:membershipType/:guardian', function (req, res) {
  res.render('guardian');
});

var bungieProxy = httpProxy.createProxyServer({
  target: 'http://www.bungie.net',
  autoRewrite: true
});

bungieProxy.on('proxyReq', function(proxyReq, req, res) {
  proxyReq.setHeader('host', 'www.bungie.net');
  proxyReq.setHeader('x-api-key', process.env.BUNGIE_KEY);
});

bungieProxy.on('error', function(err, req, res) {
  console.log(err);
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('Something went wrong contacting Bungie.');
});

router.get('/Platform*', function (req, res) {
  bungieProxy.web(req, res);
})

module.exports = router;