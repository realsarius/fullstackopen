import { OccupationalHealthcareEntry } from '../../types.ts';
import "./index.css";

const OccupationalHealthcareEntryComponent = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    return (
        <div className={'list-item'}>
            <p><strong>Type:</strong> OccupationalHealthcare</p>
            <p><strong>Date:</strong> {entry.date}</p>
            <p><strong>Specialist:</strong> {entry.specialist}</p>
            <p><strong>Employer Name:</strong> {entry.employerName}</p>
            <p><strong>Description:</strong> {entry.description}</p>
            {entry.sickLeave && (
                <div>
                    <p><strong>Sick Leave Start Date:</strong> {entry.sickLeave.startDate}</p>
                    <p><strong>Sick Leave End Date:</strong> {entry.sickLeave.endDate}</p>
                </div>
            )}
            {entry.diagnosisCodes && (
                <div>
                    <strong>Diagnosis Codes:</strong>
                    <ul>
                        {entry.diagnosisCodes.map(code => (
                            <li key={code}>{code}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default OccupationalHealthcareEntryComponent;
