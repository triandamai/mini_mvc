/**
 * Date     15 December 2020
 * Time     13:29
 * Author   Trian Damai
 * */
import {
  Post,
  validateRequest,
  sendJSON200,
  sendJSON404,
  uuid,
  Get,
} from "../../core";
import { Request, Response } from "express";
import { MeetingModel } from "../model/MeetingModel";

export class MeetingController {
  /**
   * join
   * @param iduser
   * @param token
   * @param username
   * @returns joining Meeting with attende for joining video conf
   * */
  @Post({
    path: "/create",
    middlewares: null,
  })
  public async create(req: Request, res: Response) {
    //init class
    const model = new MeetingModel();

    //validate request
    const { next, message } = await validateRequest(req, [
      { field: "userId", type: "string", required: true },
      { field: "username", type: "string", required: true },
      {
        field: "description",
        type: "string",
        required: false,
      },
    ]);
    //validation passed
    if (next) {
      //query
      const data = await model
        .get(["column1 as b"])
        .where({ column: "", value: "" })
        .orwhere({ column: "", value: "" })
        .run();

      return sendJSON200({
        res: res,
        payload: {},
        message: message,
      });
    } else {
      return sendJSON200({
        res: res,
        payload: {},
        message: message,
      });
    }
  }

  @Post({ path: "/end", middlewares: null })
  public end(req: Request, res: Response) {}
  @Get({ path: "/tes" })
  public testIOT(req: Request, res: Response) {
    sendJSON200({ message: "hai", payload: req.body, res: res });
  }
}
