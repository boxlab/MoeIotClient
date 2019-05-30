<template>
  <div>
    <header class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <button class="mdui-btn mdui-btn-icon" mdui-drawer="{target: '#main-drawer'}"><i
          class="mdui-icon material-icons">menu</i></button>
        <a href="javascript:;" class="mdui-typo-headline mdui-hidden-sm-down">Moe IoT</a>
        <a href="javascript:;" class="mdui-typo-title">{{ title }}</a>
        <div class="mdui-toolbar-spacer"></div>
      </div>
    </header>
    <div class="mdui-drawer mdui-color-white" id="main-drawer" style="text-align: left;">
      <ul class="mdui-list">
        <nuxt-link v-for="(info, index) in pathInfo" :to="info.path" :key="index">
          <li class="mdui-list-item mdui-ripple" :class="{'mdui-list-item-active': info.path === $route.path}">
            <i class="mdui-list-item-icon mdui-icon material-icons mdui-text-color-indigo">{{ info.icon }}</i>
            <div class="mdui-list-item-content">{{ info.title }}</div>
          </li>
        </nuxt-link>
        <div class="mdui-divider"></div>
        <li class="mdui-list-item mdui-ripple" mdui-drawer-close>
          <i class="mdui-list-item-icon mdui-icon material-icons mdui-text-color-indigo">arrow_back</i>
          <div class="mdui-list-item-content">收起</div>
        </li>
      </ul>
    </div>

    <div>
      <a-spin tip="连接中..." :spinning="loading">
        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin/>
        <nuxt/>
      </a-spin>
    </div>

  </div>
</template>

<script>
  import mdui from 'mdui';

  export default {
    name: "frame",
    data() {
      return {
        pathInfo: [
          {path: '/', title: '概览', icon: 'home'},
          {path: '/control', title: '控制', icon: 'settings'},
        ],
        loading: true,
        title: '',
        WEBSOCKET: null,
        HEARTBEAT: null,
        DATAGETTER: null,
        SOCKET_SERVER: 'ws://localhost:18770',
        RECONNECTING: false,
      }
    },
    mounted() {
      mdui.mutation();
      this.updateTitle();
      this.initWS();
    },
    methods: {
      updateTitle() {
        for (let i = 0; i < this.pathInfo.length; i++) {
          if (this.pathInfo[i].path === this.$route.path)
            this.title = this.pathInfo[i].title;
        }
      },

      /*
       * WebSocket
       */

      initWS() {
        let self = this;
        if (self.WEBSOCKET === null) {
          try {
            self.WEBSOCKET = new WebSocket(self.SOCKET_SERVER);
          } catch (e) {
            console.warn('Fail to connect to server');
          }
        }
        if (self.WEBSOCKET !== null) {
          self.WEBSOCKET.onopen = self.handleOpen;
          self.WEBSOCKET.onmessage = self.handleMessage;
          self.WEBSOCKET.onerror = self.handleError;
          self.WEBSOCKET.onclose = self.handleClose;
        }
        if (self.HEARTBEAT !== null) {
          clearInterval(self.HEARTBEAT);
          self.HEARTBEAT = null;
        }
        if (self.DATAGETTER !== null) {
          clearInterval(self.DATAGETTER);
          self.DATAGETTER = null;
        }
        self.HEARTBEAT = setInterval(function () {
          self.wsSend(self.makeRequest('ping'));
        }, 30 * 1000);
        self.DATAGETTER = setInterval(function () {
          self.wsSend(self.makeRequest('get', {
            type: 'temp'
          }));
          self.wsSend(self.makeRequest('get', {
            type: 'humi'
          }));
          self.wsSend(self.makeRequest('get', {
            type: 'illu'
          }));
        }, 1000);
      },
      handleOpen() {
        this.loading = false;
        this.RECONNECTING = false;
      },
      handleMessage(e) {
        console.log(e.data);
        let data = JSON.parse(e.data);
        switch (data['type']) {
          case 'temp':
            this.$store.commit('dataholder/update', {
              key: 'temp',
              value: data['data']['value'],
            });
            break;
          case 'humi':
            this.$store.commit('dataholder/update', {
              key: 'humi',
              value: data['data']['value'],
            });
            break;
          case 'illu':
            this.$store.commit('dataholder/update', {
              key: 'illu',
              value: data['data']['value'],
            });
            break;
          default:
            break;
        }
      },
      handleError() {
        this.loading = true;
        if (!this.RECONNECTING) {
          this.wsReconnect();
          this.RECONNECTING = true;
        }
      },
      handleClose(e) {
        this.loading = true;
        if (!this.RECONNECTING) {
          this.wsReconnect();
          this.RECONNECTING = true;
        }
      },
      wsSend(data) {
        if (this.WEBSOCKET !== null)
          this.WEBSOCKET.send(JSON.stringify(data));
      },
      async wsReconnect() {
        let self = this;
        self.$message.info('正在重新连接服务器');
        let interval = setInterval(function () {
          if (self.loading) {
            self.WEBSOCKET = null;
            self.initWS();
          } else {
            self.$message.success('重新连接成功');
            clearInterval(interval);
          }
        }, 2000);
      },
      makeRequest(action, data = null) {
        let request = {
          action: action,
          data: data === null ? '' : data
        };
        return request
      },
    },
    watch: {
      $route(to, from) {
        this.updateTitle();
      }
    }
  }
</script>

<style scoped>

</style>
