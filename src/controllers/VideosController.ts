import { Request, Response } from 'express';
import add from 'date-fns/add';

let VIDEOS = [
	{
		id: new Date().getMilliseconds(),
		title: "Online Cinema",
		author: "SLava",
		canBeDownloaded: true,
		minAgeRestriction: 18,
		createdAt: new Date().toISOString(),
		publicationDate: new Date().toISOString(),
		availableResolutions: [
			"P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"
		],
	}
] as IVideo[];

interface IVideo {
	id: number
	title: string
	author: string
	canBeDownloaded: boolean
	minAgeRestriction: null | number
	createdAt: string
	publicationDate: string
	availableResolutions: string[];
}

interface ICreateVideo extends Request {
	title: string;
	author: string;
	availableResolutions: string[];
}

interface IUpdateVideo extends Request {
	title: string;
	author: string;
	availableResolutions: string[];
	canBeDownloaded: boolean;
	minAgeRestriction: number;
	publicationDate: string;
}

export class VideosController {
	static async getAllVideos(req: Request, res: Response<IVideo[]>) {
		try {
			return res.status(200).json(VIDEOS);
		} catch (error) {

		}
	}

	static async getOneVideo(req: Request<{ id: string }>, res: Response<IVideo>) {
		try {
			let id = req.params.id;
			if (!id) {
				res.sendStatus(404);
			}

			let video = VIDEOS.find(video => video.id == Number(id));

			if (!video) {
				res.sendStatus(404);
			}

			return res.json(video);
		} catch (error) {
			return res.sendStatus(500);
		}
	}

	static async createVideo(req: Request<{}, {}, ICreateVideo, {}>, res: Response<IVideo | string>) {
		try {
			let { author, title, availableResolutions } = req.body;
			let indexID = VIDEOS.length;
			VIDEOS.push({
				id: new Date().getMilliseconds(),
				title,
				author,
				availableResolutions,
				canBeDownloaded: true,
				minAgeRestriction: null,
				createdAt: new Date().toISOString(),
				publicationDate: add(new Date(), {"days": 1}).toISOString()
			})

			console.log(VIDEOS);

			return res.status(201).send(VIDEOS[indexID])

		} catch (error) {
			console.log('VideosController -> createVideo', error)
			return res.send('server error')
		}
	}

	static async updateVideo(req: Request<{ id: string }, {}, IUpdateVideo, {}>, res: Response) {
		try {
			let videoId = req.params.id;
			let { author, title, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;

			let foundedVideo = VIDEOS.find(video => video.id == Number(videoId));

			if (!foundedVideo) {
				return res.sendStatus(404);
			}

			VIDEOS = VIDEOS.map(video => {
				if (video.id == +videoId) {
					return {
						...video,
						author, title, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate
					}
				}
				return { ...video };
			})

			let updatedVideo = VIDEOS.find(video => video.id == Number(videoId));
			res.json(updatedVideo);
		} catch (error) {
			res.sendStatus(500);
		}
	}

	static async removeOneVideo(req: Request<{ id: string }>, res: Response<IVideo>) {
		try {
			let id = req.params.id;
			if (!id) {
				res.sendStatus(404);
			}

			let newVideos = VIDEOS.filter(video => video.id != Number(id));

			if(newVideos.length < VIDEOS.length){
				return res.sendStatus(204);
			} else {
				res.sendStatus(404);
			}	
		} catch (error) {
			return res.sendStatus(500);
		}
	}

	static async removeAllVideos(req: Request, res: Response) {
		try {
			VIDEOS = [];
			return res.sendStatus(204);
		} catch (error) {
			return res.sendStatus(500);
		}
	}
}

