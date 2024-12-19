import globalTerrorismModel, {
  GlobalTerrorism,
} from "../models/globalTerrorismModel";

export const deadliestAttackTypes = async () => {
  const result = await globalTerrorismModel.aggregate([
    {
      $group: { _id: "$attacktype1_txt", total_fatalities: { $sum: "$nkill" } },
    },
    { $sort: { total_fatalities: -1 } },
    { $limit: 8 },
  ], {allowDiskUse: true });
  return result;
};

export const highestCasualtyRegions = async (groupByErea: string) => {
  const result = await globalTerrorismModel.aggregate([
    {
      $group: {
        _id: `$${groupByErea}`,
        averageCasualties: { $avg: "$nkill" },
        latitude: { $first: "$latitude" },
        longitude: { $first: "$longitude" },
      },
    },
    {
      $sort: { averageCasualties: -1 },
    },
  ], {allowDiskUse: true });
  return result;
};

export const incidentTrends = async (year: number, month: number) => {
  let matchStage: any = {};
  if (year) matchStage.iyear = year;
  if (month) matchStage.imonth = month;
  const result = await globalTerrorismModel.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: {
          year: "$iyear",
          month: "$imonth",
        },
        incidentCount: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ], {allowDiskUse: true });
  return result;
};
// כדי שהמונגו ישתמש בזכרון של המחשב ולא יקרוס
// aliowDiskUse: true

export const topGroups = async (groupBYErea: string) => {
  const result = await globalTerrorismModel.aggregate([
    {
      $match: { region_txt: `${groupBYErea}` },
    },
    {
      $group: {
        _id: "$gname",
        incidentCount: { $sum: 1 },
      },
    },
    {
      $sort: { incidentCount: -1 },
    },
    {
      $limit: 5,
    },
  ], {allowDiskUse: true });
  return result;
};

export const groupsByYear = async (year: number) => {
  const result = await globalTerrorismModel.aggregate([
    {
      $match: { iyear: `${year}` },
    },
    {
      $group: {
        _id: "$gname",
        incidentCount: { $sum: 1 },
      },
    },
    {
      $sort: { incidentCount: -1 },
    },
  ], {allowDiskUse: true });
  return result;
};

export const deadliestRegionsByGroup = async (groupName: string) => {
  const result = await globalTerrorismModel.aggregate([
    {
      $match: { gname: `${groupName}` },
    },
    {
        $group: {
          _id: "$region_txt",
          totalKilled: { $sum: "$nkill" },
          locations: {
            $push: {
              year: "$iyear",
              city: "$city",
              nkill: "$nkill",
              latitude: "$latitude",
              longitude: "$longitude",
            },
          },
        },
      },
    {
      $sort: { totalKilled: -1 },
    },
  ], {allowDiskUse: true });
  return result;
};
