const GRAPHQL_ENDPOINT = 'http://localhost:3000/graphql';
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

async function fetchBooks() {
  const query = `
    query {
      getBooks {
        id
        title
        author
      }
    }
  `;
  const data = await graphqlRequest(query);
  const tbody = document.querySelector('#books-table tbody');
  tbody.innerHTML = '';
  data.getBooks?.forEach(book => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td class="actions">
        <button class='edit-btn'   onclick="editBook('${book.id}', '${book.title}', '${book.author}')">✏️</button>
        <button class='delete-btn' onclick="deleteBook('${book.id}')">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function addBook() {
  const title = document.getElementById('book-title').value.trim();
  const author = document.getElementById('book-author').value.trim();
  const id = document.getElementById('book-id').value;

  if (!title || !author) {
    alert('Please fill both title and author');
    return;
  }

  if (id) {
    const mutation = `
      mutation UpdateBook($id: ID!, $input: UpdateBookInput!) {
        updateBook(id: $id, input: $input) {
          id
        }
      }
    `;
    await graphqlRequest(mutation, { id, input: { title, author } });
  } else {
    const mutation = `
      mutation CreateBook($input: CreateBookInput!) {
        createBook(input: $input) {
          id
          title
          author
        }
      }
    `;
    await graphqlRequest(mutation, { input: { title, author } });
  }

  document.getElementById('book-id').value = '';
  document.getElementById('book-title').value = '';
  document.getElementById('book-author').value = '';
  fetchBooks();
}

function editBook(id, title, author) {
  document.getElementById('book-id').value = id;
  document.getElementById('book-title').value = title;
  document.getElementById('book-author').value = author;
}

async function deleteBook(id) {
  const mutation = `
    mutation RemoveBook($id: Int!) {
      removeBook(id: $id)
    }
  `;
  await graphqlRequest(mutation, { id: parseInt(id, 10) });
  fetchBooks();
}

fetchBooks();
