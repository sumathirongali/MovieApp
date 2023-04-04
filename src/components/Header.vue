<template>
<v-toolbar dark density="compact" color='#1c3d63'>
    <v-card-title>
    <span class="text-white">Movies App</span>
    </v-card-title>   
    <v-spacer></v-spacer> 
    <v-btn class="cursor-pointer">
        <span v-on:click="getLandingPage()" class="text-white">Home</span>
    </v-btn>
    <v-btn class="cursor-pointer">
        <span v-on:click="getFavoritesPage()" class="text-white">Favourites</span>
    </v-btn>
    <v-btn class="cursor-pointer">
        <span class="text-white mr-2">{{profileName}}</span>
        <v-avatar size="20" color="white">P</v-avatar>
    </v-btn>
    <v-btn class="cursor-pointer">
        <span v-on:click="logout()" class="text-white">Logout</span>
    </v-btn>
</v-toolbar>
</template>

    
<script>
export default {
    name: 'headerComp',
    data() {
        return {
            profileName: '',

        }
    },
    methods: {
        getLandingPage() {
            return this.$router.push({
                name: 'LandingPage'
            })
        },
        logout() {
            localStorage.clear();
            this.$router.push({
                name: 'LoginPage'
            })
        },
        getFavoritesPage(){
            return this.$router.push({name:'FavoritesPage'})
        }
    },
    mounted() {
        let userInfo = localStorage.getItem('user-info');
        if (userInfo !== null) {
            userInfo = userInfo.substring(1, (userInfo.length - 1));
            this.profileName = userInfo
        }

    }

}
</script>

    
<style>

</style>
