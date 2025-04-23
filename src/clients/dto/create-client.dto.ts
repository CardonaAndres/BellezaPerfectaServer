import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches, MinLength} from 'class-validator';
  
export class CreateClientDto {
    @ApiProperty({ description : 'Número de documento del cliente' })
    @IsString({ message: 'El número de documento debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El número de documento es obligatorio' })
    @MinLength(3, { message: 'El número de documento debe tener al menos 6 caracteres' })
    client_ID: string;
  
    @ApiProperty({ description : 'Tipo de documento del cliente' })
    @IsString({ message: 'El tipo de documento debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El tipo de documento es obligatorio' })
    document_type: string;
  
    @ApiProperty({ description : 'Nombre del cliente' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    name: string;
  
    @ApiProperty({ description : 'Ciudad donde se encuenta el cliente' })
    @IsString({ message: 'La ciudad debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La ciudad es obligatoria' })
    city: string;
  
    @ApiProperty({ description : 'Zona donde esta / resive el cliente' })
    @IsString({ message: 'La zona debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La zona es obligatoria' })
    zone: string;
  
    @ApiProperty({ description : 'Barrio del cliente' })
    @IsString({ message: 'El barrio debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El barrio es obligatorio' })
    neighborhood: string;
  
    @ApiProperty({ description : 'Dirreción del cliente' })
    @IsString({ message: 'La dirección debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La dirección es obligatoria' })
    address: string;
  
    @ApiProperty({ description : 'Celular del cliente' })
    @IsString({ message: 'El celular debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El celular es obligatorio' })
    @Matches(/^[0-9]{10}$/, { message: 'El celular debe tener 10 dígitos numéricos' })
    cellphone: string;
  }
  