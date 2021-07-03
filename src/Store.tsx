import React from 'react';

import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  IAbyssBattle,
  IArtifactDb,
  IArtifactSetDb,
  IArtifactSetStats,
  ICharacterBuild,
  ICharacterDb,
  IWeaponDb,
  IWeaponStats,
} from './data/types';

interface IState {
  characterIdMap: {[shortname: string]: string},
  selectedCharacter: string,
  artifactDb: IArtifactDb,
  artifactSetDb: IArtifactSetDb,
  characterDb: ICharacterDb,
  weaponDb: IWeaponDb,
  elementColor: string,
  characterBuilds: ICharacterBuild[],
  abyssBattles: IAbyssBattle[],
  f2p: boolean,
  artifactSetStats: IArtifactSetStats,
  weaponStats: IWeaponStats
}

const initialState: IState = {
  characterIdMap: {},
  selectedCharacter: '',
  artifactSetDb: {},
  artifactDb: {},
  weaponDb: {},
  characterDb: {},
  elementColor: "",
  characterBuilds: [],
  abyssBattles: [],
  f2p: false,
  artifactSetStats: {},
  weaponStats: {}
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCharacterIdMap: (state, action: PayloadAction<{[shortname: string]: string}>) => {
      state.characterIdMap = action.payload
    },
    selectCharacter: (state, action: PayloadAction<string>) => {
      state.selectedCharacter = action.payload
    },
    setArtifactDb: (state, action: PayloadAction<IArtifactDb>) => {
      state.artifactDb = action.payload
    },
    setArtifactSetDb: (state, action: PayloadAction<IArtifactSetDb>) => {
      state.artifactSetDb = action.payload
    },
    setWeaponDb: (state, action: PayloadAction<IWeaponDb>) => {
      state.weaponDb = action.payload
    },
    setCharacterDb: (state, action: PayloadAction<ICharacterDb>) => {
      state.characterDb = action.payload
    },
    setElementColor: (state, action: PayloadAction<string>) => {
      state.elementColor = action.payload
    },
    setCharacterBuilds: (state, action: PayloadAction<ICharacterBuild[]>) => {
      state.characterBuilds = action.payload
    },
    setAbyssbattles: (state, action: PayloadAction<IAbyssBattle[]>) => {
      state.abyssBattles = action.payload
    },
    setF2p: (state, action: PayloadAction<boolean>) => {
      state.f2p = action.payload
    },
    setArtifactSetStats:(state, action: PayloadAction<IArtifactSetStats>) => {
      state.artifactSetStats = action.payload
    },
    setWeaponStats:(state, action: PayloadAction<IWeaponStats>) => {
      state.weaponStats = action.payload
    },
    
  }
})

export const { 
  setCharacterIdMap,
  selectCharacter,
  setArtifactDb,
  setArtifactSetDb,
  setWeaponDb,
  setCharacterDb,
  setElementColor,
  setCharacterBuilds,
  setAbyssbattles,
  setF2p,
  setSeenDialogues
} = dataSlice.actions;

const store = configureStore({ reducer: { data: dataSlice.reducer } })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;