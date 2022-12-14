<template>
  <div id="app">
    <section class="flex items-center justify-center bg-gray-100">
      <div class="main-content-form p-8 w-4/12 h-full">
        <a href="" class="mb-8 inline-block">
          <logo />
        </a>

        <h1 class="mb-2 text-xl font-bold tracking-tight leading-none text-neutral-800 text-2xl">Bizimle İletişime Geçin!</h1>
        <small class="text-gray-500 mb-5 inline-block">Merak ettikleriniz için bizimle iletişime geçin.</small>

        <form class=" " action="">
          <!-- FULLNAME -->
          <div class="mb-4">
            <label for="fullname" class="block mb-1 text-sm font-medium text-gray-600">Fullname</label>
            <input
              v-model="fullname"
              type="text"
              id="fullname"
              class="bg-gray-200 border border-gray-300 placeholder:text-gray-400 text-gray-700 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-400 block w-full p-2.5"
              placeholder="john DOE"
              tabindex="1"
              required
            />
          </div>

          <!-- EMAIL -->
          <div class="mb-4">
            <label for="email" class="block mb-1 text-sm font-medium text-gray-600">E-Mail</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="bg-gray-200 border border-gray-300 placeholder:text-gray-400 text-gray-700 text-sm rounded-lg focus:ring-gray-800 focus:border-gray-400 block w-full p-2.5"
              placeholder="johndoe@info.com"
              @blur="validEmail"
            />
            <small class="font-xs text-red-400">{{ emailInvalidMsg }}</small>
          </div>

          <!-- PHONE -->
          <div class="mb-4">
            <label for="phone" class="block mb-1 text-sm font-medium text-gray-600">Phone</label>
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
            <label for="address" class="block mb-1 text-sm font-medium text-gray-600">Address</label>
            <textarea
              id="address"
              rows="3"
              class="bg-gray-200 border border-gray-300 placeholder:text-gray-400 text-gray-700 text-sm rounded-lg focus:ring-gray-800 focus:border-gray-400 block w-full p-2.5"
              placeholder="Write your thoughts here..."
              v-model="address"
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            :class="formControl ? 'cursor-pointer bg-blue-700 hover:bg-blue-900' : 'cursor-not-allowed bg-blue-400'"
            :disabled="!formControl"
          >
            Gönder
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
  import logo from "./components/logo.vue";

  export default {
    name: "App",

    components: {
      logo,
    },
    data() {
      return {
        emailInvalidMsg: "",
        phoneInvalidMsg: "",
        fullname: "asdasd",
        email: "asdasd@gmail.com",
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
          styleClasses:
            "bg-gray-200 border border-gray-300 placeholder:text-gray-400 text-gray-700  rounded-lg focus:ring-gray-800 focus:border-gray-400 block  p-2.5",
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
      typing(event) {
        this.address = event.target.value;
        console.log(this.address);
      },
    },
  };
</script>

<style></style>
