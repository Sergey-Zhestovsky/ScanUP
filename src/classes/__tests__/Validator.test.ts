import Validator, { Rules } from "../Validator";

test("validation: show error", () => {
  let v = new Validator({
    name: Rules.required,
    sub: [[Rules.max, 100]],
    m: {
      q: Rules.required
    },
    n: {
      k: Rules.required
    }
  });

  let errors = v.validate({ name: "", sub: "100", m: { q: "" }, n: { k: "" } });

  expect(Validator.showError(errors)).toStrictEqual({
    name: 'Required field.',
    m: { q: 'Required field.' },
    n: { k: 'Required field.' }
  });
});