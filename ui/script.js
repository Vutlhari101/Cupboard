const button = document.getElementById("loadUsers");
const usersList = document.getElementById("users");

//get users
button.addEventListener("click", async () => {
  //access the route
  const response = await fetch("http://localhost:3000/users/all");
  const users = await response.json();

  usersList.innerHTML = "";

    if (users.message) {
      usersList.textContent = users.message;
        return;
    }

  //if users exist... show each as a list items
  users.forEach((user) => {
    const item = document.createElement("li");
    item.textContent = `${user.name} ${user.surname}`;
    usersList.appendChild(item);
  });
});


const userForm = document.getElementById("userForm");
const formMessage = document.getElementById("formMessage");

//add a new user
userForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  //Get user as json object
  const user = {
    name: document.getElementById("name").value,
    surname: document.getElementById("surname").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
  };

  try {
    //send data to api
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    //get response from api
    const result = await response.json();

    if (!response.ok) {
      formMessage.textContent = result.error;
      return;
    }

    formMessage.textContent = result.message;
    userForm.reset();
  } catch (error) {
    formMessage.textContent = "Could not connect to the API";
  }
});