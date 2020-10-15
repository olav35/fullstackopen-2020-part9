const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100)**2
  if(bmi > 30) {
    return 'Obese (deadly weight)'
  } else if(bmi > 25) {
    return 'Overweight (unhealthy weight)'
  } else if(bmi > 18.5) {
    return 'Normal (healthy weight)'
  } else {
    return 'Underweight (unhealthy weight)'
  }
}

console.log(calculateBmi(190, 60))