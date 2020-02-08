import { tsConnector } from "../storage/connections/rootConnector";

export default class TransportSystems {
  constructor() {
    this.ts = [];
  }

  Get() {
    return [...this.ts];
  }

  async synchronize() {
    let answer;

    try {
      answer = await tsConnector.getAll();

      this.ts = answer;
    } catch (error) {
      console.error(error)
    }

    return this.Get();
  }

  add(ts) {
    this.ts = [...this.ts, ts];

    return this.Get();
  }

  async deleteById(id) {
    let el = this.findById(id);

    if (el === null)
      return this.Get();

    try {
      let answer = await tsConnector.delete({ id });
      this.ts.splice(el[1], 1);

    } catch (error) {
      console.error(error);
    }

    return this.Get();
  }

  findById(id) {
    for (let i = 0; i < this.ts.length; i++) {
      if (this.ts[i]._id === id)
        return [this.ts[i], i];
    }

    return null;
  }

  updateById(id, obj) {
    let [ts, index] = this.findById(id);

    if (ts) {
      this.ts[index] = {
        ...ts,
        ...obj
      };
    }

    return this.Get();
  }
}