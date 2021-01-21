/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */
import { Request } from "express";
import * as dotenv from "dotenv";
dotenv.config();
/**
 *
 * */

interface validationResult {
  isValid: boolean;
  invalidMessages?: Array<string>;
}
type TypeData = "string" | "number" | "boolean";

interface validateField {
  field: any;
  type?: TypeData;
  required?: boolean;
}

const getRequireMessage = (required, got) => {
  return `${required} ${
    process.env.LANG == "ID" ? "tidak oleh kosong/null" : "is required but got"
  } ${got}`;
};
const getExpectedmessage = (expected, type, got) => {
  return `${expected} ${
    process.env.LANG == "ID" ? "tipe data harus" : "expected as"
  } ${type} ${process.env.LANG ? "yang didapat" : "but got"} ${got}`;
};
async function validateRequest(
  req: Request,
  data: Array<validateField>
): Promise<validationResult> {
  let request =
    req.method == "POST"
      ? req.body
      : req.method == "GET"
      ? req.query
      : req.params;
  let messages: Array<string> = [];

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

  if (messages.length > 0) {
    return { isValid: false, invalidMessages: messages };
  } else {
    return { isValid: true, invalidMessages: null };
  }
}

export { validateRequest, TypeData };
