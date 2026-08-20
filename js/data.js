window.PG_CALCS = {
  emi: {
    id: "emi",
    title: "EMI Calculator",
    subtitle: "Calculate equated monthly instalments for home, car, personal and other loans in seconds.",
    file: "emi-calculator.html",
    image: "assets/calc-home-loan.png",
    group: "loan",
    type: "emi",
    defaults: { amount: 1000000, rate: 6.5, years: 5 },
    ranges: { amount: [100000, 100000000], rate: [1, 30], years: [1, 30] }
  },
  "home-loan": {
    id: "home-loan",
    title: "Home Loan EMI Calculator",
    subtitle: "Plan your home purchase with EMI, interest breakup and a full yearly amortization schedule.",
    file: "home-loan.html",
    image: "assets/calc-home-loan.png",
    group: "loan",
    type: "emi",
    defaults: { amount: 2500000, rate: 7.75, years: 30 },
    ranges: { amount: [100000, 100000000], rate: [0.5, 15], years: [1, 30] }
  },
  "personal-loan": {
    id: "personal-loan",
    title: "Personal Loan EMI Calculator",
    subtitle: "Estimate EMIs for unsecured personal loans used for travel, medical needs or home renovation.",
    file: "personal-loan.html",
    image: "assets/calc-personal-loan.png",
    group: "loan",
    type: "emi",
    defaults: { amount: 500000, rate: 12, years: 4 },
    ranges: { amount: [25000, 4000000], rate: [9, 30], years: [1, 7] }
  },
  "car-loan": {
    id: "car-loan",
    title: "Car Loan EMI Calculator",
    subtitle: "Work out monthly car loan payments, total interest and a repayment timeline before you buy.",
    file: "car-loan.html",
    image: "assets/calc-car-loan.png",
    group: "loan",
    type: "emi",
    defaults: { amount: 800000, rate: 9.5, years: 5 },
    ranges: { amount: [50000, 5000000], rate: [6, 18], years: [1, 8] }
  },
  "education-loan": {
    id: "education-loan",
    title: "Education Loan Calculator",
    subtitle: "Include course moratorium, capitalized interest and repayment EMI after studies.",
    file: "education-loan.html",
    image: "assets/calc-education.png",
    group: "loan",
    type: "education"
  },
  mortgage: {
    id: "mortgage",
    title: "Mortgage Calculator",
    subtitle: "Estimate housing EMI plus property tax and insurance for a complete monthly housing cost.",
    file: "mortgage.html",
    image: "assets/calc-mortgage.png",
    group: "loan",
    type: "mortgage"
  },
  lap: {
    id: "lap",
    title: "Loan Against Property EMI",
    subtitle: "Calculate EMI when you mortgage residential or commercial property for a secured loan.",
    file: "loan-against-property.html",
    image: "assets/calc-mortgage.png",
    group: "loan",
    type: "emi",
    defaults: { amount: 3000000, rate: 9.5, years: 15 },
    ranges: { amount: [500000, 50000000], rate: [7, 16], years: [1, 20] }
  },
  eligibility: {
    id: "eligibility",
    title: "Loan Eligibility Calculator",
    subtitle: "Find how much loan you may qualify for using income, existing EMIs and FOIR.",
    file: "eligibility.html",
    image: "assets/calc-eligibility.png",
    group: "plan",
    type: "eligibility"
  },
  affordability: {
    id: "affordability",
    title: "Home Loan Affordability Calculator",
    subtitle: "Turn a monthly budget into an estimated property value, loan amount and down payment.",
    file: "affordability.html",
    image: "assets/calc-home-loan.png",
    group: "plan",
    type: "affordability"
  },
  refinance: {
    id: "refinance",
    title: "Home Loan Refinance Calculator",
    subtitle: "Compare your current EMI with a balance-transfer rate and see interest you could save.",
    file: "refinance.html",
    image: "assets/calc-eligibility.png",
    group: "plan",
    type: "refinance"
  },
  sip: {
    id: "sip",
    title: "SIP Calculator",
    subtitle: "Project mutual fund SIP wealth with monthly investing, expected return and optional step-up.",
    file: "sip.html",
    image: "assets/calc-mutual-fund.png",
    group: "invest",
    type: "sip"
  },
  lumpsum: {
    id: "lumpsum",
    title: "Lumpsum Calculator",
    subtitle: "See how a one-time mutual fund investment can grow with compounding.",
    file: "lumpsum.html",
    image: "assets/calc-mutual-fund.png",
    group: "invest",
    type: "lumpsum"
  },
  "mutual-fund": {
    id: "mutual-fund",
    title: "Mutual Fund Returns Calculator",
    subtitle: "Compute CAGR and projected value from invested amount, current value or expected return.",
    file: "mutual-fund.html",
    image: "assets/calc-mutual-fund.png",
    group: "invest",
    type: "mf"
  },
  gold: {
    id: "gold",
    title: "Gold Returns Calculator",
    subtitle: "Estimate future gold value from grams held, live-style price per 10g and expected appreciation.",
    file: "gold.html",
    image: "assets/calc-gold.png",
    group: "invest",
    type: "gold"
  },
  fd: {
    id: "fd",
    title: "FD Calculator",
    subtitle: "Calculate fixed deposit maturity with compounding frequency of your choice.",
    file: "fd.html",
    image: "assets/calc-gold.png",
    group: "invest",
    type: "fd"
  },
  ppf: {
    id: "ppf",
    title: "PPF Calculator",
    subtitle: "Project Public Provident Fund maturity with yearly contribution and the notified rate.",
    file: "ppf.html",
    image: "assets/calc-mutual-fund.png",
    group: "invest",
    type: "ppf"
  },
  rd: {
    id: "rd",
    title: "RD Calculator",
    subtitle: "Find recurring deposit maturity for monthly savings at a bank RD rate.",
    file: "rd.html",
    image: "assets/calc-gold.png",
    group: "invest",
    type: "rd"
  },
  swp: {
    id: "swp",
    title: "SWP Calculator",
    subtitle: "See how long a mutual fund corpus lasts with systematic monthly withdrawals.",
    file: "swp.html",
    image: "assets/calc-mutual-fund.png",
    group: "invest",
    type: "swp"
  }
};

window.PG_FAQS = {
  emi: [
    ["What is EMI?", "EMI means Equated Monthly Instalment. It is a fixed amount paid every month until the loan is closed. Each EMI has an interest part and a principal part."],
    ["Which loans can I use this calculator for?", "Use it for home, car, personal, education, business and loan-against-property products. Enter the sanctioned amount, annual rate and tenure."],
    ["How does tenure change EMI?", "A longer tenure lowers the monthly EMI but increases total interest. A shorter tenure raises EMI and reduces interest cost."],
    ["What happens if I miss an EMI?", "Lenders usually charge a late fee and report the delay to credit bureaus. Repeated defaults can lead to higher rates or recovery action."]
  ],
  "home-loan": [
    ["What does an EMI mean?", "For a home loan, EMI is the monthly amount that covers interest on the outstanding balance plus a portion of principal."],
    ["When do home loan EMIs start?", "On a ready property, EMIs typically start after disbursement. On under-construction homes you may pay pre-EMI interest until full disbursement, unless you choose tranche EMIs."],
    ["What are the benefits of using a home loan EMI calculator?", "You can test amount, rate and tenure instantly, see total interest, and decide a budget before you apply or shortlist a property."],
    ["What is pre-EMI interest?", "Pre-EMI is interest on the amount already disbursed during construction. Principal repayment usually starts after the final disbursement unless you opt for tranche-based EMI."],
    ["Can I change my home loan EMI date?", "Most lenders allow a limited EMI date change through net banking or a branch request, subject to their policy."],
    ["How does repayment work?", "Payments follow an amortization schedule. Early years are interest-heavy; later years repay more principal."],
    ["What is the maximum home loan I can get?", "It depends on income, FOIR (often around 40–50%), credit score, age and property value. Use the eligibility calculator for an estimate."],
    ["Can I get approval before choosing a property?", "Yes. A pre-approved or in-principle sanction is based on your income and credit profile and helps you shop with a budget."],
    ["What repayment plans can raise eligibility?", "Plans such as SURF (step-up), FLIP (front-loaded then reducing EMI), accelerated repayment, tranche EMI and telescopic tenure up to 30 years are commonly described by lenders."]
  ],
  "personal-loan": [
    ["Why are personal loan rates higher?", "They are typically unsecured, so lenders price in higher credit risk than home or car loans."],
    ["What tenure is common?", "Most personal loans run 1–5 years, sometimes up to 7 years depending on the lender and amount."],
    ["Does prepayment save interest?", "Yes, reducing-balance loans save interest if you prepay, though some lenders charge a foreclosure fee in the lock-in period."]
  ],
  "car-loan": [
    ["Should I include on-road price?", "Yes. EMI should be based on the amount you actually borrow after down payment, not only ex-showroom price."],
    ["What if I miss car loan EMIs?", "The vehicle is hypothecated. Persistent default can lead to repossession as per the loan agreement."],
    ["Is a longer tenure better?", "It eases monthly cash flow but you pay more interest and the car depreciates meanwhile. Keep tenure close to how long you will keep the car."]
  ],
  "education-loan": [
    ["What is a moratorium?", "It is the course period plus typically 6–12 months after, during which you may pay only interest or let interest accrue."],
    ["Is interest added to principal?", "If you do not service interest in the moratorium, many lenders capitalize it, which increases the EMI later."],
    ["Are education loans tax deductible?", "Interest on education loans may qualify for deduction under Section 80E for a limited period. Confirm with a tax advisor."]
  ],
  mortgage: [
    ["Is a mortgage the same as a home loan?", "In India, home loan is the common term. Mortgage calculator here adds tax and insurance so you see full monthly housing cost."],
    ["Why add insurance?", "Home insurance and life cover linked to the loan are extra monthly outflows besides EMI."],
    ["Does property tax affect eligibility?", "Banks mainly use FOIR on EMI, but your true affordability should include tax, maintenance and insurance."]
  ],
  lap: [
    ["What is LAP?", "Loan against property is a secured loan where you pledge an existing property and continue to own it while paying EMI."],
    ["How much can I borrow?", "Lenders often fund a percentage of the property’s market value after legal and technical checks."],
    ["Is interest lower than a personal loan?", "Usually yes, because the loan is secured, but processing, valuation and legal costs still apply."]
  ],
  eligibility: [
    ["What is FOIR?", "Fixed Obligation to Income Ratio. Lenders cap existing EMIs plus the new EMI at a share of net monthly income, often 40–50%."],
    ["Does this guarantee a loan?", "No. It is an illustration. Credit score, employment stability, age and property papers also decide the sanction."],
    ["Should NRIs enter net income?", "Yes. Use take-home income after tax in the currency you convert to rupees for planning."]
  ],
  affordability: [
    ["How is property value estimated?", "We reverse the EMI formula from your budget, then add the down payment percentage you plan to pay."],
    ["What down payment is typical?", "Home loans often require 10–25% own contribution depending on the property value slab and lender."],
    ["Should I keep a buffer?", "Yes. Keep EMI comfortably below the maximum FOIR so extras like maintenance do not strain cash flow."]
  ],
  refinance: [
    ["When does refinance make sense?", "When the new rate is meaningfully lower, remaining tenure is long, and fees plus switching effort are smaller than interest saved."],
    ["What costs should I include?", "Processing fee, legal/technical charges, CERSAI, and any foreclosure fee on the old loan."],
    ["Will tenure change?", "You can keep tenure and cut EMI, or keep EMI and cut tenure. This tool compares EMI at the same remaining tenure."]
  ],
  sip: [
    ["What is SIP?", "A Systematic Investment Plan invests a fixed amount in a mutual fund at regular intervals, usually monthly."],
    ["Is the return guaranteed?", "No. Expected return is an assumption. Equity funds can have negative years."],
    ["What does step-up do?", "Step-up increases the SIP each year, which often matches salary growth and builds a larger corpus."]
  ],
  lumpsum: [
    ["When is lumpsum suitable?", "When you have surplus cash and a long horizon. Markets can be volatile in the short term."],
    ["How is compounding applied?", "This calculator uses annual compounding at the expected rate you enter."],
    ["Should I stagger entry?", "Some investors use STP from liquid to equity instead of one shot. That is a strategy choice, not part of this math."]
  ],
  "mutual-fund": [
    ["What is CAGR?", "Compound Annual Growth Rate is the annualised return that takes you from starting value to ending value over the years held."],
    ["Why is CAGR better than absolute return?", "Absolute return ignores time. CAGR lets you compare a 3-year hold with a 7-year hold."],
    ["Does this include expense ratio?", "Enter values after costs if you use actual invested and current amounts. Forward estimates are before tax."]
  ],
  gold: [
    ["How is gold priced in India?", "Retail quotes are commonly per 10 grams for 22K or 24K. This tool uses price per 10g and your grams."],
    ["Do jewellery making charges count?", "Making charges and GST reduce true return on jewellery. Investment gold (coins/bars/SGB) is cleaner for return math."],
    ["Is gold return guaranteed?", "No. Gold prices move with global rates, currency and demand. The appreciation rate is your assumption."]
  ],
  fd: [
    ["Which compounding is used?", "Banks may compound quarterly. Choose monthly, quarterly, half-yearly or yearly to match your FD."],
    ["Are FD returns taxable?", "Interest is typically added to income. TDS may apply above thresholds. This tool shows pre-tax maturity."],
    ["What if I break the FD?", "Premature withdrawal often gets a lower rate. Use the contracted rate only if you stay till maturity."]
  ],
  ppf: [
    ["What is the current PPF rate?", "The government notifies the rate quarterly. Default here is 7.1% p.a.; change it if the notified rate differs."],
    ["What is the yearly limit?", "You can deposit up to ₹1.5 lakh in a financial year across accounts as per prevailing rules."],
    ["How long is the lock-in?", "PPF has a 15-year tenure with extension options in 5-year blocks."]
  ],
  rd: [
    ["How is RD different from SIP?", "RD is a bank deposit at a fixed rate. SIP is market-linked. RD maturity is more predictable."],
    ["What if I miss an RD installment?", "Banks may charge a penalty or treat the RD as discontinued after several misses."],
    ["Is RD interest taxable?", "Yes, similar to FD interest, unless it is a tax-exempt scheme."]
  ],
  swp: [
    ["What is SWP?", "A Systematic Withdrawal Plan redeems a fixed amount from a mutual fund at regular intervals."],
    ["Can the corpus finish early?", "Yes, if withdrawals are high or returns are lower than assumed. The tool flags depletion."],
    ["Are withdrawals taxed?", "Equity and debt funds have different capital gains rules. This calculator ignores tax."]
  ]
};

window.PG_FORMULAS = {
  emi: "EMI = P × r × (1+r)^n / ((1+r)^n − 1)\nP = principal, r = annual rate ÷ 12 ÷ 100, n = tenure in months",
  sip: "FV = M × [((1+i)^n − 1) / i] × (1+i)\nM = monthly SIP, i = monthly return, n = months. Step-up increases M each year.",
  lumpsum: "FV = P × (1 + R/100)^t\nP = invested amount, R = expected annual return, t = years",
  mf: "CAGR = (Ending / Beginning)^(1/t) − 1\nForward value = Invested × (1 + expected return)^t",
  gold: "Current value = grams × (price per 10g / 10)\nFuture value = current × (1 + appreciation/100)^years",
  fd: "A = P × (1 + r/m)^(m×t)\nr = annual rate as decimal, m = compounds per year, t = years",
  ppf: "Each year: Balance = (Balance + yearly deposit) × (1 + rate)",
  rd: "M = P×n + P×n×(n+1)/2 × r/12\nP = monthly installment, n = months, r = annual rate as decimal",
  swp: "Each month: Balance = Balance × (1 + monthly return) − withdrawal",
  eligibility: "Max EMI = (Income × FOIR/100) − existing EMIs\nEligible loan = EMI × ((1+r)^n − 1) / (r × (1+r)^n)",
  education: "Moratorium interest may be capitalized.\nThen EMI is computed on the inflated principal for the repayment years."
};
