import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GameController } from 'phosphor-react-native'
import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';
import { THEME } from '../../theme';

export interface DuoCardProps {
  hourStart: string
  hourEnd: string
  id: string
  name: string
  weekDays: string[]
  useVoiceChannel: boolean
  yearsPaying: number
}

interface Props {
  data: DuoCardProps,
  onConnect: () => void
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo
        label='Nome'
        value={data.name}
      />
      <DuoInfo
        label='Tempo de jogo'
        value={`${data.yearsPaying} anos`}
      />
      <DuoInfo
        label='Disponibilidade'
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />
      <DuoInfo
        label='Chamada de audio?'
        value={data.useVoiceChannel ? 'Sim' : 'Não'}
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={onConnect}
      >
        <GameController />

        <Text style={styles.btnTitle}>
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}