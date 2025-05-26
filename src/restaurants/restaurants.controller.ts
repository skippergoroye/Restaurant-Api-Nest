import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Restaurant } from './schemas/restaurant.schema';
import { RestaurantsService } from './restaurants.service';
import { createRestaurantDto } from './dto/create-restaurant.dto';
import { updateRestaurantDto } from './dto/update-restaurant.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/cloudinary';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  async getAllRestaurants(@Query() query: ExpressQuery): Promise<Restaurant[]> {
    return await this.restaurantsService.findAll(query);
  }

  @Post()
  async createRestaurant(
    @Body() restaurant: createRestaurantDto,
  ): Promise<Restaurant> {
    return await this.restaurantsService.create(restaurant);
  }

  @Get(':id')
  async getRestaurant(@Param('id') id: string): Promise<Restaurant> {
    return await this.restaurantsService.findById(id);
  }

  @Put(':id')
  async updateRestaurant(
    @Param('id') id: string,
    @Body() restaurant: updateRestaurantDto,
  ): Promise<Restaurant> {
    return await this.restaurantsService.updateById(id, restaurant);
  }

  @Delete(':id')
  async deleteRestaurant(
    @Param('id') id: string,
  ): Promise<{ deleted: boolean }> {
    const restaurant = await this.restaurantsService.deleteById(id);

    if (restaurant) {
      return { deleted: true };
    }

    return { deleted: false };
  }

  // works for single file upload  (FileInterceptor) (UploadedFile) file
  //   @Put('upload/:id')
  //   @UseInterceptors(FileInterceptor('file'))
  //   async uploadFiles(@Param('id') id: string, @UploadedFile() files: Array<Express.Multer.File>) {
  //     console.log(id)
  //     console.log(files)
  //   }

  // multiple file upload
  // @Put('upload/:id')
  // @UseInterceptors(FilesInterceptor('files'))
  // async uploadFiles(
  //   @Param('id') id: string,
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  // ) {
  //   console.log(id);
  //   console.log(files);
  // }


  @Put('upload/:id')
  @UseInterceptors(FilesInterceptor('files', 10, multerConfig))
  async uploadFiles(@Param('id') id: string, @UploadedFiles() files: Array<Express.Multer.File>) {
    const imageUrls = await this.restaurantsService.uploadImages(id, files);
    return { message: 'Images uploaded successfully', imageUrls };
  }
}
