import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Alert, FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { FAB, Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootState, useAppDispatch } from "../store/store";
import { carregarAnotacoesThunk, deletarAnotacaoThunk } from "../store/thunks/thunks";
import { useSelector } from "react-redux";
import { sintomas } from "../interface/anotacoes-interface";
import { format, parse } from "date-fns";
import { useFocusEffect } from "@react-navigation/native";

export default function Home({ navigation }) {
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [mostrarLabel, setMostrarLabel] = useState(false);
    const [mostrarIcon, setMostrarIcon] = useState(false);
    useFocusEffect(
        useCallback(() => {
            dispatch(carregarAnotacoesThunk());
        }, [dispatch])
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Text
                    style={{ marginRight: 15, fontSize: 18 }}
                    onPress={() => setOpenModal(true)}
                >
                    +
                </Text>
            ),
        });
    }, [navigation]);

    const anotacoes = useSelector((state: RootState) => state.anotacoes);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F8FC', padding: 16 }}>

            <View style={{
                backgroundColor: '#fff',
                borderRadius: 16,
                padding: 12,
                marginBottom: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                elevation: 2,
            }}>
                <Text style={{ fontSize: 14, color: '#555' }}>Mostrar Labels</Text>
                <Switch value={mostrarLabel} onValueChange={setMostrarLabel} />
            </View>

            <View style={{
                backgroundColor: '#fff',
                borderRadius: 16,
                padding: 12,
                marginBottom: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                elevation: 2,
            }}>
                <Text style={{ fontSize: 14, color: '#555' }}>Mostrar Ícones</Text>
                <Switch value={mostrarIcon} onValueChange={setMostrarIcon} />
            </View>

            <FlatList
                data={Object.entries(anotacoes)}
                keyExtractor={(item) => item[0]}
                renderItem={({ item }) => (
                    <View style={{
                        backgroundColor: '#fff',
                        borderRadius: 20,
                        padding: 16,
                        marginBottom: 16,
                        elevation: 2,
                    }}>

                        <Text style={{
                            fontSize: 14,
                            fontWeight: '600',
                            marginBottom: 8,
                            color: '#888'
                        }}>
                            {format(parse(item[0], 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy')}
                        </Text>

                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}>
                            {item[1].map((anotacao, index) => {
                                const dado = sintomas[anotacao.SINTOMA];

                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onLongPress={() => {
                                            Alert.alert(
                                                'Excluir emoção?',
                                                dado.label,
                                                [
                                                    { text: 'Cancelar', style: 'cancel' },
                                                    {
                                                        text: 'Excluir',
                                                        style: 'destructive',
                                                        onPress: () => dispatch(deletarAnotacaoThunk(anotacao)),
                                                    }
                                                ]
                                            )
                                        }}
                                    >
                                        <View
                                            style={{
                                                minHeight: 40,
                                                minWidth: mostrarLabel ? 100 : 44,
                                                paddingHorizontal: 6,
                                                borderRadius: 20,
                                                backgroundColor: dado.cor,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                margin: 6,
                                                elevation: 1,
                                            }}
                                        >
                                            {mostrarIcon && (
                                                <Text style={{ fontSize: 18 }}>{dado.emoji}</Text>
                                            )}

                                            {mostrarLabel && (
                                                <Text style={{
                                                    fontSize: 10,
                                                    color: '#fff',
                                                    textAlign: 'center'
                                                }}>
                                                    {dado.label}
                                                </Text>
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                )}
            />

            <FAB
                icon="plus"
                onPress={() => navigation.navigate('form')}
                style={{
                    position: 'absolute',
                    bottom: 30,
                    right: 20,
                    backgroundColor: '#FF9ECF',
                    borderRadius: 30,
                }}
                color="#fff"
            />

            {openModal && (
                <Modal animationType="slide" visible transparent>

                    <TouchableOpacity
                        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
                        activeOpacity={1}
                        onPress={() => setOpenModal(false)}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            backgroundColor: '#FFF',
                            borderTopLeftRadius: 24,
                            borderTopRightRadius: 24,
                            padding: 20,
                            maxHeight: '70%',
                        }}
                    >
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginBottom: 16,
                            textAlign: 'center'
                        }}>
                            ✨ Legenda
                        </Text>

                        <FlatList
                            data={Object.entries(sintomas)}
                            keyExtractor={([key]) => key}
                            numColumns={3}
                            renderItem={({ item }) => {
                                const sintoma = item[1];

                                return (
                                    <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        marginBottom: 16,
                                    }}>
                                        <View
                                            style={{
                                                backgroundColor: sintoma.cor,
                                                width: 44,
                                                height: 44,
                                                borderRadius: 14,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginBottom: 4,
                                            }}
                                        >
                                            <Text>{sintoma.emoji}</Text>
                                        </View>

                                        <Text style={{ fontSize: 12, color: '#555' }}>
                                            {sintoma.label}
                                        </Text>
                                    </View>
                                );
                            }}
                        />
                    </View>
                </Modal>
            )}
        </SafeAreaView>
    );
}