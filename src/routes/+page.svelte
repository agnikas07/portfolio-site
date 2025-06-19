<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import TerminalTyper from '$lib/components/TerminalTyper.svelte';
  import VisitorCounter from '$lib/components/VisitorCounter.svelte';
  import Matter from 'matter-js';
  
  const siteName = "agnikas.dev";
  let introFinished = false;
  let showVisitorCounter = false;

  let engine: Matter.Engine;
  let runner: Matter.Runner;
  let brokenPiece: { element: HTMLElement, body: Matter.Body } | null = null;
  let sparks: { id: number, body: Matter.Body, life: number }[] = [];

  function handleCounterBreak({ detail }: { detail: { element: HTMLElement }}) {
    if (!detail.element || brokenPiece) return;

    const rect = detail.element.getBoundingClientRect();
    const body = Matter.Bodies.rectangle(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      rect.width,
      rect.height,
      { restitution: 0.5, friction: 0.3 }
    );

    Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);
    const force = { x: (Math.random() - 0.5) * 0.04, y: -0.04 };
    Matter.Body.applyForce(body, body.position, force);

    brokenPiece = { element: detail.element, body };
    Matter.Composite.add(engine.world, body);

    for (let i = 0; i < 40; i++) {
        const sparkBody = Matter.Bodies.circle(
            rect.left + rect.width / 2,
            rect.top,
            Math.random() * 4 + 2,
            { friction: 0.05, restitution: 0.8, density: 0.0001 }
        );
        const sparkForce = {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() * 0.005)
        };
        Matter.Body.applyForce(sparkBody, sparkBody.position, sparkForce);
        Matter.Composite.add(engine.world, sparkBody);
        
        sparks.push({
            id: Date.now() + i,
            body: sparkBody,
            life: 120
        });
    }
  }

  onMount(() => {
    engine = Matter.Engine.create();
    engine.world.gravity.y = 1;

    const ground = Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 25, window.innerWidth, 50, { isStatic: true });
    const leftWall = Matter.Bodies.rectangle(-25, window.innerHeight / 2, 50, window.innerHeight, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(window.innerWidth + 25, window.innerHeight / 2, 50, window.innerHeight, { isStatic: true });
    const ceiling = Matter.Bodies.rectangle(window.innerWidth / 2, 80, window.innerWidth, 1, { isStatic: true });
    
    Matter.Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);
    
    const mouse = Matter.Mouse.create(document.body);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { stiffness: 0.2, render: { visible: false } }
    });
    Matter.Composite.add(engine.world, mouseConstraint);

    runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    (function animate() {
        if (brokenPiece) {
            const { position, angle } = brokenPiece.body;
            brokenPiece.element.style.left = `${position.x}px`;
            brokenPiece.element.style.top = `${position.y}px`;
            brokenPiece.element.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
        }

        sparks.forEach((spark, index) => {
            spark.life--;
            const el = document.querySelector(`[data-spark-id='${spark.id}']`) as HTMLElement;
            if (el) {
                if (spark.life <= 0) {
                    el.remove();
                    Matter.Composite.remove(engine.world, spark.body);
                } else {
                    const { position } = spark.body;
                    el.style.left = `${position.x}px`;
                    el.style.top = `${position.y}px`;
                    el.style.width = `${(spark.body.circleRadius ?? 4) * 2}px`;
                    el.style.height = `${(spark.body.circleRadius ?? 4) * 2}px`;
                    el.style.opacity = (spark.life / 120).toString();
                }
            }
        });
        sparks = sparks.filter(s => s.life > 0);

        requestAnimationFrame(animate);
    })();
  });
  
  onDestroy(() => {
    if (runner) Matter.Runner.stop(runner);
    if (engine) Matter.Engine.clear(engine);
  });

  function handleTypingDone() {
    setTimeout(() => {
      introFinished = true;
      setTimeout(() => {
        showVisitorCounter = true;
      }, 1500);
    }, 500);
  }
</script>

<div class="page-container">
  <header class="main-header">
    <TerminalTyper textToType={siteName} on:done={handleTypingDone} />
  </header>

  <main class="main-content">
    <div class="page-body">
      {#if showVisitorCounter}
        <VisitorCounter on:break={handleCounterBreak} />
      {/if}
    </div>
  </main>
  
  <div id="spark-container">
    {#each sparks as spark (spark.id)}
      <div class="spark" data-spark-id={spark.id}></div>
    {/each}
  </div>

  <div class="content-overlay" class:hidden={introFinished}></div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: 'JetBrains Mono', monospace;
    background-color: black;
    overflow: hidden;
  }

  .page-container, .main-content {
    min-height: 100vh;
  }

  .main-header {
    position: sticky; top: 0; height: 80px;
    background-color: black; color: #f0f0f0;
    display: flex; align-items: center; padding: 0 2rem;
    box-sizing: border-box; z-index: 200;
  }

  .main-content { background-color: #B0E0E6; }
  
  .page-body {
    padding: 1rem 1.5rem; color: #333;
    position: relative; display: flex;
    justify-content: flex-end; align-items: flex-start;
  }

  :global(.spark) {
    position: fixed;
    background-color: #ffdd59;
    border-radius: 50%;
    box-shadow: 0 0 8px #ffdd59, 0 0 12px #ff6600, 0 0 16px #ffffff;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 250;
  }

  .content-overlay {
    position: fixed; top: 80px; left: 0;
    width: 100%; height: calc(100vh - 80px);
    background-color: black; z-index: 100;
    transition: transform 1.2s cubic-bezier(0.86, 0, 0.07, 1);
    transform: translateY(0%);
  }
  
  .content-overlay.hidden { transform: translateY(100%); }
</style>