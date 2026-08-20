(function () {
  const KEY_USERS = "paisagauge_users";
  const KEY_SESSION = "paisagauge_session";

  async function sha256(text) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  function users() {
    try { return JSON.parse(localStorage.getItem(KEY_USERS) || "[]"); } catch (e) { return []; }
  }
  function saveUsers(list) { localStorage.setItem(KEY_USERS, JSON.stringify(list)); }

  window.PG_auth = {
    current() {
      try { return JSON.parse(localStorage.getItem(KEY_SESSION) || "null"); } catch (e) { return null; }
    },
    logout() { localStorage.removeItem(KEY_SESSION); location.href = "index.html"; },
    async signup(name, email, password) {
      email = email.trim().toLowerCase();
      if (!name || !email || password.length < 6) throw new Error("Enter name, valid email and a password of 6+ characters.");
      const list = users();
      if (list.some((u) => u.email === email)) throw new Error("An account with this email already exists. Please log in.");
      list.push({ name, email, pass: await sha256(password), created: Date.now() });
      saveUsers(list);
      localStorage.setItem(KEY_SESSION, JSON.stringify({ name, email }));
    },
    async login(email, password) {
      email = email.trim().toLowerCase();
      const hash = await sha256(password);
      const user = users().find((u) => u.email === email && u.pass === hash);
      if (!user) throw new Error("Incorrect email or password.");
      localStorage.setItem(KEY_SESSION, JSON.stringify({ name: user.name, email: user.email }));
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    function flash(el, ok, msg) {
      el.className = "alert " + (ok ? "alert-ok" : "alert-err");
      el.textContent = msg;
      el.classList.remove("hidden");
    }
    const login = document.getElementById("login-form");
    if (login) {
      login.addEventListener("submit", async (e) => {
        e.preventDefault();
        const box = document.getElementById("form-msg");
        try {
          await window.PG_auth.login(login.email.value, login.password.value);
          flash(box, true, "Welcome back. Redirecting…");
          setTimeout(() => { location.href = "index.html"; }, 700);
        } catch (err) { flash(box, false, err.message); }
      });
    }
    const signup = document.getElementById("signup-form");
    if (signup) {
      signup.addEventListener("submit", async (e) => {
        e.preventDefault();
        const box = document.getElementById("form-msg");
        try {
          await window.PG_auth.signup(signup.name.value, signup.email.value, signup.password.value);
          flash(box, true, "Account created. Redirecting…");
          setTimeout(() => { location.href = "index.html"; }, 700);
        } catch (err) { flash(box, false, err.message); }
      });
    }
    const contact = document.getElementById("contact-form");
    if (contact) {
      contact.addEventListener("submit", (e) => {
        e.preventDefault();
        const box = document.getElementById("form-msg");
        const payload = {
          name: contact.name.value,
          email: contact.email.value,
          topic: contact.topic.value,
          message: contact.message.value,
          at: new Date().toISOString()
        };
        const list = JSON.parse(localStorage.getItem("paisagauge_messages") || "[]");
        list.push(payload);
        localStorage.setItem("paisagauge_messages", JSON.stringify(list));
        const subject = encodeURIComponent("PaisaGauge: " + payload.topic);
        const body = encodeURIComponent("From: " + payload.name + " <" + payload.email + ">\n\n" + payload.message);
        flash(box, true, "Saved locally. Your mail app will open to developersoftware.support@gmail.com.");
        location.href = "mailto:developersoftware.support@gmail.com?subject=" + subject + "&body=" + body;
      });
    }
  });
})();
