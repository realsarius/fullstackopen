import { HealthCheckEntry, HealthCheckRating } from '../../types.ts';
import "./index.css";

const HealthCheckPatientEntry = ({ entry }: { entry: HealthCheckEntry }) => {
    return (
        <div className={'list-item'}>
            <p>HealthCheck Entry</p>
            <p><strong>Date:</strong> {entry.date}</p>
            <p><strong>diagnose by</strong> {entry.specialist}</p>
            <p><strong>Description:</strong> {entry.description}</p>
            <p><strong>Health Check Rating:</strong> {HealthCheckRating[entry.healthCheckRating]}</p>
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

export default HealthCheckPatientEntry;
