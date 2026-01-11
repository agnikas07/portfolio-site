<script lang="ts">
    import { fade } from 'svelte/transition';
    import { crossfade } from 'svelte/transition';
    import { cubicOut, quintOut } from 'svelte/easing';

    interface ServiceNode {
        id: string;
        title: string;
        icon: string;
        shortDesc: string;
        fullDesc: string;
        tags: string[];
        x: number;
        y: number;
        color: string;
    }

    const services: ServiceNode[] = [
        {
            id: 'web',
            title: 'Web Dev & Rescue',
            icon: '🌐',
            shortDesc: "Because your nephew 'who is good with computers' ghosted you halfway through the build.",
            fullDesc: 'I build lightning-fast, modern websites using SvelteKit and React. Whether you need a brand new landing page that actually converts, or someone to untangle the spaghetti code on your existing site, I\'m your guy.',
            tags: [ 'SvelteKit', 'React', 'Design', 'SEO' ],
            x: 50, y: 20,
            color: "#B0E0E6"
        },
        {
            id: "auto",
            title: "Automation",
            icon: "⚡",
            shortDesc: "Saving you from the Carpal Tunnel syndrome induced by 10,000 rows of Excel data.",
            fullDesc: "If you find yourself clicking the same buttons or copy-pasting the same data every day, stop. I write Python scripts and automation tools that handle the boring stuff instantly, so you can focus on the work that actually requires a human brain.",
            tags: [ 'Python', 'Pandas', 'APIs', 'Google Scripts' ],
            x: 80, y: 50,
            color: "#059669"
        },
        {
            id: "code",
            title: "Custom Code",
            icon: "🧬",
            shortDesc: "Mad scientist experiments, available upon request.",
            fullDesc: "Need a Discord bot that manages your community? A specialized dashboard for your internal tools? A custom web-scraper? If it involves logic and code, I can build it. I love tackling weird, specific problems that off-the-shelf software can't solve.",
            tags: [ 'Discord.py', "Custom Tools", "API Webhooks", "Node.js" ],
            x: 50, y: 80,
            color: "#db2777"
        },
        {
            id: "it",
            title: "IT Solutions",
            icon: "🛠️",
            shortDesc: "I read the documentation so you don't have to.",
            fullDesc: "Setting up a CRM, configuring a new email server, or integrating complex business software can be a nightmare. I handle the heavy lifting of installation, configuration, and troubleshooting to ensure your tech stack actually works for you, not against you.",
            tags: [ 'CRM Setup', 'Software Config', 'Troubleshooting', 'Consulting' ],
            x: 20, y: 50,
            color: "#d97706"
        }
    ];

    let selectedService: ServiceNode | null = null;

    const [send, receive] = crossfade({
        duration: 150,
        easing: quintOut,
        fallback: (node, params) => fade(node, params as any)
    });

    function select(service: ServiceNode) {
        selectedService = service;
    }

    function close() {
        selectedService = null;
    }
</script>

<main class="services-container">
  
  <h1 class="bg-title">SERVICES</h1>

  <div class="constellation-wrapper">
    
    <svg class="connections">
      {#each services as service}
        <line 
          x1="50%" y1="50%" 
          x2="{service.x}%" y2="{service.y}%" 
          stroke={selectedService?.id === service.id ? service.color : '#334155'} 
          stroke-width={selectedService?.id === service.id ? "4" : "2"}
          class:active-line={selectedService?.id === service.id}
        />
      {/each}
    </svg>

    <div class="center-node" class:dimmed={selectedService !== null}>
      <div class="avatar">
        <span>👨‍💻</span>
      </div>
      <div class="center-label">agnikas.dev</div>
    </div>

    {#each services as service}
      {#if selectedService?.id !== service.id}
        <button 
          class="service-node"
          style="left: {service.x}%; top: {service.y}%; --node-color: {service.color}"
          on:click={() => select(service)}
          in:receive={{key: service.id}}
          out:send={{key: service.id}}
        >
          <div class="node-icon">{service.icon}</div>
          <div class="node-info">
            <span class="node-title">{service.title}</span>
            <span class="node-short">{service.shortDesc}</span>
          </div>
        </button>
      {/if}
    {/each}
  </div>

  {#if selectedService}
    <div 
        class="modal-backdrop" 
        on:click|self={close}
        on:keydown={(e) => e.key === 'Escape' && close()}
        role="presentation"
        transition:fade={{duration: 150}}
    >
      <section 
        class="modal-card"
        style="--node-color: {selectedService.color}"
        in:send={{key: selectedService?.id}}
        out:receive={{key: selectedService?.id}}
        role="dialog"
        aria-modal="true"
      >
        <button class="close-btn" type="button" on:click={close}>×</button>
        
        <div class="modal-header">
          <div class="modal-icon">{selectedService.icon}</div>
          <h2>{selectedService.title}</h2>
        </div>

        <div class="modal-body">
          <p>{selectedService.fullDesc}</p>
          
          <div class="tags">
            {#each selectedService.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>

          <a href="mailto:angelo@agnikas.dev?subject=Inquiry: {selectedService.title}"
             class="action-button" 
             target="_blank" 
             rel="noopener noreferrer"
          >
            Start Project
          </a>
        </div>
      </section>
    </div>
  {/if}

</main>

<style>
  :global(body) {
    background-color: #0f172a; /* Dark Slate background */
  }

  .services-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 80px); /* Adjust for your header height */
    overflow: hidden;
    color: #f8fafc;
    font-family: 'JetBrains Mono', monospace;
  }

  /* Background Text */
  .bg-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 15vw;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.03);
    pointer-events: none;
    z-index: 0;
    margin: 0;
  }

  .constellation-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 1000px;
    margin: 0 auto;
    z-index: 1;
  }

  /* SVG Lines */
  .connections {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  
  .connections line {
    transition: stroke 0.3s, stroke-width 0.3s;
  }

  /* Central Node */
  .center-node {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: opacity 0.3s, filter 0.3s;
  }
  .center-node.dimmed {
    opacity: 0.3;
    filter: blur(2px);
  }
  .avatar {
    width: 80px;
    height: 80px;
    background: #1e293b;
    border: 2px solid #334155;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
    z-index: 2;
  }
  .center-label {
    margin-top: 1rem;
    font-weight: bold;
    color: #94a3b8;
    background: #0f172a;
    padding: 0.2rem 0.5rem;
  }

  /* Service Nodes (Buttons) */
  .service-node {
    position: absolute;
    transform: translate(-50%, -50%);
    background: #1e293b;
    border: 2px solid var(--node-color);
    border-radius: 12px;
    padding: 1rem 2rem 1rem 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 10;

    width: 300px;
    min-height: 130px;
    text-align: left;
  }

  .service-node:hover {
    transform: translate(-50%, -50%) scale(1.05);
    box-shadow: 0 0 15px var(--node-color);
  }

  .node-icon {
    font-size: 2rem;
  }

  .node-info {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  
  .node-title {
    font-weight: bold;
    font-size: 1.1rem;
    color: white;
  }
  
  .node-short {
    font-size: 0.8rem;
    color: #94a3b8;
  }

  /* Modal Styles */
  .modal-backdrop {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    /* backdrop-filter: blur(4px); */
    z-index: 50;
    display: flex;
    justify-content: center;
    align-items: center;
    will-change: opacity;
  }

  .modal-card {
    background: #1e293b;
    border: 2px solid var(--node-color);
    border-radius: 16px;
    width: 90%;
    max-width: 500px;
    padding: 2rem;
    position: relative;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 30px var(--node-color);
    backface-visibility: hidden;
    transform: translateZ(0);
    will-change: transform, opacity;
  }

  .close-btn {
    position: absolute;
    top: 1rem; right: 1rem;
    background: none; border: none;
    color: #94a3b8;
    font-size: 2rem;
    cursor: pointer;
    line-height: 1;
    z-index: 50;
  }
  .close-btn:hover { color: white; }

  .modal-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #334155;
    padding-bottom: 1rem;
  }

  .modal-icon { font-size: 3rem; }
  
  .modal-header h2 {
    margin: 0;
    font-size: 2rem;
    color: white;
  }

  .modal-body p {
    color: #cbd5e1;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  .tag {
    background: rgba(255,255,255,0.1);
    color: var(--node-color);
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .action-button {
    display: block;
    width: 100%;
    padding: 1rem;
    background: var(--node-color);
    color: white;
    text-align: center;
    border-radius: 8px;
    font-weight: bold;
    text-decoration: none;
    transition: opacity 0.2s;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 1.1rem;
    box-sizing: border-box;
  }

  .action-button:hover {
    opacity: 0.9;
  }

  /* Mobile Adjustments */
  @media (max-width: 768px) {
    .service-node {
      /* Stack vertically on mobile effectively */
      width: 160px;
      min-width: auto;
      padding: 0.75rem;
      flex-direction: column;
      text-align: center;
      gap: 0.5rem;
    }
    .node-info { text-align: center; }
  }
</style>