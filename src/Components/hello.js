// const shuffleArray = (array) => {
//     const i = Math.random()
//     console.log(" i is " + i);
//     return array.sort(() => i - 0.5);
// }

// arr = [0,1,2,3,4];

// // console.log(shuffleArray([0,1,2,3,4]));
// // console.log("#2");
// // console.log(shuffleArray([0,1,2,3,4]));
// // console.log("#3");
// // console.log(shuffleArray([0,1,2,3,4]));

// var seeder = function(){
//     var seed = [];
//     return {
//      set:function(length){
//        for( var i = 0; i < length; i++ ){
//            seed.push(Math.random());
//        }
//        return seed;
//      },
//      get: function(){
//       return seed;
//      },
//      clear: function(){
//       seed = []; 
//      }
//     };
//    }
//    function randomShuffle(ar,seed){
//     for (var numbers = [], i = 0; i <6; ++i) numbers[i] = i;
//     var shuffled = [];
//     for( var i = 0, len = ar.length; i < len; i++ ){
//         var r = parseInt(seed[i] * (len - i));
//         shuffled.push(ar[numbers[r]]);
//         numbers.splice(r,1);
//     }
//     return shuffled;
//     }   


//     var seed = seeder();
//     seed.set(arr.length);
//     console.log(randomShuffle(arr,seed.get()));
//     var seed = seeder();
//     seed.set(arr.length);
// console.log(randomShuffle(arr,seed.get()));
// var seed = seeder();
// seed.set(arr.length);
// console.log(randomShuffle(arr,seed.get()));

for (var array = [], i = 0; i < 6; ++i) array[i] = i;


function shuffle(array, seed) {                // <-- ADDED ARGUMENT
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(random(seed) * m--);        // <-- MODIFIED LINE
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
      ++seed                                     // <-- ADDED LINE
    }
  
    return array;
  }
  function random(seed) {
    var x = Math.sin(seed++) * 10000; 
    return x - Math.floor(x);
  }
//   console.log(shuffle(array, 0));


  var points = [40, 100, 1, 5, 25, 10];
points.sort(function(a, b){return 0.5 - 0.3});

console.log(points);