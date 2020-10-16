interface Report {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number;
  ratingDescription: string;
  target: number;
  average: number
}

const calculateExercises = (exerciseHours: Array<number>, target: number): Report => {
  let periodLength = 0;
  let trainingDays = 0;
  exerciseHours.forEach(hours => {
    hours > 0 && trainingDays++;
    periodLength++;
  });
  const average = exerciseHours.reduce((sum, hours) => sum + hours) / periodLength;
  let rating;
  let ratingDescription;
  let success = false;
  if(average >= target) {
    rating = 3;
    ratingDescription = 'perfect';
    success = true;
  } else if(average >= (target * 2/3)){
    rating = 2;
    ratingDescription = 'not too bad, but could be better';
  } else {
    rating = 1;
    ratingDescription = 'terrible';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const exit_with_usage = () => {
  console.error('usage: npm run calculateExercises target hours ...');
  process.exit(1);
};

const target = Number(process.argv[2]);
const exerciseHours = process.argv.slice(3).map(hours => Number(hours));

if([target, ...exerciseHours].includes(NaN) || exerciseHours.length === 0) {
  exit_with_usage();
}

console.log(calculateExercises(exerciseHours, target));