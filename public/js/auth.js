document.getElementById('btn1').addEventListener('click', async () => {
  try {
    const response = await fetch('http://localhost:3500/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({     
        'username': document.getElementById('username').value,
        'password': document.getElementById('password').value,
      })
    });

    if (response.status === 200) {
      const json = await response.json();
      window.localStorage.setItem( 'accessToken', json.accessToken);
      window.open('http://localhost:3500');
      window.close();
    }
    
  } catch (err) {
    console.error(err);
  }
});