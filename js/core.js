(function () {
  function session() {
    try { return JSON.parse(localStorage.getItem("paisagauge_session") || "null"); } catch (e) { return null; }
  }

  const calcs = Object.values(window.PG_CALCS || {});

  function headerHTML() {
    const user = session();
    return `
    <header class="header">
      <div class="wrap header-inner">
        <a class="brand" href="index.html">
          <img src="assets/logo.png" alt="PaisaGauge logo">
          <div class="brand-name">Paisa<span>Gauge</span></div>
        </a>
        <nav class="nav">
          <div class="dropdown">
            <button class="linkish" type="button">Loans</button>
            <div class="dropdown-menu">
              <a href="emi-calculator.html">EMI Calculator</a>
              <a href="home-loan.html">Home Loan EMI</a>
              <a href="personal-loan.html">Personal Loan EMI</a>
              <a href="car-loan.html">Car Loan EMI</a>
              <a href="education-loan.html">Education Loan</a>
              <a href="mortgage.html">Mortgage</a>
              <a href="loan-against-property.html">Loan Against Property</a>
            </div>
          </div>
          <div class="dropdown">
            <button class="linkish" type="button">Planning</button>
            <div class="dropdown-menu">
              <a href="eligibility.html">Loan Eligibility</a>
              <a href="affordability.html">Affordability</a>
              <a href="refinance.html">Refinance / Balance Transfer</a>
            </div>
          </div>
          <div class="dropdown">
            <button class="linkish" type="button">Invest</button>
            <div class="dropdown-menu">
              <a href="sip.html">SIP</a>
              <a href="lumpsum.html">Lumpsum</a>
              <a href="mutual-fund.html">Mutual Fund Returns</a>
              <a href="gold.html">Gold Returns</a>
              <a href="fd.html">FD</a>
              <a href="ppf.html">PPF</a>
              <a href="rd.html">RD</a>
              <a href="swp.html">SWP</a>
            </div>
          </div>
          <a href="contact.html">Contact</a>
        </nav>
        <div class="search" id="search-box">
          <span>⌕</span>
          <input id="search-input" placeholder="Search calculators… Ctrl+K" autocomplete="off">
          <div class="search-panel" id="search-panel"></div>
        </div>
        <div class="header-actions">
          ${user
            ? `<span class="muted" style="font-weight:700">${user.name.split(" ")[0]}</span>
               <button class="btn btn-ghost" type="button" id="logout-btn">Log out</button>`
            : `<a class="btn btn-ghost" href="login.html">Log in</a>
               <a class="btn btn-primary" href="signup.html">Sign up</a>`}
          <button class="hamburger" type="button" id="hamburger" aria-label="Menu">☰</button>
        </div>
      </div>
    </header>
    <div class="mobile-nav hidden" id="mobile-nav">
      <a href="emi-calculator.html">EMI calculator</a>
      <a href="home-loan.html">Home loan EMI</a>
      <a href="personal-loan.html">Personal loan</a>
      <a href="car-loan.html">Car loan</a>
      <a href="education-loan.html">Education loan</a>
      <a href="mortgage.html">Mortgage</a>
      <a href="eligibility.html">Loan eligibility</a>
      <a href="affordability.html">Affordability</a>
      <a href="refinance.html">Refinance</a>
      <a href="sip.html">SIP</a>
      <a href="mutual-fund.html">Mutual fund returns</a>
      <a href="gold.html">Gold returns</a>
      <a href="fd.html">FD</a>
      <a href="ppf.html">PPF</a>
      <a href="contact.html">Contact</a>
      <a href="login.html">Log in</a>
      <a href="signup.html">Sign up</a>
    </div>`;
  }

  function footerHTML() {
    return `
    <footer class="footer">
      <div class="wrap">
        <div class="footer-grid">
          <div>
            <h4>PaisaGauge</h4>
            <p>Free loan, mortgage, eligibility and mutual-fund calculators for India. Gauge every rupee before you borrow or invest.</p>
            <p style="margin-top:12px">Support: <a href="mailto:developersoftware.support@gmail.com">developersoftware.support@gmail.com</a></p>
          </div>
          <div>
            <h4>Loan tools</h4>
            <a href="home-loan.html">Home Loan EMI</a>
            <a href="car-loan.html">Car Loan EMI</a>
            <a href="personal-loan.html">Personal Loan EMI</a>
            <a href="mortgage.html">Mortgage</a>
            <a href="education-loan.html">Education Loan</a>
          </div>
          <div>
            <h4>Invest tools</h4>
            <a href="sip.html">SIP Calculator</a>
            <a href="mutual-fund.html">Mutual Fund Returns</a>
            <a href="gold.html">Gold Returns</a>
            <a href="fd.html">FD Calculator</a>
            <a href="ppf.html">PPF Calculator</a>
          </div>
          <div>
            <h4>Account</h4>
            <a href="login.html">Log in</a>
            <a href="signup.html">Sign up</a>
            <a href="contact.html">Contact</a>
            <a href="eligibility.html">Check eligibility</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} PaisaGauge. All rights reserved.</span>
          <span>Planning tools only — not a loan offer or investment advice.</span>
        </div>
      </div>
    </footer>`;
  }

  function sidebarHTML(activeId) {
    const groups = [
      ["Loan calculators", calcs.filter((c) => c.group === "loan")],
      ["Planning", calcs.filter((c) => c.group === "plan")],
      ["Invest & save", calcs.filter((c) => c.group === "invest")]
    ];
    return `
      <aside>
        <div class="sidebar-card cta-card">
          <h3>Talk to a planner</h3>
          <p>Need help reading EMI vs SIP numbers? Write to us and we will respond by email.</p>
          <a class="btn btn-primary" href="contact.html">Contact support</a>
        </div>
        ${groups.map(([title, items]) => `
          <div class="sidebar-card">
            <h3>${title}</h3>
            ${items.map((c) => `<a class="side-link" href="${c.file}" ${c.id === activeId ? 'style="font-weight:800;color:var(--teal-deep)"' : ""}>${c.title.replace(" Calculator", "")}</a>`).join("")}
          </div>`).join("")}
      </aside>`;
  }

  function articleHTML(calc) {
    const faqs = (window.PG_FAQS[calc.id] || window.PG_FAQS.emi).map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("");
    const formulaKey = calc.type === "emi" ? "emi" : calc.type === "education" ? "education" : calc.type === "mortgage" ? "emi" : calc.type === "mf" ? "mf" : calc.type;
    const formula = window.PG_FORMULAS[formulaKey] || window.PG_FORMULAS.emi;
    let extra = "";
    if (calc.id === "home-loan") {
      extra = `
        <h2>How EMI calculation helps a home purchase</h2>
        <p>Knowing EMI first helps you pick a property in budget, estimate own contribution, and check eligibility. A longer tenure (up to 30 years) lowers EMI but raises total interest.</p>
        <h2>Worked example</h2>
        <p>Loan of ₹10,00,000 at 7.2% p.a. for 120 months: monthly rate r = 7.2/12/100 = 0.006. EMI ≈ ₹11,714. Total payable ≈ ₹14,05,703. Interest ≈ ₹4,05,703.</p>
        <h2>Home loan amortization schedule</h2>
        <p>Amortization is the process of reducing debt with regular payments. The table in the calculator shows opening balance, yearly EMI outflow, interest paid, principal paid and closing balance — the same structure used in bank home-loan illustrations.</p>
        <h2>Repayment plans that can change eligibility</h2>
        <div class="plans">
          <div class="plan"><b>SURF (Step Up Repayment Facility)</b>Lower EMI in early years, then higher EMIs as income is expected to grow — can support a larger loan.</div>
          <div class="plan"><b>FLIP (Flexible Loan Installments Plan)</b>Higher EMI initially, then stepping down if income is expected to fall later.</div>
          <div class="plan"><b>Tranche based EMI</b>For under-construction homes: start principal repayment on amounts already disbursed instead of only pre-EMI interest.</div>
          <div class="plan"><b>Accelerated repayment</b>Increase EMI each year with income to close the loan faster and cut interest.</div>
          <div class="plan"><b>Telescopic repayment</b>Tenure up to 30 years for smaller EMIs and potentially higher eligibility, especially for younger borrowers.</div>
          <div class="plan"><b>Pre-approved home loan</b>In-principle sanction based on income and credit, before you finalise a property.</div>
        </div>`;
    }
    return `
      <article class="content">
        <h2>Formula used</h2>
        <div class="formula">${formula.replace(/\n/g, "<br>")}</div>
        <h2>How to use this ${calc.title}</h2>
        <p>Move the sliders or type values. Results update instantly. Figures are estimates for planning; actual bank or AMC numbers can differ due to rounding, fees and product rules.</p>
        ${extra}
        <h2>Frequently asked questions</h2>
        <div class="faq">${faqs}</div>
        <p class="disclaimer">These calculators are general self-help planning tools. Results depend on the assumptions you provide. PaisaGauge does not guarantee accuracy or suitability for your circumstances and does not offer loans.</p>
      </article>`;
  }

  function bootHeaderFooter() {
    const mountH = document.getElementById("app-header");
    const mountF = document.getElementById("app-footer");
    if (mountH) mountH.innerHTML = headerHTML();
    if (mountF) mountF.innerHTML = footerHTML();
    const ham = document.getElementById("hamburger");
    const mobile = document.getElementById("mobile-nav");
    if (ham && mobile) ham.onclick = () => mobile.classList.toggle("hidden");
    const out = document.getElementById("logout-btn");
    if (out) out.onclick = () => { localStorage.removeItem("paisagauge_session"); location.reload(); };
    const input = document.getElementById("search-input");
    const panel = document.getElementById("search-panel");
    const box = document.getElementById("search-box");
    if (input) {
      const run = () => {
        const q = input.value.trim().toLowerCase();
        const hits = calcs.filter((c) => (c.title + c.subtitle).toLowerCase().includes(q)).slice(0, 8);
        panel.innerHTML = hits.map((c) => `<a class="search-hit" href="${c.file}">${c.title}</a>`).join("") || `<div class="search-hit">No match</div>`;
        box.classList.toggle("open", q.length > 0);
      };
      input.addEventListener("input", run);
      input.addEventListener("focus", run);
      document.addEventListener("click", (e) => { if (!box.contains(e.target)) box.classList.remove("open"); });
      document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); input.focus(); }
      });
    }
  }

  function bootHome() {
    const grid = document.getElementById("home-grid");
    if (!grid) return;
    grid.innerHTML = calcs.map((c) => `
      <a class="calc-card" href="${c.file}">
        <img src="${c.image}" alt="${c.title}">
        <div class="body"><h3>${c.title.replace(" Calculator", "")}</h3><p>${c.subtitle}</p></div>
      </a>`).join("");
    const emi = PG.amortization(2500000, 7.75, 30);
    const mini = document.getElementById("hero-mini");
    if (mini) {
      mini.innerHTML = `
        <h3>Sample home loan</h3>
        <p class="muted">₹25 lakh · 7.75% · 30 years</p>
        <div class="mini-emi">${PG.formatINR(emi.emi)}</div>
        <div class="mini-row"><span>Principal</span><b>${PG.formatINR(2500000)}</b></div>
        <div class="mini-row"><span>Interest</span><b>${PG.formatINR(emi.totalInterest)}</b></div>
        <div class="mini-row"><span>Total payable</span><b>${PG.formatINR(emi.totalPayable)}</b></div>
        <a class="btn btn-navy btn-full" style="margin-top:14px" href="home-loan.html">Open home loan calculator</a>`;
    }
  }

  function bootCalcPage() {
    const id = document.body.getAttribute("data-calc");
    if (!id || !window.PG_CALCS[id]) return;
    const calc = window.PG_CALCS[id];
    const root = document.getElementById("page-root");
    const loanTabs = ["emi", "home-loan", "personal-loan", "car-loan", "education-loan", "mortgage", "lap"];
    const tabs = loanTabs.map((tid) => {
      const c = window.PG_CALCS[tid];
      return `<a class="tab ${tid === id ? "active" : ""}" href="${c.file}">${c.title.replace(" Calculator", "").replace(" EMI", "")}</a>`;
    }).join("");
    root.innerHTML = `
      <div class="layout">
        <div>
          <div class="crumbs"><a href="index.html">Home</a> › <a href="emi-calculator.html">Calculators</a> › ${calc.title}</div>
          <h1 class="page-title">${calc.title}</h1>
          <p class="muted">${calc.subtitle}</p>
          ${calc.group === "loan" ? `<div class="tabs">${tabs}</div>` : ""}
          <div class="calc-shell">
            <div class="calc-grid">
              <div id="calc-inputs"></div>
              <div class="results" id="calc-results"></div>
            </div>
          </div>
          ${articleHTML(calc)}
        </div>
        ${sidebarHTML(id)}
      </div>`;
    window.PG_renderCalculator(calc);
  }

  document.addEventListener("DOMContentLoaded", () => {
    bootHeaderFooter();
    bootHome();
    bootCalcPage();
  });
})();
