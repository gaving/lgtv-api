import lgtv from 'lgtv';
import _ from 'lodash';

class Resource {
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
    res.send(this.data);
  }
  get(req, res) {
    res.send(this.data[req.params.id] || { error: 'Cannot find item' });
  }
}

export class Channels extends Resource {
  constructor() {
    super();
    this.connect().then(() => { 
      lgtv.channellist((err, resp) => {
        const data = JSON.parse(resp);
        this.data = _.indexBy(data.channels, 'number');
      });
    });
  }
}

export class Inputs extends Resource {
  constructor() {
    super();
    this.connect().then(() => {
      lgtv.inputlist((err, resp) => this.data = resp);
    });
  }
}

export class Services extends Resource {
  constructor() {
    super();
    this.connect().then(() => {
      lgtv.services((err, resp) => this.data = resp);
    });
  }
}

export class Apps extends Resource {
  constructor() {
    super();
    this.connect().then(() => {
      lgtv.apps((err, resp) => this.data = resp);
    });
  }
}
