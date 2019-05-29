<template>
  <div class="mdui-m-a-2">
    <div class="mdui-card mdui-p-a-1">
      <ul class="mdui-list">

        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">lightbulb_outline</i>
          <div class="mdui-list-item-content">Light 1</div>
          <label class="mdui-switch">
            <input type="checkbox" checked/>
            <i class="mdui-switch-icon"></i>
          </label>
        </li>

        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">lightbulb_outline</i>
          <div class="mdui-list-item-content">Light 2</div>
          <label class="mdui-switch">
            <input type="checkbox"/>
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
    layout: 'frame'
  }
</script>

<style scoped>

</style>
