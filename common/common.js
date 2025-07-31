
document.addEventListener('DOMContentLoaded', () => {
  const title = document.title.toLowerCase();
  const playerLimits = {
    cricket:    { min: 11, max: 15 },  
    football:   { min: 7,  max: 16 },  
    kabaddi:    { min: 7,  max: 12 },  
    volleyball: { min: 6,  max: 12 },  
    throwball:  { min: 6,  max: 12 },  
    basketball: { min: 5,  max: 12 }, 
    hockey:     { min: 7,  max: 16 }   
  }


  const sportKey = Object.keys(playerLimits).find(key => title.includes(key));
  const limits = playerLimits[sportKey] || { min: 1, max: 15 };
  const sportName = sportKey?.charAt(0).toUpperCase() + sportKey?.slice(1) || 'Sport';

  let totalMembers = 0;
  const totalDisplay = document.querySelector('.total-members');
  const addBtn = document.querySelector('.addBtn');
  const submitBtn = document.querySelector('.submit-btn');
  const form = document.querySelector('form');

  addBtn.addEventListener('click', () => {
    const input = document.querySelector('.memberName');
    const name = input.value.trim();
    const existingNames = Array.from(document.querySelectorAll('.member-box span:first-child')).map(span => span.textContent);

    if (name !== '' && !existingNames.includes(name) && totalMembers < limits.max) {
      const lst = document.createElement('div');
      lst.innerHTML = `<span>${name}</span><span class="remove-btn">&#x274C;</span>`;

      lst.querySelector('.remove-btn').addEventListener('click', () => {
        lst.remove();
        totalMembers--;
        totalDisplay.textContent = `Total Members: ${totalMembers}`;
        if (totalMembers < limits.max) {
          addBtn.disabled = false;
          addBtn.style.opacity = 1;
        }
      });

      document.querySelector('.member-box').appendChild(lst);
      input.value = '';
      totalMembers++;
      totalDisplay.textContent = `Total Members: ${totalMembers}`;

      if (totalMembers === limits.max) {
        addBtn.disabled = true;
        addBtn.style.opacity = 0.5;
      }
    } else if (existingNames.includes(name)) {
      alert("This name is already added.");
    } else if (totalMembers >= limits.max) {
      alert(`Maximum ${limits.max} players allowed.`);
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (totalMembers < limits.min) {
      alert(`Minimum ${limits.min} players required to register for ${sportName}.`);
      return;
    }
    if(totalMembers>limits.max){
      alert(`Maximum ${limits.max} players required to register for ${sportName}.`);
    }

    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) {
      alert("Please login first.");
      window.location.href = "../login/login.html";
      return;
    }

    // Collect player names
    const players = Array.from(document.querySelectorAll('.member-box span:first-child'))
      .map(span => span.textContent);

    // Save under current user
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map(user => {
      if (user.username === loggedInUser) {
        if (!user.teams) user.teams = {};
        user.teams[sportName.toLowerCase()] = players;
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert(`Registered for ${sportName} successfully!`);
    window.location.href = "../dashboard/dashboard.html";
  });
});







function registerUser(username, password) {
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  const exists = users.some(user => user.username === username);
  if (exists) return { success: false, message: "Username already exists." };

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
  setLoggedInUser(username);
  return { success: true, message: "Registration successful!" };
}

function loginUser(username, password) {
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    setLoggedInUser(username);
    return { success: true };
  }
  return { success: false, message: "Invalid username or password." };
}

function setLoggedInUser(username) {
  localStorage.setItem("loggedInUser", username);
}

function getLoggedInUser() {
  return localStorage.getItem("loggedInUser");
}

function logoutUser() {
  localStorage.removeItem("loggedInUser");
}
