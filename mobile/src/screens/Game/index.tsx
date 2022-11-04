import React, { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

import { NavGameParams } from '../../@types/navigation';

import { URL } from '../../utils/api'

import logoImg from '../../assets/logo-nlw-esports.png'
import { styles } from './styles';
import { THEME } from '../../theme';

export function Game() {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  const route = useRoute();
  const game = route.params as NavGameParams

  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  useEffect(() => {
    fetch(`${URL}/games/${game.id}/ads`)
      .then(res => res.json())
      .then(data => setDuos(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleGoBack}
          >
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image
            source={logoImg}
            style={styles.logo}
          />
          <View style={styles.right}>
          </View>
        </View>
        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode='cover'
        />
        <Heading title={game.title} subtitle={'Conecte-se e começe a jogar!'} />
        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return <DuoCard data={item} onConnect={() => {
              console.log('>>>>Conectando!!')
            }} />
          }}
          horizontal
          style={styles.containerList}
          contentContainerStyle={styles.contentList}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </Background>
  );
}