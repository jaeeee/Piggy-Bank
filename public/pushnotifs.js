var requestButton = document.querySelector(".request-button");
var showButton = document.querySelector(".show-button");

function onGranted() {
  requestButton.style.background = "green";
}

function onDenied() {
  requestButton.style.background = "red";
}

requestButton.onclick = function() {
  Push.Permission.request(onGranted, onDenied);
};

showButton.onclick = function() {
  Push.create("Piggy Bank", {
    body: "Welcome back to Piggy Bank!",
    // icon: "",
    timeout: 5000,
    onClick: function() {
      console.log(this);
    }
  });
};
