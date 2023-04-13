import supertest from 'supertest';

import { Express } from 'express';
import { FastifyInstance } from 'fastify';

import {
  GetRequest,
  PostRequest,
  PutRequest,
  Response
} from './http';

export class Spark {
  private app: Express | FastifyInstance;

  constructor(app: Express | FastifyInstance) {
    this.app = app;
  }

  public async request<T>(options: {
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    headers?: {[key: string]: any}[],
    data?: any
  }): Promise<Response<T>> {
    switch (options.method) {
    case 'GET': {
      return this.get({
        url: options.url,
        headers: options.headers
      });
    }
    case 'POST': {
      return this.post({
        url: options.url,
        headers: options.headers,
        data: options.data
      });
    }
    case 'PUT': {
      return this.put({
        url: options.url,
        headers: options.headers,
        data: options.data
      });
    }
    case 'DELETE': {
      return this.delete({
        url: options.url,
        headers: options.headers,
        data: options.data
      });
    }
    default:
      throw new Error('not supported');
    }
  }

  public async get<T>({ url, headers }: GetRequest): Promise<Response<T>> {
    const request = supertest(this.app);

    let status: number;
    let data: T;

    if (headers) {
      const response = await request
        .get(url)
        .set(headers);

      status = response.status;
      data = response.body;
    } else {
      const response = await request.get(url);

      status = response.status;
      data = response.body;
    }

    return { status, data };
  }

  public async post<R extends string | object | undefined, T>({
    url,
    headers,
    data
  }: PostRequest<R>): Promise<Response<T>> {
    const request = supertest(this.app);

    let status: number;
    let body: T;

    if (headers) {
      const response = await request
        .post(url)
        .send(data)
        .set(headers);

      status = response.status;
      body = response.body;
    } else {
      const response = await request
        .post(url)
        .send(data);

      status = response.status;
      body = response.body;
    }

    return { status, data: body };
  }

  public async put<R extends string | object | undefined, T>({
    url,
    headers,
    data
  }: PutRequest<R>): Promise<Response<T>> {
    const request = supertest(this.app);

    let status: number;
    let body: T;

    if (headers) {
      const response = await request
        .put(url)
        .send(data)
        .set(headers);

      status = response.status;
      body = response.body;
    } else {
      const response = await request
        .put(url)
        .send(data);

      status = response.status;
      body = response.body;
    }

    return { status, data: body };
  }

  public async delete<R extends string | object | undefined, T>({
    url,
    headers,
    data
  }: PutRequest<R>): Promise<Response<T>> {
    const request = supertest(this.app);

    let status: number;
    let body: T;

    if (headers) {
      const response = await request
        .delete(url)
        .send(data)
        .set(headers);

      status = response.status;
      body = response.body;
    } else {
      const response = await request
        .delete(url)
        .send(data);

      status = response.status;
      body = response.body;
    }

    return { status, data: body };
  }
}
