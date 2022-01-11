const results = {};
const argsNiz = [];

//Funkcija koja radi bilo sta sa dva argumenta
const saberi = (arg1, arg2) => {
  let result = 0;
  result = arg1 + arg2;
  return result;
};

const memo = (saberi) => {
  return (...args) => {
    //Ako je neki od argmenata objekat konvertuje se u niz
    if (
      typeof args[0] === "object" &&
      !Array.isArray(args[0]) &&
      args[0] !== null
    ) {
      argsNiz[0] = Object.entries(args[0]);
    } else {
      argsNiz[0] = args[0];
    }
    if (
      typeof args[1] === "object" &&
      !Array.isArray(args[1]) &&
      args[1] !== null
    ) {
      argsNiz[1] = Object.entries(args[1]);
    } else {
      argsNiz[1] = args[1];
    }
    //Ako je neki od argumenata niz sortira se
    if (Array.isArray(argsNiz[0])) {
      argsNiz[0].sort();
    }
    if (Array.isArray(argsNiz[1])) {
      argsNiz[1].sort();
    }
    //Radi provere komutativnosti argumenata
    const argsNiz1 = [argsNiz[1], argsNiz[0]];
    //Radi testiranja
    console.log("NIZ1", argsNiz);
    console.log("NIZ2", argsNiz1);
    //Izvrsavanje funkcije samo sa novi argumentima
    if (!results[argsNiz] && !results[argsNiz1]) {
      {
        console.log("RADI SE");
        results[argsNiz] = saberi(...args);
      }
    }
    if (results[argsNiz1]) return results[argsNiz1];
    return results[argsNiz];
  };
};

const newFunction = memo(saberi);

// Testiranje

console.log(newFunction({ a: 3, b: 7, c: 5 }, [5, 5, 5]));

console.log(newFunction([9001], [23]));

console.log(newFunction([5, 5, 5], { a: 3, c: 5, b: 7 }));
