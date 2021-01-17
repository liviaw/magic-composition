const shuffleArray = (array) =>[...array].sort(() => Math.random() - 0.5);


// http://stackoverflow.com/questions/962802#962890
const shuffle = (arraySize) => {
  for (var array=[],i=0;i<arraySize;++i) array[i]=i;
  return shuffleArray(array);
}
console.log(shuffle(40))

