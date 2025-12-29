/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RequestHandler } from "express";
import { Schema, type AnyObject, type Maybe, type ObjectSchema, type ValidationError } from "yup";
import { StatusCodes } from "http-status-codes";


type TProperty = 'body' | 'header' | 'params' | 'query';

type TALLSchemas = Record<TProperty, ObjectSchema<any>>;

type TGetSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TALLSchemas>;

type TValidation = (
  getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
  const schemas = getAllSchemas(schema => schema);


  const errorResults: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as TProperty], { abortEarly: false });

    } catch (err) {
      const yupError = err as ValidationError;
      const errors: Record<string, string> = {};

      yupError.inner.forEach(error => {
        if (error.path === undefined) return;
        errors[error.path] = error.message;
      });

      errorResults[key] = errors;
    }
  });

  if (Object.entries(errorResults).length === 0) {
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorResults });
  }

};