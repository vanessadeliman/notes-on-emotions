export type Sintoma =
    // 🧠 FÍSICOS
    | 'DOR_CABECA'
    | 'DOR_ESTOMAGO'
    | 'FADIGA'
    | 'INSOMNIO'
    | 'PERDA_APETITE'
    | 'TENSAO_MUSCULAR'
    | 'NAUSEA'
    | 'TONTURA'
    | 'PALPITACAO'
    | 'FALTA_AR'

    // 😤 EMOCIONAIS
    | 'IRRITABILIDADE'
    | 'ANSIEDADE'
    | 'DESESPERO'
    | 'TRISTEZA'
    | 'DESANIMO'
    | 'ESTRESSE'
    | 'MEDO'
    | 'CULPA'
    | 'VERGONHA'

    // 😊 POSITIVOS
    | 'FELICIDADE'
    | 'CALMA'
    | 'MOTIVACAO'
    | 'FOCO'
    | 'GRATIDAO';

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
    // 🧠 FÍSICOS
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
    NAUSEA: {
        label: "Náusea",
        emoji: "🤮",
        cor: "lime"
    },
    TONTURA: {
        label: "Tontura",
        emoji: "😵",
        cor: "teal"
    },
    PALPITACAO: {
        label: "Palpitação",
        emoji: "❤️",
        cor: "rose"
    },
    FALTA_AR: {
        label: "Falta de ar",
        emoji: "😮‍💨",
        cor: "cyan"
    },

    // 😤 EMOCIONAIS
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
    },
    TRISTEZA: {
        label: "Tristeza",
        emoji: "😢",
        cor: "indigo"
    },
    DESANIMO: {
        label: "Desânimo",
        emoji: "😔",
        cor: "slate"
    },
    ESTRESSE: {
        label: "Estresse",
        emoji: "😫",
        cor: "amber"
    },
    MEDO: {
        label: "Medo",
        emoji: "😨",
        cor: "violet"
    },
    CULPA: {
        label: "Culpa",
        emoji: "😣",
        cor: "stone"
    },
    VERGONHA: {
        label: "Vergonha",
        emoji: "😳",
        cor: "pink"
    },

    // 😊 POSITIVOS (muito útil pra balancear o tracking)
    FELICIDADE: {
        label: "Felicidade",
        emoji: "😄",
        cor: "yellow"
    },
    CALMA: {
        label: "Calma",
        emoji: "😌",
        cor: "green"
    },
    MOTIVACAO: {
        label: "Motivação",
        emoji: "🔥",
        cor: "orange"
    },
    FOCO: {
        label: "Foco",
        emoji: "🎯",
        cor: "blue"
    },
    GRATIDAO: {
        label: "Gratidão",
        emoji: "🙏",
        cor: "emerald"
    }
};