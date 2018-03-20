<template>
  <div class="page">
    <div class="hero">
      <div class="container">
        <h1 class="hero__title">Guide</h1>
        <h2 class="hero__subtitle">"Simplicity isn't just for beginners."</h2>
        <div class="hero__buttons">
          <button class="button">npm install @jangle/core</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Guide | Jangle',
      meta: [
        { hid: 'description', name: 'description', content: `Simplicity isn't just for beginners.` }
      ]
    }
  }
}
</script>
