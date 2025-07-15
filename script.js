const subjects = [
  // PRIMER CURSO
  { code: "ET1001", name: "Álgebra", year: 1, unlocks: [] },
  { code: "ET1002", name: "Cálculo I", year: 1, unlocks: [] },
  { code: "ET1003", name: "Informática", year: 1, unlocks: [] },
  { code: "ET1004", name: "Física I", year: 1, unlocks: ["ET1012"] }, // excepción
  { code: "ET1005", name: "Inglés Científico-Técnico", year: 1, unlocks: [] },
  { code: "ET1006", name: "Química", year: 1, unlocks: [] },
  { code: "ET1007", name: "Cálculo II", year: 1, unlocks: [] },
  { code: "ET1008", name: "Física II", year: 1, unlocks: ["ET1020"] }, // excepción
  { code: "ET1009", name: "Expresión Gráfica", year: 1, unlocks: [] },
  { code: "ET1010", name: "Historia de la Ciencia", year: 1, unlocks: [] },

  // SEGUNDO CURSO
  { code: "ET1011", name: "Estadística y Optimización", year: 2, unlocks: [] },
  { code: "ET1012", name: "Mecánica de Máquinas y Estructuras", year: 2, unlocks: ["ET1027"] }, // excepción
  { code: "ET1013", name: "Electrotecnia", year: 2, unlocks: [] },
  { code: "ET1014", name: "Ingeniería Térmica", year: 2, unlocks: [] },
  { code: "ET1015", name: "Ciencia y Tecnología de Materiales", year: 2, unlocks: [] },
  { code: "ET1016", name: "Mecánica de Fluidos", year: 2, unlocks: [] },
  { code: "ET1017", name: "Empresa", year: 2, unlocks: [] },
  { code: "ET1018", name: "Electrónica", year: 2, unlocks: [] },
  { code: "ET1019", name: "Elasticidad y Resistencia de Materiales", year: 2, unlocks: [] },
  { code: "ET1020", name: "Teoría de Máquinas y Mecanismos", year: 2, unlocks: ["ET1032"] }, // excepción

  // TERCER CURSO
  { code: "ET1022", name: "Métodos Matemáticos", year: 3, unlocks: [] },
  { code: "ET1023", name: "Sistemas Automáticos", year: 3, unlocks: [] },
  { code: "ET1024", name: "Sistemas de Producción Industrial", year: 3, unlocks: [] },
  { code: "ET1025", name: "Máquinas Eléctricas", year: 3, unlocks: [] },
  { code: "ET1027", name: "Ampliación de Física", year: 3, unlocks: [] },
  { code: "ET1028", name: "Dibujo Industrial", year: 3, unlocks: [] },
  { code: "ET1029", name: "Tecnologías de Fabricación", year: 3, unlocks: [] },
  { code: "ET1030", name: "Automatización Industrial", year: 3, unlocks: [] },
  { code: "ET1032", name: "Informática Industrial", year: 3, unlocks: [] },
  { code: "ET1033", name: "Medio Ambiente y Seguridad Industrial", year: 3, unlocks: [] },

  // CUARTO CURSO
  { code: "ET1021", name: "Instalaciones Eléctricas", year: 4, unlocks: [] },
  { code: "ET1026", name: "Teoría de Estructuras", year: 4, unlocks: [] },
  { code: "ET1031", name: "Proyectos de Ingeniería", year: 4, unlocks: [] },
  { code: "ET1034", name: "Prácticas Externas", year: 4, unlocks: [] },
  { code: "ET1035", name: "Ingeniería de Fluidos", year: 4, unlocks: [] },
  { code: "ET1036", name: "Tecnología de Materiales", year: 4, unlocks: [] },
  { code: "ET1037", name: "Calor y Frío Industrial", year: 4, unlocks: [] },
  { code: "ET1038", name: "Computational Methods", year: 4, unlocks: [] },
  { code: "ET1039", name: "Nanotechnology", year: 4, unlocks: [] },
  { code: "ET1040", name: "Trabajo Final de Grado", year: 4, unlocks: [] },
];

// ========= FUNCIONES =========

let approved = new Set(JSON.parse(localStorage.getItem("approvedSubjects") || "[]"));
const container = document.getElementById("grid");

function isUnlocked(subject) {
  // PRIMER AÑO siempre desbloqueado
  if (subject.year === 1) return true;

  // Buscar asignaturas que desbloquean esta
  const unlockers = subjects.filter(s => s.unlocks.includes(subject.code));

  // Si al menos una está aprobada, entonces se desbloquea
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
