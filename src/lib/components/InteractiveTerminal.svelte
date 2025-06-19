<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  export let currentPath: string = '/';

  let command = '';
  let commandHistory: { command: string, output: string }[] = [];
  let inputElement: HTMLInputElement;
  let isFocused = false;

  let showConsoleNotification = false;
  let notificationTimeout: ReturnType<typeof setTimeout> | null = null;

  $: displayPath = currentPath === '/' ? '~' : currentPath.substring(1);

  function handleCommand() {
    const trimmedCommand = command.trim();
    let output = '';

    if (trimmedCommand.startsWith('cd ')) {
      const dir = trimmedCommand.split(' ')[1];
      if (['about-me', 'projects', 'contact'].includes(dir)) {
        goto(`/${dir}`);
        output = `Navigating to ${dir}...`;
        console.log(output)
      } else if (dir === '..' || dir === '~' || dir === '/') {
        goto('/');
        output = `Navigating to home...`;
        console.log(output)
      }
      else {
        output = `bash: cd: ${dir}: No such file or directory. Type 'help' for more information.`;
        console.log(output)
        showConsoleNotification = true;
        if (notificationTimeout) clearTimeout(notificationTimeout);
        notificationTimeout = setTimeout(() => showConsoleNotification = false, 3000);
      }
    } else if (trimmedCommand === 'ls' || trimmedCommand === 'help') {
        output = 'Available directories: ~, about-me';
        console.log(output)
    } else if (trimmedCommand === 'clear') {
        commandHistory = [];
    } else if(trimmedCommand.length > 0) {
        output = `bash: ${trimmedCommand}: command not found. Type 'help' for more information.`;
        console.log(output)
        showConsoleNotification = true;
        if (notificationTimeout) clearTimeout(notificationTimeout);
        notificationTimeout = setTimeout(() => showConsoleNotification = false, 3000);
    }
    
    if(trimmedCommand.length > 0) {
        commandHistory = [...commandHistory, { command: trimmedCommand, output }];
    }
    command = '';
  }

  onMount(() => {
    if(inputElement) {
        inputElement.focus();
        isFocused = true;
    }
  });
</script>

{#if showConsoleNotification}
    <div class="console-notification">
        Check your browser console.
    </div>
{/if}

<section
  class="terminal-container"
  aria-label="Interactive terminal"
>
  <span class="prompt-static">agnikas.dev/{displayPath} $</span>
  <form
    on:submit|preventDefault={handleCommand}
    class="input-form"
  >
    <div
      class="input-wrapper"
      role="button"
      tabindex="0"
      on:click={() => inputElement.focus()}
      on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputElement.focus(); }}
    >
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
</section>

<style>
    .terminal-container {
        display: flex;
        align-items: center;
        width: 100%;
        font-size: 1.5rem;
        cursor: text;
    }
    .console-notification {
        position: fixed;
        top: 1rem;
        right: 1rem;
        background: #00000000;
        color: #fff;
        padding: 0.75rem 1.5rem;
        border-radius: 0rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 1000;
        font-size: 1rem;
        opacity: 0.95;
        transition: opacity 0.3s;
    }
    .prompt-static {
        margin-right: 0.5rem;
        font-weight: bold;
        white-space: nowrap;
    }
    .input-form {
        flex-grow: 1;
    }
    .input-wrapper {
        display: flex;
        align-items: center;
        flex-grow: 1;
        position: relative;
    }
    .command-display {
        white-space: break-spaces; 
        font-weight: bold;
        color: #f0f0f0;
        min-height: 1.6rem;
    }
    .terminal-input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        border: none;
        padding: 0;
        margin: 0;
        cursor: text;
        font-family: 'JetBrains Mono', monospace;
        font-size: 1.5rem;
    }
    .cursor {
        display: inline-block;
        width: 0.9rem;
        height: 1.6rem;
        background-color: transparent;
        border: 2px solid #f0f0f0;
        box-sizing: border-box;
    }
    .cursor.focused {
        background-color: #f0f0f0;
        border: none;
        animation: blink 1s step-end infinite;
    }
    @keyframes blink {
        from, to { background-color: transparent; }
        50% { background-color: #f0f0f0; }
    }
</style>