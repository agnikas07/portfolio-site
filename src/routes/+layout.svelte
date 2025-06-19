<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores'; // NEW: Import the page store
  import TerminalTyper from '$lib/components/TerminalTyper.svelte';
  import InteractiveTerminal from '$lib/components/InteractiveTerminal.svelte';

  const siteName = "agnikas.dev";
  let introFinished = false;

  function handleTypingDone() {
    setTimeout(() => {
        introFinished = true;
    }, 500);
  }
</script>

<div class="page-container">
  <header class="main-header">
    {#if !introFinished}
      <TerminalTyper textToType={siteName} on:done={handleTypingDone} />
    {:else}
      <!-- Pass the current path to the component -->
      <InteractiveTerminal currentPath={$page.url.pathname} />
    {/if}
  </header>

  <slot />

</div>

<style>
  :global(body) {
    margin: 0;
    font-family: 'JetBrains Mono', monospace;
    background-color: black;
    overflow-x: hidden;
  }

  .page-container {
    min-height: 100vh;
  }

  .main-header {
    position: sticky; top: 0; height: 80px;
    background-color: black; color: #f0f0f0;
    display: flex; align-items: center; padding: 0 2rem;
    box-sizing: border-box; z-index: 200;
  }
</style>