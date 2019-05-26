import io from 'socket.io-client';
// import queryString from 'query-string';

// const parsed = queryString.parse(window.location.search);

class Socket {
  constructor(ua = 'control', disable = false) {
    this.uid = this.random();
    // this.group = parsed.group || 'prod';
    this.disable = disable;
    this.socket = io('http://47.102.198.102:8080/', {
      transports: ['websocket'],
      query: {
        ua,
        group: 'prod',
      },
    });
    this.isSpeaker = false;
    this.speakerHandlers = [];

    this.socket.on('room', ({ speaker }) => {
      this.isSpeaker = speaker === this.socket.id;
      this.speakerHandlers.forEach((cb) => {
        if (typeof cb === 'function') {
          cb(this.isSpeaker);
        }
      });
    });
  }

  random = () => Date.now() + Math.random();

  registerSpeakerHandler = (callback) => {
    this.unregisterSpeakerHandler(callback);
    this.speakerHandlers.push(callback);
  };

  unregisterSpeakerHandler = (callback) => {
    let i = -1;
    this.speakerHandlers.some((cb, index) => {
      if (cb === callback) {
        i = index;
        return true;
      }
      return false;
    });
    if (i >= 0) {
      this.speakerHandlers.splice(i, 1);
    }
  };

  dispatch = (data) => {
    // if (!this.isSpeaker && !data.speaker) {
    //   return Promise.resolve();
    // }

    data.uid = this.uid;
    data.timestamp = this.random();
    this.socket.emit('dispatch', data);
    if (data.speaker) {
      return new Promise((resolve, reject) => {
        this.registerSpeakerHandler((r) => {
          if (r) {
            resolve();
          } else {
            reject();
          }
        });
      });
    }
    return new Promise((resolve) => {
      const callback = (res) => {
        if (this.uid === res.uid && res.timestamp === data.timestamp) {
          this.socket.off('dispatch', callback);
          resolve();
        }
      };
      this.socket.on('dispatch', callback);
    });
  };

  sent = (data, force) => {
    if (!this.isSpeaker && !force) {
      return;
    }
    data.uid = this.uid;
    data.group = this.group;
    this.socket.emit('msg', data);
  };

  on = (name, call) => {
    if (!this.disable) {
      this.socket.on(name, call);
    }
  };

  close = () => {
    this.socket.close();
  };

  send = (data) => {
    this.dispatch({
      source: 'control',
      targets: ['control'],
      type: 'dispatch',
      payload: data,
    })
  }
}

const socket = new Socket('control', window.location.pathname === '/console');
export const MsgSocket = Socket;

export default socket;
