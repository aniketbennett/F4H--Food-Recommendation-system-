<script lang="ts">  
    export let title:string;
    export let value:string;
    export let color:string = "yellow";
    export let unit:string; 
  export let max:number;

    let bgcolor= "bg-yellow-500";

 $:   if (color == "yellow") {
      bgcolor = "bg-yellow-500";
    } else if (color == "green") {
      bgcolor = "bg-green-500";
    } else {
      bgcolor = "bg-red-500";
    }


    function getBarColor(value:number , max:number) {
    if (value <= max * 0.9) {
      return 'bg-yellow-500';
    } else if (value > max * 0.9 && value <= max * 1.1) {
      return 'bg-green-500';
    } else {
      return 'bg-red-500';
    }


  }
</script>
<li class="grid grid-cols-10 items-center">
  <div class="col-span-1 col-start-1 flex items-center justify-center">
    <div class="{bgcolor} rounded-full h-4 w-4 "></div>
  </div>
  <div class="col-start-3 col-span-4">
    <p class="font-semibold text-center text-2xl ">{title}</p>
    <div class="relative pt-1">
      <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
        <div
          style="width: {Math.min((parseFloat(value) / (max * 1.1)) * 100, 100)}%;"
          class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center {bgcolor}"
        ></div>
      </div>
    </div>
  </div>
  <div class="col-start-7 col-span-4 flex items-center justify-center">
    <p class="text-xl mr-1">{value}</p>
    <p class="mt-1">{unit}</p>
  </div>
</li>