<template>
  <div class="page">
    <section class="hero">
      <div class="hero__container hero__container--medium container">
        <h1 class="hero__title">Jangle</h1>
        <h3 class="hero__subtitle">a cms for humans.</h3>
      </div>
    </section>
    <section class="hero hero--left hero--jet">
      <div class="hero__container hero__container--medium container">
        <h3 class="hero__title">What is Jangle?</h3>
        <div class="hero__subtitle hero__body">
          <p class="hero__paragraph">Jangle is a CMS built on top of the popular MongooseJS ODM.</p>
          <p class="hero__paragraph">It adds functionality in layers, letting us decide which best pieces fit the problems we want to solve.</p>
          <p class="hero__paragraph">This project is currently a work-in-progress, but feel free to browse the documentation while you're here.</p>
          <div class="hero__buttons button__row">
            <nuxt-link class="button" to="/docs/core">View documentation</nuxt-link>
            <a href="https://www.github.com/jangle-cms" class="button" >
              <i class="ion-social-github" style="padding-right: .5em"></i>
              <span>Browse code</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
