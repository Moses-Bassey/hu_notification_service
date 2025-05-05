import { IsNotEmpty, IsEnum } from "class-validator";
import { MonnifyEventType } from "src/utils/monnify.utils";

export class MonnifyWebhookDto {
    @IsNotEmpty()
    @IsEnum(MonnifyEventType)
    eventType: MonnifyEventType;
  
    @IsNotEmpty()
    eventData: any;
  }