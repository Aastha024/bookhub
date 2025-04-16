import { Request, Response } from "express";

// TRequest extends the Express Request to include a 'dto' property for validated data.
export interface TRequest<T> extends Request {
  dto: T;
}

// TResponse is an alias for Express Response.
export type TResponse = Response;

export enum Roles {
  Admin = "admin",
  Buyer = "buyer",
  Seller = "seller",
}
