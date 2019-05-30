export const state = () => ({
  sensors: {
    temp: 0,
    humi: 0,
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
      default:
        break;
    }
  }
};
