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
        loading: false,
        title: '概览'
      }
    },
    mounted() {
      mdui.mutation();
      this.updateTitle();
    },
    methods: {
      updateTitle() {
        for (let i = 0; i < this.pathInfo.length; i++) {
          if (this.pathInfo[i].path === this.$route.path)
            this.title = this.pathInfo[i].title;
        }
      }
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
