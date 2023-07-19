/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

/**
 * result validation
 * */

interface ValidationResult {
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
interface ValidationField {
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
  req: any,
  data: Array<ValidationField>
): Promise<ValidationResult> {
  //get method

  const getPayload =()=>{
    if(req.method == "POST"){
      return req.body
    }
    if(req.method == "GET"){
      return req.query
    }

    return req.params
  }
  //message while validation not valid
  let messages: Array<string> = [];
  let request = getPayload()

  //check request
  if (typeof request != "undefined") {
    data.forEach((item) => {
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
    let message = ()=>{
      if(process.env.LANG == "ID"){
        return "diperlukan ,yang didapat"
      }
      return "required but got"
    }
    messages.push(
      `${data} ${message()} ${request}`
    );
  }

  //return validation
  if (messages.length > 0) {
    return { isValid: false, invalidMessages: messages };
  } else {
    return { isValid: true, invalidMessages: undefined };
  }
}

export { validate, TypeData };
