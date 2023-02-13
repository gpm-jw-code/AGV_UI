<template>
  <div class="mileage">
    <div>{{mileage}} km</div>
    <div>{{ time }}</div>
  </div>
</template>

<script>
import { GetMileage } from '@/api/AGVS';
import moment from 'moment'
export default {
  data() {
    return {
      val: 1.23,
      time: '2022/12/12 19:00:09'
    }
  },
  computed: {
    mileage() {
      return this.val.toFixed(2)
    }
  },
  mounted() {
    setInterval(async () => {
      this.val = await GetMileage();
    }, 1000);

    setInterval(() => {
      this.time = moment(Date.now()).format('yyyy/MM/DD HH:mm:ss');
    }, 1000);
  },
}
</script>

<style>
.mileage {
  font-size: small;
}
</style>