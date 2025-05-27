// const GRAPHQL_ENDPOINT = 'http://localhost:3000/graphql';

async function graphqlRequest(query, variables = {}) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const json = await response.json();
  if (json.errors) {
    alert('Error: ' + json.errors.map(e => e.message).join(', '));
    throw new Error(json.errors.map(e => e.message).join(', '));
  }
  return json.data;
}
