import { CoursePart } from '../types.ts';


const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {

    const getTotalNumberOfExercises: () => number = (): number => {
        return courseParts.reduce((total: number, current: {
            name: string,
            exerciseCount: number
        }): number => total + current.exerciseCount, 0);
    };

    return (
        <p>Number of exercises {getTotalNumberOfExercises()}</p>
    );
};

export default Total;