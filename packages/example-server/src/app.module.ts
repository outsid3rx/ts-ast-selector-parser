import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'node:path'

import { MatcherModule } from './matcher/matcher.module'

@Module({
  imports: [
    MatcherModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'example/dist'),
    }),
  ],
})
export class AppModule {}
