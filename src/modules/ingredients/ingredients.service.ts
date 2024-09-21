import { Injectable, HttpException } from '@nestjs/common'
import { CreateIngredientDto } from './dto/create-ingredient.dto'
import { UpdateIngredientDto } from './dto/update-ingredient.dto'
import { Ingredient } from './schema/ingredient.schema'
import { IngredientRepository } from './ingredients.repository'
import { FilterIngredientDto } from './dto/filter-ingredient.dto'

@Injectable()
export class IngredientsService {
  constructor(private readonly ingredientRepository: IngredientRepository) {}

  async create(
    createIngredientDto: CreateIngredientDto,
  ): Promise<{ ingredient: Ingredient; message: string }> {
    try {
      const existIngredient = await this.ingredientRepository.findByName(
        createIngredientDto.name,
      )

      if (existIngredient) {
        throw new HttpException(
          {
            statusCode: 400,
            message: 'Ya existe un ingrediente con ese nombre',
          },
          400,
        )
      }

      return {
        ingredient: await this.ingredientRepository.create(createIngredientDto),
        message: 'El ingrediente se agrego correctamente',
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException(
          {
            statusCode: 500,
            message: 'Internal server error',
          },
          500,
        )
      }
    }
  }

  async findByFilter(filter: FilterIngredientDto) {
    return await this.ingredientRepository.findByFilter(filter)
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ ingredients: Ingredient[]; pages: number; total: number }> {
    return await this.ingredientRepository.findAll(page, limit)
  }

  async findOne(id: string): Promise<Ingredient> {
    try {
      const ingredient = await this.ingredientRepository.findOne(id)

      if (!ingredient) {
        throw new HttpException(
          {
            statusCode: 400,
            message: `No existe ingrediente con el id ${id}`,
          },
          400,
        )
      }

      return ingredient
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException(
          {
            statusCode: 500,
            message: 'Internal server error',
          },
          500,
        )
      }
    }
  }

  async update(
    id: string,
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<{ ingredient: Ingredient; message: string }> {
    try {
      const ingredient = await this.ingredientRepository.findOne(id)

      if (!ingredient) {
        throw new HttpException(
          {
            statusCode: 400,
            message: `No existe ingrediente con el id ${id}`,
          },
          400,
        )
      }
      return {
        ingredient: await this.ingredientRepository.update(
          id,
          updateIngredientDto,
        ),
        message: 'Ingrediente actualizado correctamente',
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException(
          {
            statusCode: 500,
            message: 'Internal server error',
          },
          500,
        )
      }
    }
  }

  async remove(
    id: string,
  ): Promise<{ ingredient: Ingredient; message: string }> {
    try {
      const ingredient = await this.ingredientRepository.findOne(id)

      if (!ingredient) {
        throw new HttpException(
          {
            statusCode: 400,
            message: `No existe ingrediente con el id ${id}`,
          },
          400,
        )
      }

      return {
        ingredient: await this.ingredientRepository.delete(id),
        message: 'El ingrediente se elimino correctamente',
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException(
          {
            statusCode: 500,
            message: 'Internal server error',
          },
          500,
        )
      }
    }
  }
}
