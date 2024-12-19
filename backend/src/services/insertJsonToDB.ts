import GlobalTerrorismModel from "../models/globalTerrorismModel";
import fs from "fs";
import mongoose from "mongoose";

const jsonData = JSON.parse(fs.readFileSync('../backend/src/data/globalterrorismdb.json', 'utf-8'));

const insertToDb = async (data: any[]) => {
  try {
    const sanitizedData = data.map((item) => ({
      eventid: item.eventid,
      iyear: item.iyear,
      imonth: item.imonth,
      country_txt: item.country_txt,
      region_txt: item.region_txt,
      city: item.city,
      latitude: item.latitude,
      longitude: item.longitude,
      attacktype1_txt: item.attacktype1_txt,
      gname: item.gname,
      nkill: item.nkill ?? null,
      nwound: item.nwound ?? null,
      summary: item.summary ?? null,
    }));

    const result = await GlobalTerrorismModel.insertMany(sanitizedData);
    console.log(`Inserted ${result.length} documents successfully`);
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

export const runScript = async () => {
  try {
    await insertToDb(jsonData);
  } catch (error) {
    console.error("Script error:", error);
  } finally {
    await mongoose.connection.close();
  }
};
