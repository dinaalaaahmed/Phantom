<template>
  <div class="homeLogout">
    <div class="PhantomName">
      <h1>
        <span>𝓟</span>
        <span>𝓱</span>
        <span>𝓪</span>
        <span>𝓷</span>
        <span>𝓽</span>
        <span>𝓸</span>
        <span>𝓶</span>
      </h1>
    </div>
    <div class="flexWrap">
      <masonry
        :cols="{ default: 5, 1500: 4, 1200: 3, 800: 2, 580: 1 }"
        :gutter="{ default: '30px', 700: '20px', 500: '10px' }"
      >
        <transition-group appear name="slide-in" tag="div">
          <PhantomCard
            v-for="card in phantomHomeCards"
            :key="card._id"
            :index="card._id"
            :cardImage="card.imageId"
          />
        </transition-group>
      </masonry>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../scss/_Colors";
@import "../../scss/MasonryGrid";
.PhantomName {
  z-index: 9;
  width: 100%;
  display: flex;
  justify-content: center;
  position: sticky;
  box-shadow: 10px 10px 8px rgba(179, 174, 174, 0.5);
  margin-bottom: 20px;
  text-align: center;
  align-items: center;
  height: 5em;
  background-color: transparent;
  h1 {
    position: absolute;
    margin: 0;
    padding: 0;
    font-weight: 900;
    font-size: 55px;
    color: $darkBlue;
    span {
      position: relative;
      display: inline-block;
      animation: animate 1.5s linear infinite;
    }
  }
}
h1 span:nth-child(1) {
  animation-delay: 0s;
}
h1 span:nth-child(2) {
  animation-delay: 0.2s;
}
h1 span:nth-child(3) {
  animation-delay: 0.4s;
}
h1 span:nth-child(4) {
  animation-delay: 0.6s;
}
h1 span:nth-child(5) {
  animation-delay: 0.8s;
}
h1 span:nth-child(6) {
  animation-delay: 1s;
}
h1 span:nth-child(7) {
  animation-delay: 1.2s;
}
@keyframes animate {
  0% {
    transform: translateY(0px);
  }
  10% {
    transform: translateY(-30px);
  }
  15% {
    transform: translateY(0px);
  }
  25% {
    transform: translateY(-20px);
  }
  30% {
    transform: translateY(0px);
  }
  40% {
    transform: translateY(-10px);
  }
  45% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(0px);
  }
}
.slide-in-enter {
  opacity: 0;
  transform: scale(0.5);
}
.slide-in-enter-active {
  transition: all 0.4s ease;
  transition-delay: calc(0.1s * var(cardIndex));
}
@media screen and (max-width: 300px) {
  span {
    font-size: 40px;
  }
}
</style>

<script>
import PhantomCard from "./PhantomCard";
import { mapState } from "vuex";
export default {
  name: "HomeLogout",
  components: {
    PhantomCard
  },
  computed: {
    ...mapState({
      phantomHomeCards: state => state.homeCards.phantomHomeCards
    })
  },
  mounted() {
    this.$store.dispatch("homeCards/phantomHome", 0);
    for (let i = 9000, j = 10; i <= 42000, j <= 60; i += 9000, j += 10) {
      setTimeout(() => {
        this.$store.dispatch("homeCards/phantomHome", j);
      }, i);
    }
  }
};
</script>
