var Name = document.querySelector("#Name");
var Url = document.querySelector("#Url");
var sites = [];
if (localStorage.getItem("data") !== null) {
  sites = JSON.parse(localStorage.getItem("data"));
  displayData();
} else {
  sites = [];
}

document.querySelector(".myButton").addEventListener("click", add);
document.querySelector("#Name").addEventListener("input", function () {
  validation(this, "msgName");
});

document.querySelector("#Url").addEventListener("input", function () {
  validation(this, "msgUrl");
});



function add() {
  if (validation(Name, "msgName") && validation(Url, "msgUrl")) {
    var site = { name: Name.value, url: Url.value };
    sites.push(site);
    localStorage.setItem("data", JSON.stringify(sites));
    displayData();
    clearData();
  } else {
    alert("Please fill in all fields");
  }
}

function displayData() {
  var content = ``;
  for (var i = 0; i < sites.length; i++) {
    content += `<tr>
    <td>${i}</td>
    <td>${sites[i].name}</td>
    <td> <button onclick="visitSite(${i})" id="visitBtn-${i}"  class="btn   btn-outline-success btn-sm">Visit</button> </td>
    <td> <button onclick="deleteSite(${i})" id="deleteBtn-${i}"class="btn btn-outline-danger btn-sm">Delete</button> </td>
    </tr>
    `;
  }
  document.querySelector("#tableData").innerHTML = content;

   
//   for (var i = 0; i < sites.length; i++) {
//     document.getElementById(`visitBtn-${i}`).addEventListener('click', function() {
//       visitSite(i);
//     });

//     document.getElementById(`deleteBtn-${i}`).addEventListener('click', function() {
//       deleteSite(i);
//     });
//   }
}

function clearData() {
  Name.value = "";
  Url.value = "";
  Name.classList.remove("is-valid");
  Url.classList.remove("is-valid");
}

function deleteSite(index) {
  sites.splice(index, 1);
  displayData();
  localStorage.setItem("data", JSON.stringify(sites));
}

function visitSite(index) {
  open(sites[index].url, "_blank");

}

function validation(element, msgId) {
  var msg = document.getElementById(msgId);
  var regex = {
    Name: /^[A-Z][a-z]{3,8}$/,
    Url: /^(http(s):\/\/.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{3,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g,
  };
  if (regex[element.id] && regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msg.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    msg.classList.remove("d-none");
    return false;
  }
}
