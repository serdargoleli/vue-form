<template>
  <div id="app">
    <main class="main">
      <div class="main-content-form">
        <h1 class="title-1">Contact Us!</h1>
        <small class="subtitle">Contact us for your inquiries.</small>

        <form class="form" action="">
          <!-- FULLNAME -->
          <div class="mb-4">
            <label for="fullname">Fullname</label>
            <input
              v-model="fullname"
              type="text"
              id="fullname"
              class="form-input placeholder:text-gray-400"
              placeholder="john DOE"
              tabindex="1"
              required
            />
          </div>

          <!-- EMAIL -->
          <div class="mb-4">
            <label for="email">E-Mail</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="form-input placeholder:text-gray-400"
              placeholder="johndoe@info.com"
              @blur="validEmail"
              @input="validEmail"
            />
            <small class="font-xs text-red-400">{{ emailInvalidMsg }}</small>
          </div>

          <!-- PHONE -->
          <div class="mb-4">
            <label for="phone">Phone</label>
            <vue-tel-input
              class="bg-gray-200 rounded-lg text-gray-700 text-sm"
              :autoFormat="true"
              :validCharactersOnly="true"
              :dropdownOptions="dropdownOptions"
              :inputOptions="inputOptions"
              @input="onInput"
              @blur="validatePhone"
            />
            <small class="font-xs text-red-400">{{ phoneInvalidMsg }}</small>
          </div>

          <!-- ADDRESS -->
          <div class="mb-4">
            <label for="address">Address</label>
            <textarea
              id="address"
              rows="3"
              class="form-input placeholder:text-gray-400"
              placeholder="Write your thoughts here..."
              v-model="address"
            ></textarea>
          </div>
          <button
            type="submit"
            :class="formControl ? 'cursor-pointer bg-blue-700 hover:bg-blue-900' : 'cursor-not-allowed bg-blue-400'"
            :disabled="!formControl"
          >
            Gönder
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        emailInvalidMsg: "",
        phoneInvalidMsg: "",
        fullname: "",
        email: "",
        phone: {
          number: "",
          valid: true,
          country: undefined,
        },
        address: "",
        dropdownOptions: {
          showFlags: true,
          showDialCodeInSelection: true,
          showSearchBox: true,
          showDialCodeInList: true,
          width: "390px",
        },
        inputOptions: {
          styleClasses: "form-input",
          required: true,
          type: "tel",
          mod: "national",
          placeholder: "Enter a phone number",
        },
      };
    },
    computed: {
      formControl() {
        if ((this.emailInvalidMsg == "") & (this.fullname != "") & (this.phoneInvalidMsg == "") && this.phone.number && this.address) {
          return true;
        }
        return false;
      },
    },
    methods: {
      onInput(formattedNumber, { number, valid, country }) {
        this.phone.number = number;
        this.phone.valid = valid;
        this.phone.country = country && country.name;
        if (this.phone.number) {
          this.validatePhone();
        }
      },
      validatePhone() {
        if (!this.phone.valid) {
          this.phoneInvalidMsg = "* You entered a missing or wrong phone number";
        } else {
          this.phoneInvalidMsg = "";
        }
      },

      validEmail() {
        var rgx =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let result = rgx.test(this.email);
        if (!result) {
          this.emailInvalidMsg = "* You entered an invalid email address";
        } else {
          this.emailInvalidMsg = "";
        }
      },
    },
  };
</script>

<style></style>
