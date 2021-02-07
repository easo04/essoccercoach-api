# essoccercoach-api

> API REST de l'application web esscoccercoach.
Cette API gère les usagers et les exercices de l'application

## Run Dev
npm run dev

## Enpoints

**Exercices**
- Obtenir tous les exercices(GET): [api/exercices](http://localhost:4000/api/exercices)
- Obtenir les exercices populaires(GET): [api/exercices/populaires/get-all](http://localhost:4000/api/exercices/populaires/get-all)
- Obtenir les exercices par catégorie(GET): [api/exercices/category/:category](http://localhost:4000/api/exercices/category/:category)
- Obtenir les exercices par id(GET): [api/exercices/:id](http://localhost:4000/api/exercices/:id)
- Créer un nouvel exercice(POST): [api/exercices](http://localhost:4000/api/exercices)
    Exemple:
    {
        "title":"title",
        "description":"description", 
        "disposition":"disposition", //Peut être null
        "objectifs":"disposition", //Peut être null
        "category":"rondo", //Peut être null
        "nbPlayers":11, //Peut être null
        "time":"20min", //Peut être null
        "image_url":"http://image.com", //Peut être null
        "image_id":"imageId", //Peut être null
        "popular":0, //0 par défaut
    }







