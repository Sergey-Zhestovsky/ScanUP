export default function formatOutput(string) {
  if (string === true)
    return "yes";

  if (string === false)
    return "no";

  if (string === undefined || string === null)
    return "empty";

  if (string instanceof Number)
    return string.toString();

  if (typeof string === typeof {})
    return "<Object>";

  return string;
}