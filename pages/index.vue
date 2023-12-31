<template>
  <div>
    <form @submit.prevent="saveCustomer">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="customer.email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="customer.password"
          required
        />
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>

    <h2>Customers List</h2>
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(customer, index) in customers" :key="customer.id">
          <td>{{ customer.email }}</td>
          <td>{{ customer.password }}</td>
          <td>
            <button @click="removeCustomer(customer.id)">Delete</button>
            <button @click="editCustomer(index)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>

    <form v-if="editIndex >= 0" @submit.prevent="updateCustomer">
      <h2>Edit Customer</h2>
      <div>
        <label for="editEmail">Email:</label>
        <input
          type="email"
          id="editEmail"
          v-model="editCustomerData.email"
          required
        />
      </div>
      <div>
        <label for="editPassword">Password:</label>
        <input
          type="password"
          id="editPassword"
          v-model="editCustomerData.password"
          required
        />
      </div>
      <div>
        <button type="submit">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export default {
  data() {
    return {
      customer: {
        email: "",
        password: "",
      },
      customers: [],
      editIndex: -1,
      editCustomerData: {
        email: "",
        password: "",
      },
    };
  },
  mounted() {
    this.loadCustomers(); 
  },
  methods: {
    async saveCustomer() {
      try {
        const firestore = getFirestore();

        const customerData = {
          email: this.customer.email,
          password: this.customer.password,
        };

        await addDoc(collection(firestore, "customers"), customerData);

        this.customer.email = "";
        this.customer.password = "";

        alert("Customer saved successfully!");

        this.$router.go(0);
      } catch (error) {
        console.error("Error saving customer:", error);
      }
    },

    async loadCustomers() {
      try {
        const firestore = getFirestore();
        const customersCollection = collection(firestore, "customers");
        const querySnapshot = await getDocs(customersCollection);

        this.customers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error loading customers:", error);
      }
    },

    async removeCustomer(customerId) {
      try {
        const firestore = getFirestore();
        const customerRef = doc(firestore, "customers", customerId);

        await deleteDoc(customerRef);

        await this.loadCustomers();

        alert("Customer removed successfully!");
      } catch (error) {
        console.error("Error removing customer:", error);
      }
    },

    editCustomer(index) {
      this.editIndex = index;

      this.editCustomerData.email = this.customers[index].email;
      this.editCustomerData.password = this.customers[index].password;
    },

    async updateCustomer() {
      try {
        const firestore = getFirestore();
        const customerRef = doc(
          firestore,
          "customers",
          this.customers[this.editIndex].id
        );

        await updateDoc(customerRef, this.editCustomerData);

        this.editCustomerData.email = "";
        this.editCustomerData.password = "";
        this.editIndex = -1;

        await this.loadCustomers();

        alert("Customer updated successfully!");
      } catch (error) {
        console.error("Error updating customer:", error);
      }
    },

    cancelEdit() {
      this.editCustomerData.email = "";
      this.editCustomerData.password = "";
      this.editIndex = -1;
    },
  },
};
</script>
