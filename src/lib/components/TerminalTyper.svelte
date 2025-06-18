<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte';
    
    export let textToType: string;
    export let speed: number = 150;
    export let initialDelay: number = 500;

    let displayedText = '';
    let isTypingFinished = false;

    const dispatch = createEventDispatcher();

    onMount(() => {
        let currentIndex = 0;
        const characters = textToType.split('');
        let interval: ReturnType<typeof setInterval>;

        const startTyping = () => {
            interval = setInterval(() => {
                if (currentIndex < characters.length) {
                    displayedText += characters[currentIndex];
                    currentIndex++;
                } else {
                    clearInterval(interval);
                    isTypingFinished = true;
                    dispatch('done');
                }
            }, speed);
        };

        const timeout = setTimeout(startTyping, initialDelay);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    });
</script>

<div class="terminal-container">
    <span class="blue-tilde">~</span>
    <span class="typed-text">{displayedText}</span>
    <span class="cursor" class:blinking-cursor={isTypingFinished}></span>
</div>

<style>
    .terminal-container {
        display: flex;
        align-items: center;
        font-size: 2rem;
        font-weight: bold;
    }

    .blue-tilde {
        color: #3498db;
        margin-right: 0.5rem;
    }

    .cursor {
        display: inline-block;
        width: 1rem;
        height: 2.2rem;
        background-color: #f0f0f0;
        margin-left: 0.1rem;
        animation: none;
    }

    .blinking-cursor {
        animation: blink 1s step-end infinite;
    }

    @keyframes blink {
        from, to {
            background-color: transparent;
        }
        50% {
            background-color: #f0f0f0;
        }
    }
</style>