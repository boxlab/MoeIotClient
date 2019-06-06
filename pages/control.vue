<template>
  <div class="mdui-m-a-2">
    <div class="mdui-card mdui-p-a-1">
      <ul class="mdui-list">

        <li v-for="actuator in ActuatorsList" class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">{{ actuator.icon }}</i>
          <div class="mdui-list-item-content">{{ actuator.name }}</div>
          <label class="mdui-switch">
            <input type="checkbox" :id="'Actuator' + actuator.id"
                   :checked="$store.state.dataholder.sensors.swstate[actuator.id - 1]"
                   @click="doActuator(actuator.id)"/>
            <i class="mdui-switch-icon"></i>
          </label>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    name: "control",
    layout: 'frame',
    data() {
      return {
        ActuatorsList: [
          {name: '书桌台灯', id: 1, icon: 'lightbulb_outline'},
          {name: '书桌风扇', id: 2, icon: 'settings_power'},
          {name: 'Actuator #3', id: 3, icon: 'settings_power'},
          {name: 'Actuator #4', id: 4, icon: 'settings_power'},
        ]
      }
    },
    methods: {
      makeRequest(action, data = null) {
        return {
          action: action,
          data: data === null ? '' : data
        }
      },
      doActuator(id) {
        let state_now = this.$store.state.dataholder.sensors.swstate[id - 1];
        let state_after = (state_now === 1) ? 0 : 1;
        this.$store.commit('dataholder/Queue_add', this.makeRequest('set', {
          id: id,
          state: state_after
        }));
        this.$message.info(this.ActuatorsList[id - 1].name + (state_after === 1 ? '已打开' : '已关闭'));
      },
    }
  }
</script>

<style scoped>

</style>
