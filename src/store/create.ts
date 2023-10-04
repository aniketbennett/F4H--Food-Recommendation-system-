import { writable, type Writable } from "svelte/store";

interface CreateMeal {
    create: number;
}
export let createMeal: Writable<CreateMeal> = writable({create: 1});
