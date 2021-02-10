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
            "disposition":"disposition", 
            "objectifs":"disposition",
            "category":"rondo", 
            "nbPlayers":11,
            "time":"20min",
            "image_url":"http://image.com", 
            "image_id":"imageId", 
            "popular":0, 
        }

**Users**
-Créer user (POST): [api/users](http://localhost:4000/api/users/signup)
    
    Exemple:
        {
            "email":"edgar2@promutuel.ca",
            "password":"test123",
            "user_name":"edgar2",
            "subscription":"free",
            "first_name":"edgars",
            "last_name":"silveras"
        }






