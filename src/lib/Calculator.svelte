<script lang="ts">
	import Cal from './Cal.svelte';
  import {
    maxBreakfast,
    maxDinner,
    maxLunch,
    maxSnacks,
  } from "../store/maxFood";
  import { userInfo } from "../store/disease";
  import MultiSelect from "./MultiSelect.svelte";
  import TextField from "./TextField.svelte";
  import Select from "./Select.svelte";
  import DiseaseData from "../assets/final_diseases.json";
  import type { Disease } from "src/types";
  import { createMeal } from "../store/create";

  let diseases = DiseaseData as unknown as Disease[];
  let gender = ["Male", "Female", "Other"];
  let exercise = [
    "Little or no exercise",
    "Exercise 1-3 times/week",
    "Exercise or Intense Exercise 3-4 times/week",
    "Exercise 4-5 times/week",
    "Intense Exercise 6-7 times/week",
    "Intense Exercise daily",
  ];
  let veg = ["Vegetarian", "Non-Vegetarian"];
  let selectedDiseases: string[] = [];
  let age: string;
  let height: string;
  let weight: string;
  let genderIndex: string;
  let exerciseIndex: string;
  let vegIndex: string;

  function calculateBmr(weight: number, height: number, age: number, gender: string): number | null {
    let bmr: number;

    if (gender === 'Male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else
    {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    } 

    return bmr;
}

function calculateCalories(bmr: number, activityLevel: string): number | null {
    let pal: number;

    if (activityLevel === exercise[0]) {
        pal = 1.2;
    } else if (activityLevel === exercise[1]) {
        pal = 1.375;
    } else if (activityLevel === exercise[2]) {
        pal = 1.55;
    } else if (activityLevel === exercise[3]) {
        pal = 1.725;
    } else if (activityLevel === exercise[4]) {
        pal = 1.9;
    } else if (activityLevel === exercise[5]) {
        pal = 2.1; // I have added this value for the "Intense Exercise daily" activity level
    } else {
        console.log('Invalid activity level');
        return null;
    }

    const calories: number = bmr * pal;
    return calories;
}
  // create a function that store diseaes in the store variable
  function getDiseases() {
    // find all the selected diseases whoes name matchs with the selectedDiseases array
    let selectedDiseasesData: Disease[] = diseases.filter((disease) =>
      selectedDiseases.includes(disease.Disease)
    );

    return selectedDiseasesData;
  }

  // for each disease in the diseases array, find find the lower bound for calories, protien, carbs and fat
  function getNutrition(diseases: Disease[]) {
    // let calories: number = 10000;
    let protein: number = 100;
    let carbs: number = 250;
    let fat: number = 100;

    // find the lowest value for each nutrition for all diseases
    diseases.forEach((disease) => {
      if (disease.Protein < protein) {
        protein = disease.Protein;
      }
      if (disease.Carbs < carbs) {
        carbs = disease.Carbs;
      }
      if (disease.Total_Fat < fat) {
        fat = disease.Total_Fat;
      }
    });

    return { protein, carbs, fat };
  }

  function isNumber(input: string): boolean {
    return /^-?\d+(\.\d+)?$/.test(input);
  }

  function store(weight: number, height: number, age: number) {
    

    let calories = calculateCalories(calculateBmr(weight,height,age,genderIndex), exerciseIndex);
    let mulitiplier = calories / 2200 ;
    userInfo.set({
      weight: weight,
      disease: getDiseases(),
      isNonVeg: vegIndex === "Non-Vegetarian",
      mulitplier: mulitiplier,
    });

    let { protein, carbs, fat } = getNutrition(getDiseases());
   // multiply all by multiplier
    protein *= mulitiplier;
    carbs *= mulitiplier;
    fat *= mulitiplier;

    maxBreakfast.set({
      Protein: 0.37 * protein,
      Carbs: 0.37 * carbs,
      Fats: 0.3 * fat,
      Calories: 0.3 * fat * 8 + 0.37 * carbs * 4 + 0.37 * protein * 4,
    });
    maxLunch.set({
      Protein: 0.3 * protein,
      Carbs: 0.35 * carbs,
      Fats: 0.35 * fat,
      Calories: 0.35 * fat * 8 + 0.35 * carbs * 4 + 0.3 * protein * 4,
    });
    maxSnacks.set({
      Protein: 0.05 * protein,
      Carbs: 0.1 * carbs,
      Fats: 0.1 * fat,
      Calories: 0.1 * fat * 8 + 0.1 * carbs * 4 + 0.05 * protein * 4,
    });
    maxDinner.set({
      Protein: 0.28 * protein,
      Carbs: 0.25 * carbs,
      Fats: 0.25 * fat,
      Calories: 0.25 * fat * 8 + 0.25 * carbs * 4 + 0.28 * protein * 4,
    });

    createMeal.set({
      create: 2,
    });
  }
  function isInteger(input: string): boolean {
    return /^\d+$/.test(input);
  }

  function validate_and_store() {
    // Validate if all the fields are filled and are of valid type
    if (age && height && weight && genderIndex && exerciseIndex && vegIndex) {
      let weightF = parseFloat(weight);
      let heightF = parseFloat(height);
      let ageF = parseInt(age);

      // Check if the inputs are valid numbers
      if (!isNumber(weight) || !isNumber(height) || !isInteger(age)) {
        alert("Please enter valid data");
      } else {
        store(weightF, heightF, ageF);
      }
    } else {
      alert("Please fill all the fields");
    }
  }
</script>

<div>
  <img src="../assets/wave.svg" alt="sin wave" />
  <div class="bg-primary py-16 px-56">
    <h2 class="text-6xl font-bold text-white">Calculator</h2>
    <div class="py-36 space-y-16">
      <div class="flex w-full space-x-6 justify-between">
        <TextField label="Age" width="" bind:value={age} />
        <TextField label="Height (cm)" width="" bind:value={height} />
        <TextField label="Weight (kg)" width="" bind:value={weight} />
      </div>
      <div class="flex w-full space-x-6 justify-between">
        <Select
          items={gender}
          label="Gender"
          width="w-4/12"
          bind:value={genderIndex}
        />
        <Select
          items={exercise}
          label="How much you exercise?"
          width="w-8/12"
          bind:value={exerciseIndex}
        />
      </div>
      <div class="flex w-full space-x-6 justify-between">
        <Select
          items={veg}
          label="Veg/Nonveg"
          width="w-4/12"
          bind:value={vegIndex}
        />
        <!-- <div> -->

        <MultiSelect id="lang" bind:value={selectedDiseases}>
          {#each diseases as disease}
            <option value={disease.Disease}>{disease.Disease}</option>
          {/each}
        </MultiSelect>
        <!-- </div> -->
        <!-- <TextField label="Any Disease" width="w-8/12" /> -->
      </div>
      <button
        class="bg-white text-primary w-full h-24 rounded-lg font-poppins font-semibold text-2xl"
        on:click={validate_and_store}>Create Diet Plan</button
      >
    </div>
  </div>
</div>
