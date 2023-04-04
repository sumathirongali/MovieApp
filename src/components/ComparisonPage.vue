<template>
<div>
    <v-card-title class="text-xs-h6 text-md-h5 text-lg-h4">Comparision Page</v-card-title>
    <table id="datatable">
        <thead>
            <tr>
                <th>Movie Names</th>
                <th>Ratings</th>
                <th>Box Office</th>
                <th>Run Time</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.Title">
                <td>{{ user.Title }}</td>
                <td>{{ user.Rated }}</td>
                <td>{{ user.BoxOffice }}</td>
                <td>{{ user.Runtime }}</td>
            </tr>
        </tbody>
    </table>
</div>

<footer>
    <v-btn tile outlined color="success" v-on:click="backToDetailPage()">Back to Detail Page</v-btn>
</footer>
</template>

<script>
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import api from '@/api.js';

export default {

    mounted() {
        //To return to home page if not logged in 
        let userName = localStorage.getItem('user-info');
        if (!userName) {
            return this.$router.push({
                name: 'HomePage'
            });
        }

        let routeParam = window.location.href.split('/').slice(-1)[0];
        console.log("url", `http://www.omdbapi.com/?apikey=${api.apikey}&i=${routeParam}`);
        fetch(`http://www.omdbapi.com/?apikey=${api.apikey}&i=${routeParam}`)
            .then((response) => response.json())
            .then((data) => {

                this.users.push(data);
                this.users.push({
                    "Title": "BatMan",
                    "Rated": "PG-13",
                    "BoxOffice": "$623,321,649",
                    "Runtime": "152 min"
                });
                this.users.push({
                    "Title": "SpiderMan",
                    "Rated": "PG-13",
                    "BoxOffice": "$789,321,543",
                    "Runtime": "158 min"
                });
                this.users.push({
                    "Title": "Doctor strange",
                    "Rated": "PG-13",
                    "BoxOffice": "$789,321,543",
                    "Runtime": "158 min"
                });
                this.users.push({
                    "Title": "Wonder Women",
                    "Rated": "PG-13",
                    "BoxOffice": "$789,321,543",
                    "Runtime": "158 min"
                });
                this.users.push({
                    "Title": "Avatar 2",
                    "Rated": "PG-13",
                    "BoxOffice": "$789,321,543",
                    "Runtime": "158 min"
                });
                setTimeout(() => {
                    $("#datatable").DataTable({
                        columnDefs: [{
                            targets: [0, 1, 2, 3],
                            className: 'dt-left'
                        }]
                    });
                });
            });
    },
    data: function () {
        return {
            users: [],

        };
    },
    methods: {
        backToDetailPage() {
            return this.$router.push({
                name: 'DetailPage'
            })
        }
    }
};
</script>

<style>
table.dataTable.no-footer {
    border: 1px solid rgba(0, 0, 0, 0.3);
}

.dataTables_wrapper {
    margin: 50px;
}

.dataTables_filter {
    margin-bottom: 10px;
}

footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
}
</style>
