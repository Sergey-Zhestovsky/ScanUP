function keyGenerator(groups = 4, groupLength = 4, multiple) {
  let result;

  if (typeof multiple === typeof 1) {
    result = new Array(multiple).fill(core())
  }

  result = core();

  function core() {
    const alph = "QWERTYUIOPASDFGHJKLZXCVBNM",
      num = "1234567890";

    let result = [];

    for (let i = 0; i < groups; i++) {
      let temp = [];

      for (let j = 0; j < groupLength; j++) {
        let symbols = Math.round(Math.random()) ? alph : num;

        temp.push(symbols[(Math.random() * symbols.length) | 0]);
      }

      result.push(temp.join(""));
    }

    return result.join("-");
  }

  return result;
}

module.exports = keyGenerator;