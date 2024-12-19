import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import patientService from '../../services/patients';
import { Entry, Patient } from '../../types.ts';
import HospitalPatientEntry from './HospitalPatientEntry.tsx';
import OccupationalHealthcarePatientEntry from './OccupationalHealthcarePatientEntry.tsx';
import HealthCheckPatientEntry from './HealthCheckPatientEntry.tsx';
import './index.css';

const PatientPage = () => {
    const [patient, setPatient] = React.useState<Patient | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const thePatient = await patientService.getOne(id);
                setPatient(thePatient);
            } catch (err) {
                console.error(err);
                setPatient(null);
            }
        };

        void fetchPatient();
    }, [id]);

    const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
        switch (entry.type) {
            case 'Hospital':
                return <HospitalPatientEntry entry={entry} />;
            case 'OccupationalHealthcare':
                return <OccupationalHealthcarePatientEntry entry={entry} />;
            case 'HealthCheck':
                return <HealthCheckPatientEntry entry={entry} />;
            default:
                return <div>Unknown entry type</div>;
        }
    };

    return (
        <div>
            <h1>Patient ID: {id}</h1>
            <hr />
            {patient && (
                <>
                    <h1>{patient.name}</h1>
                    <p>ssn: {patient.ssn}</p>
                    <p>occupation: {patient.occupation}</p>
                    <h3>Entries</h3>
                    <div className={'entries'}>
                        {patient.entries && patient.entries.map((entry) => (
                            <EntryDetails key={entry.id} entry={entry} />
                        ))}
                    </div>

                </>
            )}
        </div>
    );
};

export default PatientPage;
