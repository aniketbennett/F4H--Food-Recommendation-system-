function calculateBmr(weight: number, height: number, age: number, gender: string): number | null {
    let bmr: number;

    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
        console.log('Invalid gender');
        return null;
    }

    return bmr;
}

function calculateCalories(bmr: number, activityLevel: string): number | null {
    let pal: number;

    if (activityLevel === 'sedentary') {
        pal = 1.2;
    } else if (activityLevel === 'lightly active') {
        pal = 1.375;
    } else if (activityLevel === 'moderately active') {
        pal = 1.55;
    } else if (activityLevel === 'very active') {
        pal = 1.725;
    } else if (activityLevel === 'extra active') {
        pal = 1.9;
    } else {
        console.log('Invalid activity level');
        return null;
    }

    const calories: number = bmr * pal;
    return calories;
}
