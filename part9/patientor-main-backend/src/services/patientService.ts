import { NewPatientEntry, NonSensitivePatient, Patient } from '../types';
import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const getPatients = (): Patient[] => {
    return patients;
};

const getPatient = (id: string): NonSensitivePatient => {
    return <Patient>patients.find(p => p.id === id);
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (patient: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuidv4(),
        ...patient,
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatients,
    getPatient,
    getNonSensitivePatients,
    addPatient,
};