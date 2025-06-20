<script lang="ts">
  let loaded = false;
  import { onMount } from 'svelte';
  onMount(() => {
    loaded = true;
  });
</script>

<section class="hero-section" class:loaded>
  <div class="hero-content">
    <h1>Angelo Nikas</h1>
    <p class="intro-text">
      A creative developer passionate about learning new things, 
      building interactive and memorable digital experiences, 
      and raising my children to be nerds 🤓.
    </p>
    <a href="/resume.pdf" download class="resume-button">
      Download Resume
    </a>
  </div>
  <div class="scroll-prompt">
    <span>Scroll down to explore my journey</span>
    <div class="arrow">↓</div>
  </div>
</section>

<style>
  .hero-section {
    position: sticky;
    top: 80px;
    height: calc(100vh - 80px);
    background: #f0f8ff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 10;
    
    opacity: 0;
    transition: opacity 1s ease-in;
  }
  .hero-section.loaded {
    opacity: 1;
  }

  .hero-content {
    max-width: 800px;
    padding: 2rem;
  }

  h1 {
    font-size: 4rem;
    font-weight: 700;
    color: #1a2729;
    margin-bottom: 1rem;
  }

  .intro-text {
    font-size: 1.25rem;
    color: #334e52;
    margin-bottom: 2rem;
  }

  .resume-button {
    display: inline-block;
    background-color: #334e52;
    color: white;
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
    border-radius: 8px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .resume-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  .scroll-prompt {
    position: absolute;
    bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: #5a7a7f;
  }
  
  .arrow {
    font-size: 1.5rem;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
</style>