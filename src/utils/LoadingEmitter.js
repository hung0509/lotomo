class LoadingEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    this.listeners[event] = (this.listeners[event] || []).filter(
      (cb) => cb !== callback
    );
  }

  emit(event) {
    (this.listeners[event] || []).forEach((cb) => cb());
  }
}

export const loadingEmitter = new LoadingEmitter();