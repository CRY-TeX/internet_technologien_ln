<template>
  <div class="card">
    <img
      src="../assets/sample/Tomatensuppe.jpg"
      alt="Essens Vorschau"
      class="img-preview"
    />
    <!-- TODO: max chars 52 -->
    <h2 class="meal-name">
      Tomatensuppe
    </h2>
    <p class="info creation-time">
      <span
        class="iconify"
        data-inline="false"
        data-icon="ant-design:clock-circle-outlined"
      ></span>
      <span class="descr">30min</span>
    </p>

    <p class="info difficulty">
      <span
        class="iconify"
        data-inline="false"
        data-icon="fluent:top-speed-20-regular"
      ></span>
      <span class="descr">Einfach</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "MealCard",
};
</script>

<style scoped>
.card {
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
  width: 100%;
}

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

.info .iconify[data-icon="ant-design:clock-circle-outlined"] {
  color: #888888;
  font-size: 0.9em;
  display: block;
}

.info .iconify[data-icon="fluent:top-speed-20-regular"] {
  color: #888888;
  font-size: 1.3em;
  display: block;
}

.info .descr {
  margin-left: 0.4em;
  font-size: 0.75em;
  font-weight: 600;
  display: block;
}
</style>
