export const pitch = 2.54
export const holeDiameter = 1.2
export const copperPadDiameter = 2.1

export type wireColorName =  'black' 
                        | 'brown'
                        | 'white'
                        | 'grey'
                        | 'red'
                        | 'green'
                        | 'blue'
                        | 'orange'
                        | 'yellow'
                        | 'purple'

type wireColors = {[key in wireColorName]: string};

export const wireColors: wireColors = {
  black: '#364059',
  brown: '#a4716c',
  white: '#f0eff9',
  grey: '#9899a3',
  red: '#c1515a',
  green: '#82dca8',
  blue: '#358fe4',
  orange: '#eb7540',
  yellow: '#e8fb99',
  purple: '#a86aaf',
}