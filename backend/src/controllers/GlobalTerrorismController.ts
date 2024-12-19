import { Request, Response } from "express";
import {
  deadliestAttackTypes,
  highestCasualtyRegions,
  incidentTrends,
  topGroups,
  groupsByYear,
  deadliestRegionsByGroup
} from "../services/aggregationsService";

export const getBigAttacks = async (req: Request, res: Response) => {
  try {
    const globalTerrorismData = await deadliestAttackTypes();
    res.status(200).json(globalTerrorismData);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getErea = async (req: Request, res: Response) => {
    try {
      const { groupByErea } = req.body;
      if (!groupByErea) {
        res.status(400).json({ message: "שם האיזור לא חוקי" });
        return;
      }
      const globalTerrorismData = await highestCasualtyRegions(groupByErea);
      res.status(200).json(globalTerrorismData);
    } catch (error) {
      res.status(500).json({ message: error });
    }
};

export const getTrends = async (req: Request, res: Response) => {
    try {
      const { year, month } = req.body;
      if (!year && !month) {
        res.status(400).json({ message: "פרמטר חסר" });
        return;
      }
      const globalTerrorismData = await incidentTrends(year, month);
      res.status(200).json(globalTerrorismData);
    } catch (error) {
      res.status(500).json({ message: error });
    }
};

export const getTopGroups = async (req: Request, res: Response) => {
    try {
      const { groupByErea } = req.body;
      if (!groupByErea) {
        res.status(400).json({ message: "שם האיזור לא חוקי" });
        return;
      }
      const globalTerrorismData = await topGroups(groupByErea);
      res.status(200).json(globalTerrorismData);
    } catch (error) {
      res.status(500).json({ message: error });
    }
};

export const getGroupsByYear = async (req: Request, res: Response) => {
    try {
      const { year } = req.body;
      if (!year) {
        res.status(400).json({ message: "השנה לא חוקית" });
        return;
      }
      const globalTerrorismData = await groupsByYear(year);
      res.status(200).json(globalTerrorismData);
    } catch (error) {
      res.status(500).json({ message: error });
    }
};

export const getDeadliestRegionsByGroup = async (req: Request, res: Response) => {
    try {
      const { groupName } = req.body;
      if (!groupName) {
        res.status(400).json({ message: "שם הארגון לא חוקי" });
        return;
      }
      const globalTerrorismData = await deadliestRegionsByGroup(groupName);
      res.status(200).json(globalTerrorismData);
    } catch (error) {
      res.status(500).json({ message: error });
    }
};