import request from './request';

const BASE_URL = 'https://uncommon-starling-89.hasura.app/v1/graphql';
const HASURA_ADMIN_SECRET =
  'hw9KXsdU7EJCfG7WBjcR74U2jxs32VabiXPQiNrQqixmgYUEj40eElubgvWofbSd';

export default function query(options: object) {
  const requestOptions = {
    body: JSON.stringify(options),
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
    }),
  };

  return request(BASE_URL, requestOptions);
}
