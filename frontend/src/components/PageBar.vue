<template>
  <div>
    <nav class="pagebar">
      <h1 class="page-name">{{ page_name }}</h1>
      <button class="close" @click="close()">&times;</button>
    </nav>
    <img src="../assets/dark_oak.png" class="wood-extension" />
  </div>
</template>

<script>
  import router from '../router';

  export default {
    name: 'PageBar',
    props: {
      page_name: String,
    },
    methods: {
      close() {
        // router.push({ name: "home" });
        router.go(-1);
      },
    },
  };
</script>

<style scoped>
  .pagebar {
    background: rgba(120, 192, 16, 0.83);
    padding: 0.7rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
  }

  .page-name {
    font-family: Lora;
    font-style: normal;
    font-weight: bold;
    font-size: 1.2em;
    text-align: center;

    color: #eaeaea;
  }

  .close {
    border: none;
    background-color: transparent;
    font-size: 1.2em;
    font-weight: bold;
    color: #eaeaea;
    cursor: pointer;
  }

  .wood-extension {
    width: 100%;
    height: 3rem;
    opacity: 0.75;
    border-radius: 0px 0px 20px 20px;
    object-fit: cover;
  }
</style>
