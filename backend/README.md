<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Prueba Técnica Junior: Sistema de Gestión de Curso

## Objetivo:

Construir una aplicación para gestionar un curso y sus estudiantes, permitiendo crear, actualizar y eliminar un curso, así como añadir y remover estudiantes. La aplicación debe incluir una funcionalidad personalizada para calcular un índice de diversidad basado en los dominios de los emails de los estudiantes.

## Tecnologías Utilizadas:

- **NestJS** - Framework para construir aplicaciones del lado del servidor.
- **TypeORM** - ORM para interactuar con la base de datos PostgreSQL.
- **PostgreSQL** - Sistema de gestión de bases de datos relacional.

## Instrucciones de Instalación:

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/sergio-010/course-management-system-api.git
   cd course-management-system-back
   Instalar dependencias:
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables:

   ```bash
   DATABASE_URL="postgresql://Coursedb_owner:npg_7aknc8gHxTSu@ep-lively-morning-a4ewojpe-pooler.us-east-1.aws.neon.tech/Coursedb?sslmode=require"
   PORT="4000"
   ```

   4. Iniciar el servidor:

   ```bash
   npm run start:dev
   ```

# course-management-system-api
