<script lang="ts">
    import { onMount } from 'svelte';
    
    export let textToType: string;

    export let speed: number = 150;

    let displayedText = '';

    let isTypingFinished = false;

    onMount(() => {
        let currentIndex = 0;
        const characters = textToType.split('');

        const interval = setInterval(() => {
            if (currentIndex < characters.length) {
                displayedText += characters[currentIndex];
                currentIndex++;
            } else {
                clearInterval(interval);
                isTypingFinished = true;
            }
        }, speed);

        return () => clearInterval(interval);
    });
</script>

<div class="terminal-container">
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