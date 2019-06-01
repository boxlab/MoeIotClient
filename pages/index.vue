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
              <i class="mdui-list-item-icon mdui-icon material-icons">update</i>
              <div class="mdui-list-item-content">更新时间</div>
              <span><code>{{ formatDate($store.state.dataholder.sensors.updated, 'yyyy-MM-dd hh:mm:ss') }}</code></span>
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
    layout: 'frame',
    methods: {
      formatDate(date, fmt) {
        if (/(y+)/.test(fmt)) {
          date = new Date(date * 1000);
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
          let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            "s+": date.getSeconds()
          };
          for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
              let str = o[k] + '';
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
            }
          }
          return fmt;
        }
      },
      padLeftZero(str) {
        return ('00' + str).substr(str.length);
      },
    }
  }
</script>

<style scoped>

</style>
