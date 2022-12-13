const app = {
  elements: {
    title: document.getElementById('title'),
    ul: document.getElementById('info__ul'),
    div: document.getElementById('links'),
  },
  links: {
    homeURL: 'http://localhost:3500',
    logoutURL: 'http://localhost:3500/logout',
    refreshURL: 'http://localhost:3500/refresh',
  },

  createNote: function (data) {
    const newLi = document.createElement('li');
    newLi.innerHTML = data;
    this.elements.ul.append(newLi);
  },

  createUsername: function (username) {
    this.elements.title.innerHTML = username;
  },

  createLogout: function () {
    const link = document.createElement('a');
    link.href = this.links.logoutURL;
    link.innerHTML = 'Logout';
    this.elements.div.append(link);
  },

  deleteElementById: function (...idArray) {
    idArray.forEach ( id => {
      const elem = document.getElementById(id);
      elem.remove();
    });
  },

  createNewNote: async function () {
    try {
      const accessToken = localStorage.accessToken;
      const text = document.getElementById('input').value;
      const response = await fetch(app.links.homeURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({     
          'text': text
        })
      });
  
      if (response.status === 200) window.location.reload();
      if (response.status === 403) {
        const response = await fetch(app.links.refreshURL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const json = await response.json();
        localStorage.accessToken = json.accessToken;
        app.createNewNote();
      }
    } catch (err) {
      console.error(err);
    }
  },

  loadUserData: async function () {
    try {
      const response = await fetch(this.links.homeURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({     
          'shit': 'shit'
        })
      });
      if (response.status === 401) return;
  
      const userData = await response.json();
      this.createUsername(userData.username);
      userData.notes.forEach( note => this.createNote(note));
      this.deleteElementById('signIn', 'register');
      this.createLogout();
  
    } catch (err) {
      console.error(err);
    }
  }
};

app.loadUserData();
document.getElementById('createNote').addEventListener('click', app.createNewNote);