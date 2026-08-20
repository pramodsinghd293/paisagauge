const PG = window.PG || {};

PG.formatINR = function (n, digits) {
  const d = digits == null ? 0 : digits;
  if (!isFinite(n)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: d,
    minimumFractionDigits: d
  }).format(Math.round(n * Math.pow(10, d)) / Math.pow(10, d));
};

PG.formatPct = function (n) {
  return (Math.round(n * 100) / 100).toFixed(2) + "%";
};

PG.clamp = function (v, min, max) {
  return Math.min(max, Math.max(min, v));
};

PG.emi = function (principal, annualRate, years) {
  const n = Math.round(years * 12);
  const r = annualRate / 12 / 100;
  if (n <= 0) return 0;
  if (r === 0) return principal / n;
  const pow = Math.pow(1 + r, n);
  return principal * r * pow / (pow - 1);
};

PG.loanFromEmi = function (emi, annualRate, years) {
  const n = Math.round(years * 12);
  const r = annualRate / 12 / 100;
  if (n <= 0) return 0;
  if (r === 0) return emi * n;
  const pow = Math.pow(1 + r, n);
  return emi * (pow - 1) / (r * pow);
};

PG.amortization = function (principal, annualRate, years) {
  const n = Math.round(years * 12);
  const r = annualRate / 12 / 100;
  const emi = PG.emi(principal, annualRate, years);
  let balance = principal;
  const months = [];
  for (let i = 1; i <= n; i++) {
    const interest = balance * r;
    let principalPaid = emi - interest;
    if (i === n || principalPaid > balance) principalPaid = balance;
    balance = Math.max(0, balance - principalPaid);
    months.push({
      period: i,
      opening: months.length ? months[months.length - 1].closing : principal,
      emi: principalPaid + interest,
      interest,
      principal: principalPaid,
      closing: balance
    });
  }
  const yearsOut = [];
  for (let y = 0; y < Math.ceil(months.length / 12); y++) {
    const slice = months.slice(y * 12, (y + 1) * 12);
    yearsOut.push({
      period: y + 1,
      opening: slice[0].opening,
      emi: slice.reduce((s, m) => s + m.emi, 0),
      interest: slice.reduce((s, m) => s + m.interest, 0),
      principal: slice.reduce((s, m) => s + m.principal, 0),
      closing: slice[slice.length - 1].closing
    });
  }
  const totalInterest = months.reduce((s, m) => s + m.interest, 0);
  return { emi, months, years: yearsOut, totalInterest, totalPayable: principal + totalInterest, n };
};

PG.sipFuture = function (monthly, annualReturn, years, stepUpPct) {
  const i = annualReturn / 12 / 100;
  const n = Math.round(years * 12);
  let installment = monthly;
  let value = 0;
  let invested = 0;
  for (let m = 1; m <= n; m++) {
    value = (value + installment) * (1 + i);
    invested += installment;
    if (stepUpPct && m % 12 === 0) installment *= 1 + stepUpPct / 100;
  }
  return { future: value, invested, gain: value - invested };
};

PG.lumpsumFuture = function (amount, annualReturn, years) {
  const fv = amount * Math.pow(1 + annualReturn / 100, years);
  return { future: fv, invested: amount, gain: fv - amount };
};

PG.cagr = function (begin, end, years) {
  if (begin <= 0 || years <= 0) return 0;
  return (Math.pow(end / begin, 1 / years) - 1) * 100;
};

PG.fdMaturity = function (principal, annualRate, years, freq) {
  const m = freq || 4;
  const fv = principal * Math.pow(1 + annualRate / 100 / m, m * years);
  return { future: fv, invested: principal, gain: fv - principal };
};

PG.ppf = function (yearly, years, rate) {
  const r = (rate || 7.1) / 100;
  let bal = 0;
  const rows = [];
  for (let y = 1; y <= years; y++) {
    bal = (bal + yearly) * (1 + r);
    rows.push({ period: y, invested: yearly * y, closing: bal, interest: bal - yearly * y });
  }
  return { future: bal, invested: yearly * years, gain: bal - yearly * years, rows };
};

PG.rdMaturity = function (monthly, annualRate, months) {
  const n = months;
  const r = annualRate / 100;
  const maturity = monthly * n + monthly * n * (n + 1) / 2 * r / 12;
  return { future: maturity, invested: monthly * n, gain: maturity - monthly * n };
};

PG.swp = function (corpus, monthlyWithdraw, annualReturn, years) {
  const i = annualReturn / 12 / 100;
  const n = Math.round(years * 12);
  let bal = corpus;
  let withdrawn = 0;
  let monthsLasted = 0;
  for (let m = 1; m <= n; m++) {
    bal = bal * (1 + i) - monthlyWithdraw;
    withdrawn += monthlyWithdraw;
    monthsLasted = m;
    if (bal <= 0) {
      bal = 0;
      break;
    }
  }
  return { remaining: bal, withdrawn, monthsLasted, depleted: bal <= 0 };
};

PG.goldFuture = function (grams, pricePer10g, appreciation, years, extraInvest) {
  const current = grams * (pricePer10g / 10) + (extraInvest || 0);
  const future = current * Math.pow(1 + appreciation / 100, years);
  return { current, future, gain: future - current };
};

PG.educationLoan = function (principal, annualRate, courseYears, repayYears, capitalize) {
  const monthsCourse = Math.round(courseYears * 12);
  const r = annualRate / 12 / 100;
  let bal = principal;
  if (capitalize) {
    for (let i = 0; i < monthsCourse; i++) bal *= 1 + r;
  } else {
    bal += principal * (annualRate / 100) * courseYears;
  }
  const schedule = PG.amortization(bal, annualRate, repayYears);
  return { capitalized: bal, accrued: bal - principal, ...schedule };
};

window.PG = PG;
