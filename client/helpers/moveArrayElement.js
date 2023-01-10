export default function moveArrayElement (arr, from, to) {
  var f = arr.splice(from, 1)[0];
  arr.splice(Math.max(0, to), 0, f);
  return arr;
}