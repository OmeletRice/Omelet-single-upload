<template>
  <div class="om-single-upload">
    <om-single-upload-inner
      ref="upload-inner"
      :drag="drag"
      :action="action"
      :headers="headers"
      :data="data"
      :name="name"
      :with-credentials="withCredentials"
      :accept="accept"
      :before-upload="beforeUpload"

      :on-remove="handleRemove"
      :on-preview="onPreview"
      :on-success="handleSuccess"
      :on-progress="handleProgress"
      :on-error="handleError"

      :auto-upload="autoUpload"
      :httpRequest="httpRequest"
      :disabled="disabled"
      :status="status"
      
      :on-start="handleStart">
      <om-single-upload-file :file="uploadFile">
      </om-single-upload-file>
    </om-single-upload-inner>
  </div>
</template>

<script>
import OmSingleUploadInner from './upload'
import OmSingleUploadFile from './file'
function noop() {}
export default {
  name: 'OmSingleUpload',

  components: {
    OmSingleUploadInner,
    OmSingleUploadFile
  },

  props: {
    drag: {
      type: Boolean,
      default: true
    },
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default() {
        return {};
      }
    },
    data: Object,
    name: {
      type: String,
      default: 'file'
    },
    withCredentials: Boolean,
    accept: String,
    beforeUpload: Function,
    onRemove: {
      type: Function,
      default: noop
    },
    onChange: {
      type: Function,
      default: noop
    },
    onPreview: {
      type: Function,
      default: noop
    },
    onSuccess: {
      type: Function,
      default: noop
    },
    onProgress: {
      type: Function,
      default: noop
    },
    onError: {
      type: Function,
      default: noop
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    httpRequest: Function,
    disabled: Boolean
  },

  data() {
    return {
      status: 'null',
      uploadFile: null,
      tempIndex: 0
    }
  },

  methods: {
    handleStart(rawFile) {
      rawFile.uid = Date.now() + this.tempIndex++;
      let file = {
        status: 'ready',
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0,
        uid: rawFile.uid,
        raw: rawFile
      }
      this.status = 'ready'

      try {
        file.url = URL.createObjectURL(rawFile)
      } catch (err) {
        console.error(err)
        return
      }

      this.uploadFile = file
      this.onChange(file)
    },

    handleProgress(ev, rawFile) {
      const file = this.uploadFile
      this.onProgress(ev, file)

      file.status = 'uploading'
      this.status = 'uploading'
      file.percentage = ev.percent || 0
    },

    handleSuccess(res, rawFile) {
      const file = this.uploadFile

      if (file) {
        this.status = 'success'
        file.status = 'success'
        file.response = res

        this.onSuccess(res, file)
        this.onChange(file)
      }
    },

    handleError(err, rawFile) {
      const file = this.uploadFile

      this.status = 'fail'
      file.status = 'fail'
      this.uploadFile = null

      this.onError(err, file)
      this.onChange(file)
    },

    handleRemove(file, rawFile) {
      if (!file) {
        file = this.uploadFile
      }

      this.onRemove(file)
    },

    submit() {
      const file = this.uploadFile

      if (file.status === 'ready') {
        // operate upload
        this.$refs['upload-inner'].upload(file.raw)
      }
    }
  }
}
</script>
