import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/modules/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module_fixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module_fixture.createNestApplication();
    await app.init();
  });
});
