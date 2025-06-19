<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';

  let visitorCount = 6711;
  let clickCount = 0;
  let buttonState: 'normal' | 'damaged' | 'broken' = 'normal';
  let lowerAssemblyElement: HTMLElement;

  const dispatch = createEventDispatcher();

  function handleButtonClick() {
    clickCount++;
    if (clickCount === 1) { visitorCount++; }
    else if (clickCount === 2) { visitorCount++;buttonState = 'damaged'; }
    else if (clickCount === 3) { visitorCount++; buttonState = 'broken'; dispatch('break', { element: lowerAssemblyElement }); }
  }

  $: formattedCount = visitorCount.toString().padStart(4, '0');
</script>
<div class="counter-assembly">
  <div class="counter-box" transition:fly={{ y: -60, duration: 800, delay: 300 }}>
    <div class="counter-label">VISITORS</div>
    <div class="digit-display">
      {#each formattedCount as digit}<span class="digit">{digit}</span>{/each}
    </div>
  </div>
  <div class="lower-assembly" bind:this={lowerAssemblyElement} class:damaged={buttonState === 'damaged'} class:broken={buttonState === 'broken'} transition:fly={{ y: -60, duration: 800, delay: 600 }}>
    <div class="strut"></div>
    <div class="button-housing">
      <button class="red-button" on:click={handleButtonClick} disabled={buttonState === 'broken'} aria-label="Increment visitor count"></button>
    </div>
  </div>
</div>
<style>
  .counter-assembly { display: flex; flex-direction: column; align-items: center; }
  .counter-box { background: #444; border: 2px solid #222; border-radius: 6px; padding: 6px 12px; box-shadow: 0 3px 8px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1); display: inline-block; position: relative; z-index: 10; }
  .counter-label { color: white; font-size: 0.5rem; text-align: center; margin-bottom: 3px; letter-spacing: 0.5px; }
  .digit-display { background: #111; border-radius: 3px; padding: 4px; display: flex; gap: 3px; }
  .digit { color: white; font-size: 1.5rem; font-weight: bold; background-color: #222; padding: 3px 6px; border-radius: 2px; line-height: 1; }
  .lower-assembly { display: flex; flex-direction: column; align-items: center; transform-origin: top center; }
  .strut { width: 10px; height: 12px; background: #555; border-left: 2px solid #222; border-right: 2px solid #222; margin-top: -2px; }
  .button-housing { background: #444; border: 2px solid #222; border-top: none; border-radius: 0 0 6px 6px; padding: 8px; box-shadow: 0 3px 8px rgba(0,0,0,0.3); }
  .red-button { width: 35px; height: 35px; background: #d92027; border: 2px solid #a4171c; border-radius: 50%; cursor: pointer; display: block; animation: red-glow 2s infinite ease-in-out; }
  @keyframes red-glow { 0%, 100% { box-shadow: 0 0 5px #ff4848, 0 0 10px #ff4848; } 50% { box-shadow: 0 0 15px #ff6464, 0 0 25px #ff6464; } }
  .red-button:active { transform: scale(0.95); }
  
  .lower-assembly.damaged { animation: swing 1.5s ease-in-out infinite; }
  @keyframes swing { 0%, 100% { transform: rotate(15deg); } 50% { transform: rotate(-15deg); } }
  
  .lower-assembly.broken {
    position: fixed;
    transform-origin: 50% 50%;
    pointer-events: all;
    animation: none;
  }
  .lower-assembly.broken .red-button {
     animation: none;
     box-shadow: none;
     pointer-events: none;
  }
</style>