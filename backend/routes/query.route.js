import express from "express";
const queryRoute=express.Router();
import {addQuery, getQueries} from "../controllers/query.controllers.js";

queryRoute.post("/query",addQuery);
queryRoute.get("/getall",getQueries);
export default queryRoute;