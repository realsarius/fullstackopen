import express, { Request, Response, NextFunction } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient, NewPatientEntry } from '../types';
import { toNewPatientEntry } from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res: Response<NonSensitivePatient>) => {
    const { id } = req.params;
    const thePatient = patientService.getPatient(id);
    console.log(thePatient);
    res.send(thePatient);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        const newPatientEntry: NewPatientEntry = toNewPatientEntry(req.body);
        console.log(req.body);
        req.body = newPatientEntry;
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else if (error instanceof Error) {
        res.status(400).send({ error: error.message });
    } else {
        next(error);
    }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<NonSensitivePatient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;
