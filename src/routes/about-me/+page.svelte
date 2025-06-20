<script lang="ts">
  import AboutHero from '$lib/components/AboutHero.svelte';
  import TimelineEvent from '$lib/components/TimelineEvent.svelte';

  type TimelineSide = 'left' | 'right';
  
  interface TimelineEventType {
      date: string;
      title: string;
      description: string;
      side: TimelineSide;
    }
    
  // Sample data for the timeline. This data is AI generated because I was lazy. I will be updating it with my actual experiences later.
  const timelineEvents: TimelineEventType[] = [
    {
      date: '2023 - Present',
      title: 'Personal Portfolio Project',
      description: 'Building a highly interactive, animated portfolio from scratch using SvelteKit, TypeScript, and Matter.js to showcase my skills in a fun and engaging way.',
      side: 'left'
    },
    {
      date: '2022 - 2023',
      title: 'Software Engineering Internship',
      description: 'Contributed to a full-stack web application, working with React and Node.js. Gained experience in agile development and collaborative coding environments.',
      side: 'right'
    },
    {
      date: '2019 - 2023',
      title: 'B.S. in Computer Science',
      description: 'Graduated from the University of Technology, where I focused on software development, data structures, and algorithms. This is where my passion for creating things with code truly began.',
      side: 'left'
    }
  ];
</script>

<main class="about-page-container">
  <AboutHero />

  <div class="timeline-container">
    {#each timelineEvents as event}
      <TimelineEvent 
        date={event.date}
        title={event.title}
        description={event.description}
        side={event.side}
      />
    {/each}
  </div>
</main>

<style>
    .about-page-container {
        background-color: #f0f8ff;
        color: #333;
        min-height: calc(100vh - 80px);
    }

    .timeline-container {
        position: relative;
        max-width: 1200px;
        margin: 0 auto;
        padding: 4rem 2rem;
    }

    .timeline-container::after {
        content: '';
        position: absolute;
        width: 6px;
        background-color: #ccdbe6;
        top: 0;
        bottom: 0;
        left: 50%;
        margin-left: -3px;
        z-index: 1;
    }
</style>