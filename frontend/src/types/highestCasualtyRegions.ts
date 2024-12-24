export interface HighestCasualtyRegionsModel {
  _id: string;
  averageCasualties: number;
  latitude: number | null;
  longitude: number | null;
}

export interface NewHighestCasualtyRegionsModel {
  _id: string;
  averageCasualties: number;
  latitude: number;
  longitude: number;
}
