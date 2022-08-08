import isUrlFound from "../utils/checkUrl";

export class ShipAttributes {
  constructor(color, engine, shield, weapon) {
    this.color = color;
    this.engine = engine;
    this.shield = shield;
    this.weapon = weapon;
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
    const { color, engine, shield } = this.attributes;
    let imageUrl =
      `/images/ships/${color}_${engine}_${shield}.png`.toLowerCase();
    const exist = await isUrlFound(imageUrl);
    if (!exist) {
      imageUrl = "/images/ships/default.png";
    }
    return imageUrl;
  }
}
