import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { dbg } from '../helpers/debug-helper';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    dbg(this, 'Before...');

    // return statement results in typescript error, unable to handle undefined
    //return next.handle().pipe(
    //  map((data) => (data ? { data } : undefined)),
    //  tap(() => dbg(this, `After...`)),
    //);

    // chatgpt fix -> ensures that if data is undefined or null it will set data to null instead of undefined. If response cannot accept null and must always have valid data type (`T`) then would need to ensure that data is always defined, or handle the scenario where data is not present in a way that does not return undefined
    return next.handle().pipe(
      map((data) => ({ data: data ?? null })), // ensures always returning an object, even for falsy data values
      tap(() => dbg(this, `After...`)),
    );
  }
}
