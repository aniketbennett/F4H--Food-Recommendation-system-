<script>
	// import { disease } from '../store/disease.js';
  // @ts-nocheck

  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  export let id = "";
  export let value = [];
  export let readonly = false;

  let input,
    inputValue,
    options = [],
    activeOption,
    showOptions = false,
    selected = {},
    first = true,
    slot;
  const iconClearPath =
    "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z";

  onMount(() => {
    slot.querySelectorAll("option").forEach((o) => {
      o.selected && !value.includes(o.value) && (value = [...value, o.value]);
      options = [...options, { value: o.value, name: o.textContent }];
    });
    value &&
      (selected = options.reduce(
        (obj, op) =>
          value.includes(op.value) ? { ...obj, [op.value]: op } : obj,
        {}
      ));
    first = false;
  });

  $: if (!first) value = Object.values(selected).map((o) => o.value);
  $: filtered = options.filter((o) =>
    inputValue ? o.name.toLowerCase().includes(inputValue.toLowerCase()) : o
  );
  $: if (
    (activeOption && !filtered.includes(activeOption)) ||
    (!activeOption && inputValue)
  )
    activeOption = filtered[0];

  function add(token) {
    if (!readonly) selected[token.value] = token;
  }

  function remove(value) {
    if (!readonly) {
      const { [value]: val, ...rest } = selected;
      selected = rest;
    }
  }

  function optionsVisibility(show) {
    if (readonly) return;
    if (typeof show === "boolean") {
      showOptions = show;
      show && input.focus();
    } else {
      showOptions = !showOptions;
    }
    if (!showOptions) {
      activeOption = undefined;
    }
  }

  function handleKeyup(e) {
    if (e.keyCode === 13) {
      Object.keys(selected).includes(activeOption.value)
        ? remove(activeOption.value)
        : add(activeOption);
      inputValue = "";
    }
    if ([38, 40].includes(e.keyCode)) {
      // up and down arrows
      const increment = e.keyCode === 38 ? -1 : 1;
      const calcIndex = filtered.indexOf(activeOption) + increment;
      activeOption =
        calcIndex < 0
          ? filtered[filtered.length - 1]
          : calcIndex === filtered.length
          ? filtered[0]
          : filtered[calcIndex];
    }
  }

  function handleBlur(e) {
    optionsVisibility(false);
  }

  function handleTokenClick(e) {
    if (e.target.closest(".token-remove")) {
      e.stopPropagation();
      remove(e.target.closest(".token").dataset.id);
    } else if (e.target.closest(".remove-all")) {
      selected = [];
      inputValue = "";
    } else {
      optionsVisibility(true);
    }
  }

  function handleOptionMousedown(e) {
    const value = e.target.dataset.value;
    if (selected[value]) {
      remove(value);
    } else {
      add(options.filter((o) => o.value === value)[0]);
      input.focus();
    }
  }


</script>

<div
  class="multiselect border border-white rounded-lg h-24 w-8/12"
  class:readonly
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class=" h-full flex flex-wrap overflow-scroll"
    class:showOptions
    on:click={handleTokenClick}
  >
    {#each Object.values(selected) as s}
      <div
        class="token m-2 token-remove h-1/2 text-xl font-poppins rounded-3xl font-semibold text-primary bg-white px-2 flex justify-center items-center"
        data-id={s.value}
      >
        <span>{s.name}</span>
        {#if !readonly}
          <div class=" bg-primary rounded-full ml-2" title="Remove {s.name}">
            <svg
              class="fill-primary"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path class="fill-white" d={iconClearPath} />
            </svg>
          </div>
        {/if}
      </div>
    {/each}
    <div class="actions relative w-full">
      {#if !readonly}
        <input
          class="h-full w-full rounded-[7px] text-3xl text-white bg-transparent px-3 py-2.5 font-sans font-normal text-blue-gray-700 outline outline-0 transition-all placeholder:text-white"
          {id}
          autocomplete="off"
          bind:value={inputValue}
          bind:this={input}
          on:keyup={handleKeyup}
          on:blur={handleBlur}
          placeholder="Select Disease"
        />
        <div
          class="bg-white remove-all rounded-full mr-2"
          title="Remove All"
          class:hidden={!Object.keys(selected).length}
        >
          <svg
            class="icon-clear"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path class="fill-primary" d={iconClearPath} />
          </svg>
      
        </div>
       
      {/if}
    </div>
  </div>

  <select bind:this={slot} type="multiple" class="hidden"><slot /></select>

  {#if showOptions}
    <ul
      transition:fly={{ duration: 200, y: 5 }}
      on:mousedown|preventDefault={handleOptionMousedown}
    >
      {#each filtered as option}
        <li
          class:selected={selected[option.value]}
          class:active={activeOption === option}
          data-value={option.value}
        >
          {option.name}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .multiselect {
    /* background-color: white; */
    position: relative;
  }
  
  .token:hover {
    background-color: hsl(214, 15%, 88%);
  }
  .readonly .token {
    color: hsl(0, 0%, 40%);
  }

  .actions {
    align-items: center;
    display: flex;
    flex: 1;
    min-width: 15rem;
  }

  

  li {
    background-color: white;
    cursor: pointer;
    padding: 0.5rem;
  }
  li:last-child {
    border-bottom-left-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
  }
  li:not(.selected):hover {
    background-color: hsl(214, 17%, 92%);
  }
  li.selected {
    background-color: hsl(295, 54%, 41%);
    color: white;
  }
  li.selected:nth-child(even) {
    background-color: hsl(287, 50%, 45%);
    color: white;
  }
  li.active {
    background-color: hsl(214, 17%, 88%);
  }
  li.selected.active,
  li.selected:hover {
    background-color: hsl(332, 48%, 50%);
  }

  .hidden {
    display: none;
  }
</style>
