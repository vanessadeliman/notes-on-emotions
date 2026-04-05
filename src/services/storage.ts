import AsyncStorage from '@react-native-async-storage/async-storage';
import { Anotacao } from '../interface/anotacoes-interface';
import { format } from 'date-fns';
import { Alert } from 'react-native';

const STORAGE_KEY = 'anotacoes';

export async function salvarAnotacoes(novaAnotacao: Anotacao) {
    try {
        const dia = format(novaAnotacao.DATA, 'yyyy-MM-dd'); // 🔥 melhor formato

        const data = await AsyncStorage.getItem(STORAGE_KEY);

        let anotacoes: Record<string, Anotacao[]> = data
            ? JSON.parse(data)
            : {};

        if (!anotacoes[dia]) {
            anotacoes[dia] = [];
        }

        anotacoes[dia].push(novaAnotacao);

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(anotacoes));

        Alert.alert('Sucesso', 'Anotação salva com sucesso!');
    } catch (error) {
        Alert.alert('Erro', 'Não foi possível salvar a anotação.');
    }
}

export async function carregarAnotacao(key: string): Promise<Anotacao[]> {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

export async function carregarTodasAnotacoes(): Promise<Record<string, Anotacao[]>> {
    const entries = await AsyncStorage.getItem(STORAGE_KEY);

    if (!entries) {
        return {};
    }

    return JSON.parse(entries) as Record<string, Anotacao[]>;
}

export async function deletarAnotacao(anotacao: Anotacao) {
  try {
    const dia = format(anotacao.DATA, 'yyyy-MM-dd');
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    let anotacoes: Record<string, Anotacao[]> = data
      ? JSON.parse(data)
      : {};

    if (anotacoes[dia]) {
      anotacoes[dia] = anotacoes[dia].filter(
        (a) => a.ID !== anotacao.ID
      );
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(anotacoes));
    Alert.alert('Sucesso', 'Anotação deletada com sucesso!');
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível deletar a anotação.');
  }
}