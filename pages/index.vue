<template>
  <div class="mdui-m-a-2">
    <div class="mdui-row">
      <div class="mdui-col-xs-12 mdui-col-lg-6">
        <div class="mdui-card mdui-p-a-2 mdui-m-b-2">
          <div class="mdui-row">
            <div class="mdui-col-xs-6" style="text-align: center;">
              <a-progress type="dashboard" :percent="$store.state.dataholder.sensors.temp"
                          :format="percent => `${percent}℃`"/>
              <p>温度</p>
            </div>
            <div class="mdui-col-xs-6" style="text-align: center;">
              <a-progress type="dashboard" :percent="$store.state.dataholder.sensors.humi"
                          :format="percent => `${percent}%`"/>
              <p>湿度</p>
            </div>
          </div>
        </div>
      </div>
      <div class="mdui-col-xs-12 mdui-col-lg-6">
        <div class="mdui-card mdui-p-a-2 mdui-m-b-2">
          <ul class="mdui-list">

            <li class="mdui-list-item mdui-ripple mdui-typo">
              <i class="mdui-list-item-icon mdui-icon material-icons">highlight</i>
              <div class="mdui-list-item-content">光照度</div>
              <span><code>{{ $store.state.dataholder.sensors.illu }}</code></span>&nbsp;Lux
            </li>

          </ul>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: "index",
    layout: 'frame'
  }
</script>

<style scoped>

</style>
