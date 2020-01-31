import moment from "moment";

export default function formatOutput(string, { as, suffix, loading = false } = {}) {
  let output;

  if (as)
    output = typeFormat(string, as, loading);
  else
    output = defaultOutput(string, loading);

  if (suffix && string)
    output = output + suffix;

  return output;
}

function typeFormat(string, type, isLoading) {
  switch (type) {
    case "time":
      if (string === undefined || !moment(string).isValid())
        return defaultOutput(string, isLoading);

      return moment(string).format("MMMM DD YYYY, HH:mm:ss");
    case "short time":
      if (string === undefined || !moment(string).isValid())
        return defaultOutput(string, isLoading);

      return moment(string).format("MM.DD.YYYY, HH:mm:ss");
    default: return string;
  }
}

function defaultOutput(string, isLoading) {
  if (string === true)
    return "yes";

  if (string === false)
    return "no";

  if (string === null)
    return "empty";

  if (!isLoading && string === undefined)
    return ". . .";

  if (string instanceof Number)
    return string.toString();

  if (typeof string === typeof {})
    return "<Object>";

  return string;
}