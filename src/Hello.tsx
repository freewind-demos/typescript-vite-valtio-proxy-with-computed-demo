import React, {FC} from 'react';
import './Hello.pcss';
import {proxy, useSnapshot} from 'valtio';
import {derive, proxyWithComputed} from 'valtio/utils';
import memorize from 'proxy-memoize'

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

const newStore = proxyWithComputed(store, {
  userWithTimestamp: memorize((snapshot) => `${snapshot.user} (${Date.now()})`),
  // NOTE: it's working in js, but ts typing doesn't allow it
  serWithTimestamp2: memorize((memorize) => `${memorize.userWithTimestamp} (${Date.now()})`),
})

export const Hello: FC = () => {
  const {user, userWithTimestamp2} = useSnapshot(newStore);

  return <div className={'Hello'}>
    <h1>Hello {userWithTimestamp2}</h1>
    <input type={'text'} value={user} onChange={(event) => store.changeName(event.target.value)}/>
  </div>;
}
