import express, { Response, Request } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, Result } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
    res.send('Hellooo');
});

app.get('/bmi', (req: Request, res: Response): void => {
    const { weight, height } = req.query;

    if (weight === undefined || height === undefined) {
        res.status(400).send({ error: 'Weight and height are required' });
        return;
    }

    const weightNumber = Number(weight);
    const heightNumber = Number(height);

    if (isNaN(weightNumber) || isNaN(heightNumber)) {
        res.status(400).send({ error: 'Malformatted parameters' });
        return;
    }

    const bmi = calculateBmi(heightNumber, weightNumber);

    res.status(200).send({
        weight: weightNumber,
        height: heightNumber,
        bmi: bmi,
    });
});

app.post('/exercises', (req: Request, res: Response): void => {
    console.log(req.body);

    const dailyExercises: any[] = req.body.daily_exercises;
    if (dailyExercises === undefined) {
        res.status(400).send({ error: 'Daily exercise is required' });
        return;
    }

    if (!Array.isArray(dailyExercises)) {
        res.status(400).send({ error: 'Daily exercises should be an array' });
        return;
    }

    const convertedExercises = dailyExercises.map(exercise => {
        const num = Number(exercise);
        if (isNaN(num)) {
            return null;
        }
        return num;
    });

    if (convertedExercises.includes(null)) {
        res.status(400).send({ error: 'All items in daily_exercises should be valid numbers' });
        return;
    }

    const target: number = Number(req.body.target);
    if (target === undefined) {
        res.status(400).send({ error: 'Target is required' });
        return;
    }

    const calculatedExercises: Result = calculateExercises(dailyExercises, target);
    res.status(200).send({ 'status': 'OK', 'data': calculatedExercises });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});