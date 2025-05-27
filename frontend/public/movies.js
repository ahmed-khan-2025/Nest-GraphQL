async function fetchMovies() {
    const query = `
      query {
        movies {
          id
          title
          director
          year
        }
      }
    `;
    const data = await graphqlRequest(query);
    const tbody = document.querySelector('#movies-table tbody');
    tbody.innerHTML = '';
    data.movies.forEach(movie => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${movie.title}</td>
        <td>${movie.director}</td>
        <td>${movie.year}</td>
        <td class="actions">
          <button class='edit-btn'   onclick="editMovie('${movie.id}', '${movie.title}', '${movie.director}', ${movie.year})">✏️</button>
          <button class='delete-btn' onclick="deleteMovie('${movie.id}')">🗑️</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  async function addMovie() {
    const id = document.getElementById('movie-id').value;
    const title = document.getElementById('movie-title').value.trim();
    const director = document.getElementById('movie-director').value.trim();
    const year = parseInt(document.getElementById('movie-year').value.trim(), 10);

    if (!title || !director || !year) {
      alert('Please fill title, director and year');
      return;
    }

    if (id) {
      const mutation = `
        mutation UpdateMovie($input: UpdateMovieInput!) {
          updateMovie(input: $input) {
            id
          }
        }
      `;
      await graphqlRequest(mutation, { input: { id, title, director, year } });
    } else {
      const mutation = `
        mutation CreateMovie($input: CreateMovieInput!) {
          createMovie(input: $input) {
            id
          }
        }
      `;
      await graphqlRequest(mutation, { input: { title, director, year } });
    }

    document.getElementById('movie-id').value = '';
    document.getElementById('movie-title').value = '';
    document.getElementById('movie-director').value = '';
    document.getElementById('movie-year').value = '';
    fetchMovies();
  }

  function editMovie(id, title, director, year) {
    document.getElementById('movie-id').value = id;
    document.getElementById('movie-title').value = title;
    document.getElementById('movie-director').value = director;
    document.getElementById('movie-year').value = year;
  }

  async function deleteMovie(id) {
    const mutation = `
      mutation RemoveMovie($id: String!) {
        removeMovie(id: $id) {
          id
          title
        }
      }
    `;
    await graphqlRequest(mutation, { id: id.toString() });
    fetchMovies();
  }
  fetchMovies();