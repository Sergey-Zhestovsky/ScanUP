let config = require("../../config"),
  modelsArr = require("../data/models.json").models,
  dbAPI = require("../db/API"),
  ScanDescription = require("./ScanDescription"),
  round = require("../modules/round");

class Scan {
  constructor({ weight, model, summary, descriptionHesh, time }) {
    this.weight = weight;
    this.model = model;
    this.summary = summary;
    this.descriptionHesh = descriptionHesh;
    this.time = time;
  }

  static async create() {
    let samples = await dbAPI.scan.getDescriptionSample((Math.random() * 3) + 1);

    return new Scan({
      weight: round(((Math.random() * 20) + 5), 1000),
      model: modelsArr[Math.floor(Math.random() * modelsArr.length)],
      summary: round(100 - (Math.pow(Math.random(), 3) * 100), 100),
      descriptionHesh: ScanDescription.getDescriptionBySamples(samples.placeDescription, samples.typeDescription),
      time: Date.now()
    });
  }

  async Get() {
    return {
      weight: round(this.weight, 1000),
      model: config.imageStorage.models + this.model,
      summary: round(this.summary, 100),
      description: await ScanDescription.describe(this.descriptionHesh),
      time: this.time
    }
  }

  async GetWithSource() {
    return {
      source: this,
      public: await this.Get()
    };
  }

  verify() {
    this.weight += (Math.random() - .5) / 10;
    this.summary += Math.random() - .8;
    this.time = Date.now();

    return this;
  }
}

module.exports = Scan;