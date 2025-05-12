
function analyze() {
  const history = document.getElementById("historyInput").value.trim().split(/\n+/);
  const sumFreq = {};
  const pairFreq = {};

  history.forEach(line => {
    const digits = line.match(/\d/g)?.map(Number);
    if (!digits) return;
    const sum = digits.reduce((a, b) => a + b, 0);
    sumFreq[sum] = (sumFreq[sum] || 0) + 1;

    for (let i = 0; i < digits.length - 1; i++) {
      const pair = `${digits[i]}${digits[i + 1]}`;
      pairFreq[pair] = (pairFreq[pair] || 0) + 1;
    }
  });

  const topSums = Object.entries(sumFreq).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const topPairs = Object.entries(pairFreq).sort((a,b)=>b[1]-a[1]).slice(0,5);

  document.getElementById("bestSums").innerText = "Top Sums: " + topSums.map(([s]) => s).join(', ');
  document.getElementById("bestPairs").innerText = "Top Pairs: " + topPairs.map(([p]) => p).join(', ');

  drawChart("sumChart", "Sum Frequency", topSums);
  drawChart("pairChart", "Pair Frequency", topPairs);
}

function drawChart(canvasId, label, data) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.map(d => d[0]),
      datasets: [{
        label,
        data: data.map(d => d[1])
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}

function generateSmartPick() {
  const mode = parseInt(document.getElementById("gameMode").value);
  const digits = Array.from({ length: mode }, () => Math.floor(Math.random() * 10));
  document.getElementById("smartPickResult").innerText = "Suggested Combo: " + digits.join('');
}

function inspectCombo() {
  const combo = document.getElementById("comboInput").value;
  const digits = combo.split('').map(Number);
  const sum = digits.reduce((a,b) => a + b, 0);
  const root = sum % 9 || 9;
  document.getElementById("comboDetails").innerText = `Sum: ${sum}, Root: ${root}`;
}

function mirrorVtrac() {
  const combo = document.getElementById("analyzeCombo").value;
  const digits = combo.split('').map(Number);
  const mirror = digits.map(d => (d + 5) % 10).join('');
  const vtrac = digits.map(d => Math.floor(d / 2)).join('');
  const root = digits.reduce((a, b) => a + b, 0) % 9 || 9;
  document.getElementById("matrixOutput").innerText = `Mirror: ${mirror}, VTRAC: ${vtrac}, Root: ${root}`;
}

function addWatch() {
  const val = document.getElementById("watchCombo").value;
  document.getElementById("watchListOutput").innerHTML += "📌 " + val + "<br>";
}

function suggestCombos() {
  const mode = parseInt(document.getElementById("gameMode").value);
  const suggestions = new Set();
  while (suggestions.size < 5) {
    const digits = Array.from({ length: mode }, () => Math.floor(Math.random() * 10));
    suggestions.add(digits.join(''));
  }
  const out = Array.from(suggestions).map(c => `Straight: ${c}, Box: ${[...new Set(c)].sort().join('')}`);
  document.getElementById("comboSuggestions").innerHTML = out.join("<br>");
}
