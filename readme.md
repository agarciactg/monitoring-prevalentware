---------------------------------------------

# Monitoring Prevalentware

Este proyecto de monitoreo está diseñado para realizar un seguimiento y análisis de datos relacionados con el uso del sistema Prevalentware. Proporciona funcionalidades para la obtención de información de usuarios y otros aspectos relevantes.

## Requisitos previos

- Docker y Docker Compose
- Node.js y npm
- Graphql, CLI, client
- PostgreSQL
- Prisma

## Configuración de la base de datos

El proyecto utiliza PostgreSQL como base de datos. Configura la conexión en el archivo `.env`:

```env
# Connection string format for PostgreSQL
DATABASE_URL="postgresql://user:password@host:port/college_db?schema=public"

# PGADMIN
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=

# POSTGRES
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
```
---------------------------------

### Instrucciones de ejecución

instalar dependencias:
```node.js
npm install / npm i
```

Construir los contenedores de Docker:

```docker
sudo docker-compose build
```

### Iniciar los contenedores:

```docker
sudo docker-compose up
```

### Ejecutar el proyecto:

```node
npm start
```

### Ejecutar pruebas
Para ejecutar las pruebas, utiliza el siguiente comando:

```node
npm test
```

### Licencia
Este proyecto está bajo la Licencia MIT.

Asegúrate de personalizar la información según tus necesidades específicas. ¡Espero que esto sea lo que estás buscando!

Regenerate


## License

[MIT](https://choosealicense.com/licenses/mit/)
