import { checkError } from './utils/checkError';
import express, {Request, Response, NextFunction} from 'express';
import { VideosController } from './controllers/VideosController';
import { validateCreateVideo, validateUpdateVideo } from './validations/validations';

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send("Hello friends!"));
app.get('/videos', VideosController.getAllVideos);
app.get('/videos/:id', VideosController.getOneVideo);
app.post('/videos', validateCreateVideo, checkError, VideosController.createVideo);
app.put('/videos/:id', validateUpdateVideo, checkError, VideosController.updateVideo);
app.delete('/videos/:id', VideosController.removeOneVideo);
app.delete('/testing/all-data', VideosController.removeAllVideos);

app.use((req: Request, res: Response) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Не найдено');
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Ошибка сервера');
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
