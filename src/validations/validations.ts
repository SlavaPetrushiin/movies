import { body} from 'express-validator';

export const validateCreateVideo = [
	body('author', {field: "author", message: "Укажите автора"}).isLength({max: 20}).isString(),
	body('title', {field: "title", message: "Укажите заголовок"}).isLength({max: 40}).isString(),
	body('availableResolutions', {field: "availableResolutions", message: "Укажите availableResolutions"}).isArray({min: 1}),
];

export const validateUpdateVideo = [
	body('author', {field: "author", message: "Укажите автора"}).isLength({max: 20}).isString(),
	body('title', {field: "title", message: "Укажите заголовок"}).isLength({max: 40}).isString(),
	body('availableResolutions', {field: "availableResolutions", message: "Укажите availableResolutions"}).isArray({min: 1}),
	body('canBeDownloaded', {field: "canBeDownloaded", message: "Можно загрузить,"}).isBoolean(),
	body('minAgeRestriction', {field: "minAgeRestriction", message: "Укажите возраст"}).isInt({min: 1, max: 18}),
	body('publicationDate', {field: "publicationDate", message: "Укажите дату"}).isString(),
];
