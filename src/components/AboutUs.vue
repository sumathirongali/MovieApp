<template>
<h2>About Us Page: </h2>
<p>Movie app is an online database of information related to films, television series, home videos, video games, and streaming content online: including cast, production crew and personal biographies, plot summaries, trivia, ratings, and fan and critical reviews. IMDb began as a fan-operated movie database on the Usenet group "rec.arts.movies" in 1990, and moved to the Web in 1993.</p>

<footer>
    <v-btn tile outlined color="success" v-on:click="backToHomePage()">Back to home page</v-btn>
</footer>
</template>

    
<script>
export default {
    name: 'aboutUsComp',
    methods: {
        backToHomePage() {
            return this.$router.push({
                name: 'HomePage'
            })
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
