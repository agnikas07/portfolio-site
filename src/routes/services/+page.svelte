<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  interface ServiceNode {
    id: string;
    title: string;
    icon: string;
    shortDesc: string;
    fullDesc: string;
    tags: string[];
    color: string;
  }

  const services: ServiceNode[] = [
    {
      id: 'web',
      title: 'Web Dev & Rescue',
      icon: '🌐',
      shortDesc: "Because your nephew 'who is good with computers' ghosted you halfway through the build.",
      fullDesc: 'I build lightning-fast, modern websites using SvelteKit and React. Whether you need a brand new landing page that actually converts, or someone to untangle the spaghetti code on your existing site, I\'m your guy.',
      tags: ['SvelteKit', 'React', 'Design', 'SEO'],
      color: '#4f46e5'
    },
    {
      id: 'auto',
      title: 'Automation',
      icon: '⚡',
      shortDesc: "Saving you from the Carpal Tunnel syndrome induced by 10,000 rows of Excel data.",
      fullDesc: "If you find yourself clicking the same buttons or copy-pasting the same data every day, stop. I write Python scripts and automation tools that handle the boring stuff instantly, so you can focus on the work that actually requires a human brain.",
      tags: ['Python', 'Pandas', 'APIs', 'Google Scripts'],
      color: '#059669'
    },
    {
      id: 'code',
      title: 'Custom Code',
      icon: '🧬',
      shortDesc: "Mad scientist experiments, available upon request.",
      fullDesc: "Need a Discord bot that manages your community? A specialized dashboard for your internal tools? A custom web-scraper? If it involves logic and code, I can build it. I love tackling weird, specific problems that off-the-shelf software can't solve.",
      tags: ['Discord.py', 'Custom Tools', 'API Webhooks', 'Node.js'],
      color: '#db2777'
    },
    {
      id: 'it',
      title: 'IT Solutions',
      icon: '🛠️',
      shortDesc: "I read the documentation so you don't have to.",
      fullDesc: "Setting up a CRM, configuring a new email server, or integrating complex business software can be a nightmare. I handle the heavy lifting of installation, configuration, and troubleshooting to ensure your tech stack actually works for you, not against you.",
      tags: ['CRM Setup', 'Software Config', 'Troubleshooting', 'Consulting'],
      color: '#d97706'
    }
  ];

  let selectedService: ServiceNode | null = null;

  function select(service: ServiceNode) {
    selectedService = service;
  }

  function close() {
    selectedService = null;
  }
</script>

<main class="services-container">
  
  <div class="radar-bg">
    <div class="sweep"></div>
    <div class="grid-overlay"></div>
  </div>

  <div class="content-wrapper">
    
    <header class="sys-header">
      <div class="status-dot"></div>
      <h1>SYSTEM MODULES // ONLINE</h1>
    </header>

    <div class="services-grid">
      {#each services as service, i}
        <button 
          class="service-card" 
          style="--accent: {service.color}"
          on:click={() => select(service)}
          in:fly={{y: 20, delay: i * 100, duration: 400}}
        >
          <div class="corner top-left"></div>
          <div class="corner top-right"></div>
          <div class="corner bottom-left"></div>
          <div class="corner bottom-right"></div>

          <div class="card-inner">
            <div class="card-icon">{service.icon}</div>
            <div class="card-content">
              <h3>{service.title}</h3>
              <p>{service.shortDesc}</p>
            </div>
            <div class="arrow-indicator">→</div>
          </div>
        </button>
      {/each}
    </div>

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
        style="--accent: {selectedService.color}"
        in:fly={{y: 20, duration: 300, easing: quintOut}}
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

          <a href="mailto:contact@agnikas.dev?subject=Inquiry: {selectedService.title}"
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
    background-color: #0f172a;
    margin: 0;
  }

  .services-container {
    position: relative;
    width: 100%;
    min-height: calc(100vh - 80px);
    overflow-x: hidden;
    color: #f8fafc;
    font-family: 'JetBrains Mono', monospace;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    box-sizing: border-box;
  }

  .radar-bg {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .grid-overlay {
    width: 100%; height: 100%;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.5;
  }
  .sweep {
    position: absolute;
    top: 50%; left: 50%;
    width: 150vmax; height: 150vmax;
    background: conic-gradient(from 0deg, transparent 0deg, rgba(79, 70, 229, 0.1) 60deg, transparent 65deg);
    transform: translate(-50%, -50%);
    animation: radarSpin 10s linear infinite;
    border-radius: 50%;
  }
  @keyframes radarSpin {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  .content-wrapper {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .sys-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    padding-left: 0.5rem;
  }
  .sys-header h1 {
    font-size: 1rem;
    color: #94a3b8;
    margin: 0;
    letter-spacing: 2px;
  }
  .status-dot {
    width: 8px; height: 8px;
    background: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 10px #10b981;
    animation: blink 2s infinite;
  }
  @keyframes blink { 50% { opacity: 0.5; } }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .service-card {
    background: rgba(30, 41, 59, 0.6);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 2rem;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    color: inherit;
    font-family: inherit;
    border-radius: 4px;
  }

  .service-card:hover {
    background: rgba(30, 41, 59, 0.9);
    border-color: var(--accent);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3), 0 0 20px -5px var(--accent);
  }

  .card-inner {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .card-icon {
    font-size: 2.5rem;
    line-height: 1;
  }

  .card-content h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    color: white;
  }

  .card-content p {
    margin: 0;
    font-size: 0.9rem;
    color: #94a3b8;
    line-height: 1.5;
  }

  .arrow-indicator {
    position: absolute;
    top: 0; right: 0;
    color: var(--accent);
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s;
    font-weight: bold;
    font-size: 1.5rem;
  }

  .service-card:hover .arrow-indicator {
    opacity: 1;
    transform: translateX(0);
  }

  .corner {
    position: absolute;
    width: 10px; height: 10px;
    border: 2px solid transparent;
    transition: border-color 0.3s;
  }
  .service-card:hover .corner { border-color: var(--accent); }

  .top-left { 
    top: 0; 
    left: 0; 
    border-top: 2px solid #334155; 
    border-left: 2px solid #334155; 
  }
  .top-right { 
    top: 0; 
    right: 0; 
    border-top: 2px solid #334155; 
    border-right: 2px solid #334155; 
  }
  .bottom-left { 
    bottom: 0; 
    left: 0; 
    border-bottom: 2px solid #334155; 
    border-left: 2px solid #334155; 
  }
  .bottom-right { 
    bottom: 0; 
    right: 0; 
    border-bottom: 2px solid #334155; 
    border-right: 2px solid #334155; 
  }

  .modal-backdrop {
    position: fixed; top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    z-index: 100;
    display: flex; justify-content: center; align-items: center;
    padding: 1rem; box-sizing: border-box;
  }
  .modal-card {
    background: #0f172a;
    border: 2px solid var(--accent);
    border-radius: 16px;
    width: 100%; max-width: 500px;
    padding: 2rem; position: relative;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
  .close-btn {
    position: absolute; top: 1rem; right: 1rem;
    background: none; border: none; color: #94a3b8;
    font-size: 2rem; cursor: pointer; line-height: 1;
    width: 44px; height: 44px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 50%;
  }
  .close-btn:hover { 
    background: rgba(255,255,255,0.1); 
    color: white; 
  }
  .modal-header {
    display: flex; 
    align-items: center; 
    gap: 1rem;
    margin-bottom: 1.5rem; 
    border-bottom: 1px solid #334155; 
    padding-bottom: 1rem;
  }
  .modal-icon { font-size: 2.5rem; }
  .modal-header h2 { 
    margin: 0; 
    font-size: 1.5rem; 
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
    background: rgba(255,255,255,0.05); 
    color: var(--accent); 
    padding: 0.25rem 0.75rem; 
    border-radius: 999px; 
    font-size: 0.875rem; 
    font-weight: 600; 
  }
  .action-button {
    display: block; 
    width: 100%; 
    padding: 1rem;
    background: var(--accent); 
    color: white; 
    text-align: center;
    border-radius: 8px; 
    font-weight: bold; 
    text-decoration: none;
    transition: opacity 0.2s; 
    box-sizing: border-box;
  }
  .action-button:hover { opacity: 0.9; }

  @media (max-width: 768px) {
    .services-container {
        align-items: flex-start;
        padding-top: 4rem;
    }
    .service-card {
        padding: 1.5rem;
    }
    .card-inner {
        flex-direction: column;
        gap: 1rem;
    }
  }
</style>