import { Body, Controller, Post } from '@nestjs/common'

import { MatcherService } from './matcher.service'

@Controller('matcher')
export class MatcherController {
  constructor(private readonly matcherService: MatcherService) {}

  @Post('/custom')
  async matchCustom(@Body() body: { source: string; selector: string }) {
    return this.matcherService.matchCustom(body.source, body.selector)
  }

  @Post('/tsquery')
  async matchTsQuery(@Body() body: { source: string; selector: string }) {
    return this.matcherService.matchTsQuery(body.source, body.selector)
  }

  @Post('/esquery')
  async matchEsQuery(@Body() body: { source: string; selector: string }) {
    return this.matcherService.matchEsQuery(body.source, body.selector)
  }
}
