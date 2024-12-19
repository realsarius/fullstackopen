export interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (dailyExerciseHours: Array<number>, target: number): Result => {
    const periodLength: number = dailyExerciseHours.length;

    const trainedDays = [];
    for (let i = 0; i < dailyExerciseHours.length; i++) {
        if (dailyExerciseHours[i] != 0) trainedDays.push(dailyExerciseHours[i]);
    }
    const trainingDays: number = trainedDays.length;

    const average = dailyExerciseHours.reduce((sum, currentValue) => sum + currentValue, 0) / dailyExerciseHours.length;

    const success = average >= target;

    const getRatingDescription = (): { rating: number, description: string } => {
        if (average > target) {
            return { rating: 3, description: 'very nice' };
        } else if (average < target) {
            return { rating: 2, description: 'not too bad but could be better' };
        } else {
            return { rating: 1, description: 'not very nice' };
        }
    };

    const { rating, description: ratingDescription } = getRatingDescription();

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

// const target = Number(process.argv[2]);
// const exercises = process.argv.slice(3).map(Number);

// console.log(calculateExercises(exercises, target));
