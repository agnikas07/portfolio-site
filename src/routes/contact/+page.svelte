<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { env } from '$env/dynamic/public';
    import { string } from 'three/src/nodes/TSL.js';

  const FORMSPREE_ID = env.PUBLIC_FORMSPREE_ID;

  let status: 'idle' | 'submitting' | 'success' | 'error' = 'idle';
  let errorMessage = "";

  let view: 'form' | 'socials' = 'form';

  interface Social {
    name: string;
    url: string;
    id: string;
    svgPath: string;
    viewBox?: string;
  }

  const socials: Social[] = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/agnikas07', 
      id: 'agnikas07', 
      svgPath: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
    },
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/angelo-nikas-bab82a2a4/', 
      id: 'Angelo Nikas', 
      svgPath: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
    },
    { 
      name: 'Discord', 
      url: 'https://discord.com/users/340030540747112448', 
      id: 'agnikas', 
      svgPath: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.772-.6083 1.1588a18.2915 18.2915 0 00-5.4882 0 12.64 12.64 0 00-.6173-1.1588.0775.0775 0 00-.0785-.0371 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561 19.968 19.968 0 005.9937 3.0337.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057 13.111 13.111 0 01-1.872-1.2057.0763.0763 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105 15.07 15.07 0 0013.1943 0 .074.074 0 01.0776.0105c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873 1.1914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286 19.886 19.886 0 006.0025-3.03.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"
    },
    { 
      name: 'Steam', 
      url: 'https://steamcommunity.com/profiles/76561198081726769/', 
      id: 'Your Real Dad', 
      svgPath: "M12.004 0C5.375 0 .003 5.374.003 12.004c0 6.63 5.372 12 12.001 12 6.63 0 12-5.37 12-12C24.004 5.374 18.634 0 12.004 0zm6.417 17.429c-.997 0-1.806-.81-1.806-1.809s.809-1.81 1.806-1.81c.999 0 1.81.81 1.81 1.81s-.811 1.809-1.81 1.809zm.001-3.694c-.999 0-1.81-.81-1.81-1.81s.811-1.81 1.81-1.81c.999 0 1.81.81 1.81 1.81 0 1 .811 1.81 1.81 1.81zm-3.7-2.807c-.998 0-1.809-.81-1.809-1.81s.811-1.809 1.809-1.809c.999 0 1.81.809 1.81 1.809s-.811 1.81-1.81 1.81zm-9.13 6.501c-.999 0-1.81-.809-1.81-1.809s.811-1.81 1.81-1.81c.997 0 1.808.81 1.808 1.81s-.811 1.809-1.808 1.809zm.001-3.693c-.999 0-1.81-.81-1.81-1.81s.811-1.81 1.81-1.81c.997 0 1.808.81 1.808 1.81 0 .999-.811 1.81-1.808 1.81zm3.698-2.808c-.998 0-1.809-.809-1.809-1.809s.811-1.81 1.809-1.81c.997 0 1.808.81 1.808 1.81s-.811 1.809-1.808 1.809zm3.238-2.74c-.731 1.234-1.722 2.281-2.857 3.076-1.15.798-2.45 1.382-3.826 1.73-.829.208-1.674.316-2.525.332-.593.009-1.182-.037-1.763-.145l1.553-3.887c.163.039.332.066.501.082.269.026.54.028.809.007.581-.046 1.139-.195 1.668-.441.56-.261 1.067-.624 1.507-1.073.449-.448.819-.973 1.099-1.552.276-.568.462-1.185.549-1.826.094-.655.079-1.325-.047-1.963L13.9 4.87c.07.128.134.261.193.396.611 1.408 1.027 2.898 1.237 4.42z"
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/photo.agn/', 
      id: '@photo.agn', 
      svgPath: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
    },
    { 
      name: 'Facebook', 
      url: 'https://www.facebook.com/angelo.nikas', 
      id: 'Angelo Nikas', 
      svgPath: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 011.141.195v3.325a8.623 8.623 0 00-.653-.036c-2.148 0-2.791 1.657-2.791 3.593v.38h4.214l-.538 3.667h-3.676v7.98H9.101z"
    }
  ];

  const chars = "01010101<>{}[]!@#$%^&*()_+-=/|?";
  let decryptedState = Object.fromEntries(socials.map(s => [s.name, {text: "LOCKED_SIGNAL", done: false}]));
  let intervals: Record<string, any> = {};

  function handleMouseEnter(social: Social) {
    if (decryptedState[social.name].done) return;

    let iteration = 0;
    clearInterval(intervals[social.name]);

    intervals[social.name] = setInterval(() => {
      decryptedState[social.name].text = social.id
        .split("")
        .map((char, index) => {
          if (index < iteration) {
            return social.id[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      
      decryptedState = { ...decryptedState };

      if (iteration >= social.id.length) { 
        clearInterval(intervals[social.name]);
        decryptedState[social.name].done = true;
        decryptedState = { ...decryptedState };
      }
      
      iteration += 1/2;
    }, 30);
  }

  function toggleView() {
    if (view === 'form') {
      view = 'socials';
      socials.forEach(s => {
        clearInterval(intervals[s.name]);
        decryptedState[s.name] = { text: "LOCKED_SIGNAL", done: false };
      });
      decryptedState = { ...decryptedState };
    } else {
      view = 'form';
    }
  }

  async function handleSubmit(event: SubmitEvent) {
    status = 'submitting';
    
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        status = 'success';
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          errorMessage = data["errors"].map((error: any) => error["message"]).join(", ");
        } else {
          errorMessage = "Transmission blocked by firewall (Unknown Error)";
        }
        status = 'error';
      }
    } catch (error) {
      status = 'error';
      errorMessage = "Network Uplink Failed.";
    }
  }
</script>

<main class="contact-container">
  
  <div class="content-wrapper">
    <h1 class="page-title">
      <span class="icon">📡</span> ESTABLISH COMMS
    </h1>
    <p class="subtitle">
      {#if view === 'form'}
        Send a secure transmission. I usually respond within 24 hours.
      {:else}
        Decrypting social frequency channels...
      {/if}
    </p>

    <div class="terminal-card">
      
      <div class="card-controls">
        {#if view === 'form'}
            <div class="spacer"></div>
            <button class="toggle-btn" on:click={toggleView}>SOCIALS_GRID -&gt;</button>
        {:else}
            <button class="toggle-btn" on:click={toggleView}>&lt;- TRANSMISSION</button>
            <div class="spacer"></div>
        {/if}
      </div>

      {#if view === 'form'}
          {#if status === 'success'}
            <div class="success-message" in:fade={{duration: 300}}>
              <div class="success-icon">✅</div>
              <h2>TRANSMISSION RECEIVED</h2>
              <p>Over and out.</p>
              <button class="retry-btn" on:click={() => status = 'idle'}>
                Send Another?
              </button>
            </div>
          {:else}
            <form on:submit|preventDefault={handleSubmit} class="contact-form" in:fade={{duration: 200}}>
              
              <div class="input-group">
                <label for="name">CODENAME / NAME</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  placeholder="Who goes there?"
                  required 
                  disabled={status === 'submitting'}
                />
              </div>

              <div class="input-group">
                <label for="email">FREQUENCY / EMAIL</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="you@example.com" 
                  required 
                  disabled={status === 'submitting'}
                />
              </div>

              <div class="input-group">
                <label for="subject">TRANSMISSION TYPE / SUBJECT</label>
                <div class="select-wrapper">
                  <select name="subject" id="subject" required disabled={status === 'submitting'}>
                    <option value="" disabled selected>Select protocol...</option>
                    <option value="New Project Inquiry">Protocol: New Project Inquiry</option>
                    <option value="Automation/Scripting Request">Protocol: Automation Request</option>
                    <option value="Bug Fix / Maintenance">Protocol: Bug Fix / Rescue</option>
                    <option value="General Inquiry">Protocol: General Signal / Hello</option>
                  </select>
                  <span class="select-arrow">▼</span>
                </div>
              </div>

              <div class="input-group">
                <label for="message">PAYLOAD / MESSAGE</label>
                <textarea 
                  name="message" 
                  id="message" 
                  rows="5" 
                  placeholder="Entering encrypted message..." 
                  required 
                  disabled={status === 'submitting'}
                ></textarea>
              </div>

              {#if status === 'error'}
                <div class="error-banner" transition:fly={{y: -10, duration: 200}}>
                  ⚠️ ERROR: {errorMessage}
                </div>
              {/if}

              <button 
                type="submit" 
                class="submit-btn" 
                disabled={status === 'submitting'}
              >
                {#if status === 'submitting'}
                  TRANSMITTING...
                {:else}
                  INITIATE UPLINK
                {/if}
              </button>

            </form>
          {/if}
      {:else}
          <div class="socials-grid" in:fade={{duration: 200}}>
            {#each socials as social}
                <a 
                   href={decryptedState[social.name].done ? social.url : null} 
                   class="social-card" 
                   class:unlocked={decryptedState[social.name].done}
                   target="_blank" 
                   rel="noopener noreferrer"
                   on:mouseenter={() => handleMouseEnter(social)}
                >
                    <div class="social-icon">
                        <svg 
                            viewBox={social.viewBox || "0 0 24 24"} 
                            width="24" 
                            height="24" 
                            fill="currentColor"
                        >
                            <path d={social.svgPath} />
                        </svg>
                    </div>
                    <div class="social-info">
                        <span class="social-label">{social.name}</span>
                        <span class="social-id">{decryptedState[social.name].text}</span>
                    </div>
                    <div class="status-light"></div>
                </a>
            {/each}
          </div>
      {/if}

    </div>
  </div>

  <div class="grid-bg"></div>
</main>

<style>
  :global(body) {
    background-color: #050505;
  }

  .contact-container {
    min-height: calc(100vh - 80px);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    font-family: 'JetBrains Mono', monospace;
    color: #f0f0f0;
    overflow: hidden;
  }

  .content-wrapper {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 600px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .page-title {
    font-size: 2.5rem;
    margin: 0 0 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 1rem;
    text-shadow: 0 0 20px rgba(79, 255, 176, 0.3);
  }

  .subtitle {
    color: #888;
    margin-bottom: 2rem;
    text-align: center;
    min-height: 1.5em;
  }

  .terminal-card {
    background: #0f1215;
    border: 1px solid #333;
    border-top: 4px solid #4f46e5;
    border-radius: 8px;
    padding: 2.5rem;
    width: 100%;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    position: relative;
  }

  .card-controls {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2rem;
      border-bottom: 1px dashed #333;
      padding-bottom: 1rem;
  }
  .toggle-btn {
      background: none;
      border: 1px solid #333;
      color: #666;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-family: inherit;
      font-weight: bold;
      transition: all 0.2s;
  }
  .toggle-btn:hover {
      color: #4f46e5;
      border-color: #4f46e5;
      box-shadow: 0 0 10px rgba(79, 70, 229, 0.2);
  }
  .spacer { flex: 1; }

  .socials-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      height: 100%;
  }

  .social-card {
      background: #090a0c;
      border: 1px solid #333;
      padding: 1.5rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 1rem;
      text-decoration: none;
      color: #666;
      position: relative;
      transition: all 0.3s ease;
      cursor: not-allowed;
      overflow: hidden;
  }

  .social-card.unlocked {
      border-color: #10b981;
      background: rgba(16, 185, 129, 0.05);
      cursor: pointer;
      color: #f0f0f0;
  }
  
  .social-card.unlocked:hover {
      box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
      transform: translateY(-2px);
  }

  .social-icon { 
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
  }
  
  .social-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      overflow: hidden;
  }

  .social-label {
      font-size: 0.8rem;
      font-weight: bold;
      text-transform: uppercase;
  }

  .social-id {
      font-family: 'Courier New', Courier, monospace;
      font-size: 0.9rem;
      letter-spacing: 1px;
      white-space: nowrap;
  }

  .status-light {
      position: absolute;
      top: 1rem; right: 1rem;
      width: 8px; height: 8px;
      border-radius: 50%;
      background-color: #ef4444; /* Red locked */
      box-shadow: 0 0 5px #ef4444;
      transition: background-color 0.3s;
  }

  .social-card.unlocked .status-light {
      background-color: #10b981; /* Green unlocked */
      box-shadow: 0 0 5px #10b981;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-size: 0.8rem;
    font-weight: bold;
    color: #666;
    letter-spacing: 1px;
  }

  input, textarea {
    background: #090a0c;
    border: 1px solid #333;
    color: #f0f0f0;
    padding: 1rem;
    font-family: inherit;
    font-size: 1rem;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 15px rgba(79, 70, 229, 0.2);
    background: #0f1215;
  }

  textarea {
    resize: vertical;
  }

  .select-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  select {
    width: 100%;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: #090a0c;
    border: 1px solid #333;
    color: #f0f0f0;
    padding: 1rem;
    font-family: inherit;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  select:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 15px rgba(79, 70, 229, 0.2);
    background: #0f1215;
  }

  .select-arrow {
    position: absolute;
    right: 1rem;
    color: #666;
    pointer-events: none;
    font-size: 0.8rem;
  }

  .select-wrapper:hover select {
    border-color: #666;
  }
  .select-wrapper:hover .select-arrow {
    color: #f0f0f0;
  }

  .submit-btn {
    margin-top: 1rem;
    padding: 1.2rem;
    background: #4f46e5;
    color: white;
    font-family: inherit;
    font-weight: bold;
    font-size: 1.1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .submit-btn:hover:not(:disabled) {
    background: #4338ca;
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(79, 70, 229, 0.4);
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: wait;
  }

  .success-message {
    text-align: center;
    padding: 2rem 0;
  }
  .success-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  .success-message h2 {
    color: #4f46e5;
    margin: 0 0 0.5rem 0;
  }
  .retry-btn {
    margin-top: 2rem;
    background: none;
    border: 1px dashed #666;
    color: #888;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .retry-btn:hover {
    color: white;
    border-color: white;
  }

  .error-banner {
    background: rgba(220, 38, 38, 0.1);
    border: 1px solid #dc2626;
    color: #ef4444;
    padding: 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  .grid-bg {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    z-index: 1;
    pointer-events: none;
    mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  }

  ::placeholder {
    color: #888;
    opacity: 1;
  }

  select:invalid {
    color: #888;
  }

  option {
    color: #f0f0f0;
  }
</style>