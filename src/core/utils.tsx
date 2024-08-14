export function when<T, P>(value: unknown, fn: (params?: P) => T, params?: P) {
  if (value) {
    return fn(params);
  }
}

export function printWhen(content: unknown, conditions: boolean | undefined | null): JSX.Element {
  return conditions ? <>{content}</> : <></>;
}

export const removedEmptyProps = (obj: Record<string | number, unknown> | unknown) => {
  if (!obj) return obj;
  if (obj instanceof FormData) return obj;
  return Object.entries(obj).reduce((prev, [key, value]) => {
    if (value) {
      Object.assign(prev, { [key]: value });
    }
    return prev;
  }, {});
};

export const removeEmptyArrays = (obj: null | undefined | Record<string | number, unknown>) => {
  if (!obj) {
    return;
  }

  return Object.entries(obj).reduce((prev, [key, value]) => {
    if (!Array.isArray(value) || !(value.length === 0)) Object.assign(prev, { [key]: value });

    return prev;
  }, {});
};

export const removeValuesFromObject = (obj: any, valuesToRemove: Array<string | null | undefined | number>) => {
  const output: any = {};
  for (const key in obj) {
    if (!valuesToRemove.includes(obj[key])) {
      output[key] = obj[key];
    }
  }
  return output;
};

export const checkUsernameConditions = (username: string) => {
  if (!username) return;
  if (!/^[a-z0-9._-]+$/.test(username)) return `Can contain lowercase letters, digits, '.', '_', and '-'.`;
  if (username.startsWith('.') || username.startsWith('_')) return "Shouldn't start with a period or underscore.";
  if (/[._]{2,}/.test(username)) return 'No consecutive periods or underscores.';
  if (username.length < 6 || username.length > 24) return 'Must be between 6 and 24 characters.';
};
