import isUrlFound from "../utils/checkUrl";

export default class Ship {
  name;
  edition;
  ipfsImageUrl;
  attributes;

  constructor(name, edition, ipfsImageUrl, attributes) {
    this.name = name;
    this.edition = edition;
    this.ipfsImageUrl = ipfsImageUrl;
    this.attributes = attributes;
  }


  getNFTImage(){
    let ipfsImageUrl = this.ipfsImageUrl;
    if (ipfsImageUrl.includes("ipfs")) {
      return ipfsImageUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
    } else {
      return ipfsImageUrl;
    }
  }

  async getGameImage() {
    if(this.name === "default"){
      return "/images/ships/default.png";
    }

    const { color, engine, shield} = this.attributes
    let imageUrl =
      `/images/ships/${color}_${engine}_${shield}.png`.toLowerCase();
    const exist = await isUrlFound(imageUrl);
    if (!exist) {
      imageUrl = "/images/ships/default.png";
    }
    return imageUrl;
  }
}
