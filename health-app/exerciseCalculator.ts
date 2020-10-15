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
  let periodLength = 0
  let trainingDays = 0
  exerciseHours.forEach(hours => {
    hours > 0 && trainingDays++
    periodLength++
  })
  const average = exerciseHours.reduce((sum, hours) => sum + hours) / periodLength
  let rating
  let ratingDescription
  let success = false
  if(average >= target) {
    rating = 3
    ratingDescription = 'perfect'
    success = true
  } else if(average >= (target * 2/3)){
    rating = 2
    ratingDescription = 'not too bad, but could be better'
  } else {
    rating = 1
    ratingDescription = 'terrible'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))