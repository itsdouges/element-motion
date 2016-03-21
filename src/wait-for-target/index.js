const callbacks = {};
const targets = {};

function callbackTarget (key) {
  const target = targets[key];
  const callback = callbacks[key];

  if (!target || !callback) {
    return;
  }

  callback(target);

  console.log('Callback with target, clearing state..');

  delete callbacks[key];
  delete targets[key];
}

export function waitForTarget (key, cb) {
  if (callbacks[key]) {
    throw new Error('Already waiting for target.');
  }

  console.log('Waiting for target..');

  callbacks[key] = cb;
  callbackTarget(key);
}

export function targetReady (key, inTarget) {
  if (targets[key]) {
    throw new Error('Target already set.');
  }

  console.log('Target ready..');

  targets[key] = inTarget;
  callbackTarget(key);
}
