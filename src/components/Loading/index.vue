<template>
    <div class="loader"></div>
</template>

<script>
export default{
    name: 'Loading'
}
</script>

<style scoped>
.loader {
  position: relative;
  width: 2.5em;
  height: 2.5em;
  transform: rotate(165deg);
} 
  .loader:before,
  .loader:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0.5em;
    height: 0.5em;
    border-radius: 0.25em;
    transform: translate(-50%, -50%);
  }
  
  .loader:before {
    animation: before 2s infinite;
  }
  
  .loader:after {
    animation: after 2s infinite;
  }

@keyframes before {
  0% {
    width: 0.5em;
    box-shadow:
      1em -0.5em #e11462bf,
      -1em 0.5em #6fcadcbf;
  }
  35% {
    width: 2.5em;
    box-shadow:
      0 -0.5em#e11462bf,
      0   0.5em  #6fcadcbf;
  }
  70% {
    width: 0.5em;
    box-shadow:
      -1em -0.5em#e11462bf,
      1em 0.5em #6fcadcbf;
  }
  100% {
    box-shadow:
      1em -0.5em#e11462bf,
      -1em 0.5em #6fcadcbf;
  }
}

@keyframes after {
  0% {
    height: 0.5em;
    box-shadow:
      0.5em 1em #3db88fbf,
      -0.5em -1em #e9a920bf;
  }
  35% {
    height: 2.5em;
    box-shadow:
        0.5em  0#3db88fbf,
      -0.5em 0  #e9a920bf;
  }
  70% {
    height: 0.5em;
    box-shadow:
      0.5em -1em#3db88fbf,
      -0.5em 1em  #e9a920bf;
  }
  100% {
    box-shadow:
      0.5em 1em#3db88fbf,
      -0.5em -1em  #e9a920bf;
  }
}



/**
 * Attempt to center the whole thing!
 */

html,
body {
  height: 100%;
}

.loader {
  position: absolute;
  top: calc(50% - 1.25em);
  left: calc(50% - 1.25em);
}

</style>
