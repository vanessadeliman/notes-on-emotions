import React, { useCallback } from "react";
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity
} from "react-native";
import Dropdown from "./dropdown";
import DataPicker from "./date-picker";
import { salvarAnotacao } from "../store/thunks/thunks";
import { Sintoma } from "../interface/anotacoes-interface";
import { useAppDispatch } from "../store/store";

export default function AnotacaoForm() {
    const dispatch = useAppDispatch();

    const [sintoma, setSintoma] = React.useState<Sintoma | null>(null);
    const [descricao, setDescricao] = React.useState<string>("");
    const [data, setData] = React.useState<Date>(new Date());

    const limparForm = useCallback(() => {
        setDescricao("");
        setSintoma(null);
        setData(new Date());
    }, []);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <Text style={styles.label}>📅 Data</Text>
                <View style={styles.card}>
                    <DataPicker onChange={setData} value={data} />
                </View>
                <Text style={styles.label}>💖 Sintoma</Text>
                <Dropdown callback={setSintoma} initValue={sintoma} />
                <Text style={styles.label}>📝 Observação</Text>
                <View style={styles.card}>
                    <TextInput
                        value={descricao}
                        onChangeText={setDescricao}
                        style={styles.textInput}
                        placeholder="Escreva como você se sentiu..."
                        placeholderTextColor="#999"
                        multiline
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        if (!sintoma) return;

                        await dispatch(
                            salvarAnotacao({
                                ID: `${Date.now()}`,
                                SINTOMA: sintoma,
                                DESCRICAO: descricao,
                                DATA: data
                            })
                        );

                        limparForm();
                    }}
                >
                    <Text style={styles.buttonText}>✨ Salvar anotação</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#F7F8FC",
    },

    label: {
        fontSize: 14,
        color: "#666",
        marginBottom: 6,
        marginTop: 12,
        marginLeft: 4,
    },

    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 10,
        elevation: 2,
    },

    textInput: {
        minHeight: 80,
        fontSize: 14,
        color: "#333",
    },

    button: {
        marginTop: 24,
        backgroundColor: "#FF9ECF",
        paddingVertical: 14,
        borderRadius: 20,
        alignItems: "center",
        elevation: 3,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
});