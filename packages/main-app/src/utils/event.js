import request from "../api";

class Event {
  constructor() {
    this.map = new Map();
    this.onesMap = new Map();
  }

  on(name, fn) {
    const arr = this.map.get(name) || [];
    arr.push(fn);
    this.map.set(name, arr);
  }

  onOnce(name, fn) {
    this.onesMap.set(name, fn);
  }

  emitOnce(name, ...payload) {
    const fn = this.onesMap.get(name);
    return fn(...payload);
  }

  emit(name, ...payload) {
    const arr = this.map.get(name) || [];
    return arr.map((fn) => {
      return fn(...payload);
    });
  }
}

const event = new Event();

event.on("post", (...args) => {
  return request.post(...args);
});

event.onOnce('post', (...args) => request.post(...args));
event.onOnce('get', (...args) => request.post(...args));

event.on("get", (...args) => {
  return request.get(...args);
});

event.on('updateDocument', (data) => {
  return request.post('/updateDocument', data)
})

export default event;
