Application e-commerce microservices avec Docker avec une architecture microservices en utilisant plusieurs conteneurs Docker interconnectés.
L’application est décomposée en plusieurs services indépendants :

- Client (Frontend)
    Langage : JavaScript
    Framework : Express.js (Node.js)
    Base de données : Aucune (utilise des appels API aux services products et orders) 

- API Gateway
  
- Payment Service
    Langage : Python
    Framework : Flask
    Base de données : Aucune (les produits sont stockés en mémoire)

- Product Service
    Langage : Python
    Framework : Flask
    Base de données : Aucune (les produits sont stockés en mémoire)
  
- Order Service
    Langage : Python
    Framework : Flask
    Base de données : Aucune (les produits sont stockés en mémoire)
