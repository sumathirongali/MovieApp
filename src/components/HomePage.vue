<template>
<body>
<v-container fill-height fluid>
    <v-row justify="end" >
        <v-col sm="6" offset-sm="3">
            <v-card class="pa-2" outlined tile style="background-color: bisque;">
                <v-card-title class="text-xs-h6 text-md-h5 text-lg-h4"><b>Welcome to Movie App</b></v-card-title><br />
                <img alt="Movie logo" src="../assets/movieLogo4.jpg" />
                <div>
                    <v-btn  v-on:click="loginPage()" color="primary" elevation="15">Login</v-btn><br /><br />
                    <v-btn v-on:click="signUpPage()" color="primary" elevation="15">SignUp</v-btn><br /><br />
                </div>
            </v-card>
        </v-col>
    </v-row>
</v-container>

<footer>
    <v-btn rounded color="primary" dark v-on:click="aboutUsPage()">About Us</v-btn>
</footer>
</body>

</template>

<script>
export default {
    name: 'homePageComp',
    methods: {
        loginPage() {
            return this.$router.push({
                name: 'LoginPage'
            })
        },
        signUpPage() {
            return this.$router.push({
                name: 'SignUpPage'
            })
        },
        aboutUsPage() {
            return this.$router.push({
                name: 'AboutUsPage'
            })
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
body{
    background-color: #cccccc;
    background-image: url('../assets/batman.jpg');
    background-size:cover
}
img {
    width: 450px;
}

footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: aqua;
    text-align: center;
}

</style>
