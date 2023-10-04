import { writable, type Writable } from "svelte/store";
import type { Disease} from "../types";



// export const date: Writable<SelectedFoodItem> = writable({
//   Protein: [],
//   "Healthy Fats": [],
//   Fruits: [],
//   Vegetables: [],
// });

interface selectedItems {
    // age: string;
    // height: string;
    weight: number;
    // activity:string;
    // gender:string;
    mulitplier:number;
    isNonVeg:boolean;
    disease:Disease[];
}


export const userInfo:Writable<selectedItems> = writable({
    // age: "0",
    // height: "0",
mulitplier:1,
    weight: 0,
    // activity:"",
    // gender:"",
    isNonVeg:false,
    disease:[]
});

