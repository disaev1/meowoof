<template>
  <div id="app">
    <div class="title">
      <img src="./assets/logo.png" class="logo" alt="Logo">
      <div>Meo<span class="b">woof</span></div>
    </div>
    <div class="MainOptions">
      <div class="MainOptions__option">
        <label for="enabled">Enable the <span class="b">extension</span></label>
        <m-switch :checked="enabled" name="enabled" @input="toggleEnabled()" />
      </div>
    </div>
    <div class="PetsSelector">
      <div class="PetsSelector__welcome">
        Select the pets you like most — or <span class="green">all of them!</span>
      </div>
      <div class="PetsSelector__option" v-for="option in loveOptions" :key="option">
        <label :for="`love${option}`">I love {{ option }}s</label>
        <m-switch
          :checked="love && love.includes(option)"
          :name="`love${option}`"
          @input="toggleLove(option)"
        />
      </div>
    </div>
    <button
      v-if="enabled"
      class="ApplyButton"
      @click="applyToTheCurrentTab"
    >
      Apply to the current tab
    </button>
  </div>
</template>

<script>
import MSwitch from './components/MSwitch.vue';

export default {
  name: 'App',

  components: { MSwitch },

  data() {
    return {
      love: [],
      loveOptions: [],
      enabled: false,
    };
  },

  created() {
    chrome.storage.sync.get(['love', 'loveOptions', 'enabled'], ({ enabled, loveOptions, love }) => {
      this.enabled = enabled;
      this.loveOptions = loveOptions;
      this.love = love;
    });
  },

  methods: {
    toggleLove(name) {
      let newLove;

      if (this.love.includes(name)) {
        newLove = this.love.filter((item) => item !== name);
      } else {
        newLove = [...this.love, name];
      }

      this.setLove(newLove);
    },

    toggleEnabled() {
      this.enabled = !this.enabled;
      chrome.storage.sync.set({ enabled: this.enabled });
    },

    setLove(value) {
      this.love = value;
      chrome.storage.sync.set({ love: value });
    },

    async applyToTheCurrentTab() {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['contentScript.js'],
      });
    },
  },
};
</script>

<style lang="scss">
#app {
  width: 400px;
  height: 326px;
  font-family: Arial;
  font-size: 15px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  border: none;

  .title {
    padding: 0 20.21px;
    display: flex;
    align-items: center;
    font-size: 18px;

    img {
      display: block;
      margin-right: 8px;
      width: 26px;
      height: auto;
    }
  }

  .PetsSelector {
    margin-bottom: 24px;
  }
}

.b {
  font-weight: bold;
}

.flex {
  display: flex;
}

.PetsSelector {
  padding: 19.75px 20.21px;
  background-color: #694EF3;
  color: #ffffff;
  border-radius: 12px;

  &__welcome {
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 3px;
    margin-bottom: 18.25px;
  }

  &__option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
}

.MainOptions {
  padding: 19.75px 20.21px;

  &__option {
    display: flex;
    justify-content: space-between;
  }
}

.ApplyButton {
  background-color: #48D99E;
  text-transform: uppercase;
  color: white;
  font-weight: bold;
  font-size: 18px;
  border-radius: 12px;
  height: 36px;
  border: none;
  cursor: pointer;
}

.green {
  color: #48D99E;
}
</style>
