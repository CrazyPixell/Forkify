import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async (url, uploadData = undefined) => {
  try {
    const fetchPromise = uploadData
      ? (uploadData = fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        }))
      : fetch(url);

    const recipeFetch = await Promise.race([
      fetchPromise,
      timeout(TIMEOUT_SEC),
    ]);

    const recipeRes = await recipeFetch.json();

    if (!recipeFetch.ok) {
      throw new Error(`${recipeRes.message} (${recipeFetch.status})`);
    }

    return recipeRes;
  } catch (err) {
    throw err;
  }
};

/*
export const getJSON = async url => {
  try {
    const recipeFetch = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    const recipeRes = await recipeFetch.json();

    if (!recipeFetch.ok) {
      throw new Error(`${recipeRes.message} (${recipeFetch.status})`);
    }

    return recipeRes;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async (url, uploadData) => {
  try {
    const recipeSend = await Promise.race([
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(TIMEOUT_SEC),
    ]);

    const recipeRes = await recipeSend.json();

    if (!recipeSend.ok) {
      throw new Error(`${recipeRes.message} (${recipeSend.status})`);
    }

    return recipeRes;
  } catch (err) {
    throw err;
  }
};
*/
