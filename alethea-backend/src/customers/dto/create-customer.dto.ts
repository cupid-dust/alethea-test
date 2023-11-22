import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  currency: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsOptional()
  @IsBoolean()
  hasAcceptedMarketing: boolean;

  @IsOptional()
  @IsBoolean()
  isProspect: boolean;

  @IsOptional()
  @IsBoolean()
  isReturning: boolean;

  @IsNumber()
  @IsOptional()
  totalAmountSpent: number;

  @IsNumber()
  @IsOptional()
  totalOrders?: number;
}
