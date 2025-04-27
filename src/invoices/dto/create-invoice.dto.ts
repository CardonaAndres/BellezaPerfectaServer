import { IsFutureOrToday } from 'src/app/utils/validators/IsFutureOrToday';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsDate,
    IsOptional,
    IsString,
    IsNumber,
    IsArray,
    IsNotEmpty,
    ValidateNested,
    Min,
    MinLength,
    Validate
} from 'class-validator';

export class CreateInvoiceDto {
    @IsOptional()
    invoice_ID?: number; // id de la factura | se asigna desde el servicio

    @ApiProperty({ description : 'Fecha de inicio', required : false })
    @IsOptional()
    @IsDate({ message: 'La fecha de inicio debe ser una fecha válida.' })
    @Type(() => Date)
    date_start?: Date = new Date();

    @ApiProperty({ description : 'Fecha de finalización de la factura' })
    @Type(() => Date)
    @IsDate({ message: 'La fecha de finalización debe ser una fecha válida.' })
    @Validate(IsFutureOrToday,[], { message: 'La fecha de finalización no puede ser una fecha pasada.' })
    date_end: Date;

    @ApiProperty({ description : 'Metodo de pago' })
    @IsString({ message: 'El tipo de pago debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El tipo de pago es obligatorio.' })
    type_payment: string;

    @ApiProperty({ description : 'IVA' })
    @IsOptional()
    @IsNumber({}, { message: 'El IVA debe ser un número.' })
    @Min(0, { message: 'El IVA no puede ser negativo.' })
    iva ?: number = 0;

    @ApiProperty({ description : 'RETEFUENTE' })
    @IsOptional()
    @IsNumber({}, { message: 'La retención en la fuente debe ser un número.' })
    @Min(0, { message: 'La retención en la fuente no puede ser negativa.' })
    retefuente ?: number = 0;

    @ApiProperty({ description : 'RETEIVA' })
    @IsOptional()
    @IsNumber({}, { message: 'La retención de IVA debe ser un número.' })
    @Min(0, { message: 'La retención de IVA no puede ser negativa.' })
    reteiva ?: number = 0;

    @ApiProperty({ description : 'Subtotal sin (IVA, RETEIVA, REFUENTE)' })
    @IsOptional()
    @IsNumber({}, { message: 'El subtotal debe ser un número.' })
    @Min(0, { message: 'El subtotal no puede ser negativo.' })
    subtotal ?: number;

    @ApiProperty({ description : 'Total CON (IVA, RETEIVA, REFUENTE)' })
    @IsOptional()
    @IsNumber({}, { message: 'El total debe ser un número.' })
    @Min(0, { message: 'El total no puede ser negativo.' })
    total ?: number; // total = subtotal + iva + retefuente + reteiva | calcular desde el servicio

    @ApiProperty({ description : 'ID del cliente' })
    @IsString({ message: 'El ID del cliente debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El ID del cliente es obligatorio.' })
    @MinLength(3, { message: 'El ID del cliente no puede estar vacío.' })
    client_ID : string;

    @ApiProperty({ description : 'ID del usuario' })
    @IsOptional()
    user_ID ?: string;

    @ApiProperty({ description : 'Array de productos y datos para crear la factura' })
    @IsArray({ message: 'La lista de productos debe ser un arreglo.' })
    @ValidateNested({ each: true })
    @Type(() => ProductList)
    productsList : ProductList[]; // array de productos | se asigna desde el servicio
}

export class ProductList {
    @IsString({ message: 'El ID del producto debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El ID del producto es obligatorio.' })
    @MinLength(0, { message: 'El ID del producto no puede estar vacío.' })
    product_ID : string;

    @IsNumber({}, { message: 'La cantidad debe ser un número.' })
    @Min(1, { message: 'La cantidad no puede ser menor a 1.' })
    @IsNotEmpty({ message: 'La cantidad es obligatoria.' })
    quantity : number;
    
    @IsOptional()
    total?: number; // total = quantity * product.price | calcular desde el servicio
    // id de la factura a la que pertenece el producto | se asigna desde el servicio
}
