declare module 'express-serve-static-core' {
    export interface Request {
        user: any;
        params:any;
        method:any
    }
    export interface Response {
        user: any;
        json:any;
    }
  }