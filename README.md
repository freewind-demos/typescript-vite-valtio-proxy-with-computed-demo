TypeScript Vite React ProxyWithComputed Demo
===========================

使用proxyWithComputed时，typescript不支持在某个computed函数中使用另一个刚刚定义的函数。

虽然代码是可以正常运行的，但是没法在typescript中构造出合适的类型：

https://github.com/pmndrs/valtio/issues/192

另：不太明白derive与proxyWithComputed的区别

```
npm install
npm run demo
```

It will open page on browser automatically.
