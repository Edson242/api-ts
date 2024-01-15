import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';


// Interface das Cidades
interface ICidade {
  nome: string;
  estado: string;
}

// Validação 
const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(2),
});

export const crateBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach(error => {
      if (error.path === undefined) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }
};

interface IFilter {
  filter?: string;
}

const QueryValidation: yup.Schema<IFilter> = yup.object().shape({
  filter: yup.string().required().min(3),
});

export const crateQueryValidator: RequestHandler = async (req, res, next) => {
  try {
    await QueryValidation.validate(req.query, { abortEarly: false });
    return next();
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach(error => {
      if (error.path === undefined) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }
};


export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  
  console.log(req.body);


  return res.send('Create!');
};