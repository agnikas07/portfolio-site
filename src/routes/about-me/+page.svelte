<script lang="ts">
  import { fly } from 'svelte/transition';

  const skills = [
    "SvelteKit", "React", "TypeScript", "Node.js", 
    "Python", "Firebase", "Tailwind", "Git"
  ];

  const stats = [
    { label: "Class", value: "Full Stack Dev" },
    { label: "Base", value: "Marietta, GA" },
    { label: "Exp", value: "3+ Years" },
    { label: "Mana", value: "Coffee ☕" }
  ];
</script>

<main class="about-container">
  
  <div class="hex-bg"></div>

  <div class="content-wrapper">
    
    <div class="profile-section" in:fly={{x: -50, duration: 600, delay: 200}}>
      <div class="holo-card">
        <div class="scan-line"></div>
        <div class="card-header">
          <span class="id-badge">ID: AGNIKAS</span>
          <span class="status-badge">ACTIVE</span>
        </div>
        
        <div class="avatar-frame">
          <div class="avatar"><img src="images/headshot.jpg" alt="Headshot of Angelo" /></div>
          <div class="ring"></div>
          <div class="ring inner"></div>
        </div>

        <div class="stats-grid">
          {#each stats as stat}
            <div class="stat-row">
              <span class="stat-label">{stat.label}:</span>
              <span class="stat-value">{stat.value}</span>
            </div>
          {/each}
        </div>

        <div class="card-footer">
          <div class="barcode">|| | ||| | || |||</div>
        </div>
      </div>
    </div>

    <div class="bio-section" in:fly={{x: 50, duration: 600, delay: 400}}>
      
      <div class="terminal-block">
        <div class="block-header">
          <span class="cmd-prompt">> open user_bio.txt</span>
        </div>
        
        <div class="bio-text">
          <p>
            <span class="comment">// THE ORIGIN STORY</span><br>
            I am a developer who believes that code is more than just instructions—it's a tool to solve real human problems. I started my journey tampering with game files and broke enough computers to learn how to fix them.
          </p>
          <p>
            <span class="comment">// CURRENT MISSION</span><br>
            Today, I specialize in building high-performance web applications and automation scripts. I bridge the gap between "it works on my machine" and "it works for everyone."
          </p>
        </div>
      </div>

      <div class="tech-block">
        <h3>EQUIPPED MODULES (SKILLS)</h3>
        <div class="skill-cloud">
          {#each skills as skill, i}
            <div 
              class="skill-chip" 
              in:fly={{y: 10, delay: 600 + (i * 50)}}
            >
              <span class="decor">#</span> {skill}
            </div>
          {/each}
        </div>
      </div>

      <a href="/resume.pdf" class="download-btn" target="_blank">
        <span class="icon">⬇</span> DOWNLOAD_DATA_SHEET (RESUME)
      </a>

    </div>

  </div>
</main>

<style>
  :global(body) {
    background-color: #0f172a;
    margin: 0;
  }

  .about-container {
    position: relative;
    width: 100%;
    min-height: calc(100vh - 80px);
    font-family: 'JetBrains Mono', monospace;
    color: #f8fafc;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    box-sizing: border-box;
    overflow: hidden;
  }

  .hex-bg {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-image: 
        radial-gradient(#334155 1px, transparent 1px);
    background-size: 30px 30px;
    opacity: 0.15;
    z-index: 0;
    pointer-events: none;
    mask-image: radial-gradient(circle at center, black 60%, transparent 100%);
  }

  .content-wrapper {
    position: relative;
    z-index: 10;
    display: flex;
    gap: 4rem;
    max-width: 1000px;
    width: 100%;
    align-items: center;
  }

  .profile-section {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .holo-card {
    background: rgba(30, 41, 59, 0.6);
    border: 1px solid rgba(79, 70, 229, 0.5);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 12px;
    width: 100%;
    max-width: 320px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(79, 70, 229, 0.15);
    transform-style: preserve-3d;
    transition: transform 0.3s ease;
  }
  .holo-card:hover {
    transform: translateY(-5px) rotateX(2deg) rotateY(2deg);
    border-color: #4f46e5;
    box-shadow: 0 0 50px rgba(79, 70, 229, 0.3);
  }

  .scan-line {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 5px;
    background: rgba(79, 70, 229, 0.5);
    opacity: 0.5;
    animation: scan 4s linear infinite;
    box-shadow: 0 0 10px #4f46e5;
  }
  @keyframes scan {
    0% { top: -10%; opacity: 0; }
    50% { opacity: 1; }
    100% { top: 110%; opacity: 0; }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    font-size: 0.8rem;
    font-weight: bold;
    color: #4f46e5;
    border-bottom: 1px solid #334155;
    padding-bottom: 0.5rem;
  }

  .avatar-frame {
    width: 120px; height: 120px;
    margin: 0 auto 2rem auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avatar {
    font-size: 4rem;
    z-index: 2;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }
  .ring {
    position: absolute;
    width: 100%; height: 100%;
    border: 2px dashed #4f46e5;
    border-radius: 50%;
    animation: spin 10s linear infinite;
  }
  .inner {
    width: 80%; height: 80%;
    border: 2px solid rgba(79, 70, 229, 0.3);
    animation: spin 6s linear infinite reverse;
  }
  @keyframes spin { 100% { transform: rotate(360deg); } }

  .stats-grid {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .stat-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    border-bottom: 1px dashed #334155;
    padding-bottom: 0.25rem;
  }
  .stat-label { color: #94a3b8; }
  .stat-value { color: #f8fafc; font-weight: bold; }

  .card-footer {
    margin-top: 2rem;
    text-align: center;
    opacity: 0.5;
    font-family: 'Courier New', courier, monospace;
    letter-spacing: 4px;
    font-size: 0.7rem;
  }

  .bio-section {
    flex: 1.5;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .terminal-block {
    background: rgba(0, 0, 0, 0.3);
    border-left: 3px solid #10b981;
    padding: 1.5rem;
    border-radius: 0 8px 8px 0;
  }
  .block-header {
    margin-bottom: 1rem;
    color: #10b981;
    font-weight: bold;
    font-size: 0.9rem;
  }
  .bio-text p {
    color: #cbd5e1;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }
  .comment {
    color: #64748b;
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.85rem;
  }

  .tech-block h3 {
    font-size: 1rem;
    color: #94a3b8;
    margin-bottom: 1rem;
    letter-spacing: 1px;
  }
  .skill-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  .skill-chip {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.9rem;
    color: #e2e8f0;
    transition: all 0.2s;
    cursor: default;
  }
  .skill-chip:hover {
    background: rgba(16, 185, 129, 0.2);
    border-color: #10b981;
    transform: translateY(-2px);
  }
  .decor { color: #10b981; margin-right: 4px; opacity: 0.7; }

  .download-btn {
    align-self: flex-start;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: #f8fafc;
    color: #0f172a;
    padding: 1rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    font-size: 0.9rem;
    transition: all 0.2s;
    border: 2px solid #f8fafc;
    box-sizing: border-box;
  }
  .download-btn:hover {
    background: transparent;
    color: #f8fafc;
    box-shadow: 0 0 20px rgba(255,255,255,0.1);
  }

  @media (max-width: 900px) {
    .about-container {
      align-items: center;
      overflow-y: auto;
      padding: 2rem 1.5rem 2rem 1.5rem;
      height: auto;
    }
    .content-wrapper {
      flex-direction: column;
      gap: 3rem;
      width: 100%;
    }
    .profile-section {
      width: 100%;
    }
    .bio-section {
      width: 100%;
    }
    .download-btn {
        width: 100%;
        justify-content: center;
        font-size: 0.8rem;
        padding: 1rem 0.5rem;
        text-align: center;
        white-space: normal;
        max-width: 100%;
    }
  }
</style>