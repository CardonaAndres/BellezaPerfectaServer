export const PORT = process.env.PORT ?? 3000;
export const CLIENTS = [
  'https://belleza-perfecta.com',
  'https://belleza-perfecta.vercel.app'
];

export const SECRET_KEY = process.env.SECRET_KEY || '';

export const database_credentials = {
  type : 'mysql' as const,
  host : 'mysql' as const, // dokcer(host.docker.internal) | trabajo en local(localhost)
  port: 3306 as const,
  username: 'bellezaperfecta_user' as const,
  password: 'bellezaperfecta_pass' as const,
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