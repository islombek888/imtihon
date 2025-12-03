import { ProductFilterDto } from '../dto/product-filter.dto';
import { Types } from 'mongoose';


export function buildProductMatch(filter: ProductFilterDto) {
  const match: any = { isActive: true }; 

  if (filter.query) {
    const q = filter.query.trim();
    match.$or = [
      { name: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
    ];
  }

  if (filter.categoryId) {
    try {
      match.categoryId = new Types.ObjectId(filter.categoryId);
    } catch (e) {
 
    }
  }

  if (filter.brand) {
    match.brand = filter.brand;
  }


  if (filter.priceMin || filter.priceMax) {
    match.price = {};
    if (filter.priceMin) match.price.$gte = Number(filter.priceMin);
    if (filter.priceMax) match.price.$lte = Number(filter.priceMax);
  }


  const specFilters: any[] = [];

  if (filter.color) {
    specFilters.push({ 'specs.color': filter.color });
  
    specFilters.push({ colors: filter.color });
  }

  if (filter.storage) {
    specFilters.push({ 'specs.storage': filter.storage });
    specFilters.push({ 'specs.memory': filter.storage });
  }

  if (specFilters.length > 0) {
    match.$or = match.$or ? [...match.$or, ...specFilters] : { $or: specFilters };
  }


  if (filter.ratingMin) {
    match.rating = { $gte: Number(filter.ratingMin) };
  }

  return match;
}