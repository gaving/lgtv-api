import lgtv from 'lgtv';
import _ from 'lodash';

class Action {
  constructor(op) {
    this.op = op;
  }
  connect() {
    return new Promise((resolve, reject) => {
      lgtv.connect((err, resp) => {
        if (err) {
          reject(resp);
        } else {
          resolve(resp);
        }
      });
    });
  }
  index(req, res) {
    this.get().then((v) => {
      res.send(v);
    }).catch((e) => {
      res.send({error: e});
    });
  }
  get() {
    return new Promise((resolve, reject) => {
      this.connect().then(() => {
        lgtv[this.op]((err, resp) => {
          let data = {};
          data[this.op] = resp;
          if (err) {
            reject(resp);
          } else {
            resolve(data);
          }
        });
      });
    });
  }
  post(req, res) {
    this.connect().then(() => {
      let [[op, val]] = _.pairs(req.body);
      lgtv['set_' + op](val, (err, resp) => {
        res.send(resp);
      });
    });
  }
}

export class Mute extends Action {
  constructor() {
    super('muted');
  }
}

export class Channel extends Action {
  constructor() {
    super('channel');
  }
}

export class Volume extends Action {
  constructor() {
    super('volume');
  }
}

export class Input extends Action {
  constructor() {
    super('input');
  }
}
