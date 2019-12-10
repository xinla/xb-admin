<template>
  <div>
    <Upload
      :type="type"
      :action="$config.services.upload"
      :headers="{Authorization: token}"
      :data="data"
      :format="format"
      :show-upload-list="false"
      :on-success="uploadSuccess"
      :on-format-error="uploadFormatError"
      :on-error="uploadError"
      :before-upload="beforeUpload"
    >
      <slot>
        <Button icon="ios-cloud-upload-outline">上传文件</Button>
      </slot>
      <Spin fix v-if="loading">
        <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
      </Spin>
    </Upload>
  </div>
</template>

<script>
import { getToken } from "@/libs/util";

export default {
  props: {
    type: {
      type: String,
      default: "select"
    },
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    format: {
      type: Array,
      default: () => {
        return ["jpg", "jpeg", "png"];
      }
    },
    onSuccess: {
      type: Function,
      default: () => {
        return () => {};
      }
    }
  },
  data() {
    return {
      token: "Bearer " + getToken(),
      loading: false
    };
  },
  computed: {},
  mounted() {},
  methods: {
    beforeUpload() {
      this.loading = true
    },
    uploadSuccess(res, file, fileList) {
      this.loading = false;
      if (res.code === 0) {
        this.onSuccess(res.data || res.result, file, fileList);
      } else {
        this.$Notice.error({
          title: "上传失败",
          desc: res.message
        });
      }
    },
    uploadError() {
      this.loading = false;
      this.$Notice.error({
        title: "上传失败，请稍后重试"
      });
    },
    uploadFormatError() {
      this.loading = false;
      this.$Notice.error({
        title: "文件格式错误"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
// @keyframes ani-demo-spin {
//   from {
//     transform: rotate(0deg);
//   }
//   50% {
//     transform: rotate(180deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// }
</style>
