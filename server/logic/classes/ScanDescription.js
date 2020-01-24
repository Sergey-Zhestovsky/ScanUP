let dbAPI = require("../db/API");

class ScanDescription {
  static getDescriptionBySamples(placeDescriptions, typeDescriptions) {
    let result = [],
      palces = placeDescriptions.map(el => el.index),
      types = typeDescriptions.map(el => el.index);

    for (let i = 0; i < palces.length; i++) {
      result.push(ScanDescription.encrypt(
        palces[i], `${loc()}-${loc()}`, types[i], size()
      ));
    }

    return result;

    function loc() {
      return ((Math.random() * 4) | 0) + 1;
    }

    function size() {
      return (Math.random() * 1000 | 0) / 100;
    }
  }

  static async describe(descriptionArray) {
    let decrypted = descriptionArray.map(el => ScanDescription.decrypt(el)),
      places = [], types = [], result = [];

    for (let obj of decrypted) {
      places.push(obj.place);
      types.push(obj.type);
    }

    let { placeDescription, typeDescription } = await dbAPI.scan.getDescriptionsByIndex(places, types);

    result = decrypted.map(el => {
      return `Locaton: ${
        findName(el.place, placeDescription)
        }, sector: ${
        el.location
        }. Damage type: ${
          findName(el.type, typeDescription)
        } - ${
        el.size
        }%`;
    });

    return result;

    function findName(index, array) {
      for (let el of array)
        if (el.index === index)
          return el.name;

      return null;
    }
  }

  static fillArrayWithIndexes(obj) {
    return obj.map(el => el.index);
  }

  static encrypt(place, location, type, size) {
    return `${place}:${location}:${type}:${size}`;
  }

  static decrypt(string) {
    let temp = string.split(":");

    return {
      place: temp[0],
      location: temp[1],
      type: temp[2],
      size: temp[3]
    };
  }
}

module.exports = ScanDescription;