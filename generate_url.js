function generateUrl() {
  //將所有的變數列出1~0 
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const UpperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  const collection =(lowerCaseLetters+UpperCaseLetters+numbers).split('')
  //start generate url
  let result = ''
  for (let i = 0; i < 5; i++) {
    result += collection[Math.floor(Math.random() * collection.length)]
  }
  result ='/new-url/'+result
  console.log(result)
  return result
}

generateUrl()

module.exports = generateUrl