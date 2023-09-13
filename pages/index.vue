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

    <h2>Lista de Customers</h2>
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.email }}</td>
          <td>{{ customer.password }}</td>
          <td>
            <button @click="removeCustomer(customer.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

export default {
  data() {
    return {
      customer: {
        email: "",
        password: "",
      },
      customers: [],
    };
  },
  mounted() {
    this.loadCustomers(); // Carregue os customers quando o componente for montado
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

        // Mapeie os documentos da coleção para o array customers
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

        // Exclua o cliente com base no ID
        await deleteDoc(customerRef);

        // Recarregue a lista após a remoção
        await this.loadCustomers();

        alert("Customer removed successfully!");
      } catch (error) {
        console.error("Error removing customer:", error);
      }
    },
  },
};
</script>
