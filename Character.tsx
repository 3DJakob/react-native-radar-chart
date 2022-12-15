import React from 'react'
import { LayoutChangeEvent, StyleProp, Text, View, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import StatInput from './StatInput'
import { LinearGradient } from 'expo-linear-gradient'
import { Field } from './radar-chart'

const Container = styled(View)`
  border-radius: 10px;
  
  // drop shadow
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
  elevation: 10;
`

const Content = styled(View)`
  margin: 0;
  padding: 20px;
  border-radius: 6px;
  background-color: #444;
`

const StatsContainer = styled(View)`
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
`
const CaracterName = styled(Text)`
  font-size: 30px;
  font-weight: bold;
  color: ${(props: { color: string }) => props.color};
`
const Trait = styled(Text)`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`
const Row = styled(View)`
  flex-direction: row;
  margin: 5px 0;
  align-items: center;
`
const Spacer = styled(View)`
  flex: 1;
`
export interface CharacterType {
  name: string
  strength: number
  dexterity: number
  stamina: number
  charisma: number
  intelligence: number
  health: number
}

export const sampleCharacters: CharacterType[] = [{
  name: 'SpongeBob SquarePants',
  strength: 2,
  dexterity: 8,
  stamina: 3,
  charisma: 10,
  intelligence: 1,
  health: 5
},
{
  name: 'Patrick Star',
  strength: 6,
  dexterity: 1,
  stamina: 7,
  charisma: 8,
  intelligence: 1,
  health: 8
},
{
  name: 'Squidward Tentacles',
  strength: 8,
  dexterity: 2,
  stamina: 5,
  charisma: 3,
  intelligence: 9,
  health: 5
},
{
  name: 'Sandy Cheeks',
  strength: 4,
  dexterity: 3,
  stamina: 5,
  charisma: 2,
  intelligence: 7,
  health: 5
}]

export const characterToFields = (character: CharacterType): Field[] => {
  return [
    { label: 'Strength', value: character.strength / 10 },
    { label: 'Dexterity', value: character.dexterity / 10 },
    { label: 'Stamina', value: character.stamina / 10 },
    { label: 'Charisma', value: character.charisma / 10 },
    { label: 'Intelligence', value: character.intelligence / 10 },
    { label: 'Health', value: character.health / 10 }
  ]
}

export interface CharacterProps {
  character: CharacterType
  onCharacterChange: (character: CharacterType) => void
  color: string
  onLayout?: (e: LayoutChangeEvent) => void
  style?: StyleProp<ViewStyle>
}

const Character: React.FC<CharacterProps> = ({ character, onCharacterChange, color, onLayout, style }) => {
  const updateCharacter = (change: Partial<CharacterType>): void => {
    const newCharacter = {
      ...character,
      ...change
    }
    onCharacterChange(newCharacter)
  }

  const getDarkerShadeFromHex = (hex: string, percent: number): string => {
    const num = parseInt(hex.replace('#', ''), 16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) + amt
    const B = (num >> 8 & 0x00FF) + amt
    const G = (num & 0x0000FF) + amt
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1)
  }

  return (
    <Container onLayout={onLayout} style={style}>
      <LinearGradient colors={[color, getDarkerShadeFromHex(color, -20)]} style={{ backgroundColor: 'blue', borderRadius: 10, marginBottom: 10 }}>
        <Content>
          <CaracterName color={color}>{character.name}</CaracterName>
          <StatsContainer>
            <Row>
              <Trait>Strength:</Trait>
              <Spacer />
              <StatInput value={character.strength} onValue={(value) => updateCharacter({ strength: value })} color={getDarkerShadeFromHex(color, -30)} />
            </Row>
            <Row>
              <Trait>Dexterity:</Trait>
              <Spacer />
              <StatInput value={character.dexterity} onValue={(value) => updateCharacter({ dexterity: value })} color={getDarkerShadeFromHex(color, -30)} />
            </Row>
            <Row>
              <Trait>Stamina:</Trait>
              <Spacer />
              <StatInput value={character.stamina} onValue={(value) => updateCharacter({ stamina: value })} color={getDarkerShadeFromHex(color, -30)} />
            </Row>
            <Row>
              <Trait>Charisma:</Trait>
              <Spacer />
              <StatInput value={character.charisma} onValue={(value) => updateCharacter({ charisma: value })} color={getDarkerShadeFromHex(color, -30)} />
            </Row>
            <Row>
              <Trait>Intelligence:</Trait>
              <Spacer />
              <StatInput value={character.intelligence} onValue={(value) => updateCharacter({ intelligence: value })} color={getDarkerShadeFromHex(color, -30)} />
            </Row>
            <Row>
              <Trait>Health:</Trait>
              <Spacer />
              <StatInput value={character.health} onValue={(value) => updateCharacter({ health: value })} color={getDarkerShadeFromHex(color, -30)} />
            </Row>
          </StatsContainer>
        </Content>
      </LinearGradient>
    </Container>
  )
}

export default Character
