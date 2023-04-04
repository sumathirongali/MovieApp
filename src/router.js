import { createRouter, createWebHistory } from 'vue-router'
import homePageComp from './components/HomePage.vue'
import landingPageComp from './components/LandingPage.vue'
import detailPageComp from './components/DetailPage.vue'
import headerComp from './components/Header.vue'
import footerComp from './components/Footer.vue'
import signUpComp from './components/SignUp.vue'
import loginPageComp from './components/LoginPage.vue'
import aboutUsComp from './components/AboutUs.vue'
import RatingComp from './components/Rating.vue'
import comparisonPageComp from './components/ComparisonPage.vue'
import FavoritesComp from './components/Favorites.vue'

const routes = [
    {
        name: 'HomePage',
        path: '/',
        component: homePageComp
    },
    {
        name: 'LandingPage',
        path: '/landingPage',
        component: landingPageComp
    },
    {
        name: 'DetailPage',
        path: '/movie/:id',
        component: detailPageComp
    },
    {
        name: 'HeaderPage',
        path: '/headerPage',
        component: headerComp
    },
    {
        name: 'FooterPage',
        path: '/footerPage',
        component: footerComp
    },
    {
        name: 'SignUpPage',
        path: '/signUpPage',
        component: signUpComp,
    },
    {
        name: 'LoginPage',
        path: '/loginPage',
        component: loginPageComp
    },
    {
        name: 'AboutUsPage',
        path: '/aboutUs',
        component: aboutUsComp
    },
    {
        name: 'Rating',
        path: '/rating',
        component: RatingComp
    },
    {
        name: 'ComparisonPage',
        path:'/comparisonPage/:id',
        component: comparisonPageComp
    },
    {
        name:'FavoritesPage',
        path: '/Favorites',
        component: FavoritesComp
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;