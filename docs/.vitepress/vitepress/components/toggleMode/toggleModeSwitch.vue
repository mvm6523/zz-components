<template>
  <div
    class="components"
    ref="components"
    :class="[isDark ? 'dark' : 'light', moveIn ? 'move-in' : '']"
    @click="handleClick"
    @mouseenter="handleMouseMove"
    @mouseleave="handleMouseOut"
  >
    <!-- 组件所有元素 -->
    <div class="main-button">
      <!-- 按钮主体(圆) -->
      <div class="moon"></div>
      <div class="moon"></div>
      <div class="moon"></div>
      <!-- 月亮上的陨石坑 -->
    </div>
    <div class="daytime-background"></div>
    <div class="daytime-background"></div>
    <div class="daytime-background"></div>
    <!-- 按钮底层的三个虚影 -->
    <div class="cloud">
      <!-- 所有的云 -->
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
    </div>
    <div class="cloud-light">
      <!-- 云的虚影 -->
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
    </div>
    <div class="stars">
      <!-- 所有星星，每一个星星由四个div拼合而成 -->
      <div class="star big">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
      <div class="star big">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
      <div class="star medium">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
      <div class="star medium">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
      <div class="star small">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
      <div class="star small">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const { isDark } = defineProps<{
  isDark: boolean
}>()
const emit = defineEmits<{ toggle: [] }>()
let isClicked = false // 新变量，用于跟踪是否刚刚发生了鼠标点击事件
let moveIn = ref(false)

let handleClick = () => {
  // moveIn.value = false
  // 检测鼠标是否点击,默认已经点击
  isClicked = true
  // 计时器，当0.5秒后，点击状态变成非点击
  setTimeout(function () {
    isClicked = false
  }, 500)
  emit('toggle')
}

let handleMouseMove = () => {
  if (isClicked) return
  moveIn.value = true
}
let handleMouseOut = () => {
  moveIn.value = false
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  transition: 0.7s;
}

/* 最外层元素样式 */
.components {
  position: relative; /* 固定定位 */
  /*top: 50%;*/
  left: -100%;
  margin-left: 20px;
  /*margin-top: -35px;!* 按钮在页面中居中 *!*/
  width: 180px;
  height: 70px;
  background-color: rgba(70, 133, 192, 1); /* 按钮背景颜色 */
  border-radius: 100px;
  box-shadow: inset 0 0 5px 3px rgba(0, 0, 0, 0.5); /* 按钮的内阴影,实现立体感 */
  overflow: hidden;
  transition: 0.7s;
  transition-timing-function: cubic-bezier(
    0,
    0.5,
    1,
    1
  ); /* 过渡时间贝塞尔曲线,实现非线性动画 */
  cursor: pointer;
}

/* 主要按钮样式 */
.main-button {
  margin: 7.5px 0 0 7.5px;
  width: 55px;
  height: 55px;
  background-color: rgba(255, 195, 35, 1);
  border-radius: 50%;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5),
    inset -3px -5px 3px -3px rgba(0, 0, 0, 0.5),
    inset 4px 5px 2px -2px rgba(255, 230, 80, 1);
  transition: 1s;
  transition-timing-function: cubic-bezier(
    0.56,
    1.35,
    0.52,
    1
  ); /* 加入回弹动画 */
}

/* 陨石坑样式 */
.moon {
  position: absolute;
  background-color: rgba(150, 160, 180, 1);
  box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  transition: 0.5s;
  opacity: 0;
}

/* 第一个陨石坑 */
.moon:nth-child(1) {
  top: 7.5px;
  left: 25px;
  width: 12.5px;
  height: 12.5px;
}

/* 第二个陨石坑 */
.moon:nth-child(2) {
  top: 20px;
  left: 7.5px;
  width: 20px;
  height: 20px;
}

/* 第三个陨石坑 */
.moon:nth-child(3) {
  top: 32.5px;
  left: 32.5px;
  width: 12.5px;
  height: 12.5px;
}

/* 按钮背后的虚影 */
.daytime-background {
  position: absolute;
  border-radius: 50%;
  transition: 1s;
  transition-timing-function: cubic-bezier(
    0.56,
    1.35,
    0.52,
    1
  ); /* 加入回弹动画 */
}

/* 按钮背后的第一个虚影 */
.daytime-background:nth-child(2) {
  top: -20px;
  left: -20px;
  width: 110px;
  height: 110px;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: -2;
}

/* 按钮背后的第二个虚影 */
.daytime-background:nth-child(3) {
  top: -32.5px;
  left: -17.5px;
  width: 135px;
  height: 135px;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: -3;
}

/* 按钮背后的第三个虚影 */
.daytime-background:nth-child(4) {
  top: -45px;
  left: -15px;
  width: 160px;
  height: 160px;
  background-color: rgba(255, 255, 255, 0.05);
  z-index: -4;
}

/* 云和云层虚影的初始位置 */
.cloud,
.cloud-light {
  transform: translateY(10px);
  transition: 1s;
  transition-timing-function: cubic-bezier(
    0.56,
    1.35,
    0.52,
    1
  ); /* 加入回弹动画 */
}

/* 云和虚影统一样式 */
.cloud-son {
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  z-index: -1;
  transition: transform 6s, right 1s, bottom 1s;
}

/* 云和虚影由6个圆形组成，第1个圆形和第7个圆形大小相同 */
.cloud-son:nth-child(6n + 1) {
  right: -20px;
  bottom: 10px;
  width: 50px;
  height: 50px;
}

/* 云和虚影由6个圆形组成，第2个圆形和第8个圆形大小相同 */
.cloud-son:nth-child(6n + 2) {
  right: -10px;
  bottom: -25px;
  width: 60px;
  height: 60px;
}

/* 云和虚影由6个圆形组成，第3个圆形和第9个圆形大小相同 */
.cloud-son:nth-child(6n + 3) {
  right: 20px;
  bottom: -40px;
  width: 60px;
  height: 60px;
}

/* 云和虚影由6个圆形组成，第4个圆形和第10个圆形大小相同 */
.cloud-son:nth-child(6n + 4) {
  right: 50px;
  bottom: -35px;
  width: 60px;
  height: 60px;
}

/* 云和虚影由6个圆形组成，第5个圆形和第11个圆形大小相同 */
.cloud-son:nth-child(6n + 5) {
  right: 75px;
  bottom: -60px;
  width: 75px;
  height: 75px;
}

/* 云和虚影由6个圆形组成，第6个圆形和第12个圆形大小相同 */
.cloud-son:nth-child(6n + 6) {
  right: 110px;
  bottom: -50px;
  width: 60px;
  height: 60px;
}

/* 云层在-2层 */
.cloud {
  z-index: -2;
}

/* 云层虚影在云层下方,并且整体上移,逆时针旋转5度 */
.cloud-light {
  position: absolute;
  right: 0;
  bottom: 25px;
  opacity: 0.5;
  z-index: -3;
  /*transform: rotate(-5deg);*/
}

/* 所有星星样式 */
.stars {
  transform: translateY(-125px);
  z-index: -2;
  transition: 1s;
  transition-timing-function: cubic-bezier(
    0.56,
    1.35,
    0.52,
    1
  ); /* 加入回弹动画 */
}

/* 大星星的宽高 */
.big {
  --size: 7.5px;
}

/* 中星星的宽高 */
.medium {
  --size: 5px;
}

/* 小星星的宽高 */
.small {
  --size: 3px;
}

/* 星星绝对定位 */
.star {
  position: absolute;
  width: calc(2 * var(--size));
  height: calc(2 * var(--size));
}

/* 所有星星的位置 */
.star:nth-child(1) {
  top: 11px;
  left: 39px;
  animation-name: star;
  animation-duration: 3.5s;
}

.star:nth-child(2) {
  top: 39px;
  left: 91px;
  animation-name: star;
  animation-duration: 4.1s;
}

.star:nth-child(3) {
  top: 26px;
  left: 19px;
  animation-name: star;
  animation-duration: 4.9s;
}

.star:nth-child(4) {
  top: 37px;
  left: 66px;
  animation-name: star;
  animation-duration: 5.3s;
}

.star:nth-child(5) {
  top: 21px;
  left: 75px;
  animation-name: star;
  animation-duration: 3s;
}

.star:nth-child(6) {
  top: 51px;
  left: 38px;
  animation-name: star;
  animation-duration: 2.2s;
}

@keyframes star {
  0%,
  20% {
    transform: scale(0);
  }
  20%,
  100% {
    transform: scale(1);
  }
}

/* 每一个星星由四个div向左浮动,拼合而成 */
.star-son {
  float: left;
}

.star-son:nth-child(1) {
  --pos: left 0;
}

.star-son:nth-child(2) {
  --pos: right 0;
}

.star-son:nth-child(3) {
  --pos: 0 bottom;
}

.star-son:nth-child(4) {
  --pos: right bottom;
}

/* 星星 */
.star-son {
  width: var(--size);
  height: var(--size);
  background-image: radial-gradient(
    circle var(--size) at var(--pos),
    transparent var(--size),
    #fff
  );
}

/* 将星星闪烁动画应用于所有的star元素 */
.star {
  transform: scale(1);
  transition-timing-function: cubic-bezier(
    0.56,
    1.35,
    0.52,
    1
  ); /* 加入回弹动画 */
  transition: 1s;
  /* 无限次重复动画 */
  animation-iteration-count: infinite;
  /* 动画在每个循环中正反交替播放 */
  animation-direction: alternate;
  animation-timing-function: linear;
}

.light {
  background-color: rgba(70, 133, 192, 1);

  .main-button {
    transform: translateX(0);
    background-color: rgba(255, 195, 35, 1);
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5),
      inset -3px -5px 3px -3px rgba(0, 0, 0, 0.5),
      inset 4px 5px 2px -2px rgba(255, 230, 80, 1);
  }

  .daytime-background {
    &:nth-child(2) {
      transform: translateX(0);
    }

    &:nth-child(3) {
      transform: translateX(0);
    }

    &:nth-child(4) {
      transform: translateX(0);
    }
  }

  .cloud {
    transform: translateY(10px);
  }

  .cloud-light {
    transform: translateY(10px);
  }

  .moon {
    &:nth-child(1) {
      opacity: 0;
    }

    &:nth-child(2) {
      opacity: 0;
    }

    &:nth-child(3) {
      opacity: 0;
    }
  }

  .stars {
    transform: translateY(-125px);
    opacity: 0;
  }
}

.dark {
  background-color: rgba(25, 30, 50, 1);

  .main-button {
    transform: translateX(110px);
    background-color: rgba(195, 200, 210, 1);
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5),
      inset -3px -5px 3px -3px rgba(0, 0, 0, 0.5),
      inset 4px 5px 2px -2px rgba(255, 255, 210, 1);
  }

  .daytime-background {
    &:nth-child(2) {
      transform: translateX(110px);
    }

    &:nth-child(3) {
      transform: translateX(80px);
    }

    &:nth-child(4) {
      transform: translateX(50px);
    }
  }

  .cloud {
    transform: translateY(80px);
  }

  .cloud-light {
    transform: translateY(80px);
  }

  .moon {
    &:nth-child(1) {
      opacity: 1;
    }

    &:nth-child(2) {
      opacity: 1;
    }

    &:nth-child(3) {
      opacity: 1;
    }
  }

  .stars {
    transform: translateY(-62.5px);
    opacity: 1;
  }
}

.light.move-in {
  .main-button {
    transform: translateX(10px);
  }

  .daytime-background {
    &:nth-child(2) {
      transform: translateX(10px);
    }

    &:nth-child(3) {
      transform: translateX(7px);
    }

    &:nth-child(4) {
      transform: translateX(4px);
    }
  }

  .cloud {
    .cloud-son {
      &:nth-child(1) {
        right: -24px;
        bottom: 10px;
      }

      &:nth-child(2) {
        right: -12px;
        bottom: -27px;
      }

      &:nth-child(3) {
        right: 17px;
        bottom: -43px;
      }

      &:nth-child(4) {
        right: 46px;
        bottom: -39px;
      }

      &:nth-child(5) {
        right: 70px;
        bottom: -65px;
      }

      &:nth-child(6) {
        right: 109px;
        bottom: -54px;
      }
    }
  }

  .cloud-light {
    .cloud-son {
      &:nth-child(1) {
        right: -23px;
        bottom: 10px;
      }

      &:nth-child(2) {
        right: -11px;
        bottom: -26px;
      }

      &:nth-child(3) {
        right: 18px;
        bottom: -42px;
      }

      &:nth-child(4) {
        right: 47px;
        bottom: -38px;
      }

      &:nth-child(5) {
        right: 74px;
        bottom: -64px;
      }

      &:nth-child(6) {
        right: 110px;
        bottom: -55px;
      }
    }
  }
}

.dark.move-in {
  .main-button {
    transform: translateX(100px);
  }

  .daytime-background {
    &:nth-child(2) {
      transform: translateX(100px);
    }

    &:nth-child(3) {
      transform: translateX(73px);
    }

    &:nth-child(4) {
      transform: translateX(46px);
    }
  }

  .stars {
    .star {
      &:nth-child(1) {
        top: 10px;
        left: 36px;
      }

      &:nth-child(2) {
        top: 40px;
        left: 87px;
      }

      &:nth-child(3) {
        top: 26px;
        left: 16px;
      }

      &:nth-child(4) {
        top: 38px;
        left: 63px;
      }

      &:nth-child(5) {
        top: 20.5px;
        left: 72px;
      }

      &:nth-child(6) {
        top: 51.5px;
        left: 35px;
      }
    }
  }
}
</style>
