<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { env } from '$env/dynamic/public';

  const FORMSPREE_ID = env.PUBLIC_FORMSPREE_ID;

  let status: 'idle' | 'submitting' | 'success' | 'error' = 'idle';
  let errorMessage = "";

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
      Send a secure transmission. I usually respond within 24-48 hours.
    </p>

    <div class="terminal-card">
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
        <form on:submit|preventDefault={handleSubmit} class="contact-form" in:fade>
          
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