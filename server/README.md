# NestStudy Backend

## Requisitos

* Servidor MySQL
* Nodejs
* Archivo `StudyNest.sql`
* MySQL Workbench o saber como importar datos a un esquema desde un archivo .sql

## Instrucciones de instalación

### Base de datos

1. **Abre Workbench y crea un nuevo esquema vacío (ej. studynest)**

2. **Importa el archivo `StudyNest.sql` al nuevo esquema** 

### API

1. Una vez clonado el repositorio, entra a la carpeta /server

   ```bash
   cd server
   ```

2. Instala dependencias

   ```bash
   npm i
   ```

3. Crea el archivo .env dentro de la carpeta server y agrega la configuración para conectar con el servidor

   **(Esto es un ejemplo, cambia acorde a tu configuración)**

   ```
   # Base de datos
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=C0ntr@seña123
   DB_NAME=studynest
   DB_PORT=3306

   # Clave secreta para JWT
   JWT_SECRET=MínimoTreintaYDosCarácteresDeTuPreferencia
   ```

4. La estructura de los archivos debe verse así:

   ```
   server/
   ├── node_modules/
   ├── src/
   ├── .env
   ├── .gitignore
   ├── package.json
   ├── package-lock.json
   └── tsconfig.json
   ```

5. Ejecuta en dev

   ```bash
   npm run dev
   ```

## SwaggerUI
 - http://localhost:3000/docs