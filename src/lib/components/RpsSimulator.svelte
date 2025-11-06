<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let setupScreen: HTMLElement;
  let canvasContainer: HTMLElement;
  let gameOverScreen: HTMLElement;
  let canvas: HTMLCanvasElement;
  let entitySlider: HTMLInputElement;
  let sliderValue: HTMLElement;
  let winnerEmoji: HTMLElement;
  let winnerText: HTMLElement;
  
  let ctx: CanvasRenderingContext2D;
  
  let entities: any[] = [];
  let collisionEffects: any[] = [];
  let animationFrameId: number;

  const types = {
      ROCK: { name: 'rock', emoji: '🪨' },
      PAPER: { name: 'paper', emoji: '📜' },
      SCISSORS: { name: 'scissors', emoji: '✂️' }
  };
  const rules = {
      [types.ROCK.name]: types.SCISSORS.name,
      [types.SCISSORS.name]: types.PAPER.name,
      [types.PAPER.name]: types.ROCK.name,
  };
  const predatorMap = {
      [types.ROCK.name]: types.PAPER.name,
      [types.PAPER.name]: types.SCISSORS.name,
      [types.SCISSORS.name]: types.ROCK.name
  };
  const entitySize = 10;
  const entitySpeed = 1.5;

  class Entity {
    x: number;
    y: number;
    type: string;
    emoji: string;
    size: number;
    vx: number;
    vy: number;
      constructor(x: number, y: number, type: string) {
          this.x = x; this.y = y; this.type = type;
          const emojiMap: Record<string, string> = {
              rock: types.ROCK.emoji,
              paper: types.PAPER.emoji,
              scissors: types.SCISSORS.emoji
          };
          this.emoji = emojiMap[type.toLowerCase()];
          this.size = entitySize;
          this.vx = (Math.random() - 0.5) * 2; this.vy = (Math.random() - 0.5) * 2;
      }
      draw() {
          ctx.font = `${this.size * 2}px Arial`;
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(this.emoji, this.x, this.y);
      }
      update() {
          const preyType = rules[this.type];
          const predatorType = predatorMap[this.type];
          let closestPrey = null, minPreyDistSq = Infinity;
          let closestPredator = null, minPredatorDistSq = Infinity;

          for (const other of entities) {
              if (other === this) continue;
              const dx = other.x - this.x, dy = other.y - this.y;
              const distanceSq = dx * dx + dy * dy;
              if (other.type === preyType && distanceSq < minPreyDistSq) {
                  minPreyDistSq = distanceSq; closestPrey = other;
              } else if (other.type === predatorType && distanceSq < minPredatorDistSq) {
                  minPredatorDistSq = distanceSq; closestPredator = other;
              }
          }
          
          const fearRadiusSq = 40 * 40;
          if (closestPredator && minPredatorDistSq < fearRadiusSq) {
              const angle = Math.atan2(this.y - closestPredator.y, this.x - closestPredator.x);
              this.vx = Math.cos(angle) * entitySpeed; this.vy = Math.sin(angle) * entitySpeed;
          } else if (closestPrey) {
              const angle = Math.atan2(closestPrey.y - this.y, closestPrey.x - this.x);
              this.vx = Math.cos(angle) * entitySpeed; this.vy = Math.sin(angle) * entitySpeed;
          }

          this.x += this.vx; this.y += this.vy;
          if (this.x - this.size < 0 || this.x + this.size > canvas.width) {
              this.vx *= -1; this.x = Math.max(this.size, Math.min(canvas.width - this.size, this.x));
          }
          if (this.y - this.size < 0 || this.y + this.size > canvas.height) {
              this.vy *= -1; this.y = Math.max(this.size, Math.min(canvas.height - this.size, this.y));
          }
      }
  }

  function resizeCanvas() {
      canvas.width = canvasContainer.clientWidth;
      canvas.height = canvasContainer.clientHeight;
  }

  function initSimulation(totalEntities: number) {
      entities = []; collisionEffects = [];
      const countPerType = totalEntities / 3;
      const groupPositions = [
          { type: types.ROCK.name, x: canvas.width * 0.25, y: canvas.height * 0.25 },
          { type: types.PAPER.name, x: canvas.width * 0.75, y: canvas.height * 0.25 },
          { type: types.SCISSORS.name, x: canvas.width * 0.5, y: canvas.height * 0.75 }
      ];
      groupPositions.forEach(group => {
          for (let i = 0; i < countPerType; i++) {
              const spawnRadius = Math.min(canvas.width, canvas.height) / 8;
              const angle = Math.random() * 2 * Math.PI, radius = Math.random() * spawnRadius;
              const x = group.x + Math.cos(angle) * radius, y = group.y + Math.sin(angle) * radius;
              entities.push(new Entity(x, y, group.type));
          }
      });
  }

  function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      entities.forEach(entity => { entity.update(); entity.draw(); });
      handleCollisions();
      drawCollisionEffects();

      const currentTypes = new Set(entities.map(e => e.type));
      if (currentTypes.size === 1) {
          endSimulation(entities[0]); return;
      }
      animationFrameId = requestAnimationFrame(animate);
  }

  function handleCollisions() {
      for (let i = 0; i < entities.length; i++) {
          for (let j = i + 1; j < entities.length; j++) {
              const entityA = entities[i], entityB = entities[j];
              const dx = entityA.x - entityB.x, dy = entityA.y - entityB.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              if (distance < entityA.size + entityB.size && entityA.type !== entityB.type) {
                  if (rules[entityA.type] === entityB.type) {
                      collisionEffects.push({ x: entityB.x, y: entityB.y, life: 5 });
                      entityB.type = entityA.type; entityB.emoji = entityA.emoji;
                  } else if (rules[entityB.type] === entityA.type) {
                      collisionEffects.push({ x: entityA.x, y: entityA.y, life: 5 });
                      entityA.type = entityB.type; entityA.emoji = entityB.emoji;
                  }
              }
          }
      }
  }
  
  function drawCollisionEffects() {
      ctx.font = `${entitySize * 2.5}px Arial`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      for (let i = collisionEffects.length - 1; i >= 0; i--) {
          const effect = collisionEffects[i];
          ctx.fillText('💥', effect.x, effect.y);
          effect.life--;
          if (effect.life <= 0) { collisionEffects.splice(i, 1); }
      }
  }

  function endSimulation(winner: { emoji: string | null; type: string; }) {
      cancelAnimationFrame(animationFrameId);
      canvasContainer.style.display = 'none';
      gameOverScreen.style.display = 'flex';
      winnerEmoji.textContent = winner.emoji;
      winnerText.textContent = `${winner.type.charAt(0).toUpperCase() + winner.type.slice(1)} is the winner!`;
  }
  
  function startSimulation() {
      setupScreen.style.display = 'none';
      canvasContainer.style.display = 'block';
      resizeCanvas();
      initSimulation(parseInt(entitySlider.value));
      animate();
  }
  
  function playAgain() {
      gameOverScreen.style.display = 'none';
      setupScreen.style.display = 'flex';
  }

  onMount(() => {
    ctx = canvas.getContext('2d')!;
    
    const handleSliderInput = (e: Event) => {
        sliderValue.textContent = (e.target as HTMLInputElement).value;
    };
    
    entitySlider.addEventListener('input', handleSliderInput);
    
    return () => {
        entitySlider.removeEventListener('input', handleSliderInput);
        cancelAnimationFrame(animationFrameId);
    }
  });
</script>

<div class="simulator-wrapper">
  <div bind:this={setupScreen} class="setup-screen">
    <h1>RPS Battle Simulator</h1>
    <p>Select the number of fighters to start.</p>
    <div class="slider-container">
        <label for="entitySlider">Number of Fighters: <span bind:this={sliderValue}>168</span></label>
        <input type="range" bind:this={entitySlider} min="3" max="333" step="3" value="168">
    </div>
    <button on:click={startSimulation}>Start Simulation</button>
  </div>

  <div bind:this={canvasContainer} class="canvas-container">
      <canvas bind:this={canvas}></canvas>
  </div>

  <div bind:this={gameOverScreen} class="game-over-screen">
      <h2>Simulation Over!</h2>
      <p bind:this={winnerEmoji}></p>
      <p bind:this={winnerText}></p>
      <button on:click={playAgain}>Play Again</button>
  </div>
</div>

<style>
    .simulator-wrapper {
        font-family: 'Inter', sans-serif;
        width: 100%;
        height: 100%;
        background-color: #f3f4f6;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.5rem;
    }
    .setup-screen, .game-over-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: white;
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
        text-align: center;
    }
    .game-over-screen {
        display: none;
    }
    h1 {
        font-size: 2.25rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 1rem;
    }
    p {
        color: #4b5563;
        margin-bottom: 1.5rem;
    }
    .slider-container {
        width: 100%;
        max-width: 28rem;
    }
    label {
        font-size: 1.125rem;
        font-weight: 500;
        color: #374151;
    }
    input[type="range"] {
        width: 100%;
        margin-top: 1rem;
        margin-bottom: 1rem;
        -webkit-appearance: none;
        appearance: none;
        height: 8px;
        background: #d1d5db;
        border-radius: 5px;
        outline: none;
        opacity: 0.7;
        transition: opacity .2s;
    }
    input[type="range"]:hover { opacity: 1; }
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 24px;
        height: 24px;
        background: #4f46e5;
        cursor: pointer;
        border-radius: 50%;
    }
    button {
        margin-top: 1rem;
        padding: 0.75rem 2rem;
        background-color: #4f46e5;
        color: white;
        font-weight: 700;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.05);
        transition: background-color 0.2s, transform 0.2s;
        border: none;
    }
    button:hover {
        background-color: #4338ca;
        transform: scale(1.05);
    }
    .canvas-container {
        display: none;
        width: 100%;
        height: 100%;
    }
    canvas {
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 0.5rem;
    }
    .game-over-screen h2 { font-size: 1.875rem; color: #1f2937; margin-bottom: 0.5rem;}
    .game-over-screen p:first-of-type { font-size: 4rem; margin-bottom: 1rem; }
    .game-over-screen p:last-of-type { font-size: 1.25rem; color: #4b5563; margin-bottom: 1.5rem; }
</style>