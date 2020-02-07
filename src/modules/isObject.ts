export default function isObject(object: any): boolean {
  return object instanceof Object && !Array.isArray(object);
}