import { Request, Response, NextFunction } from 'express';
import { validationResult } from "express-validator";

export const checkError = (req: Request, res: Response, next: NextFunction) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		let errors= result.array({ onlyFirstError: true }).map(error => error.msg);
		return res.status(400).json({ errorsMessages: errors });
	}
	next();
}