import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, FlatList, SafeAreaView } from 'react-native';

import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { NavGameParams } from '../../@types/navigation';
import { URL } from '../../utils/api'

import logoImg from '../../assets/logo-nlw-esports.png'
import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])
  const navigation = useNavigation()

  function handleOpenGame(params: NavGameParams) {
    navigation.navigate('game', params)
  }

  useEffect(() => {
    fetch(`${URL}/games`)
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error(err));
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />
        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />
        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <GameCard data={item} onPress={() => handleOpenGame(item)} />}
          contentContainerStyle={styles.contentList}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </SafeAreaView>
    </Background>
  );
}