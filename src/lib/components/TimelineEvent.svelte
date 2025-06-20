<script lang="ts">
    import { onMount } from "svelte";

    export let date: string;
    export let title: string;
    export let description: string;
    export let side: 'left' | 'right';

    let element: HTMLElement;
    let inView = false;

    onMount(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    inView = true;
                    observer.disconnect();
                }
            },
            {
                threshold: 0.45
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    });
</script>

<div bind:this={element} class="event-container" class:left={side === 'left'} class:right={side === 'right'} class:in-view={inView}>
    <div class="content-wrapper">
        <div class="content-box">
            <div class="date">{date}</div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    </div>
    <div class="model-wrapper">
        <div class="model-placeholder">
            3D Model Here
        </div>
    </div>
</div>

<style>
    .event-container {
        padding: 10px 40px;
        position: relative;
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 15rem;
        display: flex;

        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    .event-container.in-view {
        opacity: 1;
        transform: translateY(0);
    }
    
    .event-container::after {
        content: '';
        position: absolute;
        width: 25px;
        height: 25px;
        background-color: white;
        border: 4px solid #334e52;
        top: 28px;
        border-radius: 50%;
        z-index: 2;
        left: 50%;
        transform: translateX(-50%);
    }

    .content-wrapper, .model-wrapper {
        width: 50%;
        box-sizing: border-box;
    }

    .left {
        flex-direction: row;
    }
    .right {
        flex-direction: row-reverse;
    }

    .left .content-wrapper { padding-right: 70px; text-align: right; }
    .left .model-wrapper { padding-left: 70px; }
    .right .content-wrapper { padding-left: 70px; text-align: left; }
    .right .model-wrapper { padding-right: 70px; }
    

    .content-box {
        padding: 20px 30px;
        background-color: white;
        position: relative;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }

    .date {
        font-size: 0.9rem;
        font-weight: bold;
        color: #5a7a7f;
        margin-bottom: 0.5rem;
    }

    h2 {
        margin: 0 0 0.5rem 0;
        font-size: 1.5rem;
        color: #1a2729;
    }

    p {
        margin: 0;
        font-size: 1rem;
        line-height: 1.6;
    }

    .model-placeholder {
        height: 200px;
        width: 100%;
        background-color: #e0eaf1;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        color: #a0b4c2;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }
</style>