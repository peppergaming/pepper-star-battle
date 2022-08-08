export interface ShipModel {
  name?: string;
  edition: number;
  image_url: string;
  attributes: AttributeModel[];
}

export interface AttributeModel {
  name: string;
  value: string;
}

export interface ShipGridModel {
  assets: ShipModel[];
}
