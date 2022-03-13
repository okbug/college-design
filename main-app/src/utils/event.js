import request from "../api";

class Event {
  constructor() {
    this.map = new Map();
  }

  on(name, fn) {
    const arr = this.map.get(name) || [];
    arr.push(fn);
    this.map.set(name, arr);
  }

  onOnce(name, fn) {
    this.map.set(name, fn);
  }

  emitOnce(name, ...payload) {
    const fn = this.map.get(name);
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

event.on("get", (...args) => {
  return request.get(...args);
});

event.on('updateDocument', (data) => {
  return request.post('/updateDocument', data)
})
export default event;
