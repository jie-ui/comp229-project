import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { loadOrderIfOwner } from "../middleware/isOwner.js";
import {
  createOrder, listMyOrders, getMyOrder, updateMyOrder, deleteMyOrder
} from "../controllers/order.controller.js";

const router = Router();

router.use(auth); 

router.post("/", createOrder);
router.get("/", listMyOrders);
router.get("/:id", loadOrderIfOwner, getMyOrder);
router.put("/:id", loadOrderIfOwner, updateMyOrder);
router.delete("/:id", loadOrderIfOwner, deleteMyOrder);

export default router;
