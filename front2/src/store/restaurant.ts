import { Module } from "vuex";
import AuthService from "@/services/auth.service";

const getState = () => {
  return {
    restaurant: {},
    restaurants: [],
    menu: {},
    menus: [],
    article: {},
    articles: [],
  };
};

const restaurantStore: Module<any, any> = {
  state: getState(),
  getters: {
    getRestaurant: (state) => {
      return state.restaurant;
    },
    getRestaurants: (state) => {
      return state.restaurants;
    },
    getMenu: (state) => {
      return state.menu;
    },
    getMenus: (state) => {
      return state.menus;
    },
    getArticle: (state) => {
      return state.article;
    },
    getArticles: (state) => {
      return state.articles;
    },
  },
  mutations: {
    SET_RESTAURANT: (state, restaurant) => {
      state.restaurant = restaurant;
    },
    SET_RESTAURANTS: (state, restaurants) => {
      state.restaurants = restaurants;
    },
    SET_MENU: (state, menu) => {
      state.menu = menu;
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus;
    },
    SET_ARTICLE: (state, article) => {
      state.article = article;
    },
    SET_ARTICLES: (state, articles) => {
      state.articles = articles;
    },
  },
  actions: {
    restaurant: async ({ commit, dispatch }, { infos }) => {
      const response = await AuthService.restaurant(infos);
      commit("SET_RESTAURANT", response.data[0]);
    },
    restaurants: async ({ commit, dispatch }) => {
      const response = await AuthService.restaurants();
      commit("SET_RESTAURANTS", response.data);
    },
    menu: async ({ commit, dispatch }, { infos }) => {
      const response = await AuthService.menu(infos);
      commit("SET_MENU", response.data[0]);
    },
    menus: async ({ commit, dispatch }, { infos }) => {
      const response = await AuthService.menus(infos);
      console.log(response.data);
      commit("SET_MENUS", response.data);
    },
    menuCreate: async ({ commit, dispatch }, { infos }) => {
      await AuthService.menuCreate(infos);
    },
    article: async ({ commit, dispatch }, { infos }) => {
      const response = await AuthService.article(infos);
      commit("SET_ARTICLE", response.data[0]);
    },
    articles: async ({ commit, dispatch }, { infos }) => {
      const response = await AuthService.articles(infos);
      console.log(response.data);
      commit("SET_ARTICLES", response.data);
    },
    articleCreate: async ({ commit, dispatch }, { infos }) => {
      await AuthService.articleCreate(infos);
    },
  },
};

export default restaurantStore;
