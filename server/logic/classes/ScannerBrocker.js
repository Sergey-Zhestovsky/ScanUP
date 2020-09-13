class ScannerBrocker {
  constructor() {
    this.requestsQueue = new Map();
  }

  request(key, handler, response) {
    this.setInQueue(key, handler);
    
    response.on("close", () => {
      this.removeFromQueue(key, handler);
    });
  }

  async response(key, handler) {
    let responseAnswer = new ResponseAnswer(),
      handlers = this.requestsQueue.get(key);

    if (!handlers)
      return handler(null);

    await Promise.all(handlers.map(handler => handler(responseAnswer)));

    this.removeFromQueue(key);

    return handler(responseAnswer.get());
  }

  setInQueue(key, value) {
    let queue = this.requestsQueue;

    if (queue.has(key))
      return queue.set(key, [...queue.get(key), value]);

    return queue.set(key, [value]);
  }

  removeFromQueue(key, value) {
    let queue = this.requestsQueue;

    if (!value || !queue.get(key))
      return queue.delete(key);

    let values = [...queue.get(key)];

    values.splice(values.indexOf(value), 1);

    if (values.length === 0)
      return queue.delete(key);

    return queue.set(key, values);
  }
}

class ResponseAnswer {
  constructor() {
    this.response = [];
  }

  add(answer) {
    this.response.push(answer);
  }

  get() {
    return this.response;
  }
}

module.exports = ScannerBrocker;