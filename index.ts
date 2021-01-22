/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

import { Application } from "./core";
/***
 * ==============CONTROLLER======================
 *
 * import all controller in here
 *
 *===============================================
 */
import "./app/controller";
//import "./app/controller/MeetingController"

/***
 * prepare app befor running
 *
 */
let app = new Application();
/***
 * running app with port from env or default 4000
 *
 */
app.run();
