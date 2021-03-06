/**
 * Date     15 December 2020
 * Time     13:29
 * Author   Trian Damai
 * */
import { Router } from "express";

/***
 * routing
 * all route decorator will add to here
 */
export const appRouter = Router();

/***
 *
 *
 */
enum method {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete",
}
interface IOptions {
  path: string;
  middlewares?: Function;
  validations?: any;
}

function Post(options: IOptions) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    (appRouter as any)[method.post](options.path, target[propertyKey]);
  };
}
function Get(options: IOptions) {
  return (target: any, proptyKey: string, descriptor: PropertyDescriptor) => {
    (appRouter as any)[method.get](options.path, target[proptyKey]);
  };
}
function Put(options: IOptions) {
  return (target: any, proptyKey: string, descriptor: PropertyDescriptor) => {
    (appRouter as any)[method.put](options.path, target[proptyKey]);
  };
}
function Delete(options: IOptions) {
  return (target: any, proptyKey: string, descriptor: PropertyDescriptor) => {
    (appRouter as any)[method.delete](options.path, target[proptyKey]);
  };
}

export { Post, Get, Put, Delete };
