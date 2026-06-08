const http = require('http');

async function run() {
  try {
    const res = await fetch("http://localhost:5000/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test User", email: "test2@test.com", password: "password123" })
    });
    console.log("Register:", await res.json());

    const res2 = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test2@test.com", password: "password123" })
    });
    const loginData = await res2.json();
    console.log("Login:", loginData);

    if (loginData.token) {
      const res3 = await fetch("http://localhost:5000/api/users", {
        headers: { "Authorization": `Bearer ${loginData.token}` }
      });
      console.log("Users:", await res3.json());
    }
  } catch(e) {
    console.error(e);
  }
}
run();
