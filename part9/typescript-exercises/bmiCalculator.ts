// const height: number = Number(process.argv[2]);
// const weight: number = Number(process.argv[3]);

export const calculateBmi = (height:number, weight:number): string => {
    const heightInMeters = height / 100;
    const theBmi = weight / Math.pow(heightInMeters, 2);

    if (theBmi < 18.5) {
        return 'Underweight';
    } else if (theBmi >= 18.5 && theBmi < 24.9) {
        return 'Normal range';
    } else if (theBmi >= 25 && theBmi < 29.9) {
        return 'Overweight';
    } else {
        return 'Obesity';
    }
};

// console.log(calculateBmi());
// console.log(process.argv);