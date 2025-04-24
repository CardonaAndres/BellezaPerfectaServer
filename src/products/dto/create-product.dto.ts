import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsOptional, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @ApiProperty({description: 'ID único del producto'})
    @IsString({ message: 'El ID del producto debe ser una cadena de texto' })
    @MinLength(2, { message : 'El ID del producto debe tener al menos 2 caracteres' })
    product_ID: string;

    @ApiProperty({description: 'Nombre del producto'})
    @IsString({ message : 'El nombre debe ser una cadena de texto' })
    name: string;

    @ApiProperty({description: 'Descripción detallada del producto',})
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'Precio del producto en moneda local'})
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ description: 'Cantidad actual en inventario'})
    @IsNumber()
    @Min(0)
    stock: number;

    @ApiProperty({ description: 'Cantidad mínima permitida en stock antes de generar alerta' })
    @IsNumber()
    @Min(0)
    stock_min: number;
}
