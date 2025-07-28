
document.addEventListener('DOMContentLoaded', () => {
  const title = document.title.toLowerCase();
  const playerLimits = {
    cricket: { min: 5, max: 15 },
    football: { min: 7, max: 11 },
    kabaddi: { min: 5, max: 12 },
    volleyball: { min: 6, max: 12 },
    throwball: { min: 6, max: 12 },
    basketball: { min: 5, max: 10 },
    hockey: { min: 7, max: 16 }
  };
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









const slider = document.querySelector('.login-register-slider');
    const glass = document.querySelector('.slider-glass');
    const login = document.querySelector('.login-slide');
    const register = document.querySelector('.register-slide');
    const lrbut = document.querySelector('.logregbut');
    const heading = document.querySelector('.logregheading');
    const usernameInput = document.querySelector('.username');
    const passwordInput = document.querySelector('.password');

    let mode = 0;

    function moveGlass(target) {
      const targetRect = target.getBoundingClientRect();
      const sliderRect = slider.getBoundingClientRect();

      glass.style.width = `${targetRect.width}px`;
      glass.style.height = `${targetRect.height}px`;
      glass.style.left = `${targetRect.left - sliderRect.left}px`;
      glass.style.top = `${targetRect.top - sliderRect.top}px`;

      lrbut.innerText = target.innerText;
      heading.innerText = target.innerText;
      mode = target.innerText === 'Login' ? 0 : 1;

      // Clear input fields
      usernameInput.value = '';
      passwordInput.value = '';
    }

    login.onclick = () => moveGlass(login);
    register.onclick = () => moveGlass(register);

    window.onload = () => {
      moveGlass(login);
      mode = 0;

      // Optional: preload initial users
      if (!localStorage.getItem("users")) {
        const usersDB = {
          users: [
            { username: "varun123", password: "pass123" },
            { username: "john_doe", password: "helloWorld" },
            { username: "krida", password: "verse2025" }
          ]
        };
        localStorage.setItem("users", JSON.stringify(usersDB.users));
      }
    };

    function lrfun() {
      const un = usernameInput.value.trim();
      const pwd = passwordInput.value.trim();

      if (!un || !pwd) {
        alert("Please fill in both fields.");
        return;
      }

      if (mode === 0) {
        const result = loginUser(un, pwd);
        if (result.success) {
          alert("Login successful!");
          window.location.href = "../dashboard/dashboard.html";
        } else {
          alert(result.message);
        }
      } else {
        const result = registerUser(un, pwd);
        alert(result.message);
        if (result.success) {
          window.location.href = "../dashboard/dashboard.html";
        }
      }
    }





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
