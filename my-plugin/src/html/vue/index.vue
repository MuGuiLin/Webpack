<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello world!",
    };
  },

  methods: {
    name() {},
  },
};
</script>

<style>
.example {
  color: red;
}
</style>