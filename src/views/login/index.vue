<template>
	<div id="wy_wrap">
		<div class="content" :style="{transform: 'rotateY(' + r + 'deg)'}">
			<component :r.sync="r" :is="loginform"></component>
			<component :r.sync="r" :is="findpassword"></component>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
			r: 0
    }
  },
	computed:{
		loginform() {
			return () => import('./loginForm')
		},
		findpassword() {
			return () => import('./findpassword')
		}
	},
  methods: {
  }
}
</script>
<style scoped lang="less">
	#wy_wrap{
		height: 100vh;
		background: linear-gradient(0deg,#ffffff,#00ffff);
		display: flex;
		perspective: 1000px;
		.content{
			width: 500px;
			height: 300px;
			background: #ffffff;
			margin: auto;
			border-radius: 15px;
			position: relative;
			transform-style: preserve-3d;
			transition: 1s;
		}
	}
</style>
