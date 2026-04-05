import { configureStore, createSlice } from "@reduxjs/toolkit";
import { carregarAnotacoesThunk, deletarAnotacaoThunk, salvarAnotacao } from "./thunks/thunks";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Anotacao } from "../interface/anotacoes-interface";

export type State = 'init' | 'sucesso' | 'falha' | 'carregando';

const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        status: 'init',
        anotacoes: {} as Record<string, Anotacao[]>
    },
    reducers: {},
    extraReducers: (builder) => {
        return builder.addCase(salvarAnotacao.fulfilled,
            (state, action) => {
                state.status = 'sucesso';
            })
            .addCase(salvarAnotacao.pending,
                (state, action) => {
                    state.status = 'carregando';
                })
            .addCase(salvarAnotacao.rejected,
                (state, action) => {
                    state.status = 'falha';
                })
            .addCase(carregarAnotacoesThunk.fulfilled,
                (state, action) => {
                    if (action.payload) {
                        state.anotacoes = action.payload;
                    } else {
                        state.anotacoes = {};
                    }
                    state.status = 'sucesso';
                })
            .addCase(carregarAnotacoesThunk.pending,
                (state, action) => {
                    state.status = 'carregando';
                    state.anotacoes = {};
                })
            .addCase(carregarAnotacoesThunk.rejected,
                (state, action) => {
                    state.status = 'falha';
                    state.anotacoes = {};
                })
            .addCase(deletarAnotacaoThunk.fulfilled,
                (state, action) => {
                })
    }
});

export const { } = notesSlice.actions;

export const store = configureStore({
    reducer: notesSlice.reducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;