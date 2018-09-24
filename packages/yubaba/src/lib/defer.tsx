const defer = <TValue extends void>() => {
  let resolve: (value?: TValue | PromiseLike<TValue> | undefined) => void = () => {};
  let reject: (value?: TValue | PromiseLike<TValue> | undefined) => void = () => {};

  const promise = new Promise<TValue>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    resolve,
    reject,
    promise,
  };
};

export default defer;
