<template>
<v-card-title class="text-xs-h6 text-md-h5 text-lg-h4"><b>Sign Up</b></v-card-title><br />

<v-responsive class="mx-auto" max-width="344">
    <v-text-field type="text" placeholder="Enter your name" v-model="fullName" :rules="nameRules" hide-details="auto" /><br />
    <v-text-field type="number" placeholder="Enter your age" v-model="age" :rules="ageRules" hide-details="auto" /><br />
    <v-text-field type="email" placeholder="Enter your email" v-model="email" :rules="emailRules" hide-details="auto" /><br />
    <v-text-field type="password" placeholder="Enter your password" v-model="password" :rules="passRules" hide-details="auto" /><br />
</v-responsive>
<v-btn v-on:click="signUp()" color="primary" elevation="15">SignUp</v-btn>

<footer>
    <v-btn tile outlined color="success" v-on:click="backToHomePage()">Back to home page</v-btn>
</footer>
</template>

<script>
import axios from "axios";
import bcrypt from "bcryptjs";
export default {
    name: 'signUpComp',
    data() {
        return {
            fullName: '',
            age: '',
            email: '',
            password: '',
            ageRules: [
                value => !!value || 'Required.',
                value => (value && value >= 10 && value <= 100) || '• Age must be greater than 9 and less than 100.'
            ],
            passRules: [
                value => !!value || 'Required.',
                value => (value && value.length >= 6 && value != this.fullName) || '• Minimum password length is 6. • Password cannot be your name.'
            ],
            emailRules: [
                value => !!value || 'Required.',
                value => (value && /.+@.+/.test(value)) || 'Invalid email address'
            ],
            nameRules: [
                value => !!value || 'Required.'
            ]
        }
    },
    methods: {
        async signUp() {
            let users = await axios.get(`http://localhost:3000/users/?email=${this.email}`);

            if (this.password.length > 6 && this.fullName != this.password && this.age > 9 && this.age < 100 && (/.+@.+/.test(this.email))) {

                if (users.data.length === 0) {
                    let result = await axios.post("http://localhost:3000/users", {
                        name: this.fullName,
                        age: this.age,
                        email: this.email,
                        password: bcrypt.hashSync(this.password, 10)
                    });

                    if (result.status == 201) {
                        alert("registration succces");
                        //localStorage.setItem("user-info", JSON.stringify(result.data));
                        this.$router.push({
                            name: 'LoginPage'
                        })
                    } else {
                        alert("registration unsuccess. Please try again!");
                        this.fullName = '',
                            this.age = '',
                            this.email = '',
                            this.password = ''
                    }
                } else {
                    window.alert("Username already exists. Use different details");
                    this.fullName = '',
                        this.age = '',
                        this.email = '',
                        this.password = ''
                }
            } else {
                alert('Wrong credentials!. Please follow input checks');
                this.fullName = '',
                    this.age = '',
                    this.email = '',
                    this.password = ''
            }
        },

        /*
        async signUp() {
            const user = {
                name: this.fullName,
                age: this.age,
                email: this.email,
                password: bcrypt.hashSync(this.password, 10)
            }
            const users = await fetch(`http://localhost:3000/users/?email=${this.email}`);
            const userName = await users.json();
            if (userName.length === 0) {
                const res = await fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(user),
                });
                if (res.status === 201) {
                    {
                        alert("registration succces");
                        this.$router.push({
                            name: 'LoginPage'
                        })
                    }
                } else {
                    alert('registration unsuccess. Please try again!');
                    this.fullName = '',
                        this.age = '',
                        this.email = '',
                        this.password = ''

                }
            } else {
                window.alert("Username already exists. Use different details");
                this.fullName = '',
                    this.age = '',
                    this.email = '',
                    this.password = ''
            }
        },
        */

        backToHomePage() {
            return this.$router.push({
                name: 'HomePage'
            });
        }
    },
    mounted() {
        let user = localStorage.getItem('user-info');
        if (user) {
            return this.$router.push({
                name: 'LandingPage'
            });
        }

    }
}
</script>

<style scoped>
footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
}

body {
    background-color: aqua;
}
</style>
