export const state = () => ({
  sensors: {
    temp: 0,
    humi: 0,
    swstate: [],
    updated: 0,
  },
  sendQueue: [],
});

export const mutations = {
  update(state, data) {
    switch (data.key) {
      case 'temp':
        state.sensors.temp = data.value;
        break;
      case 'humi':
        state.sensors.humi = data.value;
        break;
      case 'updated':
        state.sensors.updated = data.value;
        break;
      case 'swstate':
        state.sensors.swstate = data.value;
        break;
      default:
        break;
    }
  },
  Queue_add(state, data) {
    state.sendQueue.push(data);
  },
  Queue_flush(state) {
    state.sendQueue = [];
  }
};
