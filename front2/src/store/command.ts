import { Module } from "vuex";
import AuthService from "@/services/auth.service";

const getState = () => {
  return {
    command: {},
    stats: {},
    commands: [],
  };
};

const commandStore: Module<any, any> = {
  state: getState(),
  getters: {
    getCommand: (state) => {
      return state.command;
    },
    getCommands: (state) => {
      return state.commands;
    },
    getStats: (state) => {
      return state.stats;
    },
  },
  mutations: {
    SET_COMMAND: (state, command) => {
      state.command = command;
    },
    SET_COMMANDS: (state, commands) => {
      state.commands = commands;
    },
    RESET_COMMAND: (state) => {
      state.command = {};
    },
    SET_STATS: (state, stats) => {
      state.stats = stats;
    },
  },
  actions: {
    command: async ({ commit, dispatch }, { infos }) => {
      const response = await AuthService.command(infos);
      commit("SET_COMMAND", response.data[0]);
    },
    commandReset: async ({ commit, dispatch }) => {
      commit("RESET_COMMAND");
    },
    commands: async ({ commit, dispatch }) => {
      const response = await AuthService.commands();
      commit("SET_COMMANDS", response.data);
    },
    commandsRestaurant: async ({ commit, dispatch }) => {
      const response = await AuthService.commandsRestaurant();
      commit("SET_COMMANDS", response.data);
    },
    commandCreate: async ({ commit, dispatch }, { infos }) => {
      const response = await AuthService.commandCreate(infos);
      commit("SET_COMMAND", response.data);
    },
    commandPay: async ({ commit, dispatch }, { infos }) => {
      await AuthService.commandPay(infos);
    },
    commandValid: async ({ commit, dispatch }, { infos }) => {
      await AuthService.commandValid(infos);
    },
    statsCommand: async ({ commit, dispatch }) => {
      const response = await AuthService.statsCommand();
      commit("SET_STATS", response.data);
    },
  },
};

export default commandStore;
