<template>
  <div class="task-delivery">
    <div class="my-2">
      <div class="item">
        <div class="title">Action</div>
        <el-select v-model="selectedAction" placeholder="請選擇Action">
          <el-option label="移動" value="move"></el-option>
          <el-option label="停車" value="park"></el-option>
          <el-option label="搬運" value="carry"></el-option>
          <el-option label="Load" value="load"></el-option>
          <el-option label="Unload" value="unload"></el-option>
          <el-option label="充電" value="charge"></el-option>
        </el-select>
      </div>

      <!-- For Move -->
      <div
        v-if="selectedAction === 'move'|selectedAction === 'unload'|selectedAction === 'load'|selectedAction === 'charge'|selectedAction === 'park'"
      >
        <div class="item">
          <div class="title">目的地</div>
          <el-select
            @click="GetNormalStationTagsFromMap()"
            v-model="selectedToTag"
            placeholder="請選擇目的地"
          >
            <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag.id"></el-option>
          </el-select>
        </div>
      </div>
      <div v-else>
        <div class="item">
          <div class="title">FROM</div>
          <el-select v-model="selectedTag" placeholder="請選擇目的地">
            <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag.id"></el-option>
          </el-select>
        </div>
        <div class="item">
          <div class="title">To</div>
          <el-select v-model="selectedToTag" placeholder="請選擇to_tag">
            <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag.id"></el-option>
          </el-select>
        </div>
        <div class="item">
          <div class="title">Cassttle ID</div>
          <el-input v-model="selectedCst"></el-input>
        </div>
      </div>

      <div class="text-start">
        <b-button
          @click="TaskDeliveryBtnClickHandle"
          style="width:323px"
          variant="primary"
          block
        >派送任務</b-button>
      </div>
    </div>
    <MapShowVue style="height:600px" ref="map"></MapShowVue>
    <b-modal
      @ok="TaskDeliveryHandle"
      v-model="confirm_dialog_show"
      :centered="true"
      title="Task Delivery"
      header-bg-variant="primary"
      header-text-variant="light"
    >
      <p>
        <span>Action:{{ selectedAction }}</span>
      </p>
      <p>確定要派送此任務?</p>
    </b-modal>

    <b-modal
      v-model="notify_dialog_show"
      :centered="true"
      title="Warning"
      :ok-only="true"
      header-bg-variant="warning"
      header-text-variant="light"
    >
      <p>
        <span>{{ notify_text }}</span>
      </p>
    </b-modal>
  </div>
</template>
  
<script>
import Notifier from '@/api/NotifyHelper';
import { NavigationAPI } from '@/api/VMSAPI';
import MapShowVue from './MapShow.vue';
export default {
  components: {
    MapShowVue,
  },
  data() {
    return {
      confirm_dialog_show: false,
      notify_dialog_show: false,
      notify_text: '',
      selectedAction: 'move', // 選擇的Action
      selectedTag: '', // 選擇的tag_id
      selectedCst: '', // 選擇的cst_id
      selectedToTag: '', // 選擇的to_tag
      moveable_tags: [ // tag_id選項
        { id: 1, name: '標籤1' },
        { id: 2, name: '標籤2' },
        { id: 3, name: '標籤3' },
        { id: 4, name: '標籤4' },
        { id: 5, name: '標籤5' },
      ],
      parkable_tags: [ // tag_id選項
        { id: 1, name: '標籤1' },
        { id: 2, name: '標籤2' },
        { id: 3, name: '標籤3' },
        { id: 4, name: '標籤4' },
        { id: 5, name: '標籤5' },
      ],
      chargable_tags: [ // tag_id選項
        { id: 50, name: '充電站(TAG-50)' },
        { id: 70, name: '充電站(TAG-70)' },
      ],
      csts: [ // cst_id選項
        { id: 1, name: '客戶1' },
        { id: 2, name: '客戶2' },
        { id: 3, name: '客戶3' },
        { id: 4, name: '客戶4' },
        { id: 5, name: '客戶5' },
      ],
    };
  },
  computed: {
    From_Lable_display() {
      if (this.selectedAction === 'move' | this.selectedAction === 'park')
        return "目的地"
      else return 'From'
    },
    tags() {
      if (this.selectedAction == 'move')
        return this.moveable_tags;

      else if (this.selectedAction == 'charge')
        return this.chargable_tags;
      else
        return this.parkable_tags;
    }
  },
  methods: {
    TaskDeliveryBtnClickHandle() {

      if (this.selectedAction == 'carry' && (this.selectedToTag == '' | this.selectedToTag == undefined)) {
        this.notify_text = '尚未選擇目的地';
        this.notify_dialog_show = true;
        return;
      }
      if ((this.selectedAction == 'carry' | this.selectedAction == 'load' | this.selectedAction == 'unload') && (this.selectedCst == '' | this.selectedCst == undefined)) {
        this.notify_text = '尚未選擇CST ID';
        this.notify_dialog_show = true;
        return;
      }
      this.confirm_dialog_show = true;
    },
    async TaskDeliveryHandle() {

      var response = await NavigationAPI.Action(this.selectedAction, this.selectedTag, this.selectedToTag, this.selectedCst)
      console.info(response);
      if (response.accpet) {
        Notifier.Success("任務已派送");
        var tags = response.path.map(v => v.Tag);
        console.info(tags);
        this.$refs.map.UpdateNavPathRender(tags);
      }
      else
        Notifier.Danger(`任務派送失敗:${response.error_message}`, "bottom", 5000);

    },
    GetNormalStationTagsFromMap() {
      var normal_stations = this.$refs['map'].GetNormalStations();
      console.info(normal_stations);

      function compare(a, b) {
        if (a.TagNumber < b.TagNumber) {
          return -1;
        }
        if (a.TagNumber > b.TagNumber) {
          return 1;
        }
        return 0;
      }
      normal_stations.sort(compare);
      this.moveable_tags = [];
      normal_stations.forEach(station => {

        this.moveable_tags.push({
          id: station.TagNumber,
          name: '(Normal)' + station.TagNumber
        });
      })

    }
  },
  mounted() {
    this.moveable_tags = [];
    this.parkable_tags = [];
    for (let index = 43; index <= 71; index += 2) {
      this.moveable_tags.push({
        id: index,
        name: index
      });

    }
    for (let index = 42; index <= 80; index += 2) {
      this.parkable_tags.push({
        id: index,
        name: index
      });

    }
  },
};
</script>

<style scoped lang="scss">
.task-delivery {
  padding: 10px;
  height: auto;
  .item {
    display: flex;
    flex-direction: row;
    margin: 10px auto;
    .title {
      width: 120px;
      text-align: left;
    }
  }
}
</style>
  