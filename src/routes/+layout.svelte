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

  let lightsOut = false;
  let mouseX = 0;
  let mouseY = 0;

  function toggleLight(event: MouseEvent) {
    lightsOut = !lightsOut;
    mouseX = event.clientX;
    mouseY = event.clientY;
  }

  function handleMouseMovement(event: MouseEvent) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }
</script>

<svelte:head>
  <title>agnikas.dev</title>
</svelte:head>

<svelte:window on:mousemove={lightsOut ? handleMouseMovement : null} />

<div class="page-container">
  <header class="main-header">
    <Terminal bind:this={terminalInstance}/>

    <div class="header-right-side">
      <button
        class="light-toggle"
        on:click={toggleLight}
        title="enable dark mode"
      >
        💡
      </button>

      <nav class='simple-nav'>
        <button on:click={() => navClick('cd ~')}>Home</button>
        <span>/</span>
        <button on:click={() => navClick('cd about-me')}>About</button>
        <span>/</span>
        <button on:click={() => navClick('cd services')}>Services</button>
        <span>/</span>
        <button on:click={() => navClick('cd projects')}>Projects</button>
        <span>/</span>
        <button on:click={() => navClick('cd contact')}>Contact</button>
      </nav>
    </div>
  </header>

  <slot />

</div>

{#if lightsOut}
  <div
    class="flashlight-overlay"
    style="--mouse-x: {mouseX}px; --mouse-y: {mouseY}px;"
  ></div>
{/if}

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

  .header-right-side {
    display: flex;
    align-items: center;
    margin-left: auto;
    gap: 1.5rem;
  }

  .simple-nav {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-left: auto;
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

  .light-toggle {
    font-size: 1.5rem;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: #aaa;
    transition: color 0.2s ease;
    margin-left: auto;
    margin-right: 1.5rem;
    line-height: 1;
  }

  .light-toggle:hover {
    color: #f0f0f0;
  }

  .flashlight-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: radial-gradient(
      circle at var(--mouse-x) var(--mouse-y),
      transparent 150px,
      rgba(0, 0, 0, 0.98) 250px
    );
    z-index: 199;
    pointer-events: none;
  }
</style>