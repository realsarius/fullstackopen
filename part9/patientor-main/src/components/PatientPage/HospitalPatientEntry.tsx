import { HospitalEntry } from '../../types.ts';
import "./index.css";

const HospitalEntryComponent = ({ entry }: { entry: HospitalEntry }) => {
    return (
        <div className={'list-item'}>
            <p><strong>Type:</strong> Hospital</p>
            <p><strong>Date:</strong> {entry.date}</p>
            <p><strong>Specialist:</strong> {entry.specialist}</p>
            <p><strong>Description:</strong> {entry.description}</p>
            <p><strong>Discharge Criteria:</strong> {entry.discharge.criteria}</p>
            <p><strong>Discharge Date:</strong> {entry.discharge.date}</p>
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

export default HospitalEntryComponent;
