var express = require('express'),
  path = require('path'),
  routes = require('./routes/index')

var app = express();

app.set('port', (process.env.PORT || 3000));

app.set('view engine', 'jade');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/partials', express.static(path.join(__dirname, 'views/partials')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/', routes);

app.use(function(req, res, next) {
  res.status(404).send('Sorry can\'t find that!');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(app.get('port'), function() {
  console.log('Days Without Destiny is running on port', app.get('port'));
});