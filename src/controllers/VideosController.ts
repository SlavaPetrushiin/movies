import { Request, Response } from 'express';

let VIDEOS = [] as IVideo[];

interface IVideo {
	id: number
	title: string
	author: string
	canBeDownloaded: boolean
	minAgeRestriction: null | number
	createdAt: Date
	publicationDate: Date
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
  publicationDate: Date;
}

export class VideosController {
	static async getAllVideos(req: Request, res: Response<IVideo[]>){
		try {
			return res.status(200).json(VIDEOS);
		} catch (error) {
			
		}
	}

	static async getOneVideo(req: Request<{id: string}>, res: Response<IVideo>){
		try {
			let id = req.params.id;
			if(!id){
				res.sendStatus(404);
			}

			let video = VIDEOS.find(video => video.id == Number(id));

			if(!video){
				res.sendStatus(404);
			}			
			
			return res.json(video);
		} catch (error) {
			return res.sendStatus(500);
		}
	}

	static async createVideo (req: Request<{}, {}, ICreateVideo, {}>, res: Response<IVideo>) {
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
				createdAt: new Date(),
				publicationDate: new Date()
			})

			console.log(VIDEOS);

			res
				.status(201)
				.json(VIDEOS[indexID])

		} catch (error) {
			res.status
		}
	}

	static async updateVideo (req: Request<{id: string}, {}, IUpdateVideo, {}>, res: Response) {
		try {
			let videoId = req.params.id;
			let { author, title, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate} = req.body;

			let video = VIDEOS.find(video => video.id == Number(videoId));

			if(!video){
				return res.sendStatus(404);
			}

			VIDEOS = VIDEOS.map(video => {
				if(video.id == +videoId){
					return {
						...video,
						author, title, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate
					}
				}

				return {...video};
			})


		} catch (error) {
			res.sendStatus(500)
		}
	}

	static async removeOneVideo(req: Request<{id: string}>, res: Response<IVideo>){
		try {
			let id = req.params.id;
			if(!id){
				res.sendStatus(404);
			}

			VIDEOS = VIDEOS.filter(video => video.id != Number(id));			
			return res.sendStatus(204);
		} catch (error) {
			return res.sendStatus(500);
		}
	}
}

