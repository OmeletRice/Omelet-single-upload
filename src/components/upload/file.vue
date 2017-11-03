<template>
  <div class="om-single-upload-file">
    <div class="om-single-upload-progress">
    </div>
    {{ percentage }}
  </div>  
</template>

<script>
export default {
  name: 'OmSingleUploadFile',

  props: {
    file: Object
  },

  computed: {
    percentage() {
      if (!this.file) return
      return this.file.percentage + '%'
    }
  }
}
</script>

<style>
.om-single-upload-file {}
</style>
