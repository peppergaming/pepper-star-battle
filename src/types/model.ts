export interface ShipModel{
    assetId?: string;
    edition: number;
    imgUrl: string;
    attributes: AttributeModel[];
}

export interface AttributeModel{
    name: string;
    value: string;
}

export interface ShipGridModel{
    assets: ShipModel[]
}