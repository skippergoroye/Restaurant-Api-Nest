import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: mongoose.Model<Restaurant>,
  ) {}

  // Get all restaurants  => GET /resturants
  async findAll(): Promise<Restaurant[]> {
    const restaurants = await this.restaurantModel.find();
    return restaurants;
  }

  // Create new resturant => POST /resturants
  async create(restaurant : Restaurant): Promise<Restaurant> {
    const res = await this.restaurantModel.create(restaurant)
    return res;
  }


  // Get the restaurant by iD => GET /resturants/:id
  async findById(id: string): Promise<Restaurant> { 
    const restaurant = await this.restaurantModel.findById(id);
    

    if(!restaurant) {
      throw new Error('Restaurant not found');
    } 


    return restaurant;
  }
}
