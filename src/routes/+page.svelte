<script lang="ts">
  import TerminalTyper from '$lib/components/TerminalTyper.svelte';
  
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
    <TerminalTyper 
      textToType={siteName} 
      on:done={handleTypingDone} 
    />
  </header>

  <main class="main-content">
    <div class="page-body">
      <h1>Welcome!</h1>
      <p>The main content of the portfolio will go here.</p>
    </div>
  </main>

  <div class="content-overlay" class:hidden={introFinished}></div>

</div>

<style>
  :global(body) {
    margin: 0;
    font-family: 'JetBrains Mono', monospace;
    background-color: black;
  }

  .page-container {
    min-height: 100vh;
  }

  .main-header {
    position: sticky;
    top: 0;
    height: 80px;
    background-color: black;
    color: #f0f0f0;
    display: flex;
    align-items: center;
    padding: 0 2rem;
    box-sizing: border-box;
    z-index: 200;
  }

  .main-content {
    background-color: #B0E0E6;
    min-height: calc(100vh - 80px);
  }
  
  .page-body {
    padding: 2rem;
    color: #333;
  }

  .content-overlay {
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    height: calc(100vh - 80px);
    background-color: black;
    z-index: 100;
    
    transition: transform 1.2s cubic-bezier(0.86, 0, 0.07, 1);
    transform: translateY(0%);
  }
  
  .content-overlay.hidden {
    transform: translateY(100%);
  }
</style>