import { Router } from "../deps.ts";

const router = Router();

// GET users listing.
router.get("/", (req, res, next) => {
  res.send("Respond with your resource here!");
});

export default router;
