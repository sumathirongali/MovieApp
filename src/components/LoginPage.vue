<template>
    
    <v-card-title class="text-xs-h6 text-md-h5 text-lg-h4"><b>Login</b></v-card-title><br />
    <v-responsive class="mx-auto" max-width="344">
        <v-text-field type="email" placeholder="Enter your email" v-model="email" />
        <v-text-field type="password" placeholder="Enter your password" v-model="password" />
    </v-responsive>
    <v-btn v-on:click="login()" color="primary" elevation="15">Login</v-btn>
    
<footer>
    <v-btn tile outlined color="success" v-on:click="backToHomePage()">Back to home page</v-btn>
</footer>
</template>

<script>
import axios from 'axios';
import bcrypt from 'bcryptjs';
export default {
    name: 'loginPageComp',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        /*
        async login() {
            const existingUser = await fetch(`http://localhost:3000/users/?email=${this.email}`);
            const existingUserData = await existingUser.json();
            if (existingUserData.length > 0) {
                let doesPasswordMatch = bcrypt.compareSync(this.password, existingUserData[0].password);
                if (doesPasswordMatch) {
                    //localStorage.setItem("user-info", JSON.stringify(existingUserData.data));
                    return this.$router.push({
                        name: 'LandingPage'
                    })
                } else {
                    alert('Incorrect password! retry');
                    this.password = '';
                }
            } else {
                alert("User not found");
                this.email = '';
                this.password = '';
            }
        },
        */
        async login() {
            let existingUser = await axios.get(`http://localhost:3000/users/?email=${this.email}`);
            if (existingUser.data.length > 0) {
                let doesPasswordMatch = bcrypt.compareSync(this.password, existingUser.data[0].password);
                if (doesPasswordMatch && existingUser.status == 200) {
                    localStorage.setItem("user-info", JSON.stringify(existingUser.data[0].name))
                    localStorage.setItem("user-info-email", JSON.stringify(existingUser.data[0].email));
                    return this.$router.push({
                        name: 'LandingPage'
                    })
                } else {
                    alert('Incorrect password!. Retry!');
                    this.password = '';
                }
            } else {
                alert("User not found");
                this.email = '';
                this.password = '';
            }
        },
        backToHomePage() {
            return this.$router.push({
                name: 'HomePage'
            })
        }
    },
    //     mounted(){
    //     let user = localStorage.getItem('user-info');
    //     if(user.substring(0,7) != '{"name"'){
    //         return this.$router.push({
    //             name: 'LandingPage'
    //         });
    //     }else{
    //         return this.login()
    //     }
    // }
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
</style>
