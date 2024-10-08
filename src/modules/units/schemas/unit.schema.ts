import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UnitDocument = HydratedDocument<Unit>

@Schema({
  toJSON: {
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id
      delete ret._id
    },
  },
})
export class Unit {
  @Prop({ required: true, unique: true, type: String, maxlength: 15 })
  name: string

  @Prop()
  description: string

  @Prop({ default: true })
  isActive: boolean
}

export const UnitSchema = SchemaFactory.createForClass(Unit)
