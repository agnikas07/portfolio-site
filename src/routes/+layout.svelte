<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import Terminal from '$lib/components/Terminal.svelte';
  import { injectSpeedInsights } from '@vercel/speed-insights';

  injectSpeedInsights();

  afterNavigate(() => {
    window.scrollTo(0, 0);
  });
</script>

<div class="page-container">
  <header class="main-header">
    <Terminal />
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
</style>