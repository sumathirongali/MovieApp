<template>
<headerComp />
<header>
    <h2>MovieApp</h2>
</header>

<v-divider />

<body>
    <img src="../assets/movieLogo3.jpg" alt="aMoviePoster" />
</body>

<v-form @submit.prevent="searchMovies()" class="searchBar">
    <v-responsive class="mx-auto"  max-width="644">
        <v-text-field type="text" placeholder="search for a movie..." v-model="search" />
        <v-btn type="submit" color="primary" elevation="15">submit</v-btn>
    </v-responsive>
</v-form>
<v-divider />

<v-container class="movieList">
    
    <div class="movie" v-for="(movie, i) in movies" :key="i">
        <router-link :to="'/movie/' + movie.imdbID" class="movie-router">
            <div class="searchResults">
                <img :src="movie.Poster" alt="movie poster" />
                <h3>{{ movie.Title }}</h3>
            </div>
        </router-link>
    </div>
</v-container>

<footerComp />
</template>

<script>
import api from '@/api.js';
import headerComp from '../components/Header.vue'
import footerComp from './Footer.vue';
export default {
    name: 'landingPageComp',
    data() {
        return {
            search: '',
            movies: []

        }
    },
    components: {
        headerComp,
        footerComp
    },
    methods: {
       async searchMovies() {
            if (this.search != '') {
              await fetch(`https://www.omdbapi.com/?s=${this.search}&apikey=${api.apikey}`)
                    .then(response => response.json())
                    .then(data => {
                        this.movies = data.Search;
                        this.search = '';
                    });
            }else{
                alert('Enter a movie name!')
            }
        }
    },
    mounted(){
        let user = localStorage.getItem('user-info');
        if(!user){
            return this.$router.push({
                name: 'HomePage'
            });
        }
    }
}
</script>

<style>
 header h2 {
     font-size: 40px;
     font-weight: 600;
     background-image: linear-gradient(to left, #553c9a, #b393d3);
     color: transparent;
     background-clip: text;
     -webkit-background-clip: text;
 }

 img {
     object-fit: contain;
     width: 350px;
     height: 350px;

 }

 

 .movieList {
     display: flex;
     flex-direction: row;
     flex-wrap: wrap;
     margin: 0px 8px;
 }



 #logout{
    position: fixed;
    right: 0;
 }
</style>
