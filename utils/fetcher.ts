export default async function fetcher(
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) {
  const res = await fetch(input, init);
  return res.json();
}
