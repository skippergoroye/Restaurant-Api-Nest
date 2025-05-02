import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Restaurant } from './schemas/restaurant.schema';
import { RestaurantsService } from './restaurants.service';
import { createRestaurantDto } from './dto/create-restaurant.dto';

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
}