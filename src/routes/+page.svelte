<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import VisitorCounter from '$lib/components/VisitorCounter.svelte';
  import Matter from 'matter-js';
  
  let revealContent = false;
  let showVisitorCounter = false;

  let engine: Matter.Engine;
  let runner: Matter.Runner;
  let brokenPiece: { element: HTMLElement, body: Matter.Body } | null = null;
  let sparks: { id: number, body: Matter.Body, life: number }[] = [];
  let egg: { element: HTMLElement, body: Matter.Body } | null = null;
  let eggSpawned = false;

  function handleCounterBreak({ detail }: { detail: { element: HTMLElement }}) {
    if (!detail.element || brokenPiece) return;
    const rect = detail.element.getBoundingClientRect();
    const body = Matter.Bodies.rectangle(rect.left + rect.width / 2, rect.top + rect.height / 2, rect.width, rect.height, { restitution: 0.5, friction: 0.3 });
    Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);
    Matter.Body.applyForce(body, body.position, { x: (Math.random() - 0.5) * 0.04, y: -0.04 });
    brokenPiece = { element: detail.element, body };
    Matter.Composite.add(engine.world, body);

    for (let i = 0; i < 40; i++) {
        const sparkBody = Matter.Bodies.circle(rect.left + rect.width / 2, rect.top, Math.random() * 4 + 2, { friction: 0.05, restitution: 0.8, density: 0.0001 });
        Matter.Body.applyForce(sparkBody, sparkBody.position, { x: (Math.random() - 0.5) * 0.02, y: (Math.random() * 0.015) });
        Matter.Composite.add(engine.world, sparkBody);
        sparks.push({ id: Date.now() + i, body: sparkBody, life: 120 });
    }
  }

  function spawnEgg(event: MouseEvent) {
    if (eggSpawned) return;
    eggSpawned = true;
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const eggBody = Matter.Bodies.circle(rect.left + rect.width / 2, rect.top, 20, { restitution: 0.7, friction: 0.2 });
    
    setTimeout(() => {
      const eggElement = document.querySelector('.easter-egg') as HTMLElement;
      if(eggElement) {
        egg = { element: eggElement, body: eggBody };
        Matter.Composite.add(engine.world, egg.body);
      }
    }, 0);
  }

  onMount(() => {
    setTimeout(() => {
        revealContent = true;
        setTimeout(() => { showVisitorCounter = true; }, 1500);
    }, 1000);

    engine = Matter.Engine.create({ gravity: { y: 1 } });
    const ground = Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 25, window.innerWidth, 50, { isStatic: true });
    const leftWall = Matter.Bodies.rectangle(-25, window.innerHeight / 2, 50, window.innerHeight, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(window.innerWidth + 25, window.innerHeight / 2, 50, window.innerHeight, { isStatic: true });
    const ceiling = Matter.Bodies.rectangle(window.innerWidth / 2, 80, window.innerWidth, 1, { isStatic: true });
    Matter.Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);
    
    const mouse = Matter.Mouse.create(document.body);
    const mouseConstraint = Matter.MouseConstraint.create(engine, { mouse: mouse, constraint: { stiffness: 0.2, render: { visible: false } } });
    Matter.Composite.add(engine.world, mouseConstraint);

    runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    (function animate() {
        if (!engine) return;
        if (brokenPiece) {
            const { position, angle } = brokenPiece.body;
            brokenPiece.element.style.left = `${position.x}px`;
            brokenPiece.element.style.top = `${position.y}px`;
            brokenPiece.element.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
        }
        if (egg) {
            const { position, angle } = egg.body;
            egg.element.style.left = `${position.x}px`;
            egg.element.style.top = `${position.y}px`;
            egg.element.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
        }
        sparks.forEach((spark) => {
            spark.life--;
            const el = document.querySelector(`[data-spark-id='${spark.id}']`) as HTMLElement;
            if (el) {
                if (spark.life <= 0) { el.remove(); Matter.Composite.remove(engine.world, spark.body); }
                else {
                    el.style.left = `${spark.body.position.x}px`; el.style.top = `${spark.body.position.y}px`;
                    const radius = spark.body.circleRadius ?? 4;
                    el.style.width = `${radius * 2}px`; el.style.height = `${radius * 2}px`;
                    el.style.opacity = (spark.life / 120).toString();
                }
            }
        });
        sparks = sparks.filter(s => s.life > 0);
        requestAnimationFrame(animate);
    })();
  });
  
  onDestroy(() => { if (runner) Matter.Runner.stop(runner); if (engine) Matter.Engine.clear(engine); });
</script>

<main class="main-content">
  <div class="page-body">
    <div class="welcome-text">
      <h2>Welcome to my digital playground.</h2>
      <p>
        This site is a collection of my projects and experiments, built from the ground up. 
        It's part portfolio, part tech-demo, with some hidden <span class="egg-trigger" role="button" tabindex="0" on:click={spawnEgg} on:keypress>easter eggs</span> scattered throughout.
        Feel free to look around—you might find things aren't always what they seem.
      </p>
    </div>
  </div>
  
  {#if showVisitorCounter}
    <div class="visitor-counter-wrapper">
        <VisitorCounter on:break={handleCounterBreak} />
    </div>
  {/if}

  {#if eggSpawned} <div class="easter-egg">🥚</div> {/if}
</main>

<div id="spark-container">
  {#each sparks as spark (spark.id)} <div class="spark" data-spark-id={spark.id}></div> {/each}
</div>

<div class="content-overlay" class:hidden={revealContent}></div>

<style>
  .main-content { background-color: #B0E0E6; position: relative; }
  .page-body { min-height: calc(100vh - 80px); padding: 2rem; color: #333; box-sizing: border-box; display: flex; justify-content: center; align-items: center; }
  .welcome-text { max-width: 700px; text-align: center; }
  .welcome-text h2 { font-size: 3.5rem; font-weight: 700; color: #1a2729; margin-bottom: 1.5rem; }
  .welcome-text p { font-size: 1.2rem; line-height: 1.7; color: #334e52; }
  .egg-trigger { cursor: pointer; text-decoration: underline; font-weight: bold; }
  :global(.easter-egg) { position: fixed; font-size: 40px; pointer-events: none; transform-origin: 50% 50%; user-select: none; z-index: 240; }
  .visitor-counter-wrapper { position: absolute; top: 1rem; right: 1.5rem; }
  :global(.spark) { position: fixed; background-color: #ffdd59; border-radius: 50%; box-shadow: 0 0 8px #ffdd59, 0 0 12px #ff6600, 0 0 16px #ffffff; pointer-events: none; transform: translate(-50%, -50%); z-index: 250; }
  .content-overlay { position: fixed; top: 80px; left: 0; width: 100%; height: calc(100vh - 80px); background-color: black; z-index: 100; transition: transform 1.2s cubic-bezier(0.86, 0, 0.07, 1); transform: translateY(0%); }
  .content-overlay.hidden { transform: translateY(100%); }
</style>