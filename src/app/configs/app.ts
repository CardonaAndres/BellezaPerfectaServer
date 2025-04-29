export const PORT = process.env.PORT ?? 3000;
export const CLIENTS = ['http://localhost:5173'];
export const SECRET_KEY = process.env.SECRET_KEY || 'secretKey210110011';

export const database_credentials = {
  type : 'mysql' as const,
  host : 'localhost' as const, // dokcer(host.docker.internal) | trabajo en local(localhost)
  port: 3306 as const,
  username: 'root' as const,
  password: '' as const,
  database: 'bellezaperfecta_db' as const,
}

export const description = ` Esta API permite la gestión completa de un sistema de facturación interna para pequeñas y medianas empresas. 

  🔧 Funcionalidades principales:
  - Generación y consulta de facturas internas
  - Control de inventario de productos
  - Gestión de clientes
  - Administración de usuarios con distintos niveles de acceso
  - Reportes exportables en PDF y Excel
  - Seguridad con autenticación y autorización basada en roles

  Todos los endpoints requieren autenticación por token JWT.  
`