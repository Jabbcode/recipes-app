import { Module } from '@nestjs/common'
import { EventsService } from './events.service'
import { EventsController } from './events.controller'
import { EventRepository } from './events.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { Event, EventSchema } from './schemas/event.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [EventsController],
  providers: [EventsService, EventRepository],
})
export class EventsModule {}
