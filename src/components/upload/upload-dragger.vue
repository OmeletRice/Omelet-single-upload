<template>
  <div class="om-single-upload-dragger"
    :class="[
      {'is-dragover': dragover},
      'is-'+ status ]"
    @drop.prevent="handleOnDrop"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave">
    <slot></slot>
    <transition-group enter-active-class="uploadzoomIn" leave-active-class="uploadzoomOut">
      <div v-show="status === 'null'" :key="'null'" class="om-single-upload-dragger-text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div v-show="status === 'uploading'" :key="'uploading'"  class="om-single-upload-dragger-text">
        <em>正在上传</em>
      </div>
      <div v-show="status === 'success'" :key="'success'"  class="om-single-upload-dragger-text">
        <p><em>上传成功</em></p>
        若重新上传，将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div v-show="status === 'fail'" :key="'fail'"  class="om-single-upload-dragger-text">
        <p><em>上传失败</em></p>
        重新上传，将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'OmSingleUploadDragger',

  props: {
    disabled: Boolean,
    status: String
  },

  data() {
    return {
      dragover: false
    }
  },

  methods: {
    handleOnDrop(e) {
      if (this.disabled || this.status === 'uploading') return

      this.dragover = false
      this.$emit('file', e.dataTransfer.files)
    },

    handleDragOver() {
      if (this.disabled || this.status === 'uploading') return
      this.dragover = true
    },

    handleDragLeave() {
      this.dragover = false
    }
  }
}
</script>

<style>
.om-single-upload-dragger {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  width: 360px;
  height: 180px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.om-single-upload-dragger:hover {
  border-color: #409eff;
}

.om-single-upload-dragger-text {
  color: #5a5e66;
  font-size: 14px;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
}

.om-single-upload-dragger-text em {
  color: #409eff;
  font-style: normal;
}

.om-single-upload-dragger.is-fail .om-single-upload-dragger-text em {
  color: #FA5555
}

.om-single-upload-dragger.is-dragover {
  background-color: rgba(32,159,255,.06);
  border: 2px dashed #409eff;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }

  50% {
    opacity: 1;
  }
}

.uploadzoomIn {
  animation-duration: .7s;
  animation-fill-mode: both;
  animation-name: zoomIn;
}

@keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }

  to {
    opacity: 0;
  }
}

.uploadzoomOut {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-name: zoomOut;
}
</style>
