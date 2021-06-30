import { Module } from "vuex";
import AuthService from "@/services/auth.service";

const getState = () => {
  return {
    command: {},
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
  },
  mutations: {
    SET_COMMAND: (state, command) => {
      state.command = command;
    },
    SET_COMMANDS: (state, commands) => {
      state.commands = commands;
    },
  },
  actions: {
    command: async ({ commit, dispatch }, { infos }) => {
      const response = await AuthService.command(infos);
      commit("SET_COMMAND", response.data[0]);
    },
    commands: async ({ commit, dispatch }) => {
      const response = await AuthService.commands();
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
  },
};

export default commandStore;
