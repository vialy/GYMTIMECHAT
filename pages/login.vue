<template>
  <v-dialog v-model="dialog" persistent max-width="600px">

    <v-tabs v-model="tab" background-color="#FB7F23 accent-4" dark grow v-if="!showOtp">
      <v-tabs-slider color="purple darken-4"></v-tabs-slider>
      <v-tab v-for="i in tabs" :key="i.name">
        <v-icon large>{{ i.icon }}</v-icon>
        {{ i.name }}
      </v-tab>
      <v-tab-item v-for="(item, index) in tabs" :key="'tab-item-' + index">
        <v-card class="px-4">
          <v-card-text>
            <v-form :ref="item.key" v-model="valid" lazy-validation>
              <v-row>
                <template v-for="field in item.fields">
                  <v-col :cols="field.cols">
                    <v-text-field
                      v-model="field.model"
                      :key="field.label"
                      :append-icon="field.appendIcon && showPassword ? 'mdi-eye' : field.appendIcon"
                      :type="field.type === 'password' && !showPassword ? 'password' : 'text'"
                      :rules="field.rules"
                      :label="field.label"
                      :counter="field.counter || false"
                      @click:append="field.appendIcon ? showPassword = !showPassword : null"
                    ></v-text-field>
                  </v-col>
                </template>
              </v-row>
              <v-btn :disabled="!valid" color="success" @click="validate(item.fields, item.key)">
                {{ item.name }}
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <div v-else>
      <div class="text-center" style="padding: 30px;">
        <div class="text-left"> <v-btn variant="" @click="showOtp = false">Back</v-btn></div>
        <h2>Account verification</h2>
        <div class="bg-purple-darken-2 text-center">Enter OTP (One time password) sent to {{ email }}</div>
        <div style="margin:  50px 0px; text-align: center">
          <v-otp-input loading></v-otp-input>
        </div>
        <v-btn
          class="mt-4"
          color="warning"
          block
        >
          Submit
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
// import request from '../utils/Request';
export default {
  data() {
    return {
      email: '',
      showOtp: false,
      dialog: true,
      tab: 0,
      showPassword: false,
      valid: true,
      registerDat: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      tabs: [
        {
          name: "Login",
          key: 'loginForm',
          icon: "mdi-account",
          fields: [
            {
              model: '',
              type: 'text',
              label: 'E-mail',
              key: "email",
              rules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
              ],
              cols: 12
            },
            {
              model: '',
              type: 'password',
              key: "password",
              label: 'Password',
              rules: [
                v => !!v || 'Password is required',
                v => v.length >= 8 || 'Password must be at least 8 characters'
              ],
              appendIcon: 'mdi-lock',
              cols: 12
            }
          ]
        },
        {
          name: "Register",
          key: 'registerForm',
          icon: "mdi-account-outline",
          fields: [
            {
              model: '',
              type: 'text',
              label: 'First Name',
              key: "firstName",
              rules: [v => !!v || 'First name is required'],
              cols: 6
            },
            {
              model: '',
              type: 'text',
              label: 'Last Name',
              key: "lastName",
              rules: [v => !!v || 'Last name is required'],
              cols: 6
            },
            {
              model: '',
              type: 'text',
              label: 'E-mail',
              key: "email",
              rules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
              ],
              cols: 12
            },
            {
              model: '',
              type: 'password',
              label: 'Password',
              key: "password",
              rules: [
                v => !!v || 'Password is required',
                v => v.length >= 8 || 'Password must be at least 8 characters'
              ],
              appendIcon: 'mdi-lock',
              cols: 12
            },
            {
              model: '',
              type: 'password',
              label: 'Confirm Password',
              key: "confirmsPassword",
              rules: [
                v => !!v || 'Confirmation is required',
                v => v === this.tabs[1].fields[3].model || 'Passwords must match'
              ],
              appendIcon: 'mdi-lock',
              cols: 12
            }
          ]
        }
      ],
    };
  },
  methods: {
    async validate(data =[], source = 'loginForm') {
      await this.$refs[source][0].validate(); // Implement your validation logic
      if(!this.valid) {
        this.$toast.error("All fields are required")
        return false
      }
      const params = {};
      for(let i = 0; i < data.length; i++){
        const item = data[i];
        params[item.key] = item.model
      }
      this.email = params.email;

      if(source != 'loginForm'){
        this.$request.post('http://localhost:6050/v1/user/new', params).then(res=>{
          if(res.success){
            this.$toast.success("Account created successfully, please enter OTP sent to your email", {timeout: false})
            // this.$router.push('/BeCoach');
            this.showOtp = true;
          }
        }).catch(err=>{
          this.$toast.error('Failed to create account. Please try again')
          console.log(err);
        });
      }
      else{
        this.$request.post('http://localhost:6050/v1/user/login', params).then(res=>{
          if(res.success){
            /**
             * Design a page showing input for OTP
             */
            this.$toast.success("You logged into your account successfully")
            this.$router.push('/BeCoach');
          }
        }).catch(err=>{
          this.$toast.error("Failed to login. Please try again")
          console.log(err);
        });
      }

    }
  }
};
</script>
