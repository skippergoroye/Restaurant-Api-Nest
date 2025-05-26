import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import * as mongoose from 'mongoose';
import {  Query   } from "express-serve-static-core"


@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: mongoose.Model<Restaurant>,
  ) {}

  // Get all restaurants  => GET /resturants
  async findAll(query: Query): Promise<Restaurant[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = (currentPage - 1) * resPerPage;



    const keyword = query.keyword ? {
      name: {
        $regex: query.keyword,
        $options: 'i',
      },
    }: {}


    const restaurants = await this.restaurantModel
    .find({ ... keyword})
    .limit(resPerPage)
    .skip(skip)
    return restaurants;
  }

  // Create new resturant => POST /resturants
  async create(restaurant: Restaurant): Promise<Restaurant> {
    const res = await this.restaurantModel.create(restaurant);
    return res;
  }

  // Get the restaurant by iD => GET /resturants/:id
  async findById(id: string): Promise<Restaurant> {

    const isValidId = mongoose.isValidObjectId(id)


    if(!isValidId) {
      throw new BadRequestException("Wrong mongoose ID Error. Please enter correct ID.")
    }
    const restaurant = await this.restaurantModel.findById(id);

    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    return restaurant;
  }

  // update restaurant => PUT /resturants/:id
  async updateById(id: string, restaurant: Restaurant): Promise<Restaurant> {
    const updatedRestaurant = await this.restaurantModel.findByIdAndUpdate(id, restaurant, {
      new: true,
      runValidators: true,
    });

    if (!updatedRestaurant) {
      throw new Error('Restaurant not found');
    }

    return updatedRestaurant;
  }


  // Delete restaurant => DELETE /resturants/:id
  async deleteById(id: string): Promise<Restaurant> {
    const deletedRestaurant = await this.restaurantModel.findByIdAndDelete(id);

    if (!deletedRestaurant) {
      throw new Error('Restaurant not found');
    }

    return deletedRestaurant;
  }


  // Upload images to Cloudinary and update restaurant
  async uploadImages(id: string, files: Array<Express.Multer.File>): Promise<string[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    await this.findById(id); // Validate restaurant exists

    // Image uploads are handled by multer-storage-cloudinary
    const imageUrls = files.map((file) => file.path); // CloudinaryStorage adds 'path' with the secure URL

    // Update the restaurant with the new image URLs
    await this.restaurantModel.findByIdAndUpdate(
      id,
      { $push: { images: { $each: imageUrls } } },
      { new: true },
    );

    return imageUrls;
  }

  // Validate MongoDB ObjectId
  private isValidObjectId(id: string): boolean {
    return mongoose.isValidObjectId(id);
  }
}
