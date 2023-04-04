<template>
<HeaderComponent />
<H2>My Favorite Movies</H2>
<table class="styled-table">
    <thead>
        <tr>
            <td>Poster</td>
            <td>Title</td>
            <td>Genre</td>
            <td>Director</td>
            <td>Rating</td>
            <td>Delete</td>
        </tr>
    </thead>
    <tbody>
        <tr v-for="item in favorites" :key=item.movieName>
            <td><img id="imgPoster" :src="item.moviePoster" class="img-thumbnail" /></td>
            <td>{{item.movieName}}</td>
            <td>{{item.Genre}}</td>
            <td>{{item.Director}}</td>
            <td>{{item.movieRating}}</td>
            <td>
                <img id="imgFav" v-bind:src="require('../assets/remove-icon-png-32.png')" style="width:32px;" v-on:click="deleteMovie(item.id)" />
            </td>
        </tr>
    </tbody>
</table>

<FooterComponent />
</template>

<script>
import HeaderComponent from './Header.vue'
import FooterComponent from './Footer.vue'
import axios from 'axios'
export default {
    name: 'FavoritesComp',
    data() {
        return {
            email: '',
            favorites: []
        }
    },
    components: {
        HeaderComponent,
        FooterComponent
    },
    async mounted() {
        //To return to home page if not logged in 
        let user = localStorage.getItem('user-info');
        if (!user) {
            return this.$router.push({
                name: 'HomePage'
            });
        }

        let userInfo = localStorage.getItem('user-info-email');
        if (userInfo !== null) {
            userInfo = userInfo.substring(1, (userInfo.length - 1));
            this.email = userInfo;
        }
        let result = await axios.get('http://localhost:3000/favorites/?email=' + this.email + '');
        this.favorites = result.data;

    },
    methods: {
        async deleteMovie(id) {
            let result = await axios.delete('http://localhost:3000/favorites/' + id);
            if (result.status == 200) {
                alert('Removed from Favorities');
                this.loadMovie();
            }
        },
        async loadMovie() {
            let result = await axios.get('http://localhost:3000/favorites/?email=' + this.email + '');
            this.favorites = result.data;
        }
    }
}
</script>

<style>
.styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    width: 100%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border-radius: 5px 5px 0 0;
    overflow: hidden;
}

.styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: center;
    font-weight: bold;
    font-size: large;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
}

.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
    font-size: medium;
    font-weight: 700;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}

.styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}
</style>
