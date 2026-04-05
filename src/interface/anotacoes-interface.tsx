export type Sintoma = 'DOR_CABECA' | 'DOR_ESTOMAGO' | 'FADIGA' | 'INSOMNIO' | 'PERDA_APETITE' | 'TENSAO_MUSCULAR' | 'IRRITABILIDADE' | 'ANSIEDADE' | 'DESESPERO';

export interface Anotacao {
    ID: string;
    SINTOMA: Sintoma;
    DESCRICAO: string;
    DATA: Date;
}

export type SintomaInfo = {
    label: string;
    emoji: string;
    cor: string;
};

export const sintomas: Record<Sintoma, SintomaInfo> = {
    DOR_CABECA: {
        label: "Dor de cabeça",
        emoji: "🤕",
        cor: "red"
    },
    DOR_ESTOMAGO: {
        label: "Dor de estômago",
        emoji: "🤢",
        cor: "orange"
    },
    FADIGA: {
        label: "Fadiga",
        emoji: "😴",
        cor: "gray"
    },
    INSOMNIO: {
        label: "Insônia",
        emoji: "🌙",
        cor: "purple"
    },
    PERDA_APETITE: {
        label: "Perda de apetite",
        emoji: "🍽️",
        cor: "yellow"
    },
    TENSAO_MUSCULAR: {
        label: "Tensão muscular",
        emoji: "💪",
        cor: "brown"
    },
    IRRITABILIDADE: {
        label: "Irritabilidade",
        emoji: "😠",
        cor: "red"
    },
    ANSIEDADE: {
        label: "Ansiedade",
        emoji: "😰",
        cor: "blue"
    },
    DESESPERO: {
        label: "Desespero",
        emoji: "😞",
        cor: "black"
    }
};