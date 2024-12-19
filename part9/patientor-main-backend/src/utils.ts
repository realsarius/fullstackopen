import { NewPatientEntry, Gender } from './types';
import { z } from 'zod';

export const NewPatientEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string().refine(ssn => isSSN(ssn), {
        message: 'Incorrect or missing ssn',
    }),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return NewPatientEntrySchema.parse(object);
};

// check if the ssn is in the correct format 'XXX-XX-XXXX'
const isSSN = (ssn: string): boolean => {
    const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
    return ssnRegex.test(ssn);
};
