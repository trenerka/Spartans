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
    const argsKey = args;
    //Ako je neki od argmenata objekat konvertuje se u niz
    if (
      typeof argsKey[0] === "object" &&
      !Array.isArray(argsKey[0]) &&
      argsKey[0] !== null
    ) {
      argsNiz[0] = Object.entries(argsKey[0]);
    } else {
      argsNiz[0] = argsKey[0];
    }
    if (
      typeof argsKey[1] === "object" &&
      !Array.isArray(argsKey[1]) &&
      argsKey[1] !== null
    ) {
      argsNiz[1] = Object.entries(argsKey[1]);
    } else {
      argsNiz[1] = argsKey[1];
    }
    //Ako je neki od argumenata niz sortira se
    if (Array.isArray(argsNiz[0])) {
      argsNiz[0].sort();
    }
    if (Array.isArray(argsNiz[1])) {
      argsNiz[1].sort();
    }
    //Radi provera komutativnosti argumenata
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
console.time("First call");
console.log(newFunction({ a: 3, b: 7, c: 5 }, [5, 5, 5]));
console.timeEnd("First call");
console.time("Second call");
console.log(newFunction([9001], [23]));
console.timeEnd("Second call");
console.time("Third call");
console.log(newFunction([5, 5, 5], { a: 3, c: 5, b: 7 }));
console.timeEnd("Third call");
