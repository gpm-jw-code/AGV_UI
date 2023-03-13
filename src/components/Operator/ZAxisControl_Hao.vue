<template>
  <div class="z-axis-control-hao border p-3 d-flex">
    <div>
      <div>HAO</div>
    </div>
    <div class="control-buttons flex-fill">
      <b-button size="lg" class="w-100 border mb-3" variant="light" block>上點位</b-button>
      <b-button @click="Up()" size="lg" class="w-100 border mb-3" variant="light" block>上升</b-button>
      <b-button @click="Orig()" size="lg" class="w-100 border mb-3" variant="light" block>原點</b-button>
      <b-button @click="Stop()" size="lg" class="w-100 border mb-3" variant="light" block>停止</b-button>
      <b-button @click="Down()" size="lg" class="w-100 border mb-3" variant="light" block>下降</b-button>
      <b-button size="lg" class="w-100 border mb-3" variant="light" block>下點位</b-button>
    </div>
  </div>
</template>

<script>
import VerticalControl from '@/api/VerticalControlAPI';
export default {
  methods: {
    async Up() {
      var ret = await VerticalControl.Up();
    },
    async Down() {
      var ret = await VerticalControl.Down();
    },
    async Orig() {
      var ret = await VerticalControl.Orig();
    },
    async Stop() {
      var ret = await VerticalControl.Stop();
    },
    async Pose() {
      var ret = await VerticalControl.Pose(1.2);
    }
  },
}
</script>

<style scoped lang="scss">
.z-axis {
  .control-buttons {
  }
}
</style>