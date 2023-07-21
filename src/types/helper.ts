export type ExtractProps<T> = T extends React.ComponentType<infer P> ? P : T;

export type ExtractTypeForm<T, K> = T extends { [key: string]: K } ? K : never;

export type Only<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P in keyof U]?: never;
};

export type Either<T, U> = Only<T, U> | Only<U, T>;
