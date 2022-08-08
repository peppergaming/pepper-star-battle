import isUrlFound from "../utils/checkUrl";

export class ShipAttributes {
  constructor(color, engine, shield) {
    this.color = color;
    this.engine = engine;
    this.shield = shield;
  }
}

export default class Ship {
  constructor(name, edition, ipfsImageUrl, attributes) {
    this.name = name;
    this.edition = edition;
    this.ipfsImageUrl = ipfsImageUrl;
    this.attributes = attributes;
  }

  async getImage() {
    let color = this.attributes[0].value;
    let engine = this.attributes[1].value;
    let shield = this.attributes[2].value;

    let imageUrl =
      `/images/ships/${color}_${engine}_${shield}.png`.toLowerCase();
    const exist = await isUrlFound(imageUrl);
    if (!exist) {
      imageUrl = "/images/ships/default.png";
    }
    return imageUrl;
  }
}
