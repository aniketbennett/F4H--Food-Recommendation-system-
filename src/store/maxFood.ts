import { writable, type Writable } from "svelte/store";

// interface Meal {
//   Lunch: number;
//   Dinner: number;
//   Breakfast: number;
//   Snacks: number;
// }
export interface Macors {
    Protein: number;
    Carbs: number;
    Calories: number;
    Fats: number;
}

export let maxBreakfast: Writable<Macors> = writable({
    Protein: 0,
    Carbs: 0,
    Calories: 0,
    Fats: 0
});
export let maxLunch: Writable<Macors> = writable({
    Protein: 0,
    Carbs: 0,
    Calories: 0,
    Fats: 0
});
export let maxSnacks: Writable<Macors> = writable({
    Protein: 0,
    Carbs: 0,
    Calories: 0,
    Fats: 0
});
export let maxDinner: Writable<Macors> = writable({
    Protein: 0,
    Carbs: 0,
    Calories: 0,
    Fats: 0
});
// export let maxDinner: Writable<number> = writable(0);
// export let maxBreakfast: Writable<number> = writable(0);
// export let maxSnacks: Writable<number> = writable(0);

// export let maxProtein: Writable<number> = writable(0);
// export let maxFats: Writable<number> = writable(0);