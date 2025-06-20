<script lang="ts">
  import AboutHero from '$lib/components/AboutHero.svelte';
  // I will add the timeline component here later
</script>

<main class="about-page-container">
  <AboutHero />

  <!-- The scrollable timeline will go here -->
  <div class="timeline-placeholder">
    <!-- Placeholder content for now -->
    <h2>Timeline Coming Soon...</h2>
  </div>
</main>

<style>
    .about-page-container {
        background-color: #f0f8ff;
        color: #333;
        min-height: calc(100vh - 80px);
    }

    .timeline-placeholder {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 150vh;
        text-align: center;
    }
</style>