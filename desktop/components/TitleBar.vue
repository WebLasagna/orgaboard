<template>
  <div id="title-bar">
    <div id="title">
      <span>OrgaBoard</span>
    </div>
    <div id="buttons">
      <div class="title-bar-btn" @click="minimize()">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <rect fill="white" width="10" height="1" x="1" y="6"></rect>
        </svg>
      </div>
      <div class="title-bar-btn" @click="maximize()">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <rect width="9" height="9" x="1.5" y="1.5" fill="none" stroke="white"></rect>
        </svg>
      </div>
      <div class="title-bar-btn close" @click="close()">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <polygon fill="white" fill-rule="evenodd" points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"></polygon>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
const { remote } = require("electron");
var win = remote.BrowserWindow.getFocusedWindow();
export default {
  name: 'TitleBar',
  methods: {
    minimize() {
      win.minimize()
    },
    maximize() {
      win.maximize()
    },
    close() {
      win.close()
    }
  }
}
</script>

<style lang="scss" scoped>
#title-bar {
  position: fixed;
  top: 0px;
  background-color: #23272a;
  -webkit-app-region: drag;
  width: 100%;
  height: 24px;
}
#title {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  color: #fff;
  padding: 2px 0 1px 5px;
}
.title-bar-btn {
  width: 30px;
  height: 24px;
  text-align: center;
  -webkit-transition: .2s ease-out;
  transition: .2s ease-out;

  svg {
    margin-top: 5px;
  }
}
.title-bar-btn:hover {
  background-color: #2c3136;
}
.title-bar-btn.close:hover {
  background-color: #f44336;
}
#buttons {
  display: inline-flex;
  -webkit-app-region: no-drag;
  position: fixed;
  top: 0px;
  right: 0px;
}
</style>