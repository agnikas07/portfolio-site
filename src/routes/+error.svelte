<script lang="ts">
  import { page } from '$app/stores';
</script>

<main class="error-container">
  <div class="text-container">
    <h1>This is not the page you are looking for.</h1>
    <p class="error-code">ERROR: May the 404ce be with you</p>
    <p class="path-info">Attempted to access: {$page.url.pathname}</p>
    <a href="/" class="home-link">Return to Home</a>
  </div>
</main>

<style>
  .error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 80px);
    padding: 2rem;
    box-sizing: border-box;
    text-align: center;
    position: relative;

    background-image: url('https://lumiere-a.akamaihd.net/v1/images/image_3f4de5de.jpeg?region=0%2C112%2C1920%2C1080');
    background-size: cover;
    background-position: center center;
  }

  .error-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
  
  .text-container {
    position: relative;
    z-index: 2;
    color: #d1d1d1;
  }

  .text-container h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
  }

  .error-code {
    font-size: 1.5rem;
    color: #ffc90e;
    margin-bottom: 2rem;
  }
  
  .path-info {
    font-size: 1rem;
    color: #aaa;
    margin-bottom: 2.5rem;
  }

  .home-link {
    display: inline-block;
    padding: 10px 20px;
    border: 2px solid #ffc90e;
    color: #ffc90e;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
  }
  .home-link:hover {
    background-color: #ffc90e;
    color: #0c0c0c;
  }
</style>