import mongoose, { Schema, Document } from "mongoose";

export interface GlobalTerrorism extends Document {
    eventid: number;
    iyear: number;
    imonth: number;
    country_txt: string;
    region_txt: string;
    city: string;
    latitude: number;
    longitude: number;
    attacktype1_txt: string;
    gname: string;
    nkill: number | null;
    nwound: number | null;
    summary: string | null;
};

const globalTerrorismSchema = new Schema<GlobalTerrorism>({
    eventid: { type: Number, index: true }, 
    iyear: { type: Number, index: true },
    imonth: { type: Number, index: true },
    country_txt: { type: String, index: true },
    region_txt: { type: String, index: true },
    city: { type: String, index: true },
    latitude: { type: Number },
    longitude: { type: Number },
    attacktype1_txt: { type: String, index: true },
    gname: { type: String, index: true },
    nkill: { type: Number, default: null, index: true },
    nwound: { type: Number, default: null, index: true },
    summary: { type: String, default: null },
});

globalTerrorismSchema.index({ latitude: 1, longitude: 1});

export default mongoose.model<GlobalTerrorism>("GlobalTerrorism", globalTerrorismSchema);