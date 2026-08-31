import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client as EsClient } from '@elastic/elasticsearch';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Cocktail } from '../src/cocktails/cocktails.entity';
import { COCKTAILS_INDEX } from '../src/cocktails/cocktails.elasticsearch-indexer';

async function waitForEsDocument(
  esClient: EsClient,
  id: string,
  attempts = 15,
  delayMs = 300,
) {
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const doc = await esClient.get({ index: COCKTAILS_INDEX, id });
      return doc._source;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw new Error(`Document ${id} did not appear in Elasticsearch in time`);
}

describe('Cocktails', () => {
  let app: INestApplication;
  let cocktailRepository: Repository<Cocktail>;
  let elasticSearch: EsClient;
  let createdId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    cocktailRepository = moduleFixture.get(getRepositoryToken(Cocktail));
    elasticSearch = new EsClient({ node: process.env.ELASTICSEARCH_HOST });
  });

  afterAll(async () => {
    if (createdId) {
      await cocktailRepository.delete(createdId);

      await elasticSearch
        .delete({ index: COCKTAILS_INDEX, id: String(createdId) })
        .catch(() => undefined);
    }
    await app.close();
  });

  it('creates a new cocktail', async () => {
    const title = `Cocktail ${Date.now()}`;
    const description = 'Cheap cocktail';
    const price = 4.5;

    await request(app.getHttpServer())
      .post('/cocktails')
      .send({
        title,
        description,
        price,
      })
      .expect(201);

    const created = await cocktailRepository.findOneBy({ title });

    expect(created).not.toBeNull();

    createdId = created.id;

    const doc = await waitForEsDocument(elasticSearch, String(created.id));

    expect(doc).toMatchObject({
      title,
      description,
      price,
    });
  }, 15000);
});
