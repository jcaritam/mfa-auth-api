# MFA Authentication API

Esta es una API de autenticación que implementa autenticación multifactor (MFA) utilizando **Node.js**, **Express**, y otras herramientas modernas. Permite a los usuarios registrarse, iniciar sesión y configurar/verificar MFA para mayor seguridad.

## Características

- **Registro de usuarios**: Crear nuevos usuarios con validación de datos.
- **Inicio de sesión**: Autenticar usuarios con email y contraseña.
- **Configuración de MFA**: Generar un secreto y una URL de configuración para MFA.
- **Verificación de MFA**: Validar un código MFA proporcionado por el usuario.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/jcaritam/mfa-auth-api
   cd mfa-auth-api
   ```

2. Instala las dependencias:
   ```bash
   yarn install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:
   ```env
   PORT=3000
   DATABASE_URL=postgresql://user:password@localhost:5432/database
   JWT_SECRET=your_jwt_secret
   ```

4. Ejecuta las migraciones de la base de datos (si usas Prisma):
   ```bash
   yarn db:migrate
   ```

5. Inicia el servidor:
   ```bash
   yarn start
   ```

## Endpoints

### **Autenticación**

#### `POST /auth/register`
- **Descripción**: Registra un nuevo usuario.
- **Cuerpo de la solicitud**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Respuesta**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### `POST /auth/login`
- **Descripción**: Inicia sesión con email y contraseña.
- **Cuerpo de la solicitud**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Respuesta**:
  - Si MFA está habilitado:
    ```json
    {
      "message": "MFA required",
      "mfaToken": "MFA_TOKEN"
    }
    ```
  - Si MFA no está habilitado:
    ```json
    {
      "message": "Login successful",
      "token": "JWT_TOKEN"
    }
    ```

#### `POST /auth/mfa/setup`
- **Descripción**: Configura MFA para un usuario.
- **Cuerpo de la solicitud**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Respuesta**:
  ```json
  {
    "message": "MFA setup info generated",
    "data": {
      "secret": "BASE32_SECRET",
      "otpAuthUrl": "otpauth://totp/App%20Demo:user@example.com?secret=BASE32_SECRET"
    }
  }
  ```

#### `POST /auth/verify-mfa`
- **Descripción**: Verifica un código MFA.
- **Cuerpo de la solicitud**:
  ```json
  {
    "mfaToken": "MFA_TOKEN",
    "code": "123456"
  }
  ```
- **Respuesta**:
  ```json
  {
    "message": "MFA verified",
    "data": {
      "token": "JWT_TOKEN"
    }
  }
  ```

## Estructura del Proyecto

```
src/
├── application/
│   ├── use-cases/          # Casos de uso de la aplicación
├── domain/                 # Lógica de negocio
├── infrastructure/
│   ├── database/           # Configuración de la base de datos (Prisma)
├── interfaces/
│   ├── http/
│       ├── controllers/    # Controladores de las rutas
│       ├── routes/         # Definición de rutas
```

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para construir APIs.
- **Prisma**: ORM para la gestión de la base de datos.
- **Speakeasy**: Biblioteca para la generación y validación de códigos MFA.
- **JWT**: Para la autenticación basada en tokens.
