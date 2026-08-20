(function () {
  const $ = (sel, root) => (root || document).querySelector(sel);

  function fieldHTML(id, label, prefix, suffix, value, min, max, step) {
    return `
      <div class="field" data-field="${id}">
        <div class="field-top">
          <span>${label}</span>
          <div class="numbox">
            ${prefix ? `<span>${prefix}</span>` : ""}
            <input id="${id}" type="number" min="${min}" max="${max}" step="${step}" value="${value}">
            ${suffix ? `<span>${suffix}</span>` : ""}
          </div>
        </div>
        <input type="range" id="${id}-range" min="${min}" max="${max}" step="${step}" value="${value}">
        <div class="range-meta"><span>${prefix || ""}${formatBound(min, prefix)}${suffix || ""}</span><span>${prefix || ""}${formatBound(max, prefix)}${suffix || ""}</span></div>
      </div>`;
  }

  function formatBound(n, prefix) {
    if (prefix === "₹") {
      if (n >= 10000000) return n / 10000000 + " Cr";
      if (n >= 100000) return n / 100000 + " L";
      return n;
    }
    return n;
  }

  function bindPair(id, onChange) {
    const num = document.getElementById(id);
    const range = document.getElementById(id + "-range");
    if (!num) return;
    const sync = (fromRange) => {
      let v = parseFloat(fromRange ? range.value : num.value);
      const min = parseFloat(num.min);
      const max = parseFloat(num.max);
      if (!isFinite(v)) v = min;
      v = PG.clamp(v, min, max);
      num.value = v;
      if (range) range.value = v;
      onChange();
    };
    num.addEventListener("input", () => sync(false));
    if (range) range.addEventListener("input", () => sync(true));
  }

  function donut(principal, interest) {
    const total = principal + interest;
    const p = total ? (principal / total) * 100 : 100;
    return `<div class="donut" style="background: conic-gradient(var(--mint-2) 0 ${p}%, var(--navy) 0);"></div>`;
  }

  function resultRows(rows) {
    return `<table class="result-table">${rows.map(([k, v]) => `<tr><td class="muted">${k}</td><td>${v}</td></tr>`).join("")}</table>`;
  }

  function scheduleTable(rows, yearly) {
    const head = yearly
      ? "<th>Year</th><th>Opening</th><th>EMI × 12</th><th>Interest</th><th>Principal</th><th>Closing</th>"
      : "<th>Month</th><th>Opening</th><th>EMI</th><th>Interest</th><th>Principal</th><th>Closing</th>";
    const body = rows.map((r) => `<tr>
      <td>${r.period}</td>
      <td>${PG.formatINR(r.opening)}</td>
      <td>${PG.formatINR(r.emi)}</td>
      <td>${PG.formatINR(r.interest)}</td>
      <td>${PG.formatINR(r.principal)}</td>
      <td>${PG.formatINR(r.closing)}</td>
    </tr>`).join("");
    return `<div class="table-wrap"><table class="sched"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
  }

  function renderEmi(calc) {
    const d = calc.defaults;
    const r = calc.ranges;
    $("#calc-inputs").innerHTML =
      fieldHTML("amount", "Loan amount", "₹", "", d.amount, r.amount[0], r.amount[1], 10000) +
      fieldHTML("rate", "Interest rate (p.a.)", "", "%", d.rate, r.rate[0], r.rate[1], 0.05) +
      fieldHTML("years", "Loan tenure", "", "Yr", d.years, r.years[0], r.years[1], 1);

    let yearly = true;
    const update = () => {
      const P = parseFloat($("#amount").value);
      const rate = parseFloat($("#rate").value);
      const years = parseFloat($("#years").value);
      const out = PG.amortization(P, rate, years);
      $("#calc-results").innerHTML = `
        <div class="legend"><span><i class="dot" style="background:var(--mint-2)"></i>Principal amount</span>
        <span><i class="dot" style="background:var(--navy)"></i>Interest amount</span></div>
        <div class="donut-wrap">${donut(P, out.totalInterest)}</div>
        <div class="muted">Monthly EMI</div>
        <div class="emi-big">${PG.formatINR(out.emi)}</div>
        ${resultRows([
          ["Principal amount", PG.formatINR(P)],
          ["Total interest", PG.formatINR(out.totalInterest)],
          ["Total amount", PG.formatINR(out.totalPayable)]
        ])}
        <div class="amort-toggle">
          <div>
            <p class="muted">Your amortization details (yearly / monthly)</p>
            <div class="view-switch" style="margin-top:8px">
              <button type="button" id="view-y" class="${yearly ? "on" : ""}">Yearly</button>
              <button type="button" id="view-m" class="${yearly ? "" : "on"}">Monthly</button>
            </div>
          </div>
          <button type="button" class="plus" id="toggle-amort">+</button>
        </div>
        <div id="amort-box" class="hidden"></div>`;
      const box = $("#amort-box");
      const draw = () => {
        const rows = yearly ? out.years : out.months;
        box.innerHTML = scheduleTable(rows, yearly);
      };
      $("#toggle-amort").onclick = () => {
        box.classList.toggle("hidden");
        if (!box.classList.contains("hidden")) draw();
      };
      $("#view-y").onclick = () => { yearly = true; $("#view-y").classList.add("on"); $("#view-m").classList.remove("on"); if (!box.classList.contains("hidden")) draw(); };
      $("#view-m").onclick = () => { yearly = false; $("#view-m").classList.add("on"); $("#view-y").classList.remove("on"); if (!box.classList.contains("hidden")) draw(); };
    };
    ["amount", "rate", "years"].forEach((id) => bindPair(id, update));
    update();
  }

  function renderEducation() {
    $("#calc-inputs").innerHTML =
      fieldHTML("amount", "Loan amount", "₹", "", 1500000, 100000, 20000000, 10000) +
      fieldHTML("rate", "Interest rate (p.a.)", "", "%", 9, 4, 16, 0.05) +
      fieldHTML("course", "Course duration", "", "Yr", 4, 1, 8, 1) +
      fieldHTML("repay", "Repayment tenure", "", "Yr", 10, 1, 15, 1) +
      `<label style="display:flex;gap:8px;align-items:center;font-weight:600"><input type="checkbox" id="cap" checked> Capitalize interest during moratorium</label>`;
    const update = () => {
      const out = PG.educationLoan(
        parseFloat($("#amount").value),
        parseFloat($("#rate").value),
        parseFloat($("#course").value),
        parseFloat($("#repay").value),
        $("#cap").checked
      );
      $("#calc-results").innerHTML = `
        <div class="muted">EMI after course</div>
        <div class="emi-big">${PG.formatINR(out.emi)}</div>
        ${resultRows([
          ["Original principal", PG.formatINR(parseFloat($("#amount").value))],
          ["Interest accrued in moratorium", PG.formatINR(out.accrued)],
          ["Principal at repayment start", PG.formatINR(out.capitalized)],
          ["Total interest in repayment", PG.formatINR(out.totalInterest)],
          ["Total payable", PG.formatINR(out.capitalized + out.totalInterest)]
        ])}
        <div class="table-wrap" style="margin-top:12px">${scheduleTable(out.years, true)}</div>`;
    };
    ["amount", "rate", "course", "repay"].forEach((id) => bindPair(id, update));
    $("#cap").addEventListener("change", update);
    update();
  }

  function renderMortgage() {
    $("#calc-inputs").innerHTML =
      fieldHTML("amount", "Loan amount", "₹", "", 5000000, 500000, 100000000, 10000) +
      fieldHTML("rate", "Interest rate (p.a.)", "", "%", 8, 0.5, 15, 0.05) +
      fieldHTML("years", "Tenure", "", "Yr", 20, 1, 30, 1) +
      fieldHTML("tax", "Annual property tax", "₹", "", 24000, 0, 500000, 1000) +
      fieldHTML("ins", "Annual insurance", "₹", "", 12000, 0, 200000, 500);
    const update = () => {
      const P = parseFloat($("#amount").value);
      const out = PG.amortization(P, parseFloat($("#rate").value), parseFloat($("#years").value));
      const extra = (parseFloat($("#tax").value) + parseFloat($("#ins").value)) / 12;
      $("#calc-results").innerHTML = `
        <div class="muted">Loan EMI</div>
        <div class="emi-big">${PG.formatINR(out.emi)}</div>
        ${resultRows([
          ["Tax + insurance / month", PG.formatINR(extra)],
          ["Total monthly housing cost", PG.formatINR(out.emi + extra)],
          ["Principal", PG.formatINR(P)],
          ["Total interest", PG.formatINR(out.totalInterest)],
          ["Total payable on loan", PG.formatINR(out.totalPayable)]
        ])}
        <div class="donut-wrap">${donut(P, out.totalInterest)}</div>`;
    };
    ["amount", "rate", "years", "tax", "ins"].forEach((id) => bindPair(id, update));
    update();
  }

  function renderEligibility() {
    $("#calc-inputs").innerHTML =
      fieldHTML("income", "Net monthly income", "₹", "", 100000, 15000, 2000000, 1000) +
      fieldHTML("existing", "Existing EMIs", "₹", "", 10000, 0, 500000, 500) +
      fieldHTML("foir", "FOIR", "", "%", 50, 30, 70, 1) +
      fieldHTML("rate", "Interest rate (p.a.)", "", "%", 8.5, 6, 18, 0.05) +
      fieldHTML("years", "Tenure", "", "Yr", 20, 1, 30, 1);
    const update = () => {
      const income = parseFloat($("#income").value);
      const existing = parseFloat($("#existing").value);
      const foir = parseFloat($("#foir").value);
      const maxEmi = Math.max(0, income * (foir / 100) - existing);
      const loan = PG.loanFromEmi(maxEmi, parseFloat($("#rate").value), parseFloat($("#years").value));
      $("#calc-results").innerHTML = `
        <div class="muted">Estimated eligible loan</div>
        <div class="emi-big">${PG.formatINR(loan)}</div>
        ${resultRows([
          ["Max EMI allowed", PG.formatINR(maxEmi)],
          ["FOIR used", foir + "%"],
          ["Income leftover after FOIR", PG.formatINR(Math.max(0, income - income * foir / 100))]
        ])}
        <p class="disclaimer">Illustration only. Lenders also check credit score, age, employment and property papers. NRIs should input net income.</p>`;
    };
    ["income", "existing", "foir", "rate", "years"].forEach((id) => bindPair(id, update));
    update();
  }

  function renderAffordability() {
    $("#calc-inputs").innerHTML =
      fieldHTML("budget", "Monthly EMI budget", "₹", "", 25000, 5000, 500000, 500) +
      fieldHTML("rate", "Interest rate (p.a.)", "", "%", 7.75, 0.5, 15, 0.05) +
      fieldHTML("years", "Tenure", "", "Yr", 25, 1, 30, 1) +
      fieldHTML("down", "Down payment", "", "%", 20, 5, 50, 1);
    const update = () => {
      const loan = PG.loanFromEmi(parseFloat($("#budget").value), parseFloat($("#rate").value), parseFloat($("#years").value));
      const downPct = parseFloat($("#down").value);
      const property = loan / (1 - downPct / 100);
      $("#calc-results").innerHTML = `
        <div class="muted">Estimated property value</div>
        <div class="emi-big">${PG.formatINR(property)}</div>
        ${resultRows([
          ["Loan amount", PG.formatINR(loan)],
          ["Own contribution", PG.formatINR(property - loan)],
          ["Monthly EMI", PG.formatINR(parseFloat($("#budget").value))]
        ])}`;
    };
    ["budget", "rate", "years", "down"].forEach((id) => bindPair(id, update));
    update();
  }

  function renderRefinance() {
    $("#calc-inputs").innerHTML =
      fieldHTML("outstanding", "Outstanding principal", "₹", "", 2000000, 100000, 50000000, 10000) +
      fieldHTML("left", "Remaining tenure", "", "Yr", 18, 1, 30, 1) +
      fieldHTML("old", "Current rate", "", "%", 9.2, 5, 16, 0.05) +
      fieldHTML("neu", "New rate", "", "%", 7.9, 5, 16, 0.05) +
      fieldHTML("fee", "Switching fees", "₹", "", 15000, 0, 200000, 500);
    const update = () => {
      const P = parseFloat($("#outstanding").value);
      const y = parseFloat($("#left").value);
      const oldEmi = PG.emi(P, parseFloat($("#old").value), y);
      const newEmi = PG.emi(P, parseFloat($("#neu").value), y);
      const oldTot = PG.amortization(P, parseFloat($("#old").value), y);
      const newTot = PG.amortization(P, parseFloat($("#neu").value), y);
      const fee = parseFloat($("#fee").value);
      const saved = oldTot.totalInterest - newTot.totalInterest - fee;
      $("#calc-results").innerHTML = `
        <div class="muted">Monthly EMI after refinance</div>
        <div class="emi-big">${PG.formatINR(newEmi)}</div>
        ${resultRows([
          ["Current EMI", PG.formatINR(oldEmi)],
          ["EMI reduction", PG.formatINR(oldEmi - newEmi)],
          ["Interest saved (after fees)", PG.formatINR(saved)],
          ["Fees assumed", PG.formatINR(fee)]
        ])}`;
    };
    ["outstanding", "left", "old", "neu", "fee"].forEach((id) => bindPair(id, update));
    update();
  }

  function renderSip() {
    $("#calc-inputs").innerHTML =
      fieldHTML("monthly", "Monthly SIP", "₹", "", 10000, 500, 500000, 500) +
      fieldHTML("rate", "Expected return (p.a.)", "", "%", 12, 1, 20, 0.1) +
      fieldHTML("years", "Tenure", "", "Yr", 15, 1, 40, 1) +
      fieldHTML("step", "Annual step-up", "", "%", 0, 0, 20, 1);
    const update = () => {
      const out = PG.sipFuture(parseFloat($("#monthly").value), parseFloat($("#rate").value), parseFloat($("#years").value), parseFloat($("#step").value));
      $("#calc-results").innerHTML = `
        <div class="muted">Estimated corpus</div>
        <div class="emi-big">${PG.formatINR(out.future)}</div>
        <div class="donut-wrap">${donut(out.invested, Math.max(0, out.gain))}</div>
        ${resultRows([
          ["Amount invested", PG.formatINR(out.invested)],
          ["Est. returns", PG.formatINR(out.gain)]
        ])}`;
    };
    ["monthly", "rate", "years", "step"].forEach((id) => bindPair(id, update));
    update();
  }

  function renderLumpsum() {
    $("#calc-inputs").innerHTML =
      fieldHTML("amount", "Investment amount", "₹", "", 200000, 1000, 10000000, 1000) +
      fieldHTML("rate", "Expected return (p.a.)", "", "%", 12, 1, 20, 0.1) +
      fieldHTML("years", "Tenure", "", "Yr", 10, 1, 40, 1);
    const update = () => {
      const out = PG.lumpsumFuture(parseFloat($("#amount").value), parseFloat($("#rate").value), parseFloat($("#years").value));
      $("#calc-results").innerHTML = `
        <div class="muted">Future value</div>
        <div class="emi-big">${PG.formatINR(out.future)}</div>
        ${resultRows([
          ["Invested", PG.formatINR(out.invested)],
          ["Est. returns", PG.formatINR(out.gain)]
        ])}`;
    };
    ["amount", "rate", "years"].forEach((id) => bindPair(id, update));
    update();
  }

  function renderMf() {
    $("#calc-inputs").innerHTML =
      fieldHTML("begin", "Amount invested", "₹", "", 100000, 1000, 10000000, 1000) +
      fieldHTML("end", "Current value", "₹", "", 175000, 1000, 20000000, 1000) +
      fieldHTML("years", "Years held", "", "Yr", 5, 1, 40, 1) +
      fieldHTML("exp", "Expected future return", "", "%", 12, 1, 20, 0.1) +
      fieldHTML("fwd", "Years ahead", "", "Yr", 10, 1, 40, 1);
    const update = () => {
      const begin = parseFloat($("#begin").value);
      const end = parseFloat($("#end").value);
      const years = parseFloat($("#years").value);
      const cagr = PG.cagr(begin, end, years);
      const fwd = PG.lumpsumFuture(end, parseFloat($("#exp").value), parseFloat($("#fwd").value));
      $("#calc-results").innerHTML = `
        <div class="muted">Historical CAGR</div>
        <div class="emi-big">${PG.formatPct(cagr)}</div>
        ${resultRows([
          ["Absolute gain", PG.formatINR(end - begin)],
          ["Projected value ahead", PG.formatINR(fwd.future)]
        ])}`;
    };
    ["begin", "end", "years", "exp", "fwd"].forEach((id) => bindPair(id, update));
    update();
  }

  function renderGold() {
    $("#calc-inputs").innerHTML =
      fieldHTML("grams", "Gold quantity", "", "g", 20, 1, 2000, 1) +
      fieldHTML("price", "Price per 10g", "₹", "", 75000, 20000, 200000, 100) +
      fieldHTML("rate", "Expected appreciation", "", "%", 8, 1, 20, 0.1) +
      fieldHTML("years", "Years", "", "Yr", 10, 1, 30, 1) +
      fieldHTML("extra", "Extra cash in gold funds", "₹", "", 0, 0, 5000000, 1000);
    const update = () => {
      const out = PG.goldFuture(parseFloat($("#grams").value), parseFloat($("#price").value), parseFloat($("#rate").value), parseFloat($("#years").value), parseFloat($("#extra").value));
      $("#calc-results").innerHTML = `
        <div class="muted">Current gold value</div>
        <div class="emi-big">${PG.formatINR(out.current)}</div>
        ${resultRows([
          ["Future value", PG.formatINR(out.future)],
          ["Estimated gain", PG.formatINR(out.gain)]
        ])}`;
    };
    ["grams", "price", "rate", "years", "extra"].forEach((id) => bindPair(id, update));
    update();
  }

  function renderFd() {
    $("#calc-inputs").innerHTML =
      fieldHTML("amount", "Deposit amount", "₹", "", 200000, 1000, 10000000, 1000) +
      fieldHTML("rate", "Interest rate", "", "%", 7.1, 3, 10, 0.05) +
      fieldHTML("years", "Tenure", "", "Yr", 5, 1, 10, 1) +
      `<div class="field"><div class="field-top"><span>Compounding</span></div>
        <select id="freq" class="input"><option value="12">Monthly</option><option value="4" selected>Quarterly</option><option value="2">Half-yearly</option><option value="1">Yearly</option></select>
      </div>`;
    const update = () => {
      const out = PG.fdMaturity(parseFloat($("#amount").value), parseFloat($("#rate").value), parseFloat($("#years").value), parseInt($("#freq").value, 10));
      $("#calc-results").innerHTML = `
        <div class="muted">Maturity amount</div>
        <div class="emi-big">${PG.formatINR(out.future)}</div>
        ${resultRows([["Interest earned", PG.formatINR(out.gain)]])}`;
    };
    ["amount", "rate", "years"].forEach((id) => bindPair(id, update));
    $("#freq").addEventListener("change", update);
    update();
  }

  function renderPpf() {
    $("#calc-inputs").innerHTML =
      fieldHTML("yearly", "Yearly deposit", "₹", "", 150000, 500, 150000, 500) +
      fieldHTML("rate", "Interest rate", "", "%", 7.1, 6, 9, 0.1) +
      fieldHTML("years", "Tenure", "", "Yr", 15, 15, 50, 5);
    const update = () => {
      const out = PG.ppf(parseFloat($("#yearly").value), parseFloat($("#years").value), parseFloat($("#rate").value));
      $("#calc-results").innerHTML = `
        <div class="muted">Maturity value</div>
        <div class="emi-big">${PG.formatINR(out.future)}</div>
        ${resultRows([
          ["Total deposited", PG.formatINR(out.invested)],
          ["Interest", PG.formatINR(out.gain)]
        ])}
        <div class="table-wrap" style="margin-top:12px">${scheduleTable(out.rows.map((r) => ({
          period: r.period, opening: r.invested - parseFloat($("#yearly").value), emi: parseFloat($("#yearly").value),
          interest: r.closing - (r.invested), principal: parseFloat($("#yearly").value), closing: r.closing
        })), true)}</div>`;
    };
    ["yearly", "rate", "years"].forEach((id) => bindPair(id, update));
    update();
  }

  function renderRd() {
    $("#calc-inputs").innerHTML =
      fieldHTML("monthly", "Monthly deposit", "₹", "", 5000, 100, 200000, 100) +
      fieldHTML("rate", "Interest rate", "", "%", 7, 4, 10, 0.05) +
      fieldHTML("months", "Tenure", "", "Mo", 60, 6, 120, 1);
    const update = () => {
      const out = PG.rdMaturity(parseFloat($("#monthly").value), parseFloat($("#rate").value), parseFloat($("#months").value));
      $("#calc-results").innerHTML = `
        <div class="muted">Maturity amount</div>
        <div class="emi-big">${PG.formatINR(out.future)}</div>
        ${resultRows([
          ["Amount deposited", PG.formatINR(out.invested)],
          ["Interest", PG.formatINR(out.gain)]
        ])}`;
    };
    ["monthly", "rate", "months"].forEach((id) => bindPair(id, update));
    update();
  }

  function renderSwp() {
    $("#calc-inputs").innerHTML =
      fieldHTML("corpus", "Starting corpus", "₹", "", 5000000, 100000, 50000000, 10000) +
      fieldHTML("withdraw", "Monthly withdrawal", "₹", "", 25000, 1000, 500000, 500) +
      fieldHTML("rate", "Expected return (p.a.)", "", "%", 8, 1, 16, 0.1) +
      fieldHTML("years", "Years to plan", "", "Yr", 20, 1, 40, 1);
    const update = () => {
      const out = PG.swp(parseFloat($("#corpus").value), parseFloat($("#withdraw").value), parseFloat($("#rate").value), parseFloat($("#years").value));
      $("#calc-results").innerHTML = `
        <div class="muted">${out.depleted ? "Corpus depletes in" : "Remaining corpus"}</div>
        <div class="emi-big">${out.depleted ? Math.floor(out.monthsLasted / 12) + " yr " + (out.monthsLasted % 12) + " mo" : PG.formatINR(out.remaining)}</div>
        ${resultRows([
          ["Total withdrawn", PG.formatINR(out.withdrawn)],
          ["Months lasted", out.monthsLasted]
        ])}`;
    };
    ["corpus", "withdraw", "rate", "years"].forEach((id) => bindPair(id, update));
    update();
  }

  const map = {
    emi: renderEmi,
    education: renderEducation,
    mortgage: renderMortgage,
    eligibility: renderEligibility,
    affordability: renderAffordability,
    refinance: renderRefinance,
    sip: renderSip,
    lumpsum: renderLumpsum,
    mf: renderMf,
    gold: renderGold,
    fd: renderFd,
    ppf: renderPpf,
    rd: renderRd,
    swp: renderSwp
  };

  window.PG_renderCalculator = function (calc) {
    const fn = map[calc.type];
    if (fn === renderEmi) fn(calc);
    else fn();
  };
})();
