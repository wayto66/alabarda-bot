import { NestFactory } from '@nestjs/core';
import fs from 'fs';
import { AppModule } from './server/modules/main/app.module';

async function bootstrap() {
  const httpsOptions = fs.existsSync(
    '../../../etc/letsencrypt/live/alabarda.link/',
  )
    ? {
        key: fs.readFileSync(
          '../../../etc/letsencrypt/live/alabarda.link/privkey.pem',
        ),
        cert: fs.readFileSync(
          '../../../etc/letsencrypt/live/alabarda.link/fullchain.pem',
        ),
      }
    : undefined;
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  await app.listen(3000);
}
bootstrap();
