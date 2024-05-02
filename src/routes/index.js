import { Router } from "express";
import productsRouters from "./products.router.js";
import cartsRouter from "./carts.routes.js";
const router = Router();


router.use("/products", productsRouters);
router.use("/carts", cartsRouter);





export default router;