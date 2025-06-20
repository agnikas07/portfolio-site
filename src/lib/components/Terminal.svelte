<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let mode: 'typing' | 'interactive' = 'typing';

  const siteName = "agnikas.dev";
  let displayedText = '';
  const typingSpeed = 150;

  let command = '';
  let inputElement: HTMLInputElement;
  let isFocused = false;
  $: displayPath = $page.url.pathname === '/' ? '~' : $page.url.pathname.substring(1);

  function handleCommand() {
    const trimmedCommand = command.trim();
    if (trimmedCommand.startsWith('cd ')) {
      const dir = trimmedCommand.split(' ')[1];
      if (['about-me', 'projects', 'contact'].includes(dir)) {
        window.location.href = `/${dir}`;
      } else if (dir === '..' || dir === '~' || dir === '/') {
        goto(`/`);
      }
    }
    command = '';
  }

  onMount(() => {
    if ($page.url.pathname === '/') {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < siteName.length) {
          displayedText += siteName[currentIndex];
          currentIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            mode = 'interactive';
            setTimeout(() => inputElement?.focus(), 0);
          }, 500);
        }
      }, typingSpeed);
    } else {
      mode = 'interactive';
      setTimeout(() => inputElement?.focus(), 0);
    }
  });
</script>

{#if mode === 'typing'}
  <div class="typing-container">
    <span class="typed-text">{displayedText}</span>
    <span class="typing-cursor"></span>
  </div>
{:else}

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="interactive-container" on:click={() => inputElement.focus()}>
    <span class="prompt-static">agnikas.dev/{displayPath} $</span>
    <form on:submit|preventDefault={handleCommand} class="input-form">
      <div class="input-wrapper">
        <span class="command-display">{command}</span>
        <span class="cursor" class:focused={isFocused}></span>
        <input
          bind:this={inputElement}
          type="text"
          bind:value={command}
          class="terminal-input"
          on:focus={() => isFocused = true}
          on:blur={() => isFocused = false}
        />
      </div>
    </form>
  </div>
{/if}

<style>
  .typing-container {
    display: flex; align-items: center; font-size: 2rem;
    font-weight: bold; color: #f0f0f0;
  }
  .typing-cursor {
    display: inline-block; width: 1rem; height: 2.2rem;
    background-color: #f0f0f0; margin-left: 0.1rem;
  }

  .interactive-container {
    display: flex; align-items: center; width: 100%;
    font-size: 1.5rem; cursor: text;
  }
  .prompt-static {
    margin-right: 0.5rem; font-weight: bold; white-space: nowrap;
  }
  .input-form, .input-wrapper {
    display: flex; align-items: center; flex-grow: 1; position: relative;
  }
  .command-display {
    white-space: break-spaces; font-weight: bold;
    color: #f0f0f0; min-height: 1.6rem;
  }
  .terminal-input {
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%;
    opacity: 0; border: none; padding: 0; margin: 0;
    cursor: text; font-family: 'JetBrains Mono', monospace; font-size: 1.5rem;
  }
  .cursor {
    display: inline-block; width: 0.9rem; height: 1.6rem;
    background-color: transparent; border: 2px solid #f0f0f0;
    box-sizing: border-box;
  }
  .cursor.focused {
    background-color: #f0f0f0; border: none;
    animation: blink 1s step-end infinite;
  }
  @keyframes blink {
    from, to { background-color: transparent; }
    50% { background-color: #f0f0f0; }
  }
</style>