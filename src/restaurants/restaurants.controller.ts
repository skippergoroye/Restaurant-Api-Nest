import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Restaurant } from './schemas/restaurant.schema';
import { RestaurantsService } from './restaurants.service';
import { createRestaurantDto } from './dto/create-restaurant.dto';
import { updateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
    constructor(private restaurantsService: RestaurantsService) {}


    @Get()
    async getAllRestaurants(): Promise<Restaurant[]> {
        return await this.restaurantsService .findAll();

    }


    @Post()
    async createRestaurant(@Body() restaurant: createRestaurantDto): Promise<Restaurant> {
        return await this.restaurantsService.create(restaurant);
    }


    @Get(':id')
    async getRestaurant( @Param('id') id: string): Promise<Restaurant> {
        return await this.restaurantsService.findById (id);
    }



    @Put(':id')
    async updateRestaurant( @Param('id') id: string, @Body() restaurant: updateRestaurantDto ): Promise<Restaurant> {
        return await this.restaurantsService.updateById (id, restaurant);
    }


    @Delete(':id')
    async deleteRestaurant( @Param('id') id: string): Promise<{deleted: boolean}> {

        const restaurant = await this.restaurantsService.deleteById(id);
        

        if(restaurant) {
            return { deleted: true };
        }

        return { deleted: false };
    }
}