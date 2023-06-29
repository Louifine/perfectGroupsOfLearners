let minGroupeSize = document.getElementById("groupSize");
let msgNbGroup = document.getElementById("message");
let afficheGroupe = document.getElementById("groupes");

const promo = [
  { name: "Alex", level: 5, group: 1 },
  { name: "Lydie", level: 5, group: 1 },
  { name: "Bayram", level: 4, group: 1 },
  { name: "Max", level: 4, group: 1 },
  { name: "Guillaume", level: 4, group: 1 },
  { name: "Nisrine", level: 4, group: 1 },
  { name: "Jerome", level: 4, group: 1 },
  { name: "Nico", level: 3, group: 1 },
  { name: "Samir", level: 3, group: 1 },
  { name: "Samra", level: 3, group: 1 },
  { name: "Remi", level: 3, group: 1 },
  { name: "Gary", level: 3, group: 1 },
  { name: "Loic", level: 2, group: 1 },
  { name: "Quentin", level: 2, group: 1 },
  { name: "LoicG", level: 1, group: 1 },
  { name: "Tom", level: 1, group: 1 },
  { name: "Fabrice", level: 1, group: 1 },
  { name: "Melina", level: 1, group: 1 },
];

// const test = new Array();
let perfectFit = true;
minGroupeSize.addEventListener("change", (e) => {
  let tailleGroupe = e.target.value;
  let nbGroups = GetSureItsOK(tailleGroupe);

  let retenu = "";
  groupes.innerHTML = "";

  if (perfectFit) {
    // affiche le nombre de groupe
    msgNbGroup.innerHTML = "<p>Il y a " + nbGroups + " groupes</p>";
    // affiche les groupes 1 par 1
    for (let i = 1; i < nbGroups + 1; i++) {
      retenu += '<div class="card"><p>groupe : ' + i + "</p>";
      for (let j = 0; j < promo.length; j++) {
        if (promo[j].group == i) {
          retenu += "<p>" + promo[j].name + "</p>";
        }
      }
      retenu += "</div>";
    }
  } else {
    // affiche le nombre de groupe
    msgNbGroup.innerHTML = "<p>Il y a " + (nbGroups - 1) + " groupes</p>";
    // affiche les groupes 1 par 1
    for (let i = 1; i < nbGroups; i++) {
      retenu += '<div class="card"><p>groupe : ' + i + "</p>";
      for (let j = 0; j < promo.length; j++) {
        if (promo[j].group == i) {
          retenu += "<p>" + promo[j].name + "</p>";
        }
      }
      retenu += "</div>";
    }
  }
  groupes.innerHTML += retenu;
});

function GetSureItsOK(tailleGroupe) {
  let equilibre = true;
  let nbGroup = 0;
  let boucle = 0;
  do {
    nbGroup = CreateRandomGroup(tailleGroupe);
    equilibre = VerifyEquilibre(nbGroup);
    boucle++;
  } while (equilibre === false);
  console.log("nombre de boucle nécessaire : ", boucle);
  console.log(promo);
  return nbGroup;
}
function CreateRandomGroup(x) {
  let i = 1;
  let retenu = 0;
  let nbResteApp = 0;
  promo.sort(() => Math.random() - 0.5);

  for (let g = 0; g < promo.length; g++) {
    if (g > 0 && g % x === 0) {
      i++;
      nbResteApp = 0;
    }
    promo[g].group = i;
    retenu = g;
    nbResteApp++;
  }
  console.log("reste et x : ", nbResteApp, x);
  //on place les élèves pas encore groupés correctement
  if (nbResteApp % x != 0 && nbResteApp > 0) {
    perfectFit = false;
    for (z = 1; z < nbResteApp + 1; z++) {
      promo[promo.length - z].group = z;
    }
  }
  return i;
}

function VerifyEquilibre(nbGroup) {
  let puntos = new Array();
  for (i = 1; i < nbGroup + 1; i++) {
    puntos[i] = 0;
    for (j = 0; j < promo.length; j++) {
      if (promo[j].group == i) {
        puntos[i] += promo[j].level;
      }
    }
  }
  let moy = 0;
  for (let k = 1; k < puntos.length - 1; k++) {
    moy += puntos[k];
  }

  moy = moy / (puntos.length - 2);

  // console.log("nb groupe  = ", puntos.length - 2);

  for (let v = 1; v < puntos.length - 1; v++) {
    if (Math.abs(puntos[v] - moy) > 1) {
      return false;
    }
  }
  return true;
}
