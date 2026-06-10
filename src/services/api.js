const url = `api/test-dev/exercise-1`
export function obterDados() {
  return fetch(url)
    .then(response => response.json())
}