<script lang="ts">
    import TerminalTyper from '$lib/components/TerminalTyper.svelte';
    
    const siteName = "agnikas.dev";
    const greeting = "Welcome to my portfolio.";
</script>

<div class="main-container">
    <TerminalTyper textToType={siteName} />
    <!-- I will possibly add more to this later.-->
</div>

<style>
    :global(body) {
        margin: 0;
        background-color: black;
        font-family: 'JetBrains Mono', monospace;
        color: #f0f0f0;
    }

    .main-container {
        min-height: 100vh;
        padding: 2rem;
        box-sizing: border-box;
    }
</style>