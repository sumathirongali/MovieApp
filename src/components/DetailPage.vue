<template>
<headerComp />

    <!--Movie Title-->
    <v-card-title class="text-left font-weight-bold text-h4">{{ data?.Title }}</v-card-title>

    <!--Favorite Button-->
    <span class="wishlist movie_data_subheading">
        <p class="text-left mb-1 mt-2 ml-3">Add to Favourite:</p> 
        <img id="imgFav" v-bind:src="require('../assets/' + imgFavor)" style="width:32px;height:32px;" v-on:click="manageFavorite()" />
    </span>

    <!--Movie Details-->
    <div class="d-flex">
        <img :src="data?.Poster" alt="movie_poster" />
        <div style="marginLeft:-10px;width:100%">
            <p class="text-left text-subtitle-1 mb-1"><b>Duration</b> : {{ data?.Runtime }}</p>
            <p class="text-left text-subtitle-1 mb-1"><b>Ratings</b> : {{ data?.imdbRating }}</p>
            <p class="text-left text-subtitle-1 mb-1"><b>Released Date</b> : {{ data?.Released }}</p>
            <p class="text-left text-subtitle-1 mb-1"><b>Genre</b> : {{ data?.Genre }}</p>
            <p class="text-left text-subtitle-1 mb-1"><b>Language</b> : {{ data?.Language }}</p>
            <p class="text-left text-subtitle-1 mb-1" v-if="data?.Awards !== 'N/A'"><b>Awards</b> : {{ data?.Awards }}</p>

            <div class="mt-2 d-flex">
                <v-btn color="#c2dff0" class="text-white mr-2" v-on:click="concatYTlink()"><a :href=YTlink target="_blank" style="text-decoration:none">Watch Trailer</a></v-btn>
                <v-btn color="#c2dff0" class="text-white mr-2"><a href="https://netflix.com/" target="_blank" style="text-decoration:none">Watch Movie</a></v-btn>
            </div>
        </div>
    </div>

    <!--More Movie Details-->
    <div>
        <p class="text-left text-h6 mb-1 mt-6 ml-3"><b>Description :</b></p>
        <p class="text-left mb-1 mt-2 ml-3">{{ data?.Plot }}</p>
        <p class="text-left text-h6 mb-1 mt-5 ml-3"><b>Cast and Crew</b></p>
        <p class="text-left mb-1 mt-2 ml-3"><b>Director : </b> {{ data?.Director }}</p>
        <p class="text-left mb-1 mt-2 ml-3"><b>Writer : </b> {{ data?.Writer }}</p>
        <p class="text-left mb-1 mt-2 ml-3"><b>Actors : </b> {{ data?.Actors }}</p>
    </div>
    
    <!--Rating & Comparison Information-->
    <div class="d-flex mb-10 mt-10">
        <v-btn color="#1c3d63" class="text-white ml-5" v-on:click="setDialog(data?.Title)" >Submit rating</v-btn>
        <p v-if="data?.movieRating" class="movie_data_subheading"><b>Submitted Rating:</b> 
            {{data?.movieRating.rating}} /10 </p>
        <v-dialog v-model="dialog">
            <v-card>
                <v-container>
                    <RatingComp :title="this.title" @rated="onSelectRating" />
                </v-container>
                <v-card-actions>
                    <v-spacer />
                    <!-- <v-col :align-self="'center'"> -->
                    <v-btn color="primary" @click="dialog = false">Close</v-btn>
                    <v-btn color="primary" @click="onSubmit(this?.movieRating)">Submit</v-btn>
                    <!-- </v-col> -->
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-spacer></v-spacer>
        <router-link :to=comparsionLink style="text-decoration:none"><v-btn color="#1c3d63" class="text-white mr-5">Compare With Other Movies</v-btn></router-link>
    </div>

<footerComp />
</template>


<script>
import headerComp from './Header.vue';
import footerComp from './Footer.vue';
import axios from 'axios';
import RatingComp from './Rating.vue';
import api from '@/api.js';
import {useRoute} from 'vue-router';
import {toRaw} from 'vue';

export default {
    name: 'detailPageComp',
    data() {
        return {
            data: null,
            route: useRoute(),
            YTlink: '',
            title: '',
            dialog: false,
            movieRating: {},
            comparsionLink: '/comparisonPage/',
            email: '',
            chkFav: false,
            imgFavor: "unfavoriteIcon.png",
            movieID: 0
        }
    },
    components: {
        headerComp,
        footerComp,
        RatingComp
    },
    async mounted() {
        //To return to home page if not logged in 
        let userName = localStorage.getItem('user-info');
        if(!userName){
            return this.$router.push({
                name: 'HomePage'
            });
        }

        //To extract specific movie based on movie id 
        await axios
            .get(`https://www.omdbapi.com/?i=${this.route.params.id}&apikey=${api.apikey}&plot=full`)
            .then(response => this.data = response.data);

        //Saving the same movie id in a variable to use it for comparison page
        this.comparsionLink = this.comparsionLink.concat(this.route.params.id);

        //Using locally stored email for favorite page
        let userInfo = localStorage.getItem('user-info-email');
        if (userInfo !== null) {
            userInfo = userInfo.substring(1, (userInfo.length - 1));
            this.email = userInfo;
        }
        this.fetchFavDetails();
    },
    methods: {
        concatYTlink() {
            let a = "https://www.youtube.com/results?search_query=";
            let b = this.data.Title;
            let c = "+trailer";
            this.YTlink = a.concat(b, c);
        },
        setDialog(val) {
            this.dialog = true;
            this.title = val;
        },
        onSelectRating(val) {
            this.movieRating = val;
            //   console.log(val,"This is main page")
        },
        onSubmit(val) {
            // this.movieRating=val?.rating;
            //   console.log(val);
            let obj = toRaw(val)
            this.data.movieRating = obj;
            localStorage.setItem(obj?.title, JSON.stringify(obj))
            this.dialog = false;
        },
        async manageFavorite() {
            if (this.chkFav == true) {
                //alert(this.movieID);
                await axios.delete('http://localhost:3000/favorites/' + this.movieID);
            } else {
                await axios.post('http://localhost:3000/favorites', {
                    email: this.email,
                    movieName: this.data.Title,
                    Genre: this.data.Genre,
                    Director: this.data.Director,
                    movieRating: this.data.imdbRating,
                    moviePoster: this.data.Poster
                });
            }
            this.fetchFavDetails();
        },
        async fetchFavDetails() {
            const fav = await axios.get('http://localhost:3000/favorites/?email=' + this.email + '&movieName=' + this.data.Title + '');
            if (fav.data.length === 0)
            {
                this.chkFav = false;
                this.imgFavor = "unfavoriteIcon.png"
            } else
            {
                this.movieID = fav.data[0].id;
                this.chkFav = true;
                this.imgFavor = "favoriteIcon.png"
            }
        }
    }
}
</script>

<style scoped>
p {
    margin-bottom: 0px !important;
}
.movie_data_subheading {
    margin-bottom: 5px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

}
.wishlist {
    position: absolute;
    min-width: 30px;
    min-height: 30px;
    position: absolute;
    right: 20px;
}
</style>
