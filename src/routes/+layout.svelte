<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import Terminal from '$lib/components/Terminal.svelte';
  import { injectSpeedInsights } from '@vercel/speed-insights';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';

  injectSpeedInsights();
  injectAnalytics();

  afterNavigate(() => {
    window.scrollTo(0, 0);
  });

  let terminalInstance: Terminal;

  function navClick(command: string) {
    if (terminalInstance) {
      terminalInstance.runTerminalCommand(command);
    }
  }
</script>

<div class="page-container">
  <header class="main-header">
    <Terminal bind:this={terminalInstance}/>
    <nav class='simple-nav'>
      <button on:click={() => navClick('cd ~')}>Home</button>
      <span>/</span>
      <button on:click={() => navClick('cd about-me')}>About</button>
      <span>/</span>
      <button on:click={() => navClick('cd projects')}>Projects</button>
      <span>/</span>
      <button on:click={() => navClick('cd contact')}>Contact</button>
    </nav>
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
  
  :global(body:has(main.welcome-page)) {
    overflow-y: hidden;
  }
  :global(body:has(main.about-page)) {
    overflow-y: auto;
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

  .simple-nav {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .simple-nav button {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1rem;
    color: #aaa;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .simple-nav button:hover {
    color: #f0f0f0;
  }

  .simple-nav span {
    color: #555;
    user-select: none;
  }
</style>