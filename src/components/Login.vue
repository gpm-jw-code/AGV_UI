<template>
  <el-dialog v-model="dialogVisible" :show-close="false" width="600">
    <template #header="{titleId, login_title }">
      <div class="login-header">
        <h3 :id="titleId" :class="login_title">Login</h3>
        <el-divider></el-divider>
      </div>
    </template>
    <div class="login-content">
      <el-form label-position="top">
        <el-form-item label="Account">
          <el-input
            name="account"
            class="input"
            @click="OnInputFocus('account')"
            placeholder="Account"
            v-model="account"
            autocomplete="new-password"
          ></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input
            name="pw"
            class="input"
            ref="pw_input"
            @click="OnInputFocus('pw')"
            clearable
            placeholder="Password"
            v-model="pw"
            type="password"
            autocomplete="new-password"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <KeyBoard @onChange="onChange" :input="keyboard_input"></KeyBoard>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="LoginHandle()">Login</el-button>
        <el-button type="info" @click="dialogVisible = false">Cancel</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import KeyBoard from '@/components/Tools/SimpleKeyboard.vue'
export default {
  components: {
    KeyBoard,
  },
  data() {
    return {
      dialogVisible: false,
      account: '',
      pw: '',
      focus_input: 'account',
      keyboard_input: ''
    }
  },
  methods: {
    Show() {
      this.account = this.pw = '';
      this.dialogVisible = true;
    },
    LoginHandle() {

    },
    OnInputFocus(name) {
      this.focus_input = name;

      if (this.focus_input == 'account') {
        this.keyboard_input = this.account + '';
      } else {
        this.keyboard_input = this.pw + '';
      }
    },
    onChange(input) {
      console.log(input);
      this.keyboard_input = input;
      if (this.focus_input == "account") {
        this.account = input;
      } else {
        this.$refs.pw_input.focus();
        this.pw = input;
        this.$refs.pw_input.focus();
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.login-header {
  h3 {
    text-align: left;
  }
}
.login-content {
  position: relative;
  top: -50px;
  left: 10px;
  .input {
    padding-right: 20px;
  }
}
</style>