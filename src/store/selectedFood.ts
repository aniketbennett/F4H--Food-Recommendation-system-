

import type { FoodItem, selectedItem } from "src/types";
import { writable, type Writable } from "svelte/store";


export let selectedBreakfast: Writable<selectedItem> = writable({category: "Breakfast", item: []});
export let selectedLunch: Writable<selectedItem> = writable({category: "Lunch", item: []});
export let selectedSnacks: Writable<selectedItem> = writable({category: "Snacks", item: []});
export let selectedDinner: Writable<selectedItem> = writable({category: "Dinner", item: []});