export const PORT = process.env.PORT ?? 3000;
export const CLIENTS = ['http://localhost:5173'];

export const description = `
Esta API permite la gestión completa de un sistema de facturación interna para pequeñas y medianas empresas. 

  🔧 Funcionalidades principales:
  - Generación y consulta de facturas internas
  - Control de inventario de productos
  - Gestión de clientes
  - Administración de usuarios con distintos niveles de acceso
  - Reportes exportables en PDF y Excel
  - Seguridad con autenticación y autorización basada en roles

  Todos los endpoints requieren autenticación por token JWT.  
`