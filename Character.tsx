import React from 'react'
import { LayoutChangeEvent, StyleProp, Text, View, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import StatInput from './StatInput'
import { LinearGradient } from 'expo-linear-gradient'

export const labels = [
  'Charisma',
  'Dexterity',
  'Health',
  'Intelligence',
  'Stamina',
  'Strength'
]

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

export interface CharacterProperties {
  charisma: number
  dexterity: number
  health: number
  intelligence: number
  stamina: number
  strength: number
}

export interface CharacterType extends CharacterProperties {
  name: string
}

export const sampleCharacters: CharacterType[] = [{
  charisma: 7,
  dexterity: 8,
  health: 5,
  intelligence: 1,
  name: 'SpongeBob SquarePants',
  stamina: 3,
  strength: 2
},
{
  charisma: 8,
  dexterity: 1,
  health: 8,
  intelligence: 1,
  name: 'Patrick Star',
  stamina: 7,
  strength: 6
},
{
  charisma: 3,
  dexterity: 2,
  health: 5,
  intelligence: 9,
  name: 'Squidward Tentacles',
  stamina: 5,
  strength: 8
},
{
  charisma: 2,
  dexterity: 3,
  health: 5,
  intelligence: 7,
  name: 'Sandy Cheeks',
  stamina: 5,
  strength: 4
}]

export const characterToFields = (character: CharacterType): number[] => {
  return [
    character.charisma / 10,
    character.dexterity / 10,
    character.health / 10,
    character.intelligence / 10,
    character.stamina / 10,
    character.strength / 10
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
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
                              (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 +
                              (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1)
  }

  return (
    <Container onLayout={onLayout} style={style}>
      <LinearGradient colors={[color, getDarkerShadeFromHex(color, -20)]} style={{ backgroundColor: 'blue', borderRadius: 10, marginBottom: 10 }}>
        <Content>
          <CaracterName color={color}>{character.name}</CaracterName>
          <StatsContainer>

            {
              labels.map((label, index) => {
                const value = character[label.toLowerCase() as keyof CharacterProperties]
                return (
                  <Row key={index}>
                    <Trait>{label}:</Trait>
                    <Spacer />
                    <StatInput
                      value={value}
                      onValue={(value) => updateCharacter({
                        [label.toLowerCase()]: value
                      })}
                      color={getDarkerShadeFromHex(color, -30)}
                    />
                  </Row>
                )
              })
            }
          </StatsContainer>
        </Content>
      </LinearGradient>
    </Container>
  )
}

export default Character
