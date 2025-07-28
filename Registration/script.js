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
    if (totalMembers < limits.min) {
      e.preventDefault();
      alert(`Minimum ${limits.min} players required to register for ${sportName}.`);
    }
  });
});
