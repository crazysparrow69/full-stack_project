const SingletonFactory = (function(){
  class App {
    elements = {
      title: document.getElementById('title'),
      ul: document.getElementById('info__ul'),
      div: document.getElementById('links'),
    };
  
    createNote(data) {
      const newLi = document.createElement('li');
      newLi.innerHTML = data;
      this.elements.ul.append(newLi);
    };
  
    createUsername(username) {
      this.elements.title.innerHTML = username;
    };
  
    createLogout() {
      const link = document.createElement('a');
      link.href = 'http://localhost:3500/logout';
      link.innerHTML = 'Logout';
      this.elements.div.append(link);
    };
  
    deleteElementById(...idArray) {
      idArray.forEach ( id => {
        const elem = document.getElementById(id);
        elem.remove();
      });
    };
  
    async createNewNote() {
      try {
        const accessToken = localStorage.accessToken;
        const text = document.getElementById('input').value;
        const response = await fetch('http://localhost:3500', {
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
          const response = await fetch('http://localhost:3500/refresh', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          const json = await response.json();
          localStorage.accessToken = json.accessToken;
          this.createNewNote();
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    async loadUserData() {
      try {
        const response = await fetch('http://localhost:3500', {
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

  let instance;

  return {
      getInstance: function(){
      if (!instance) {
        instance = new App();
        delete instance.constructor;
      }
      return instance;
    }
  };

})();

window.onload = () => {
  const app = SingletonFactory.getInstance();
  app.loadUserData();
  document.getElementById('createNote').addEventListener('click', app.createNewNote);
};
