<template>
  <div>
    <Menu></Menu>
    <div class="st">7438845878</div>
  </div>
</template>

<script>
import Menu from '../components/Menu.vue';

export default {
  name: 'HelloWorld',
  components:{Menu},
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>