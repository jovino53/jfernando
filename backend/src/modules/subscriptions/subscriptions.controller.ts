import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('api/subscriptions')
@UseGuards(JwtAuthGuard)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('plans')
  async getAllPlans() {
    return this.subscriptionsService.getAllPlans();
  }

  @Get('plans/:plan')
  async getPlanLimits(@Param('plan') plan: any) {
    return this.subscriptionsService.getPlanLimits(plan);
  }

  @Get('current')
  async getCurrentSubscription(@Request() req: any) {
    return this.subscriptionsService.getCompanySubscription(req.user.companyId);
  }

  @Post()
  async createSubscription(@Request() req: any, @Body() dto: CreateSubscriptionDto) {
    return this.subscriptionsService.createSubscription(
      req.user.companyId,
      dto.plan,
      dto.amount || 0,
    );
  }

  @Post('upgrade')
  async upgradePlan(@Request() req: any, @Body('plan') plan: any) {
    return this.subscriptionsService.upgradePlan(req.user.companyId, plan);
  }

  @Post('cancel')
  async cancelSubscription(@Request() req: any) {
    return this.subscriptionsService.cancelSubscription(req.user.companyId);
  }
}
