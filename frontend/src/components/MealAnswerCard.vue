<template>
  <a v-if="meal_item !== undefined" :href="meal_item?.link" target="_blank">
    <img
      class="preview"
      :src="meal_item?.preview_url"
      alt="Gericht Preview"
      v-if="meal_item?.preview_url !== undefined"
    />
    <h2 class="meal-name">
      {{ meal_item.name.length >= 52 ? meal_item.name.substring(0, 49) + '...' : meal_item.name }}
    </h2>
  </a>

  <div class="info-container">
    <p class="info" v-if="meal_item.cooking_time !== ''">
      <span class="iconify" data-inline="false" data-icon="ant-design:clock-circle-outlined"></span>
      <span class="descr">{{ meal_item.cooking_time }}</span>
    </p>

    <p class="info" v-if="meal_item.difficulty !== ''">
      <span class="iconify" data-inline="false" data-icon="fluent:top-speed-20-regular"></span>
      <span class="descr">{{ meal_item.difficulty }}</span>
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { IMealItem } from '@/types/api_response_data.interface';

  export default defineComponent({
    props: {
      meal_item: {
        type: Object as PropType<IMealItem>,
        required: true,
      },
    },
  });
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  .preview {
    width: 80%;
    margin: 0 auto 1em auto;
    display: block;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.05));
    border-radius: 10px;
  }

  .meal-name {
    font-size: 0.9em;
    text-align: center;
    color: #5c9915;
  }

  .meal-name:hover {
    color: #78c010d4;
  }

  .info-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 0.45em 3em 2em 3em;
  }

  .info {
    font-size: 0.8em;
    display: flex;
    align-items: center;
    color: #b5855f;
  }

  .info .iconify {
    margin-right: 0.35em;
  }
</style>
