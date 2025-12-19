// ---------- IMPORTS ----------

// Importar la biblioteca de Express

const express = require('express');

// Importar la biblioteca de CORS

const cors = require('cors');

const path = require('node:path');

// Importar la biblioteca de MySQL

const mysql = require("mysql2/promise");

// Importamos la biblioteca de variables de entorno

require("dotenv").config();

// ---------- FIN DE IMPORTS ----------



// ---------- CONFIG DE EXPRESS ----------

// Crear una variable con todo lo que puede hacer el servidor:

const app = express();

// Configuramos server para que funcione bien como API

app.use(cors());
app.use(express.json({ limit: '25Mb' }));

// ---------- FIN CONFIG DE EXPRESS ----------



// ---------- CONFIG DE MYSQL ----------

const getConnection = async () => {
  const datosConexion = {
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "pass",
    database: process.env.MYSQL_SCHEMA || "proyectos_molones",
  };

  const conn = await mysql.createConnection(datosConexion); // Crear la cajita de la conexión en el Workbench
  await conn.connect(); // Hacer click en la cajita de la conex del Workbench

  return conn;
};

// ---------- CONFIG DE MYSQL ----------




// Arrancar el servidor en el puerto 3000:

const port = 3000;
app.listen(port, () => {
  console.log(`Uh! El servidor ya está arrancado: <http://localhost:${port}/>`);
});

// ---------- ENDPOINTS ----------

// ENDPOINTS DEL API

app.get('/api/projects', async (req, res) => {
  console.log(req.headers.host);
  // 1. Conectarse a la base de datos.

  const conn = await getConnection();

  // 2. Preparar sentencia SQL (query).

  const selectAllProjects = `
      SELECT *
        FROM projects p
        JOIN authors a ON (p.authors_id = a.id);`;

  // 3. Lanzar la sentencia SQL y obtener los resultados.

  const [results] = await conn.query(selectAllProjects);

  // 4. Cerrar la conexión con la base de datos.

  await conn.end();

  // 5. Devolver la información.
  res.json(results);
});

app.post('/api/project', async (req, res) => {
  console.log('POST /api/project Body:', req.body);
  // 1. Conectarse a la base de datos.
  const conn = await getConnection();

  // 2.a. Preparar sentencia SQL (insert).
  const insertAuthor = `
    INSERT INTO authors (author, job, photo)
      VALUES (?, ?, ?);`;

  // 2.b. Lanzar la sentencia SQL y obtener los resultados.
  const [resultInsertAuthor] = await conn.execute(insertAuthor, [req.body.author, req.body.job, req.body.photo]);

  // 3.a. Preparar sentencia SQL (insert).
  const insertProject = `
    INSERT INTO projects (name, description, technologies, demo, repo, slogan, image, authors_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

  // 3.b. Lanzar la sentencia SQL y obtener los resultados.
  const [resultInsertProject] = await conn.execute(insertProject, [
    req.body.name,
    req.body.description,
    req.body.technologies,
    req.body.demo,
    req.body.repo,
    req.body.slogan,
    req.body.image,
    resultInsertAuthor.insertId
  ]);

  // 4. Cerrar la conexión con la base de datos.
   await conn.end();

  // 5. Devolver la información.
  res.json({
    success: true,
    projectURL: `http://localhost:3000/project/${resultInsertProject.insertId}`
  })
});




// SERVIDOR DE FICHEROS DINÁMICOS


// ---------- FIN ENDPOINTS ----------


// SERVIDOR DE FICHEROS ESTÁTICOS

app.use(express.static(path.join(__dirname, '..', 'frontend-static')));
