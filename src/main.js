import express from 'express';
import bodyParser from 'body-parser';

import { Channels, Inputs, Services, Apps } from './resources';
import { Mute, Channel, Volume, Input } from './actions';

const APP_PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.get('/*', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.resource = function (path, obj) {
  this.get(path, obj.index.bind(obj));
  this.get(`${ path }/:id`, obj.get.bind(obj));
};

app.resource('/channels', new Channels());
app.resource('/inputs', new Inputs());
app.resource('/services', new Services());
app.resource('/apps', new Apps());

app.resource = function (path, obj) {
  this.get(path, obj.index.bind(obj));
  this.post(path, obj.post.bind(obj));
};

app.resource('/mute', new Mute());
app.resource('/channel', new Channel());
app.resource('/volume', new Volume());
app.resource('/input', new Input());

app.listen(APP_PORT, () => {
  console.log('API started on port 3000');
});
