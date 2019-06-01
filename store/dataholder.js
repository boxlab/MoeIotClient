export const state = () => ({
  sensors: {
    temp: 0,
    humi: 0,
    updated: 0,
  }
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
      default:
        break;
    }
  }
};
