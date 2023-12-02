const terminal = document.getElementById('terminal');
const inputField = document.getElementById('inputField');
const userList = document.getElementById('userList');

let username;
const users = [];

function addToTerminal(output) {
  terminal.innerHTML = `${terminal.innerHTML}<div>${output}</div>`;
}

function addUser(username) {
  addToTerminal(`${username} katıldı.`);
  users.push(username);
  updateUsers();
}

function removeUser(username) {
  addToTerminal(`${username} ayrıldı.`);
  const index = users.indexOf(username);
  if (index !== -1) {
    users.splice(index, 1);
    updateUsers();
  }
}

function updateUsers() {
  userList.innerHTML = `<strong>Kullanıcılar:</strong> ${users.join(', ')}`;
}

function handleCommand(command) {
  addToTerminal(`<span class="prompt">> </span>${username}: ${command}`);
  // Kullanılabilir komutları burada kontrol et
  if (command.toLowerCase() === 'merhaba') {
    addToTerminal(`Merhaba, ${username}`);
  } else if (command.toLowerCase() === 'komutlar') {
    addToTerminal('merhaba, komutlar, kullanıcılar, ');
  } else if (command.toLowerCase() === 'kullanıcılar') {
    addToTerminal(`Aktif Kullanıcılar: ${users.join(', ')}`);
  } else if (command.toLowerCase() === 'd6') {
    addToTerminal(`${Math.floor(Math.random() * 6) + 1}`)
  } else if (command.toLowerCase() === 'd10') {
    addToTerminal(`${Math.floor(Math.random() * 10) + 1}`)
  } else if (command.toLowerCase() === 'd12') {
    addToTerminal(`${Math.floor(Math.random() * 12) + 1}`)
  } else if (command.toLowerCase() === 'd16') {
    addToTerminal(`${Math.floor(Math.random() * 16) + 1}`)
  } else if (command.toLowerCase() === 'd20') {
    addToTerminal(`${Math.floor(Math.random() * 20) + 1}`)
  } else if (command.toLowerCase() === 'clear') {
    clearTerminal();
  }
}

function clearTerminal() {
  terminal.innerHTML = '';
}

inputField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (!username) {
      username = inputField.value.trim();
      addUser(username);
      inputField.placeholder = 'Buraya Komut Girin...';
      inputField.value = '';
    } else {
      const command = inputField.value;
      handleCommand(command);
      inputField.value = '';
    }
  }
});

// Kullanıcı sekme kapandığında, kullanıcı listesini güncelle
window.addEventListener('beforeunload', () => {
  if (username) {
    removeUser(username);
    username = '';
  }
});

// Kullanıcı odadan ayrıldığında, kullanıcı listesini güncelle
inputField.addEventListener('blur', () => {
  if (username) {
    removeUser(username);
    username = '';
    inputField.placeholder = 'İsminizi Girin...';
  }
});
