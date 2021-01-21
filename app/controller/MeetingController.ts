/**
 * Date     15 December 2020
 * Time     13:29
 * Author   Trian Damai
 * */
import { Post, validate, sendJSON200, Request, Response, Get } from "../app";
import { MeetingModel } from "../model";

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
    const { isValid, invalidMessages } = await validate(req, [
      { field: "userId", type: "string", required: true },
      { field: "username", type: "string", required: true },
      {
        field: "description",
        type: "string",
        required: false,
      },
    ]);
    //validation passed
    if (isValid) {
      //query
      const data = await model
        .get(["column1 as b"])
        .where({ column: "", value: "" })
        .orwhere({ column: "", value: "" })
        .run();

      return sendJSON200({
        res: res,
        payload: {},
        message: invalidMessages,
      });
    } else {
      return sendJSON200({
        res: res,
        payload: {},
        message: invalidMessages,
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
