# 🧾 Sistema Belleza Perfecta - Backend

Este es el backend del Sistema empresarial de la empresa Belleza Perfecta, desarrollado con [NestJS](https://nestjs.com/) y utilizando [MySQL](https://www.mysql.com/) como base de datos. El sistema permite gestionar clientes, productos, usuarios y facturas internas, facilitando el control administrativo y comercial del negocio.

## 🚀 Características principales

- 📄 Facturación interna con numeración secuencial automática
- 🧾 Generación de facturas con productos, cantidades, precios y notas
- 🧍 Asociación de facturas a clientes y usuarios
- 📂 Descarga de facturas en formato PDF con datos de la empresa
- 📦 Control de inventario centralizado (actualización automática al facturar)
- 👥 Gestión completa de clientes (alta, modificación, eliminación)
- 👨‍💼 Gestión de usuarios con control de acceso por roles (admin y vendedor)
- 🔒 Autenticación con JWT y protección de rutas
- 📈 Reportes filtrables por cliente, fecha, producto o usuario
- 📤 Exportación de reportes en formatos PDF y Excel
- 🕵️ Registro de actividades de usuarios (historial de acciones)
- 🌐 Arquitectura modular escalable con TypeORM
- 🐳 **Soporte para ejecución con Docker**

---

## ⚙️ Tecnologías utilizadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [MySQL](https://www.mysql.com/)
- [Class Validator](https://github.com/typestack/class-validator)

---

## 🏁 Requisitos

- Node.js >= 18
- MySQL >= 5.7
- npm o yarn
- (Opcional) [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)

---

## 📦 Instalación

```bash
# Clona el repositorio
git clone https://github.com/CardonaAndres/BellezaPerfectaServer
cd facturacion-backend

# Instala dependencias
npm install
```

---

## ⚙️ Configuración

Este proyecto utiliza un archivo de configuración ubicado en:

```
src/configs/app.ts
```

Allí puedes configurar parámetros como la conexión a la base de datos, claves JWT, y otros valores globales.

---

## 🐳 Docker (opcional)

El proyecto incluye un `Dockerfile` que permite construir y ejecutar el backend fácilmente usando Docker. Esto elimina la necesidad de instalar dependencias localmente.

### 🔨 Construcción de la imagen

```bash
docker build -t belleza-perfecta-backend .
```

### 🚀 Ejecución del contenedor

```bash
docker run -d -p 3000:3000 belleza-perfecta-backend
```

> 📝 Nota: La base de datos MySQL debe estar disponible externamente o en otro contenedor ya configurado.

## 🧪 Ejecución local

```bash
# Correr el servidor en modo desarrollo
npm run dev
```

---

## 🧰 Comandos útiles

```bash
# Compilar la aplicación
npm run build

# Ejecutar en modo producción
npm run start:prod

# Ejecutar pruebas unitarias
npm run test
```

---

## 👨‍💻 Autor

Desarrollado por Andrés Cardona
