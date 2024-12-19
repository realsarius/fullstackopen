import express, { Request, Response } from 'express';
import cors from 'cors';
import diagnoses from './routes/diagnoses';
import patients from './routes/patients';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/ping', (_req: Request, res: Response): void => {
    console.log('someone pinged here');
    res.send('pong');
});

app.get('/api/ping', (_req: Request, res: Response): void => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/diagnoses', diagnoses);
app.use('/api/patients', patients);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});