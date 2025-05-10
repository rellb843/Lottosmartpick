
function analyze() {
  const history = document.getElementById("historyInput").value.trim();
  const lines = history.split(/\n+/);
  const sumCounts = {};
  const pairCounts = {};

  lines.forEach(line => {
    const digits = line.match(/\d/g);
    if (!digits) return;

    const nums = digits.map(Number);
    const sum = nums.reduce((a, b) => a + b, 0);
    sumCounts[sum] = (sumCounts[sum] || 0) + 1;

    for (let i = 0; i < nums.length - 1; i++) {
      const pair = `${nums[i]}${nums[i + 1]}`;
      pairCounts[pair] = (pairCounts[pair] || 0) + 1;
    }
  });

  const topSums = Object.entries(sumCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([sum]) => sum);

  const topPairs = Object.entries(pairCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([pair]) => pair);

  document.getElementById("bestSums").innerText = `Best Sums: ${topSums.join(', ')}`;
  document.getElementById("bestPairs").innerText = `Best Pairs: ${topPairs.join(', ')}`;
}

function generateSmartPick() {
  const mode = parseInt(document.getElementById("gameMode").value);
  const digits = Array.from({ length: mode }, () => Math.floor(Math.random() * 10));
  document.getElementById("smartPickResult").innerText = "Suggested Combo: " + digits.join('');
}

function inspectCombo() {
  const combo = document.getElementById("comboInput").value;
  const digits = combo.split('').map(Number);
  const sum = digits.reduce((a, b) => a + b, 0);
  const root = sum % 9 || 9;
  document.getElementById("comboDetails").innerText = `Sum: ${sum}, Root Sum: ${root}`;
}

function mirrorVtrac() {
  const combo = document.getElementById("analyzeCombo").value;
  const digits = combo.split('').map(Number);
  const mirror = digits.map(d => (d + 5) % 10).join('');
  const vtrac = digits.map(d => Math.floor(d / 2)).join('');
  const root = digits.reduce((a, b) => a + b, 0) % 9 || 9;
  document.getElementById("matrixOutput").innerText = `Mirror: ${mirror}, VTRAC: ${vtrac}, Root Sum: ${root}`;
}

function addWatch() {
  const val = document.getElementById("watchCombo").value;
  document.getElementById("watchListOutput").innerHTML += "📌 " + val + "<br>";
}
