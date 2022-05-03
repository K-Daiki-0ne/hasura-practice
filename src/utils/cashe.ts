import { makeVar } from '@apollo/client';

type Task = {
  title: string
};

// makeVarを用いてCasheにデータを格納する。
export const toolVar = makeVar<Task[]>([]);