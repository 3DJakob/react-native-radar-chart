import { LayoutChangeEvent, NativeScrollEvent, SafeAreaView, ScrollView, NativeSyntheticEvent } from 'react-native'
import RadarChart, { Chart, generateColors } from './radar-chart'
import styled from 'styled-components/native'
import Character, { characterToFields, CharacterType, labels, sampleCharacters } from './Character'
import { useState } from 'react'
import DotIndicators from './DotIndicators'
import { StatusBar } from 'expo-status-bar'

const Container = styled.View`
  flex: 1;
`

const Inset = styled.View`
  padding: 0 20px;
`

const Header = styled.Text`
  font-size: 48px;
  color: #fff;
  font-weight: bold;
`

const colors = generateColors(sampleCharacters.length)

const App: React.FC = () => {
  const [characters, setCharacters] = useState(sampleCharacters)
  const [cardWidth, setCardWidth] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const updateCharacter = (character: CharacterType): void => {
    const newCharacters = characters.map(c => {
      if (c.name === character.name) {
        return character
      }
      return c
    })
    setCharacters(newCharacters)
  }

  const updateWidth = (event: LayoutChangeEvent): void => {
    setCardWidth(event.nativeEvent.layout.width)
  }

  const updateIndex = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const index = Math.round(event.nativeEvent.contentOffset.x / cardWidth)
    setActiveIndex(index)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#333' }}>
      <StatusBar style='light' />
      <Container>
        <Inset>
          <Header>Customize characters</Header>
          <RadarChart
            labels={labels}
            colors={colors}
            gridColor='white'
          >
            {
              characters.map((character, index) => {
                return (
                  <Chart key={index} fields={characterToFields(character)} active={character.name === characters[activeIndex].name} />
                )
              })
            }
          </RadarChart>
        </Inset>

        {cardWidth === 0 && (
          <Character
            onLayout={updateWidth}
            character={characters[0]}
            color={colors[0]}
            onCharacterChange={updateCharacter}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
          />
        )}

        {cardWidth !== 0 && (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={2}
            onScroll={updateIndex}
            horizontal
            snapToInterval={cardWidth}
            style={{ position: 'absolute', bottom: 0 }}
            decelerationRate='fast'
          >
            {
          characters.map((character, index) => {
            return (
              <Character
                style={{ width: cardWidth - 20, marginHorizontal: 10 }}
                key={character.name}
                character={character}
                color={colors[index]}
                onCharacterChange={updateCharacter}
              />
            )
          })
        }
          </ScrollView>
        )}
        <DotIndicators
          style={{ position: 'absolute', bottom: -14, left: 0, right: 0 }}
          index={activeIndex}
          highlightColor={colors[activeIndex]}
          length={characters.length}
        />
      </Container>
    </SafeAreaView>
  )
}

export default App
