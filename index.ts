/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

import app from "./src/application";
import * as dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 4000;

import "./src/controller";

app.run();
