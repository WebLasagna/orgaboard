<template>
  <div id="home">
    <textarea spellcheck="false" v-model="value" :style="'font-family: ' + settings.font + '; font-size: ' + settings.fontSize + 'px; color: ' + settings.color + ';'" @click="toggleSettings('close')"></textarea>
    <div id="settings-btn" @click="toggleSettings()">
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"></path>
      </svg>
    </div>
    <div id="settings" v-if="showSettings">
      <span class="title">{{ $t('settings') }}</span>
      <span class="setting">{{ $t('room') }} : </span>
      <input type="text" v-model="room">
      <span class="setting">{{ $t('font') }} : </span>
      <input type="text" v-model="settings.font">
      <span class="setting">{{ $t('fontSize') }} :</span>
      <input type="text" v-model="settings.fontSize"><span> px</span>
      <span class="setting">{{ $t('color') }} :</span>
      <input type="text" v-model="settings.color">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      value: null,
      received: null,
      joined: null,
      room: null,
      showSettings: false,
      settings: {
        font: 'Arial',
        fontSize: '128',
        color: 'white'
      }
    }
  },
  mounted() {
    var randomCode = ""
    var alphabet = "a,b,c,d,e,f,g,h,j,k,m,n,o,p,r,s,t,u,v,w,x,y,z".split(",")
    var rand = null
    for (var x = 0; x < 6; x++) {
      rand = Math.floor(Math.random() * alphabet.length)
      randomCode += alphabet[rand]
    }
    this.room = randomCode
    this.$socket.$subscribe('update', payload => {
      this.received = payload
    })
    this.$socket.client.emit('joinRoom', randomCode)
  },
  methods: {
    toggleSettings(state) {
      if(state === 'close') this.showSettings = false
      else if(this.showSettings) this.showSettings = false
      else this.showSettings = true
    },
    joinRoom() {
      this.$socket.client.emit('joinRoom', this.room)
    }
  },
  watch: {
    value(newValue, oldValue) {
      if(newValue === this.received) return
      this.$socket.client.emit('sendUpdate', this.room, newValue)
    },
    received(data) {
      this.value = data
    },
    room() {
      this.joinRoom()
    }
  }
}
</script>