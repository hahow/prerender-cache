# Prerender Cache 

> 使用 cypress 清除 prerender 的 cache

## Table of Content

- [Config](#config)
- [Usage](#Usage)

## Config
複製一份 `.env.sample` -> `.env`
然後填入 prerender 的 帳號密碼 ( 1password 裡面有)


## Usage

`node index.js --help`：看到可以使用的指令（其實只有一個）

`node index.js -u {url}`：清除指定網址的 prerender cache ，如果 prerender 已經有現存 cache 會清除之後再 cache 一次 
