import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationError, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    stopAtFirstError: true,
    forbidNonWhitelisted: true,
    whitelist: true,
    transformOptions: {
      enableImplicitConversion: true
    },
    exceptionFactory: (errors) => {
      return new UnprocessableEntityException({
        errors: errors.reduce((res: object, value: ValidationError) => {
          res[value.property] = Object.values(value.children.length ? value.children[0].constraints : value.constraints)[0]
  
          return res
        },{})
      })
    }
  }))

  await app.listen(3000);
}
bootstrap();
