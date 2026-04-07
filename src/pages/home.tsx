import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import {
    Alert,
    FlatList,
    Modal,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { FAB, Switch } from "react-native-paper";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { RootState, useAppDispatch } from "../store/store";
import { carregarAnotacoesThunk, deletarAnotacaoThunk } from "../store/thunks/thunks";
import { useSelector } from "react-redux";
import { sintomas } from "../interface/anotacoes-interface";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useFocusEffect } from "@react-navigation/native";
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";
import { useRef } from "react";

export default function Home({ navigation }) {
    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();
    const [openShareModal, setOpenShareModal] = useState(false);
    const [mesSelecionado, setMesSelecionado] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [mostrarLabel, setMostrarLabel] = useState(false);
    const [mostrarIcon, setMostrarIcon] = useState(false);

    const anotacoes = useSelector((state: RootState) => state.anotacoes);

    const viewShotRef = useRef<any>(null);

    const compartilharImagem = async (mes: string) => {
        try {
            setMesSelecionado(mes);

            await new Promise(resolve => setTimeout(resolve, 300));

            const uri = await viewShotRef.current.capture();

            await Share.open({
                url: uri,
                type: 'image/png',
            });

        } catch (error) {
            Alert.alert("Erro", "Falha ao compartilhar imagem");
        }
    };

    useFocusEffect(
        useCallback(() => {
            dispatch(carregarAnotacoesThunk());
        }, [dispatch])
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Text
                    style={{ marginRight: 15, fontSize: 22, fontWeight: "bold" }}
                    onPress={() => setOpenModal(true)}
                >
                    +
                </Text>
            ),
        });
    }, [navigation]);

    const anotacoesPorMes = useMemo(() => {
        const agrupado: Record<string, Record<string, typeof anotacoes[string]>> = {};

        Object.entries(anotacoes)
            .filter(([_, lista]) => lista.length > 0)
            .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
            .forEach(([data, lista]) => {
                const dateObj = parse(data, 'yyyy-MM-dd', new Date());
                const mes = format(dateObj, 'MMMM yyyy', { locale: ptBR });

                if (!agrupado[mes]) {
                    agrupado[mes] = {};
                }

                agrupado[mes][data] = lista;
            });

        return agrupado;
    }, [anotacoes]);

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
                data={Object.entries(anotacoesPorMes)}
                keyExtractor={(item) => item[0]}
                contentContainerStyle={{ paddingBottom: 100 }}
                renderItem={({ item }) => {
                    const [mes, dias] = item;

                    return (
                        <View style={{ marginBottom: 20 }}>

                            {/* MÊS */}
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginBottom: 10,
                                color: '#333',
                                textTransform: 'capitalize'
                            }}>
                                {mes}
                            </Text>

                            {/* TABELA DE DIAS */}
                            <View style={{
                                backgroundColor: '#fff',
                                borderRadius: 16,
                                overflow: 'hidden',
                                elevation: 2,
                            }}>
                                {Object.entries(dias).map(([dia, lista], index) => {
                                    const dataFormatada = format(
                                        parse(dia, 'yyyy-MM-dd', new Date()),
                                        'dd/MM'
                                    );

                                    return (
                                        <View
                                            key={dia}
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingVertical: 10,
                                                paddingHorizontal: 12,
                                                borderBottomWidth: index !== Object.keys(dias).length - 1 ? 1 : 0,
                                                borderBottomColor: '#eee',
                                            }}
                                        >
                                            {/* COLUNA DIA */}
                                            <View style={{
                                                width: 60,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                <Text style={{
                                                    fontSize: 13,
                                                    fontWeight: 'bold',
                                                    color: '#666'
                                                }}>
                                                    {dataFormatada}
                                                </Text>
                                            </View>

                                            {/* COLUNA EMOÇÕES */}
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                            }}>
                                                {lista.map((anotacao, index) => {
                                                    const dado = sintomas[anotacao.SINTOMA];
                                                    const dataAnotacao = format(
                                                        anotacao.DATA,
                                                        'dd/MM/yyyy HH:mm'
                                                    );

                                                    return (
                                                        <TouchableOpacity
                                                            key={index}
                                                            onPress={() => {
                                                                Alert.alert(
                                                                    dado.label,
                                                                    `Data: ${dataAnotacao}\nObs.: ${anotacao.DESCRICAO}`
                                                                );
                                                            }}
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
                                                                    height: 36,
                                                                    minWidth: mostrarLabel ? 90 : 36,
                                                                    paddingHorizontal: 6,
                                                                    borderRadius: 12,
                                                                    backgroundColor: dado.cor,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    margin: 4,
                                                                }}
                                                            >
                                                                {mostrarIcon && (
                                                                    <Text style={{ fontSize: 16 }}>
                                                                        {dado.emoji}
                                                                    </Text>
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
                                    );
                                })}
                            </View>
                        </View>
                    );
                }}
            />

            <FAB
                icon="plus"
                onPress={() => navigation.navigate('form')}
                style={{
                    position: 'absolute',
                    bottom: insets.bottom + 16,
                    right: 20,
                    backgroundColor: '#FF9ECF',
                    borderRadius: 30,
                }}
                color="#fff"
            />
            <FAB
                icon="share-variant"
                onPress={() => setOpenShareModal(true)}
                style={{
                    position: 'absolute',
                    bottom: insets.bottom + 90,
                    right: 20,
                    backgroundColor: '#6C63FF',
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
                            paddingBottom: insets.bottom + 20,
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
            <View
                style={{
                    position: 'absolute',
                    top: -9999,
                }}
            >
                <ViewShot
                    ref={viewShotRef}
                    options={{ format: "png", quality: 1 }}
                >
                    <View style={{
                        width: 300,
                        backgroundColor: "#fff",
                        padding: 16,
                        borderRadius: 16,
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: 10
                        }}>
                            Meu resumo emocional 💖
                        </Text>

                        {Object.entries(anotacoes).slice(0, 5).map(([dia, lista]) => (
                            <View key={dia} style={{ marginBottom: 8 }}>
                                <Text style={{ fontSize: 12, color: '#666' }}>
                                    {format(new Date(dia), "dd/MM")}
                                </Text>

                                <View style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap'
                                }}>
                                    {lista.map((a, i) => {
                                        const dado = sintomas[a.SINTOMA];

                                        return (
                                            <View
                                                key={i}
                                                style={{
                                                    backgroundColor: dado.cor,
                                                    borderRadius: 8,
                                                    padding: 4,
                                                    margin: 2
                                                }}
                                            >
                                                <Text>{dado.emoji}</Text>
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        ))}

                        <Text style={{
                            marginTop: 10,
                            fontWeight: 'bold',
                            fontSize: 12
                        }}>
                            Legenda
                        </Text>

                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginTop: 4
                        }}>
                            {Object.values(sintomas).map((s, i) => (
                                <View key={i} style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    margin: 2
                                }}>
                                    <Text>{s.emoji}</Text>
                                    <Text style={{ fontSize: 10, marginLeft: 2 }}>
                                        {s.label}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </ViewShot>
            </View>
            <View style={{ position: 'absolute', top: -9999 }}>
                <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
                    {mesSelecionado && (
                        <View style={{
                            width: 320,
                            backgroundColor: "#fff",
                            padding: 16,
                            borderRadius: 16,
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                textAlign: "center",
                                marginBottom: 10
                            }}>
                                {mesSelecionado}
                            </Text>

                            {Object.entries(anotacoesPorMes[mesSelecionado] || {}).map(([dia, lista]) => (
                                <View key={dia} style={{ marginBottom: 8 }}>
                                    <Text style={{ fontSize: 12, color: '#666' }}>
                                        {format(parse(dia, 'yyyy-MM-dd', new Date()), "dd/MM")}
                                    </Text>

                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {lista.map((a, i) => {
                                            const dado = sintomas[a.SINTOMA];

                                            return (
                                                <View
                                                    key={i}
                                                    style={{
                                                        backgroundColor: dado.cor,
                                                        borderRadius: 8,
                                                        padding: 4,
                                                        margin: 2
                                                    }}
                                                >
                                                    <Text>{dado.emoji}</Text>
                                                </View>
                                            );
                                        })}
                                    </View>
                                </View>
                            ))}

                            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>
                                Legenda
                            </Text>

                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {Object.values(sintomas).map((s, i) => (
                                    <View key={i} style={{ flexDirection: 'row', margin: 2 }}>
                                        <Text>{s.emoji}</Text>
                                        <Text style={{ fontSize: 10 }}>{s.label}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </ViewShot>
            </View>
            <Modal visible={openShareModal} transparent animationType="slide">
                <TouchableOpacity
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
                    onPress={() => setOpenShareModal(false)}
                />

                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    padding: 20
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginBottom: 10,
                        textAlign: 'center'
                    }}>
                        Selecionar mês
                    </Text>

                    {Object.keys(anotacoesPorMes).map((mes) => (
                        <TouchableOpacity
                            key={mes}
                            style={{
                                padding: 12,
                                borderBottomWidth: 1,
                                borderBottomColor: '#eee'
                            }}
                            onPress={() => {
                                setOpenShareModal(false);
                                compartilharImagem(mes);
                            }}
                        >
                            <Text style={{ textTransform: 'capitalize' }}>
                                {mes}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Modal>
        </SafeAreaView>
    );
}