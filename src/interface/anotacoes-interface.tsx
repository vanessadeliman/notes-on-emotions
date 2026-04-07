
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
    | 'DESCAMACAO'
    | 'TREMOR'

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
        cor: "#EF4444" // red-500
    },
    DESCAMACAO: {
        label: "Descamação da pele",
        emoji: "🩹",
        cor: "#ffc186" // red-500
    },
    TREMOR: {
        label: "Tremor",
        emoji: "😵",
        cor: "#ffc186" // red-500
    },
    DOR_ESTOMAGO: {
        label: "Dor de estômago",
        emoji: "🤢",
        cor: "#F97316" // orange-500
    },
    FADIGA: {
        label: "Fadiga",
        emoji: "😴",
        cor: "#6B7280" // gray-500
    },
    INSOMNIO: {
        label: "Insônia",
        emoji: "🌙",
        cor: "#8B5CF6" // violet-500
    },
    PERDA_APETITE: {
        label: "Perda de apetite",
        emoji: "🍽️",
        cor: "#EAB308" // yellow-500
    },
    TENSAO_MUSCULAR: {
        label: "Tensão muscular",
        emoji: "💪",
        cor: "#92400E" // brown-like
    },
    NAUSEA: {
        label: "Náusea",
        emoji: "🤮",
        cor: "#84CC16" // lime-500
    },
    TONTURA: {
        label: "Tontura",
        emoji: "😵",
        cor: "#14B8A6" // teal-500
    },
    PALPITACAO: {
        label: "Palpitação",
        emoji: "❤️",
        cor: "#F43F5E" // rose-500
    },
    FALTA_AR: {
        label: "Falta de ar",
        emoji: "😮‍💨",
        cor: "#06B6D4" // cyan-500
    },

    // 😤 EMOCIONAIS
    IRRITABILIDADE: {
        label: "Irritabilidade",
        emoji: "😠",
        cor: "#DC2626" // red-600
    },
    ANSIEDADE: {
        label: "Ansiedade",
        emoji: "😰",
        cor: "#3B82F6" // blue-500
    },
    DESESPERO: {
        label: "Desespero",
        emoji: "😞",
        cor: "#111827" // gray-900
    },
    TRISTEZA: {
        label: "Tristeza",
        emoji: "😢",
        cor: "#6366F1" // indigo-500
    },
    DESANIMO: {
        label: "Desânimo",
        emoji: "😔",
        cor: "#64748B" // slate-500
    },
    ESTRESSE: {
        label: "Estresse",
        emoji: "😫",
        cor: "#F59E0B" // amber-500
    },
    MEDO: {
        label: "Medo",
        emoji: "😨",
        cor: "#7C3AED" // violet-600
    },
    CULPA: {
        label: "Culpa",
        emoji: "😣",
        cor: "#78716C" // stone-500
    },
    VERGONHA: {
        label: "Vergonha",
        emoji: "😳",
        cor: "#EC4899" // pink-500
    },

    // 😊 POSITIVOS
    FELICIDADE: {
        label: "Felicidade",
        emoji: "😄",
        cor: "#FACC15" // yellow-400
    },
    CALMA: {
        label: "Calma",
        emoji: "😌",
        cor: "#22C55E" // green-500
    },
    MOTIVACAO: {
        label: "Motivação",
        emoji: "🔥",
        cor: "#F97316" // orange-500
    },
    FOCO: {
        label: "Foco",
        emoji: "🎯",
        cor: "#2563EB" // blue-600
    },
    GRATIDAO: {
        label: "Gratidão",
        emoji: "🙏",
        cor: "#10B981" // emerald-500
    }
};