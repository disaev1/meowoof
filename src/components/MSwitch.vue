<template>
  <div :class="['MSwitch', checked ? 'MSwitch_checked' : 'MSwitch_unchecked']">
    <div class="MSwitch__lever"></div>
    <input
      class="MSwitch__nativeCheckbox"
      type="checkbox"
      :name="name"
      :checked="enabled"
      @input="$emit('input', $event)"
    >
  </div>
</template>

<script>
export default {
  name: 'MSwitch',

  props: {
    checked: {
      type: Boolean,
    },

    name: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.MSwitch {
  background: #48D99E;
  border-radius: 30px;
  width: 40px;
  height: 20px;
  position: relative;
  cursor: pointer;

  &_checked {
    background: #48D99E;

    .MSwitch__lever {
      left: 23.34px;
    }
  }

  &_unchecked {
    background: #C0C0C0;

    .MSwitch__lever {
      left: 3.33px;
    }
  }

  &__lever {
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
    border-radius: 100%;
    width: 13.33px;
    height: 13.33px;
    position: absolute;
    top: 3.33px;
    background-color: #ffffff;
    transition: .3s;
  }

  &__nativeCheckbox {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    cursor: pointer;
    margin: 0;
    padding: 0;
    opacity: 0;
  }
}
</style>
