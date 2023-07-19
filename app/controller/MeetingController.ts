/**
 * Date     15 December 2020
 * Time     13:29
 * Author   Trian Damai
 * */
import { Post, Get } from "@mvc-route";
import { MeetingModel } from "../model/MeetingModel";
import { Request, Response } from "@mvc-type";
import { validate } from "@mvc-validation";

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
  public async create(req: Request, res: any) {
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

      res
        .json({
          res: res,
          payload: {},
          message: invalidMessages,
        })
        .end();
    
    }
      //query
      const data = await model
        .get(["column1 as b"])
        .where({ column: "", value: "" })
        .orwhere({ column: "", value: "" })
        .run();

      res
        .json({
          res: res,
          payload: data,
          message: invalidMessages,
        })
        .end();
    } 
  

  @Get({ path: "/tes" })
  public testIOT(req: Request, res: any) {
    res
      .json({
        res: res,
        payload: "",
        message: "",
      })
  }

  @Get({path:"/"})
  public mueheheh(req:Request,res:any){
    res.json({sas:req.params})
  }
}
