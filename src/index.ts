import { checkError } from './utils/checkError';
import express, {Request, Response} from 'express';
import { VideosController } from './controllers/VideosController';
import { validateCreateVideo, validateUpdateVideo } from './validations/validations';

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/videos', VideosController.getAllVideos);
app.get('/videos/:id', VideosController.getOneVideo);

app.post('/videos', validateCreateVideo, checkError, VideosController.createVideo);

app.put('/videos/:id', validateUpdateVideo, checkError, VideosController.updateVideo);

app.delete('/videos/:id', VideosController.removeOneVideo);

app.delete('/all-data', async (req: Request, res: Response) => {
  res.send('work!');
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
