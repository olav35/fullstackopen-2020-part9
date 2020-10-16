interface Response {
  weight: number,
  height: number,
  bmi: string
}

const calculateBmi = (height: number, weight: number): Response => {
  const bmi: number = weight / (height / 100)**2
  let description

  if(bmi > 30) {
    description = 'Obese (deadly weight)'
  } else if(bmi > 25) {
    description = 'Overweight (unhealthy weight)'
  } else if(bmi > 18.5) {
    description = 'Normal (healthy weight)'
  } else {
    description = 'Underweight (unhealthy weight)'
  }

  return {
    height,
    weight,
    bmi: description
  }
}

export default calculateBmi