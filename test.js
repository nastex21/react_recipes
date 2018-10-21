var arr = [0, 1]
var num = 0;

var x = function () {
  var check = arr.indexOf(num);
  console.log(check);

  if (check === -1){
      return num
  } else {
      num++;
      console.log(num);
      x();
  }
  return num;
}

console.log(x());