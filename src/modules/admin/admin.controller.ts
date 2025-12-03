import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AdminGuard } from './guards/admin.guard';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}


  @Post('products')
  createProduct(@Body() dto: CreateProductDto) {
    return this.adminService.createProduct(dto);
  }

  @Put('products/:id')
  updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.adminService.updateProduct(id, dto);
  }

  @Delete('products/:id')
  deleteProduct(@Param('id') id: string) {
    return this.adminService.deleteProduct(id);
  }

  @Get('products')
  getProducts() {
    return this.adminService.getAllProducts();
  }

  
  @Get('categories')
  getCategories() {
    return this.adminService.getAllCategories();
  }

  
  @Get('users')
  getUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('orders')
  getOrders() {
    return this.adminService.getAllOrders();
  }


  @Get('stats')
  getStats() {
    return this.adminService.getStats();
  }
}