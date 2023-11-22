import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsOptional()
  attributes: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  currency: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  inventoryType: string;

  @IsOptional()
  @IsBoolean()
  isAvailable: boolean;

  @IsOptional()
  @IsBoolean()
  isShippable: boolean;

  @IsString()
  @IsOptional()
  price: string;

  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsNumber()
  @IsOptional()
  variants?: number;
}
