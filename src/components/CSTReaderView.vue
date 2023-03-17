<template>
  <div class="cst-reader-view">
    <div class="image-show">
      <img :src="imageSrc" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSrc: "",
    }
  },
  mounted() {
    // setInterval(() => {
    //   this.fetchImage();
    // }, 1000);;
  },
  methods: {
    async fetchImage() {
      try {
        var response = await fetch('http://192.168.0.103:1180/liveimage.jpg', {
          cache: 'no-store'
        })
        if (!response.ok) {
          throw new Error('network error');
        }
        const blob = await response.blob();
        this.imageSrc = URL.createObjectURL(blob);
      } catch (error) {

      }
    }
  },
}
</script>

<style>
</style>