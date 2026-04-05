import { createAsyncThunk } from "@reduxjs/toolkit";
import { carregarTodasAnotacoes, deletarAnotacao, salvarAnotacoes } from "../../services/storage";
import { Anotacao } from "../../interface/anotacoes-interface";

export const salvarAnotacao = createAsyncThunk(
    'notes/salvar',
    async (anotacoes: Anotacao) => {
        await salvarAnotacoes(anotacoes);
    });

export const carregarAnotacoesThunk = createAsyncThunk<Record<string, Anotacao[]>>(
    'notes/carregar',
    async () => {
        return await carregarTodasAnotacoes();
    }
);

export const deletarAnotacaoThunk = createAsyncThunk(
    'notes/deletar',
    async (anotacao: Anotacao, { dispatch }) => {
        await deletarAnotacao(anotacao);
        dispatch(carregarAnotacoesThunk());
    }
);