const app = {
  button1: document.getElementById('btn1'),
  registerURL: 'http://localhost:3500/register',

  register: async function () {
    try {
      const response = await fetch(app.registerURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({     
          'username': document.getElementById('username').value,
          'password': document.getElementById('password').value,
          'repass': document.getElementById('repass').value 
        })
      });
  
      const json = await response.json();
      console.log('Успех:', JSON.stringify(json));
      
    } catch (err) {
      console.error(err);
    }
  }
}

app.button1.addEventListener('click', app.register);