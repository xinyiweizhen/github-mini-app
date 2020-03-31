import Colors from './colors'

// eslint-disable-next-line import/prefer-default-export
export const renderLanguageColor = (language)=>{
    if(Object.keys(Colors).includes(language)){
      return Colors[language].color
    }else{
      return '#7f7f7f'
    }
    
}

export const renderLanguageUrl = (language)=>{
    if(Object.keys(Colors).includes(language)){
      return Colors[language].url
    }else{
      return null
    }
}