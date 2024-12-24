import { Router } from "express";
import { getBigAttacks, getErea, getTrends, getTopGroups, getGroupsByYear, getDeadliestRegionsByGroup } from "../controllers/GlobalTerrorismController";

const router = Router();

router.get("/deadliest-attack-types", getBigAttacks);
router.get("/highest-casualty-regions/:groupByErea", getErea);
router.get("/incident-trends", getTrends);
router.get("/top-groups", getTopGroups);
router.get("/groups-by-year", getGroupsByYear);
router.get("/deadliest-regions", getDeadliestRegionsByGroup);

export default router;
