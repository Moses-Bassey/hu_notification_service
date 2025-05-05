import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AxiosHttpService {
  constructor(private readonly httpService: HttpService) {}

  public async postData(
    url: string,
    data: any,
    authorized?: boolean,
    authorizer?: string,
    extra_config?: any,
    auth_key?: any,
  ) {
    const default_key = 'Bearer';
    const extra_headers = authorized
      ? {
          Authorization: `${auth_key ? auth_key : default_key} ${authorizer}`,
        }
      : {};
    return await lastValueFrom(
      this.httpService
        .post(url, data, {
          headers: extra_headers,
          ...extra_config,
        })
        .pipe(
          map((response) => {
            return response.data;
          }),
        ),
    );
  }

  public async getData(
    url: string,
    authorized?: boolean,
    authorizer?: string,
    extra_config?: any,
  ) {
    const extra_headers = authorized
      ? {
          Authorization: `Bearer ${authorizer}`,
        }
      : {};
    return await lastValueFrom(
      this.httpService
        .get(url, {
          headers: extra_headers,
          ...extra_config,
        })
        .pipe(
          map((response) => {
            return response.data;
          }),
        ),
    );
  }

  public async patchData(
    url: string,
    data: any,
    authorized?: boolean,
    authorizer?: string,
    extra_config?: any,
    auth_key?: any,
  ) {
    const default_key = 'Bearer';
    const extra_headers = authorized
      ? {
          Authorization: `${auth_key ? auth_key : default_key} ${authorizer}`,
        }
      : {};
    return await lastValueFrom(
      this.httpService
        .put(url, data, {
          headers: extra_headers,
          ...extra_config,
        })
        .pipe(
          map((response) => {
            return response.data;
          }),
        ),
    );
  }
}
