## React Native Radar Chart

![](demo.gif)

React Native Radar Chart is a module that lets you display a radar chart, which is a visual representation of an object's multivariate data. You can use it to display a character's stats, such as strength, intelligence, and agility, and adjust them dynamically. The module is fully animated on stat changes.

### Usage

Here is a minimal demo of the module.

```
<RadarChart
  labels={['Strength', 'Stamina', 'Charisma']}
  colors={['blue']}
  gridColor='white'
>
  <Chart key={index} fields={[0.3, 0.5, 1.0]}/>
</RadarChart>
```

Multiple `<Chart>` components can be added in order to display multiple charts at the same time.

### RadarChart Props
The <RadarChart> component accepts the following props:

### `children`

- optional
- type: `React.ReactNode`

The children `<Chart>`s to render inside the radar chart parent element.

### `labels`

- optional
- type: `string[]`
- default: `true`

The labels to diplay in the radar chart corners.

### `labelOffset`

- optional
- type: `Number`
- default: `5`

Adjusts the offset of the labels from the outer point of the circle.

### `zoom`

- optional
- type: `Number`
- default: `80`

The zoom level of the radar chart. `100` = `100%` of the viewbox.

### Chart Props
The `<Chart>` component accepts the following props:

### `active`

- optional
- type: `boolean`
- default: `true`

If the chart should be displayed with full opacity.

### `color`

- optional
- type: `string`
- default: `randomly generated color`

The color of the chart.

### `fields`

- type: `number[]`

An array of numeric values to be displayed in the chart. Should be in the range `0-1`. Ordering should be the same as for the labels prop.