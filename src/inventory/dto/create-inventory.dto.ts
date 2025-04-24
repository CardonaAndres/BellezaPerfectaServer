import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({
    description: 'Tipo de acción realizada en el inventario (por ejemplo, "entrada", "salida")',
    example: 'entrada',
  })
  @IsString({ message: 'El tipo debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El tipo es obligatorio.' })
  type: string;

  @ApiProperty({
    description: 'Cantidad del producto afectada por la acción',
    example: 50,
  })
  @IsInt({ message: 'La cantidad debe ser un número entero.' })
  @Min(1, { message: 'La cantidad debe ser mayor o igual a 1.' })
  @Max(10000, { message: 'La cantidad no debe ser mayor a 10,000.' })
  quantity: number;

  @ApiProperty({
    description: 'Razón de la acción realizada en el inventario (por ejemplo, "venta", "ajuste")',
    example: 'venta',
  })
  @IsString({ message: 'La razón debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La razón es obligatoria.' })
  reason: string;

  @ApiProperty({
    description: 'ID del producto asociado con la acción de inventario',
    example: 'ABC123',
  })
  @IsString({ message: 'El product_ID debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El product_ID es obligatorio.' })
  product_ID: string;
}
