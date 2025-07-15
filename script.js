const year1 = [
  { code: "ET1001", name: "Álgebra" },
  { code: "ET1002", name: "Cálculo I" },
  { code: "ET1003", name: "Informática" },
  { code: "ET1004", name: "Física I" },
  { code: "ET1005", name: "Inglés Científico-Técnico" },
  { code: "ET1006", name: "Química" },
  { code: "ET1007", name: "Cálculo II" },
  { code: "ET1008", name: "Física II" },
  { code: "ET1009", name: "Expresión Gráfica" },
  { code: "ET1010", name: "Historia de la Ciencia" },
];

const year2 = [
  { code: "ET1011", name: "Estadística y Optimización" },
  { code: "ET1012", name: "Mecánica de Máquinas y Estructuras" },
  { code: "ET1013", name: "Electrotecnia" },
  { code: "ET1014", name: "Ingeniería Térmica" },
  { code: "ET1015", name: "Ciencia y Tecnología de Materiales" },
  { code: "ET1016", name: "Mecánica de Fluidos" },
  { code: "ET1017", name: "Empresa" },
  { code: "ET1018", name: "Electrónica" },
  { code: "ET1019", name: "Elasticidad y Resistencia de Materiales" },
  { code: "ET1020", name: "Teoría de Máquinas y Mecanismos" },
];

const year3 = [
  { code: "ET1022", name: "Métodos Matemáticos" },
  { code: "ET1023", name: "Sistemas Automáticos" },
  { code: "ET1024", name: "Sistemas de Producción Industrial" },
  { code: "ET1025", name: "Máquinas Eléctricas" },
  { code: "ET1027", name: "Ampliación de Física" },
  { code: "ET1028", name: "Dibujo Industrial" },
  { code: "ET1029", name: "Tecnologías de Fabricación" },
  { code: "ET1030", name: "Automatización Industrial" },
  { code: "ET1032", name: "Informática Industrial" },
  { code: "ET1033", name: "Tecnologías del Medio Ambiente y Seguridad Industrial" },
];

const year4 = [
  { code: "ET1021", name: "Instalaciones Eléctricas" },
  { code: "ET1026", name: "Teoría de Estructuras" },
  { code: "ET1031", name: "Proyectos de Ingeniería" },
  { code: "ET1034", name: "Prácticas Externas" },
  { code: "ET1035", name: "Ingeniería de Fluidos" },
  { code: "ET1036", name: "Tecnología de Materiales" },
  { code: "ET1037", name: "Calor y Frío Industrial" },
  { code: "ET1038", name: "Computational Methods in Engineering" },
  { code: "ET1039", name: "Nanotechnology" },
  { code: "ET1040", name: "Trabajo de Final de Grado" },
];

// Excepciones
const fixedRelations = {
  ET1004: ["ET1012"],
  ET1008: ["ET1020"],
  ET1012: ["ET1027"],
  ET1020: ["ET1032"],
};

// Relaciones automáticas
function assignUnlocks(from, to, exceptions = {}) {
  const available = [...to];
  const assigned = {};

  from.forEach(subject => {
    const fixed = exceptions[subject.code];
    if (fixed) {
      assigned[subject.code] = fixed;
      fixed.forEach(code => {
        const i = available.findIndex(s => s.code === code);
        if (i !== -1) available.splice(i, 1);
      });
    } else if (available.length > 0) {
      const randIndex = Math.floor(Math.random() * available.length);
      const chosen = available.splice(randIndex, 1)[0];
      assigned[subject.code] = [chosen.code];
    } else {
      assigned[subject.code] = [];
    }
  });

  return assigned;
}

const unlocksY1 = assignUnlocks(year1, year2, fixedRelations);
const unlocksY2 = assignUnlocks(year2, year3, fixedRelations);
const unlocksY3 = assignUnlocks(year3, year4, fixedRelations);

const subjects = [...year1, ...year2, ...year3, ...year4].map(s => ({
  ...s,
  unlocks: (unlocksY1[s.code] || unlocksY2[s.code] || unlocksY3[s.code] || []),
  year: s.code.startsWith("ET10") ? 1 :
        s.code.startsWith("ET101") || s.code === "ET1020" ? 2 :
        s.code.startsWith("ET102") || s.code === "ET1033" ? 3 : 4
}));

let approved = new Set(JSON.parse(localStorage.getItem("approvedSubjects") || "[]"));
const container = document.getElementById("grid");

function isUnlocked(subject) {
  // Las de primer curso siempre están desbloqueadas
  if (subject.year === 1) return true;

  // Busca qué asignaturas la desbloquean
  const unlockers = subjects.filter(s => s.unlocks.includes(subject.code));

  // Solo se desbloquea si al menos una de esas está aprobada
  return unlockers.some(s => approved.has(s.code));
}


function saveProgress() {
  localStorage.setItem("approvedSubjects", JSON.stringify([...approved]));
}

function clearProgress() {
  localStorage.removeItem("approvedSubjects");
  approved = new Set();
  render();
}

function render() {
  container.innerHTML = "";
  subjects.forEach(subject => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<strong>${subject.code}</strong><br>${subject.name}`;
    
    if (!isUnlocked(subject)) {
      card.classList.add("locked");
    } else {
      if (approved.has(subject.code)) {
        card.classList.add("approved");
      }
      card.addEventListener("click", () => {
        if (approved.has(subject.code)) {
          approved.delete(subject.code);
        } else {
          approved.add(subject.code);
        }
        saveProgress();
        render();
      });
    }

    container.appendChild(card);
  });
}

render();
