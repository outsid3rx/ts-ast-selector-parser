import { Module } from '@nestjs/common'

import { MatcherController } from './matcher.controller'
import { MatcherService } from './matcher.service'

@Module({
  providers: [MatcherService],
  controllers: [MatcherController],
})
export class MatcherModule {}
