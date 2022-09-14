import { Request, Response } from 'express';
import { validationResult } from "express-validator";

export const checkError = (req: Request, res: Response, next: any) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		return res.status(400).json({ errorsMessages: result.array().map(error => error.msg) });
	}
	next();
}