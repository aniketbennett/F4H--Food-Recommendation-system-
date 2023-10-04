
  import pdfMake from 'pdfmake/build/pdfmake';
  import * as vfsFonts from 'pdfmake/build/vfs_fonts';
  
  pdfMake.vfs = vfsFonts.pdfMake ? vfsFonts.pdfMake.vfs : pdfMake.vfs;

  // pdfMake.vfs = pdfFonts.pdfMake.vfs;
  import type { FoodItem, selectedItem } from "./types";

// Your interfaces here
// ...
export function downloadDataAsPDF(selectedItems: selectedItem[]): void {
  
  const content: any[] = [];

  selectedItems.forEach((selectedItem) => {
    // Add meal time as a title
    content.push({
      text: selectedItem.category,
      style: 'header',
    });

    // Group items by category
    const groupedItems = selectedItem.item.reduce((acc, item) => {
      if (!acc[item.Category]) {
        acc[item.Category] = [];
      }
      acc[item.Category].push(item);
      return acc;
    }, {} as { [key: string]: FoodItem[] });

    // Iterate through each category and create a table
    for (const category in groupedItems) {
      const items = groupedItems[category];

      // Add category name as a subtitle
      content.push({
        text: category,
        style: 'subheader',
      });

      // Set table column headers
      const headers = [['Food Item', 'Avg Serving Size', 'Calories', 'Protein', 'Fats', 'Carbs']];

      // Prepare table data
      const data = items.map((item) => [
        item.food_items,
        item.Avg_Serving_Size,
        item.Calories,
        item.Protein,
        item.Total_Fat,
        item.Carbs,
      ]);

      // Add table to the content
      content.push({
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto'],
          body: [...headers, ...data],
        },
        layout: {
          fillColor: (rowIndex: number) => {
            return rowIndex === 0 ? '#BA68C8' : '#FFF8E5';
          },
        },
      });

      // Add space between categories
      content.push({
        text: ' ',
      });
    }

    // Add space between meal times
    content.push({
      text: ' ',
    });
  });

  // Define the PDF document
  const docDefinition = {
    content: content,
    styles: {
      header: {
        fontSize: 16,
        bold: true,
        margin: [0, 0, 0, 10] as [number, number, number, number],
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 7, 0, 7] as [number, number, number, number],
      },
    },
  };
  

  // Create and download the PDF
  pdfMake.createPdf(docDefinition).download('DietPlan.pdf');
}


export const createPdf = (foodItems: FoodItem[]) => {

  // Set table column headers
  const headers = [['Food Item', 'Avg Serving Size', 'Calories', 'Protein', 'Fats', 'Carbs']];

  // Prepare table data
  const data: string[][] = foodItems.map((item) => [
    item.food_items,
    item.Avg_Serving_Size.toString(),
    item.Calories.toString(),
    item.Protein.toString(),
    item.Total_Fat.toString(),
    item.Carbs.toString(),
  ]);

  // Calculate totals for each column
  let totals = [0, 0, 0, 0, 0];
  foodItems.forEach((item) => {
    totals[0] += item.Avg_Serving_Size;
    totals[1] += item.Calories;
    totals[2] += item.Protein;
    totals[3] += item.Total_Fat;
    totals[4] += item.Carbs;
  });

  // Add the total row to the table data
  data.push(['Total', ...totals.map((total) => total.toFixed(2))]);

  const docDefinition = {
   
    content: [
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto'],
          body: [...headers, ...data.map(row => row.map(cell => cell.toString()) as any)],
        },
        layout: {
          fillColor: (rowIndex: number) => {
            return rowIndex === 0 ? '#BA68C8' : '#FFF8E5';
          },
        },
      },
    ],
  };
  

  // Create and download the PDF
  pdfMake.createPdf(docDefinition).download('FoodItems.pdf');


};



