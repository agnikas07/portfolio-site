<script lang='ts'>
    import RpsSimulator from '$lib/components/RpsSimulator.svelte';

    let showModalId: string | null = null;

    interface Project {
        id: string;
        title: string;
        description:string;
        tags: string[];
        type: 'modal' | 'link';
        url?: string;
        actionText: string;
    }

    const projects = [
        {
            id: 'portfolio-site',
            title: 'Personal Portfolio Site',
            description: 'The source code for this website. Built with SvelteKit, TypeScript, and Firebase. Deployed on Vercel.',
            tags: ['SvelteKit', 'TypeScript', 'Firebase'],
            type: 'link',
            url: 'https://github.com/agnikas07/portfolio-site',
            actionText: 'View on GitHub'
        },
        {
            id: 'steambot',
            title: 'Steam Bot',
            description: 'A Discord bot built with Discord.py that finds multiplayer games on Steam that Discord users have in common.',
            tags: ['Python', 'Discord.py', 'Steam API'],
            type: 'link',
            url: 'https://github.com/agnikas07/SteamBot',
            actionText: 'View on GitHub'
        },
        {
            id: 'rps-simulator',
            title: 'Rock-Paper-Scissors Simulator',
            description: 'A simple simulation of a rock-paper-scissors free for all.',
            tags: ['JavaScript', 'HTML Canvas', 'Simulation'],
            type: 'modal',
            actionText: 'Launch Simulator'
        },
        {
            id: 'bird-game',
            title: 'Unity Flappy Bird Clone (Coming soon!)',
            description: 'A Flappy Bird clone made in the Unity Game Engine using C#. Features simple mechanics and custom graphics. Current link is a placeholder. Enjoy!',
            tags: ['C#', 'Unity', 'Game Development'],
            type: 'link',
            url: 'http://endless.horse/',
            actionText: 'View on itch.io'
        }
    ];
</script>

{#if showModalId}
    <div class="modal-backdrop">
        <div class="modal-content">
            <button class="close-button" on:click={() => showModalId = null}>×</button>
            <RpsSimulator />
        </div>
    </div>
{/if}

<main class="projects-page-container">
  <div class="content-wrapper">
    <h1>My Projects</h1>
    <div class="projects-grid">
      {#each projects as project}
        <div class="project-card">
          <div class="card-content">
            <span class="tags">
              {#each project.tags as tag}
                <span>{tag}</span>
              {/each}
            </span>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </div>
          {#if project.type === 'modal'}
            <button class="launch-button" on:click={() => showModalId = project.id}>
                {project.actionText}
            </button>
          {:else if project.type === 'link' && project.url}
            <a href={project.url} target='_blank' rel='noopener noreferrer' class='launch-button'>
                {project.actionText}
                <span>↗</span>
            </a>
          {/if}
        </div>
      {/each}
      <!-- I will add more project cards here later -->
    </div>
  </div>
</main>

<style>
    .projects-page-container {
        background-color: #E7D6A5/*#e6f0f8*/;
        color: #333;
        min-height: calc(100vh - 80px);
        padding: 4rem 2rem;
        box-sizing: border-box;
    }

    .content-wrapper {
        max-width: 1200px;
        margin: 0 auto;
    }

    h1 {
        font-size: 3.5rem;
        font-weight: 700;
        color: #1a2729;
        margin-bottom: 2.5rem;
        text-align: center;
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 2rem;
    }

    .project-card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .project-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px -10px rgba(0,0,0,0.15);
    }
    
    .card-content {
        padding: 2rem;
    }
    
    .tags {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    .tags span {
        background-color: #e0e7ff;
        color: #4338ca;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
    }

    .project-card h2 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.75rem;
    }

    .project-card p {
        font-size: 1rem;
        line-height: 1.6;
        color: #4b5563;
    }
    
    .launch-button, a.launch-button {
        display: block;
        background-color: #f3f4f6;
        border: none; 
        border-top: 1px solid #e5e7eb; 
        color: #374151;
        width: 100%;
        padding: 1rem;
        font-weight: 600;
        text-align: center;
        transition: background-color 0.2s ease;
        cursor: pointer;
        text-decoration: none;
        font-size: 1rem;
        font-family: 'JetBrains Mono', monospace;
    }
    .launch-button:hover {
        background-color: #e5e7eb;
    }

    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(17, 24, 39, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        padding: 2rem;
        box-sizing: border-box;
    }
    .modal-content {
        background-color: transparent;
        width: 100%;
        height: 100%;
        position: relative;
    }
    .close-button {
        position: absolute;
        top: -1rem;
        right: -1rem;
        background: white;
        color: black;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        z-index: 1010;
        line-height: 38px;
    }
</style>