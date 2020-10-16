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

const exit_with_usage = () => {
  console.error('usage: npm run calculateBmi height weight')
  process.exit(1)
}
const height = Number(process.argv[2])
const weight = Number(process.argv[3])
if([height, weight].includes(NaN)) {
  exit_with_usage()
}

console.log(calculateBmi(height, weight))