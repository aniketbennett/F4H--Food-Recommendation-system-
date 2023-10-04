export interface selectedItem{
  category: string;
  item: FoodItem[];
}


export interface FoodItem {
  food_items: string;
  Avg_Serving_Size: number;
  Calories: number;
  Category: string;
  Carbs: number;
  Total_Fat: number;
  Saturated_Fat: number;
  Protein: number;
  Fiber: number;
  Cholesterol: number;
  Sodium: number;
  Sugar: number;
  Potassium: number;
  Magnesium: number;
  Phosphorus: number;
  Vitamin_C: number;
  Vitamin_A: number;
  Calcium: number;
  Iron: number;
  Zinc: number;
  Vitamin_E: number;
  Vitamin_K: number;
}
export interface SelectedFoodItem {
  Protein: FoodItem[];
  "Healthy Fats": FoodItem[];
  Fruits: FoodItem[];
  Vegetables: FoodItem[];
}

export interface Disease {
  Disease: string;
  Carbs: number;
  Total_Fat: number;
  Saturated_Fat: number;
  Protein: number;
  Fiber: number;
  Cholesterol: number;
  Sodium: number;
  Sugar: number;
  Potassium: number;
  Magnesium: number;
  Phosphorus: number;
  Vitamin_C: number;
  Vitamin_A: number;
  Calcium: number;
  Iron: number;
  Zinc: number;
  Vitamin_E: number;
  Vitamin_K: number;
}
