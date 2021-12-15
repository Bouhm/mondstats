import React from 'react';

import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IArtifactDb, IArtifactSetBuildDb, IArtifactSetDb, ICharacterDb, IWeaponDb } from './data/types';

interface IState {
  characterIdMap: {[shortname: string]: string},
  selectedCharacter: string,
  artifactDb: IArtifactDb,
  artifactSetDb: IArtifactSetDb,
  artifactSetBuildDb: IArtifactSetBuildDb,
  characterDb: ICharacterDb,
  weaponDb: IWeaponDb
}

const initialState: IState = {
  characterIdMap: {},
  selectedCharacter: '',
  artifactSetDb: {},
  artifactSetBuildDb: {},
  artifactDb: {},
  weaponDb: {},
  characterDb: {}
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
    setArtifactSetBuildDb: (state, action: PayloadAction<IArtifactSetBuildDb>) => {
      state.artifactSetBuildDb = action.payload
    },
    setWeaponDb: (state, action: PayloadAction<IWeaponDb>) => {
      state.weaponDb = action.payload
    },
    setCharacterDb: (state, action: PayloadAction<ICharacterDb>) => {
      state.characterDb = action.payload
    }
  }
})

export const { 
  setCharacterIdMap,
  selectCharacter,
  setArtifactDb,
  setArtifactSetDb,
  setWeaponDb,
  setCharacterDb
} = dataSlice.actions;

const store = configureStore({ reducer: { data: dataSlice.reducer } })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;