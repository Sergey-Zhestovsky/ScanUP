import Connector from "./Connector";

export default class QrCode extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      get: pathStructure.get = ""
    } = pathStructure);

    this.pathStructure = pathStructure;
  }

  get(data) {
    let path = this.pathStructure;

    let body = {
      "data": "https://www.qrcode-monkey.com",
      "config": {
        "body": "circle",
        "logo": "#facebook"
      },
      "size": 300,
      "download": false,
      "file": "svg"
    };

    return super.straightRequest(path.root + path.get, body, {
      headers: {
        "x-rapidapi-host": "qrcode-monkey.p.rapidapi.com",
	"x-rapidapi-key": "e43a14e0b0msh6c053dae71e0e15p1adf43jsn1cf6cd7324f6",
	"content-type": "application/json",
	"accept": "application/json"
    }
    });
  }
}


