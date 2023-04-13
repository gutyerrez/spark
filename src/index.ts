import { Spark } from './client/SparkClient';

import { Express } from 'express';
import { FastifyInstance } from 'fastify';

export let spark: Spark | undefined;

export function createInstance(app: Express | FastifyInstance) {
  spark = new Spark(app);

  return spark;
}

export default function<T>(options: {
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: {[key: string]: any}[],
  data?: any
}) {
  if (!spark) {
    throw new Error('spark must be initialized before request call');
  }

  return spark.request<T>(options);
}
