<template>
  <a class="card" :href="meal.link" target="_blank" rel="noopener noreferrer">
    <img :src="meal.preview_url" alt="Essens Vorschau" class="img-preview" />

    <h2 class="meal-name">
      {{
        meal.name.length >= 52 ? meal.name.substring(0, 49) + '...' : meal.name
      }}
    </h2>

    <p class="info">
      <span
        class="iconify"
        data-inline="false"
        data-icon="ant-design:clock-circle-outlined"
      ></span>
      <span class="descr">{{ meal.cooking_time }}</span>
    </p>

    <p class="info">
      <span
        class="iconify"
        data-inline="false"
        data-icon="fluent:top-speed-20-regular"
      ></span>
      <span class="descr">{{ meal.difficulty }}</span>
    </p>

    <p class="info" v-if="meal.calories != ''">
      <span
        class="iconify"
        data-inline="false"
        data-icon="fluent:food-16-filled"
      ></span>
      <span class="descr">{{ meal.calories }}</span>
    </p>
  </a>
</template>

<script>
  export default {
    name: 'MealCard',
    props: {
      meal: Object,
    },
  };
</script>

<style scoped>
  .card {
    text-decoration: none;
    color: #666666;
    height: 5rem;
    display: grid;
    padding: 0.6em;
    grid-template-columns: auto repeat(3, 1fr);
    grid-template-rows: 2fr 1fr;
    column-gap: 1em;
    background: #f5f5f5;
    border-radius: 10px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.03));
    max-width: 659px;
    /* min-width: 309px; */
    width: 100%;
    overflow: auto;
  }

  /* TODO: fix mobile layout for cooking data -> kinda done */

  .img-preview {
    border-radius: 10px;
    grid-row: 1 / -1;
    max-height: 4rem;
  }

  .meal-name {
    font-size: 0.9em;
    color: #5c9915;
    grid-column: 2 / -1;
  }

  .info {
    font-size: 1rem;
    display: flex;
    align-items: center;
  }

  .info .iconify[data-icon='ant-design:clock-circle-outlined'] {
    color: #888888;
    font-size: 0.9em;
    display: block;
  }

  .info .iconify[data-icon='fluent:top-speed-20-regular'] {
    color: #888888;
    font-size: 1.3em;
    display: block;
  }

  .info .iconify[data-icon='fluent:food-16-filled'] {
    color: #888888;
    font-size: 1em;
    display: block;
  }

  .info .descr {
    margin-left: 0.4em;
    font-size: 0.75em;
    font-weight: 600;
    display: block;
  }

  @media (max-width: 410px) {
    .card {
      grid-template-rows: 1fr 1fr;
      column-gap: 0.5em;
    }

    .img-preview {
      grid-row: 1 / -1;
      max-height: 3.5rem;
    }

    .info .iconify[data-icon='ant-design:clock-circle-outlined'] {
      font-size: 0.6em;
    }

    .info .iconify[data-icon='fluent:top-speed-20-regular'] {
      font-size: 1em;
    }

    .info .iconify[data-icon='fluent:food-16-filled'] {
      font-size: 0.7em;
    }

    .info .descr {
      font-size: 0.65em;
    }
  }
</style>
