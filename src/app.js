const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
// ROTAS

app.get("/repositories", (request, response) => {
    // TODO
    const {title, url , techs } = request.query;
    const results = title ? repositories.filter(project => project.title.includes(title)) : repositories;

    return response.json(results);
  
});

app.post("/repositories", (request, response) => {

    // TODO
    const { title, url, techs, likes} = request.body;
    const repository = { id: uuid(), title , url, techs, likes:0}

    repositories.push(repository);

    return response.json(repository);
  
});

app.put("/repositories/:id", (request, response) => {
    // TODO
  
    const { id } = request.params;
    const { title, url, techs } = request.body;
    const repositoriesIndex = repositories.findIndex(repository => repository.id == id);

    if(repositoriesIndex == -1){
        return response.status(400).json({ error: 'Project not Found'});
    }

    const repository = {
        id,
        title,
        url,
        techs,
        likes: repositories[repositoriesIndex].likes,
    };

    repositories[repositoriesIndex] = repository
    return response.status(200).json(repository);

});

app.delete("/repositories/:id", (request, response) => {
    // TODO
    const { id } = request.params;

    const repositoriesIndex = repositories.findIndex(repository => repository.id == id);

    if(repositoriesIndex >= 0){
      repositories.splice(repositoriesIndex, 1);
    }else{
      return response.status(400).json({ error : 'Repository not exists'});
    }

    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
    // TODO

    const { id } = request.params;

    const findRepositoryIndex = repositories.findIndex(repository => repository.id == id);

    if(findRepositoryIndex == -1){
      return response.status(400).json({ error: 'Repository not exists'});
    }
    
    repositories[findRepositoryIndex].likes++;

    return response.status(200).json(repositories[findRepositoryIndex]);
});

module.exports = app;
