<template>
  <div class="wrapper">
    <canvas id="webgl" v-if="webgl_available"></canvas>
    <img
      class="spinner"
      v-else
      src="../assets/unsure_cook_icon.png"
      alt="spinner"
    />
  </div>
</template>

<script>
  // TODO: implement three.js animation in here
  import * as THREE from 'three';
  import { WEBGL } from 'three/examples/jsm/WebGL';

  let renderer = null;
  let scene = null;
  let camera = null;
  let diamond = null;

  export default {
    name: 'Spinner',
    data: function() {
      return {
        webgl_available: false,
      };
    },

    created: function() {
      this.webgl_available = WEBGL.isWebGLAvailable();
      // this.webgl_available = false;
    },
    mounted: function() {
      this.init();
      this.animate();
    },

    methods: {
      add_light: function(x, y, z, strength = 1) {
        let point_light = new THREE.PointLight(0xfff, strength);
        point_light.position.set(x, y, z);
        scene.add(point_light);
      },
      init: function() {
        if (this.webgl_available) {
          scene = new THREE.Scene();

          camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
          );
          camera.position.z = 1.5;
          camera.position.y = 0.2;

          renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('webgl'),
            alpha: 1,
          });
          renderer.setClearColor(0xfff, 0);
          renderer.setPixelRatio(window.devicePixelRatio);

          const geometry = new THREE.OctahedronGeometry(1, 0);
          const material = new THREE.MeshStandardMaterial({
            color: 0x0aff00,
            shading: THREE.FlatShading,
            side: THREE.DoubleSide,
            // vertexColors: THREE.FaceColors,
            // overdraw: true,
          });
          diamond = new THREE.Mesh(geometry, material);
          diamond.rotation.y = 0.03;
          scene.add(diamond);
          camera.lookAt(new THREE.Vector3(0, 0, -0.2));

          this.add_light(0, 2, 5, 18);

          renderer.render(scene, camera);
        }
      },
      animate: function() {
        requestAnimationFrame(this.animate);

        if (diamond && this.should_spin) diamond.rotation.y += 0.013;

        if (renderer) renderer.render(scene, camera);
      },
    },
    computed: {
      should_spin: function() {
        return this.$store.state.spin;
      },
    },
  };
</script>

<style scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
  }

  .spinner {
    height: 2.6rem;
    display: block;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.08));
  }
  #webgl {
    height: 4rem;
    width: 4rem;
    /* background-color: transparent; */
    /* height: 15rem;
    width: 15rem; */
  }
</style>
