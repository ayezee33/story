function userNameInput () {
  var firstName = document.getElementById('firstName').value;
  var threeMonthGoal = document.getElementById('threeMonthGoal').value;
  var result = document.getElementById('result');
}

 document.getElementById("result").innerHTML = 'Your name is: ' + firstName + ' and your 3 month goal is ' + threeMonthGoal;
 
var submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', userNameInput, false);

//# sourceMappingURL=app.js.map
