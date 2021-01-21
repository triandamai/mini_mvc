/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */
import { Request } from "express";
import * as dotenv from "dotenv";
dotenv.config();
/**
 * result validation
 * */

interface validationResult {
  isValid: boolean;
  invalidMessages?: Array<string>;
}
/***
 *
 * type of data support for now
 */
type TypeData = "string" | "number" | "boolean";

/***
 * paramater for validation
 *
 */
interface validationField {
  field: any;
  type?: TypeData;
  required?: boolean;
}
/***
 * get message required base on current languange
 * check .env.example
 *
 */
const getRequireMessage = (required: any, got: any) => {
  return `${required} ${
    process.env.LANG == "ID" ? "tidak boleh kosong/null" : "is required but got"
  } ${got}`;
};
/***
 * get required messages base on current languange
 * check .env.example
 *
 */
const getExpectedmessage = (expected: any, type: any, got: any) => {
  return `${expected} ${
    process.env.LANG == "ID" ? "tipe data harus" : "expected as"
  } ${type} ${process.env.LANG ? "yang didapat" : "but got"} ${got}`;
};
/***
 * validation for request
 * @param req typeof Request from express
 * @param data typeof validationField
 * @returns validationRresult
 */
async function validate(
  req: Request,
  data: Array<validationField>
): Promise<validationResult> {
  //get method
  let request =
    req.method == "POST"
      ? req.body
      : req.method == "GET"
      ? req.query
      : req.params;
  //message while validation not valid
  let messages: Array<string> = [];

  //check request
  if (typeof request != "undefined") {
    data.map((item) => {
      const data: any = request[item.field] ? request[item.field] : null;
      if (item.required) {
        if (data) {
          if (typeof data !== item.type) {
            //required but type did not match
            messages.push(
              getExpectedmessage(
                item.field,
                item.type,
                typeof request[item.field]
              )
            );
          }
        } else {
          //required but null
          messages.push(getRequireMessage(item.field, request[item.field]));
        }
      } else {
        if (data) {
          if (typeof data !== item.type) {
            //not required but data exist wrong type
            messages.push(
              getExpectedmessage(
                item.field,
                item.type,
                typeof request[item.field]
              )
            );
          }
        }
      }
    });
  } else {
    messages.push(
      `${data} ${(process.env.LANG = "ID"
        ? "diperlukan ,yang didapat"
        : "required but got")}  ${request}`
    );
  }

  //return validation
  if (messages.length > 0) {
    return { isValid: false, invalidMessages: messages };
  } else {
    return { isValid: true, invalidMessages: null };
  }
}

export { validate, TypeData };
