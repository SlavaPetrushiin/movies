import e from 'express';
import { body, check} from 'express-validator';

let Resolutions = [ "P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];

export const validateCreateVideo = [
	body('author', {field: "author", message: "Укажите автора"}).isLength({max: 20}).isString(),
	body('title', {field: "title", message: "Укажите заголовок"}).isLength({max: 40}).isString(),
	body('availableResolutions', {field: "title", message: "Укажите заголовок"}).custom((element) => element.every((el: any ) => Resolutions.includes(el)))
];

export const validateUpdateVideo = [
	body('author', {field: "author", message: "Укажите автора"}).isLength({max: 20}).isString(),
	body('title', {field: "title", message: "Укажите заголовок"}).isLength({max: 40}).isString(),
	body('availableResolutions', {field: "availableResolutions", message: "Укажите availableResolutions"}).isArray({min: 1}),
	body('canBeDownloaded', {field: "canBeDownloaded", message: "Можно загрузить,"}).isBoolean(),
	body('minAgeRestriction', {field: "minAgeRestriction", message: "Укажите возраст"}).isInt({min: 1, max: 18}),
	body('publicationDate', {field: "publicationDate", message: "Укажите дату"}).isString(),
];
