<template>  
  <div class="om-single-upload--dragger" tabindex="0"
    @click="handleClick">
    <om-single-upload-dragger v-if="drag"
      :disabled="disabled"
      :status="status"
      @file="uploadFile">
      <slot></slot>
    </om-single-upload-dragger>
    <input style="display: none" class="om-single-upload-input" type="file" ref="input" :name="name" @change="handleChange" multiple="false" :accept="accept">
  </div>
</template>

<script>
import ajax from './ajax.js'
import OmSingleUploadDragger from './upload-dragger'
export default {
  name: 'OmSingleUploadInner',

  components: {
    OmSingleUploadDragger
  },

  props: {
    drag: Boolean,
    action: {
      type: String,
      required: true
    },
    headers: Object,
    data: Object,
    name: {
      type: String,
      default: 'file'
    },
    withCredentials: Boolean,
    accept: String,
    beforeUpload: Function,
    onRemove: Function,

    onPreview: Function,
    onSuccess: Function,
    onProgress: Function,
    onError: Function,
    autoUpload: Boolean,
    httpRequest: {
      type: Function,
      default: ajax
    },
    disabled: Boolean,
    status: String,

    onStart: Function
  },

  data() {
    return {
      reqs: {}
    }
  },

  methods: {
    uploadFile(files) {
      let postFiles = Array.prototype.slice.call(files)
      postFiles = postFiles.slice(0, 1)

      if (postFiles.length === 0) return

      let rawFile = postFiles[0]
      this.onStart(rawFile)
      if (this.autoUpload) this.upload(rawFile)
    },

    handleChange(ev) {
      const files = ev.target.files

      if (!files) return
      this.uploadFile(files)
    },

    upload(rawFile) {
      this.$refs.input.value = null

      if (!this.beforeUpload) {
        return this.post(rawFile)
      }

      // beforeUpload
    },

    post(rawFile) {
      const { uid } = rawFile
      const options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: e => {
          this.onProgress(e, rawFile)
        },
        onSuccess: res => {
          this.onSuccess(res, rawFile)
          delete this.reqs[uid]
        },
        onError: err => {
          this.onError(err, rawFile)
          delete this.reqs[uid]
        }
      }

      const req = this.httpRequest(options)
      if (req && req.then) {
        req.then(options.onSuccess, options.onError)
      }
    },

    handleClick() {
      if (!this.disabled && this.status !== 'uploading') {
        this.$refs.input.value = null
        this.$refs.input.click()
      }
    }
  }
}
</script>

<style>

</style>
