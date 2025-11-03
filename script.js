const radios = document.querySelectorAll('input[name="unit"]');
const inputGroups = {
  metric: document.querySelector(".input-group-metric"),
  imperial: document.querySelector(".input-group-imperial"),
};
const resultWrapper = document.querySelector(".result-wrapper");

// Inputs
const inputs = {
  metric: {
    weight: document.querySelector('input[name="weight-kg"]'),
    height: document.querySelector('input[name="height-cm"]'),
  },
  imperial: {
    weightSt: document.querySelector('input[name="weight-st"]'),
    weightLbs: document.querySelector('input[name="weight-lbs"]'),
    heightFt: document.querySelector('input[name="height-ft"]'),
    heightIn: document.querySelector('input[name="height-in"]'),
  },
};

// --- Event listeners ---
radios.forEach((radio) => {
  radio.addEventListener("change", () => setUnit(radio.id));
});

inputs.metric.weight.addEventListener("input", calculateMetricBMI);
inputs.metric.height.addEventListener("input", calculateMetricBMI);

inputs.imperial.weightSt.addEventListener("input", calculateImperialBMI);
inputs.imperial.weightLbs.addEventListener("input", calculateImperialBMI);
inputs.imperial.heightFt.addEventListener("input", calculateImperialBMI);
inputs.imperial.heightIn.addEventListener("input", calculateImperialBMI);

// --- Functions ---
function setUnit(unit) {
  Object.keys(inputGroups).forEach((key) => {
    inputGroups[key].classList.toggle("active", key === unit);
  });
  clearInputs();
  showBaseResult();
}

function calculateMetricBMI() {
  const kg = parseFloat(inputs.metric.weight.value);
  const heightM = parseFloat(inputs.metric.height.value) / 100;

  if (isValid(kg) && isValid(heightM)) {
    const bmi = kg / heightM ** 2;
    showResult(bmi, "metric", heightM);
  }
}

function calculateImperialBMI() {
  const st = parseFloat(inputs.imperial.weightSt.value);
  const lbs = parseFloat(inputs.imperial.weightLbs.value);
  const heightFt = parseFloat(inputs.imperial.heightFt.value);
  const heightIn = parseFloat(inputs.imperial.heightIn.value);

  if (isValid(st) && isValid(lbs) && isValid(heightFt) && isValid(heightIn)) {
    const totalLbs = st * 14 + lbs;
    const heightInTotal = heightFt * 12 + heightIn;
    const bmi = (totalLbs / heightInTotal ** 2) * 703;
    showResult(bmi, "imperial", heightInTotal);
  }
}

function isValid(value) {
  return !isNaN(value) && value > 0;
}

function showResult(bmi, metricType, height) {
  let category = "";
  if (bmi < 18.5) {
    category = "underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = "healthy weight";
  } else if (bmi >= 25 && bmi < 29.9) {
    category = "overweight";
  } else {
    category = "obesity";
  }

  let idealWeightText = "";
  if (metricType === "metric") {
    const minWeight = (18.5 * height * height).toFixed(1);
    const maxWeight = (24.9 * height * height).toFixed(1);
    idealWeightText = `${minWeight}kgs - ${maxWeight}kgs`;
  } else {
    const minWeight = (18.5 * (height * height)) / 703;
    const maxWeight = (24.9 * (height * height)) / 703;

    const minSt = Math.floor(minWeight / 14);
    const minLbs = Math.floor(minWeight % 14);
    const maxSt = Math.floor(maxWeight / 14);
    const maxLbs = Math.floor(maxWeight % 14);

    idealWeightText = `${minSt}st ${minLbs}lbs - ${maxSt}st ${maxLbs}lbs`;
  }

  resultWrapper.innerHTML = `
    <p class="result text-preset-6">
      Your BMI is... <span class="text-preset-1">${bmi.toFixed(1)}</span>
    </p>
    <p class="result-desc text-preset-6-regular">
      Your BMI suggests you're a ${category}. Your ideal weight is between <b>${idealWeightText}</b>.
    </p>
  `;
  resultWrapper.classList.add("active");
}

function showBaseResult() {
  resultWrapper.innerHTML = `
    <p class="result text-preset-4">Welcome!</p>
    <p class="result-desc text-preset-7-regular">
      Enter your height and weight and you’ll see your BMI result here
    </p>
  `;
  resultWrapper.classList.remove("active");
}

function clearInputs() {
  document.querySelectorAll("input").forEach((input) => (input.value = ""));
}
