<script lang="ts">
    export let show: boolean =true;
</script>

<div class="overlay" class:hidden={!show}>
    <slot></slot>
</div>

<style>
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100vh;
        background-color: black;
        transition: transform 1.2s cubic bezier(0.86, 0, 0.07, 1);
        transform: translateY(0%);
        z-index: 100;
    }

    .overlay.hidden {
        transform: translateY(100%);
    }
</style>