var string = "banana";
string = string.toLowerCase();
var test = "ana"
test = test.toLowerCase();

for (var i = 0; i < string.length; i++){
    for (var j = 0; j < test.length; j++){
        if (test[j] == string[i]){
            console.log(string);
        } 
    }
}

