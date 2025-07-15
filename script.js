const subjects = [
  // PRIMER AÑO
  { code: "ET1001", name: "Álgebra", year: 1, unlocks: ["ET1016"] },
  { code: "ET1002", name: "Cálculo I", year: 1, unlocks: ["ET1011"] },
  { code: "ET1003", name: "Informática", year: 1, unlocks: ["ET1013"] },
  { code: "ET1004", name: "Física I", year: 1, unlocks: ["ET1012"] },
  { code: "ET1005", name: "Inglés Científico-Técnico", year: 1, unlocks: ["ET1014"] },
  { code: "ET1006", name: "Química", year: 1, unlocks: ["ET1015"] },
  { code: "ET1007", name: "Cálculo II", year: 1, unlocks: ["ET1017"] },
  { code: "ET1008", name: "Física II", year: 1, unlocks: ["ET1020"] },
  { code: "ET1009", name: "Expresión Gráfica", year: 1, unlocks: ["ET1018"] },
  { code: "ET1010", name: "Historia de la Ciencia", year: 1, unlocks: ["ET1019"] },

  // SEGUNDO AÑO
  { code: "ET1011", name: "Estadística y Optimización", year: 2, unlocks: ["ET1023"] },
  { code: "ET1012", name: "Mecánica de Máquinas", year: 2, unlocks: ["ET1027"] },
  { code: "ET1013", name: "Electrotecnia", year: 2, unlocks: ["ET1025"] },
  { code: "ET1014", name: "Ingeniería Térmica", year: 2, unlocks: ["ET1024"] },
  { code: "ET1015", name: "Ciencia de Materiales", year: 2, unlocks: ["ET1029"] },
  { code: "ET1016", name: "Mecánica de Fluidos", year: 2, unlocks: ["ET1035"] },
  { code: "ET1017", name: "Empresa", year: 2, unlocks: ["ET1033"] },
  { code: "ET1018", name: "Electrónica", year: 2, unlocks: ["ET1030"] },
  { code: "ET1019", name: "Elasticidad", year: 2, unlocks: ["ET1028"] },
  { code: "ET1020", name: "Teoría de Máquinas", year: 2, unlocks: ["ET1032"] },

  // TERCER AÑO
  { code: "ET1022", name: "Métodos Matemáticos", year: 3, unlocks: ["ET1038"] },
  { code: "ET1023", name: "Sistemas Automáticos", year: 3, unlocks: ["ET1031"] },
  { code: "ET1024", name: "Producción Industrial", year: 3, unlocks: ["ET1037"] },
  { code: "ET1025", name: "Máquinas Eléctricas", year: 3, unlocks: ["ET1021"] },
  { code: "ET1027", name: "Ampliación de Física", year: 3, unlocks: ["ET1026"] },
  { code: "ET1028", name: "Dibujo Industrial", year: 3, unlocks: ["ET1036"] },
  { code: "ET1029", name: "Tecnología de Fabricación", year: 3, unlocks: ["ET1034"] },
  { code: "ET1030", name: "Automatización Industrial", year: 3, unlocks: ["ET1039"] },
  { code: "ET1032", name: "Informática Industrial", year: 3, unlocks: ["ET1040"] },
  { code: "ET1033", name: "Medio Ambiente y Seguridad", year: 3, unlocks: [] },

  // CUARTO AÑO
  { code: "ET1021", name: "Instalaciones Eléctricas", year: 4, unlocks: [] },
  { code: "ET1026", name: "Teoría de Estructuras", year: 4, unlocks: [] },
  { code: "ET1031", name: "Proyectos de Ingeniería", year: 4, unlocks: [] },
  { code: "ET1034", name: "Prácticas Externas", year: 4, unlocks: [] },
  { code: "ET1035", name: "Ingeniería de Fluidos", year: 4, unlocks: [] },
  { code: "ET1036", name: "Tecnología de Materiales", year: 4, unlocks: [] },
  { code: "ET1037", name: "Calor y Frío Industrial", year: 4, unlocks: [] },
  { code: "ET1038", name: "Métodos Computacionales", year: 4, unlocks: [] },
  { code: "ET1039", name: "Nanotecnología", year: 4, unlocks: [] },
  { code: "ET1040", name: "Trabajo Final de Grado", year: 4, unlocks: [] },
];

const approved = new Set();
const container = document.getElementById("grid");

function isUnlocked(subject) {
  if (subject.year === 1) return true;
  return subjects.some(s => s.unlocks.includes(subject.code) && approved.has(s.code));
}

function render() {
  container.innerHTML = "";
  subjects.forEach(subject => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<strong>${subject.code}</strong><br>${subject.name}`;
}
    if (approved.has(subject.code)) {
      card.classList.add("approved");
    } else if (!isUnlocked(subject)) {
      card.classList.add("locked");
    } else {
      card.addEventListener("click", () => {
        approved.add(subject.code);
        render();
      });
    }

    container.appendChild(card);
  });
}

render();

