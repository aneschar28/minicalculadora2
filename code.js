const valor1 = document.getElementById("valor1");
const valor2 = document.getElementById("valor2");
const valor3 = document.getElementById("valor3");
const valor4 = document.getElementById("valor4");


const button = document.getElementById("button");
const deletebotton = document.getElementById("delete");

const labelBottom = document.getElementById("label-bottom");
const labelBottom2 = document.getElementById("label-bottom2");
const labelBottom3 = document.getElementById("label-bottom3");

const labelBottomR = document.getElementById("label-bottomR");
const labelBottom2R = document.getElementById("label-bottom2R");
const labelBottom3R = document.getElementById("label-bottom3R");

const slider = document.getElementById("slider");

// Rotorazer
const rotorazerBasic = document.getElementById("rotorazerBasic");
const rotorazerPlatinum = document.getElementById("rotorazerPlatinum");

// Salud y Suplementos
const ingestibles = document.getElementById("ingestibles");
const ingestiblesplus = document.getElementById("ingestiblesplus");
const beflexible = document.getElementById("beflexible");
const superthotics = document.getElementById("superthotics");
const walkfitPlatinum = document.getElementById("walkfitPlatinum");

// AirDoctor Unidades
const ad1000 = document.getElementById("ad1000");
const ad2000 = document.getElementById("ad2000");
const ad3500 = document.getElementById("ad3500");
const ad3500i = document.getElementById("ad3500i");
const ad4000 = document.getElementById("ad4000");
const ad5500 = document.getElementById("ad5500");
const ad5500i = document.getElementById("ad5500i");

// Filtros AD 1000
const ad1000set = document.getElementById("ad1000set");

// Filtros AD 2000
const ad2000OneYearComboPack = document.getElementById("ad2000OneYearComboPack");
const ad2000TwoYearComboPack = document.getElementById("ad2000TwoYearComboPack");
const ad2000Hepa = document.getElementById("ad2000Hepa");
const ad2000Carbon = document.getElementById("ad2000Carbon");
const ad2000Prefilter = document.getElementById("ad2000Prefilter");

// Filtros AD 3000 / 3500
const ad3000OneYearComboPack = document.getElementById("ad3000OneYearComboPack");
const ad3000TwoYearComboPack = document.getElementById("ad3000TwoYearComboPack");
const ad3000Hepa = document.getElementById("ad3000Hepa");
const ad3000Carbon = document.getElementById("ad3000Carbon");
const ad3000Prefilter = document.getElementById("ad3000Prefilter");

// Filtros AD 4000
const ad4000set = document.getElementById("ad4000set");

// Filtros AD 5000 / 5500
const ad5000OneYearComboPack = document.getElementById("ad5000OneYearComboPack");
const ad5000TwoYearComboPack = document.getElementById("ad5000TwoYearComboPack");
const ad5000Hepa = document.getElementById("ad5000Hepa");
const ad5000Carbon = document.getElementById("ad5000Carbon");
const ad5000Prefilter = document.getElementById("ad5000Prefilter");

let total = 0;


function pintarBarra(slider) {
  const min = slider.min || 0;
  const max = slider.max || 100;
  const value = slider.value;

  const percent = ((value - min) / (max - min)) * 100;

  slider.style.background = `
    linear-gradient(
      to right,
      #e63946 0%,
      #e63946 ${percent}%,
      #2d6a4f ${percent}%,
      #2d6a4f 100%
    )
  `;
}

function round2(n) {
    return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
}

function money(n) {
    return `${round2(n).toFixed(2)}`;
}

function percent(n) {
    return round2(n);
}

function calcular2() {
    const value = percent(slider.value);
    const total = round2(valor1.value);
    const taxes = round2(valor4.value);

    const leftValue = round2((value / 100) * total);
    const leftTaxes = round2((value / 100) * taxes);

    const rightValue = round2(total - leftValue);
    const rightTaxes = round2(taxes - leftTaxes);

    labelBottom.innerHTML = `${value}%`;
    labelBottom2.innerHTML = money(leftValue);
    labelBottom3.innerHTML = `Taxes:${money(leftTaxes)}`;

    labelBottomR.innerHTML = `${100 - value}%`;
    labelBottom2R.innerHTML = money(rightValue);
    labelBottom3R.innerHTML = `Taxes:${money(rightTaxes)}`;
}


function calcular() {
    const ok = [valor1.value, valor2.value, valor3.value, valor4.value]
    .filter(v => v !== "");

    function arraysIguales(a, b) {
      if (a.length !== b.length) return false;

        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }

        return true;
    }

    let caso1 = arraysIguales (ok,[valor1.value]);
    let caso2 = arraysIguales (ok,[valor1.value,valor2.value]);
    let caso3 = arraysIguales (ok,[valor1.value,valor3.value]);
    let caso4 = arraysIguales (ok,[valor2.value,valor3.value]);
    let caso5 = arraysIguales (ok,[valor1.value,valor4.value]);
    let caso6 = arraysIguales (ok,[valor1.value, valor2.value, valor4.value]); //me parece que son casos obsoletos, por ahora no los tender en cuenta
    let caso7 = arraysIguales (ok,[valor1.value, valor3.value, valor4.value]);
    let caso8 = arraysIguales (ok,[valor2.value, valor3.value, valor4.value]); //me parece que son casos obsoletos, por ahora no los tender en cuenta

    if (caso2 || caso3 || caso4) {

        const v1 = round2(valor1.value);
        const v2 = round2(valor2.value);
        const v3 = round2(valor3.value);

        if (valor3.value === "") {
            valor3.value = money((v1 * v2) / 100);
        }

        if (valor2.value === "") {
            valor2.value = percent((100 * v3) / v1);
        }

        if (valor1.value === "") {
            valor1.value = money((100 * v3) / v2);
        }

        slider.value = percent(valor2.value);
        pintarBarra(slider);

        updateLabels();

        valor2.value="";
        valor3.value="";


    } else if (caso1 || caso5) {

        calcular2();

    } else if (caso7){
        const v1 = round2(valor1.value);
        const v3 = round2(valor3.value);
        const v4 = round2(valor4.value);
        

        if (valor2.value === "") {
            const v2 = money((v3 / v1) * 100);

            valor2.value = v2;

            valor4.value = money((v4 / v2) * 100);

        }

        slider.value = percent(valor2.value);
        pintarBarra(slider);

        updateLabels();

        valor2.value="";
        valor3.value="";
    }
}


function updateLabels() {
    const value = percent(slider.value);
    const total = round2(valor1.value);
    const taxes = round2(valor4.value);

    const leftValue = round2((value / 100) * total);
    const leftTaxes = round2((value / 100) * taxes);

    const rightValue = round2(total - leftValue);
    const rightTaxes = round2(taxes - leftTaxes);

    const sliderWidth = slider.offsetWidth;
    const thumbPos = (value / slider.max) * sliderWidth;

    labelBottom.innerHTML = `${round2(value)}%`;
    labelBottom2.innerHTML = money(leftValue);
    labelBottom3.innerHTML = `Taxes:${money(leftTaxes)}`;

    labelBottomR.innerHTML = `${round2(100 - value)}%`;
    labelBottom2R.innerHTML = money(rightValue);
    labelBottom3R.innerHTML = `Taxes:${money(rightTaxes)}`;

    const rightPos = ((sliderWidth - thumbPos) / 2) + thumbPos;
    const leftPos = thumbPos / 2;

    [labelBottomR, labelBottom2R, labelBottom3R].forEach(el => {
        el.style.left = `${rightPos}px`;
    });

    [labelBottom, labelBottom2, labelBottom3].forEach(el => {
        el.style.left = `${leftPos}px`;
    });
}

function errance (){

    slider.value = "50";
    pintarBarra(slider);

    labelBottom.innerHTML = "0%";
    labelBottom2.innerHTML = "$0";
    labelBottom3.innerHTML = "Taxes:$0";

    labelBottomR.innerHTML = "0%";
    labelBottom2R.innerHTML = "$0";
    labelBottom3R.innerHTML = "Taxes:$0";

    [labelBottomR, labelBottom2R, labelBottom3R].forEach(el => {
        el.style.left = "75%";
    });

    [labelBottom, labelBottom2, labelBottom3].forEach(el => {
        el.style.left = "25%";
    });

    valor1.value="";
    valor2.value="";
    valor3.value="";
    valor4.value="";

    document.querySelectorAll(".btn-secondary").forEach(btn => {
    btn.style.backgroundColor = "#2d6a4f";

    total=0;
});

}

function shortcutsuma(numeros) {
    total += numeros;

    
}

function shortcutresta(numeros) {
    total -= numeros;

    
}

function toggleColor(elemento) {
    const colorActual = getComputedStyle(elemento).backgroundColor;

    if (colorActual === "rgb(45, 106, 79)") {
        elemento.style.backgroundColor = "#e63946";
    } else {
        elemento.style.backgroundColor = "#2d6a4f";
    }
}

function procesarBoton(el, precio) {
  const color = getComputedStyle(el).backgroundColor;

  if (color === "rgb(45, 106, 79)") {
    shortcutsuma(precio);
  } else if (color === "rgb(230, 57, 70)") {
    shortcutresta(precio);
  }

  valor1.value = round2(total);
  toggleColor(el);
}


button.addEventListener("click", () => {
    calcular();
});


slider.addEventListener("input", () => {
    
    pintarBarra(slider);
    updateLabels();

});

deletebotton.addEventListener("click", () => {
    
    errance();

});

// Rotorazer
rotorazerBasic.addEventListener("click", (e) => {

    procesarBoton(e.currentTarget, 149.85);


});
rotorazerPlatinum.addEventListener("click", (e) => {
    
    procesarBoton(e.currentTarget, 194.7);

});

// Salud y Suplementos
ingestibles.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,79.95);
});
ingestiblesplus.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,99.95);
});
beflexible.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,39.95);
});
superthotics.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,39.95);
});
walkfitPlatinum.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,19.95);
});

// AirDoctor Unidades
ad1000.addEventListener("click", () => {
    
});
ad2000.addEventListener("click", () => {
    
});
ad3500.addEventListener("click", () => {
    
});
ad3500i.addEventListener("click", () => {
 
});
ad4000.addEventListener("click", () => {
    
});
ad5500.addEventListener("click", () => {
    
});
ad5500i.addEventListener("click", () => {
    
});

// Filtros AD 1000
ad1000set.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,84.95);
});

// Filtros AD 2000
ad2000OneYearComboPack.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,120.57);
});
ad2000TwoYearComboPack.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,226.98);
});
ad2000Hepa.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,47.95);
});
ad2000Carbon.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,46.95);
});
ad2000Prefilter.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,15.99);
});

// Filtros AD 3000 / 3500
ad3000OneYearComboPack.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,162.99);
});
ad3000TwoYearComboPack.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,305.89);
});
ad3000Hepa.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,63.95);
});
ad3000Carbon.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,63.95);
});
ad3000Prefilter.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,20.95);
});

// Filtros AD 4000
ad4000set.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,89.95);
});

// Filtros AD 5000 / 5500
ad5000OneYearComboPack.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,335.75);
});
ad5000TwoYearComboPack.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,637.99);
});
ad5000Hepa.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,133);
});
ad5000Carbon.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,131);
});
ad5000Prefilter.addEventListener("click", (e) => {
     procesarBoton(e.currentTarget,35);
});

