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
export default event;
