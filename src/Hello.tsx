import React, {FC} from 'react';
import './Hello.pcss';
import {proxy, useSnapshot} from 'valtio';
import {derive} from 'valtio/utils';

const store = proxy({
    user: 'AAA' as string,
    changeName: (value: string) => {
      console.log("### new value: ", value)
      // Use `store` here
      store.user = value
    },
    hello: () => console.log(`Hello, ${store.user}`)
  }
);

// NOTE compilation error
const derived = derive({
  userWithTimestamp: (get) => `${get(store).user} (${Date.now()})`,
  serWithTimestamp2: (get) => `${derived.userWithTimestamp} (${Date.now()})`,
}, {
  proxy: store,
})

export const Hello: FC = () => {
  const {user, userWithTimestamp} = useSnapshot(derived);

  return <div className={'Hello'}>
    <h1>Hello {userWithTimestamp}</h1>
    <input type={'text'} value={user} onChange={(event) => store.changeName(event.target.value)}/>
  </div>;
}
