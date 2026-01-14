<script lang="ts">
    import RpsSimulator from '$lib/components/RpsSimulator.svelte';
    import { fade, fly } from 'svelte/transition';
    import { onMount, onDestroy } from 'svelte';

    let showModalId: string | null = null;

    interface Project {
        id: string;
        title: string;
        description: string;
        tags: string[];
        type: 'modal' | 'link';
        url?: string;
        actionText: string;
        icon: string;
    }

    const projects: Project[] = [
        {
            id: 'portfolio-site',
            title: 'Personal Portfolio',
            description: 'The source code for this website. Built with SvelteKit, TypeScript, and Firebase. Designed to be a digital playground.',
            tags: ['SvelteKit', 'TypeScript', 'Firebase'],
            type: 'link',
            url: 'https://github.com/agnikas07/portfolio-site',
            actionText: 'View Source',
            icon: '🔗'
        },
        {
            id: 'steambot',
            title: 'Steam Bot',
            description: 'A Discord bot built with Discord.py that finds multiplayer games on Steam that Discord users have in common.',
            tags: ['Python', 'Discord.py', 'Steam API'],
            type: 'link',
            url: 'https://github.com/agnikas07/SteamBot',
            actionText: 'View Source',
            icon: '🤖'
        },
        {
            id: 'rps-simulator',
            title: 'RPS Simulator',
            description: 'A chaotic simulation of a rock-paper-scissors free for all. Watch the elements battle for dominance.',
            tags: ['JavaScript', 'Canvas', 'Simulation'],
            type: 'modal',
            actionText: 'Launch Sim',
            icon: '🎮'
        },
        {
            id: 'k4-site',
            title: 'Kilo 4 Consulting Website',
            description: 'A freelance project for a modern, responsive website for Kilo 4 Consulting, built with SvelteKit and Tailwind CSS.',
            tags: ["SvelteKit", "Tailwind CSS", "Freelance"],
            type: 'link',
            url: 'https://www.kilo4consulting.com/',
            actionText: 'Visit Site',
            icon: '🌐'
        },
        {
            id: 'bird-game',
            title: 'Flappy Bird Clone (Coming Soon)',
            description: 'A Flappy Bird clone made in the Unity Game Engine using C#. Features simple mechanics and custom graphics.',
            tags: ['C#', 'Unity', 'GameDev'],
            type: 'link',
            url: 'http://endless.horse/',
            actionText: 'Play Demo (Coming Soon)',
            icon: '🎮'
        }
    ];

    const colors = ['#4f46e5', '#059669', '#db2777', '#d97706']; 
    function getColor(index: number) {
        return colors[index % colors.length];
    }

    let canvas: HTMLCanvasElement;
    let width: number;
    let height: number;
    let animationId: number;
    
    const fontSize = 16;
    const spacing = 20;
    const chars = "01010101010101<>{}[]!@#$%^&*()_+-=/|?";
    const stableChars = "0101{}<>";
    
    let grid: string[][] = [];
    let mouse = { x: -1000, y: -1000 };
    let cols = 0;
    let rows = 0;

    onMount(() => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const init = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            cols = Math.ceil(width / spacing);
            rows = Math.ceil(height / spacing);

            grid = [];
            for (let r = 0; r < rows; r++) {
                const row = [];
                for (let c = 0; c < cols; c++) {
                    row.push(stableChars[Math.floor(Math.random() * stableChars.length)]);
                }
                grid.push(row);
            }
        };

        const animate = () => {
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, width, height);

            ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
            ctx.textAlign = 'center';

            const timeStep = Math.floor(Date.now() / 100);

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = c * spacing + spacing / 2;
                    const y = r * spacing + spacing / 2;

                    const dx = mouse.x - x;
                    const dy = mouse.y - y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 40) {
                        ctx.fillStyle = '#94a3b8'; 
                        
                        const pseudoRandomIndex = (timeStep + (r * 11) + (c * 7)) % chars.length;
                        const char = chars[pseudoRandomIndex];
                        
                        ctx.fillText(char, x, y);
                    } else {
                        ctx.fillStyle = '#1e293b'; 
                        ctx.fillText(grid[r][c], x, y);
                    }
                }
            }
            animationId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', init);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        init();
        animate();

        return () => {
            window.removeEventListener('resize', init);
            cancelAnimationFrame(animationId);
        };
    });

</script>

{#if showModalId}
    <div class="modal-backdrop" transition:fade={{duration: 200}} on:click={() => showModalId = null} role="presentation">
        <!-- svelte-ignore a11y_interactive_supports_focus -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div class="modal-content" on:click|stopPropagation role="dialog" aria-modal="true">
            <button class="close-button" on:click={() => showModalId = null}>×</button>
            <div class="sim-wrapper">
                <RpsSimulator />
            </div>
        </div>
    </div>
{/if}

<main class="projects-container">
    
    <canvas bind:this={canvas} class="matrix-canvas"></canvas>

    <div class="content-wrapper">
        <div class="header-tag">&lt;PROJECTS /&gt;</div>

        <div class="projects-grid">
            {#each projects as project, i}
                <div 
                    class="project-card" 
                    style="--card-accent: {getColor(i)}"
                    in:fly={{ y: 20, delay: i * 100, duration: 400 }}
                >
                    <div class="card-content">
                        <div class="card-header">
                            <span class="icon">
                                {project.icon}
                            </span>
                            <h2>{project.title}</h2>
                        </div>
                        
                        <div class="tags">
                            {#each project.tags as tag}
                                <span class="tag">{tag}</span>
                            {/each}
                        </div>
                        
                        <p class="description">{project.description}</p>
                    </div>

                    <div class="card-actions">
                        {#if project.type === 'modal'}
                            <button class="launch-button" on:click={() => showModalId = project.id}>
                                {project.actionText}
                            </button>
                        {:else if project.type === 'link' && project.url}
                            <a href={project.url} target='_blank' rel='noopener noreferrer' class='launch-button'>
                                {project.actionText} <span>↗</span>
                            </a>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</main>

<style>
    :global(body) {
        background-color: #0f172a;
    }

    .projects-container {
        position: relative;
        min-height: calc(100vh - 80px);
        padding: 4rem 2rem;
        box-sizing: border-box;
        overflow: hidden;
        font-family: 'JetBrains Mono', monospace;
        color: #f8fafc;
    }

    .matrix-canvas {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        z-index: 0;
        pointer-events: none;
    }

    .content-wrapper {
        position: relative;
        z-index: 2;
        max-width: 1200px;
        margin: 0 auto;
    }

    .header-tag {
        font-size: 1.5rem;
        font-weight: 700;
        color: #fff;
        margin-bottom: 2rem;
        text-shadow: 0 0 10px rgba(255,255,255,0.5);
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 2rem;
    }

    .project-card {
        background: rgba(30, 41, 59, 0.9);
        border: 2px solid #334155;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        height: 100%;
        backdrop-filter: blur(5px);
        will-change: transform;
    }

    .project-card:hover {
        transform: translateY(-5px);
        border-color: var(--card-accent);
        box-shadow: 0 0 20px rgba(0,0,0,0.3), 0 0 10px var(--card-accent);
    }

    .card-content {
        padding: 1.5rem;
    }

    .card-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
    }

    .card-header h2 {
        font-size: 1.25rem;
        font-weight: 700;
        margin: 0;
        color: #fff;
    }

    .icon {
        font-size: 1.5rem;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }

    .tag {
        background-color: rgba(255, 255, 255, 0.05);
        color: var(--card-accent);
        font-size: 0.75rem;
        font-weight: 600;
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,0.1);
    }

    .description {
        font-size: 0.95rem;
        line-height: 1.6;
        color: #94a3b8;
        margin: 0;
    }

    .card-actions {
        padding: 1rem 1.5rem;
        border-top: 1px solid #334155;
        background: rgba(0,0,0,0.2);
    }

    .launch-button, a.launch-button {
        display: block;
        width: 100%;
        background-color: transparent;
        border: 1px solid var(--card-accent);
        color: var(--card-accent);
        padding: 0.75rem;
        font-weight: 700;
        text-align: center;
        transition: all 0.2s ease;
        cursor: pointer;
        text-decoration: none;
        font-size: 0.9rem;
        font-family: 'JetBrains Mono', monospace;
        border-radius: 6px;
        box-sizing: border-box;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .launch-button:hover {
        background-color: var(--card-accent);
        color: white;
        box-shadow: 0 0 15px var(--card-accent);
    }

    .modal-backdrop {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background-color: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(5px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        padding: 2rem;
        box-sizing: border-box;
        cursor: pointer;
    }

    .modal-content {
        position: relative;
        width: 100%;
        max-width: 900px;
        height: 80vh;
        max-height: 800px;
        display: flex;
        flex-direction: column;
        background: #0f172a;
        border: 2px solid #334155;
        border-radius: 12px;
        box-shadow: 0 0 50px rgba(0,0,0,0.5);
        overflow: hidden;
    }

    .sim-wrapper {
        background: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }

    .close-button {
        position: absolute;
        top: 1rem; right: 1rem;
        background: rgba(255,255,255,0.1);
        color: black;
        border: none;
        border-radius: 50%;
        width: 40px; height: 40px;
        font-size: 24px;
        cursor: pointer;
        z-index: 1010;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
    }
    .close-button:hover {
        background: rgba(220, 38, 38, 0.8);
    }

    @media (max-width: 768px) {
        .projects-grid {
            grid-template-columns: 1fr;
        }
    }
</style>