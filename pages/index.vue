<template>
  <div>
    <form @submit.prevent="saveCustomer">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="customer.email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="customer.password" required />
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default {
  data() {
    return {
      customer: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async saveCustomer() {
      try {
        const firestore = getFirestore();

        const customerData = {
          email: this.customer.email,
          password: this.customer.password,
        };

        // Add the new customer to the "customers" collection
        await addDoc(collection(firestore, "customers"), customerData);

        // Clear the fields after saving
        this.customer.email = "";
        this.customer.password = "";

        alert("Customer saved successfully!");
      } catch (error) {
        console.error("Error saving customer:", error);
      }
    },
  },
};
</script>
