INSERT INTO authors (author, job) VALUES ('Tomasa', 'Profe');

INSERT INTO projects (name, authors_id) VALUES ('Primer proyecto molón', 1);

SELECT p.id, p.name, a.author, a.job
  FROM projects p
    JOIN authors a ON (a.id = p.authors_id);
  