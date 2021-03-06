import React from 'react'
import Layout from '../components/MyLayout'
import Link from 'next/link'

const Index = () => (
    <Layout>
        <p>打印机(Printer)</p>
        <Link href={`/printer/headers`} prefetch={false}>
            <a>请求头(Request Header)</a>
        </Link>
        <br />
        <Link href={`/printer/position`} prefetch={false}>
            <a>地址(Geolocation)</a>
        </Link>
        <br />
        <Link href={`/printer/dns`} prefetch={false}>
            <a>域名解析(Dns)</a>
        </Link>
        <br />
        <Link href={`/printer/portforwarding`} prefetch={false}>
            <a>端口转发(Port Forwarding)</a>
        </Link>
        <br />
        <br />

        <p>爬虫(Spider)</p>
        <Link href={`/spider/novel`}>
            <a>小说(novel)</a>
        </Link>
        <br />
        <Link href={`/spider/photo`}>
            <a>图片(photo)</a>
        </Link>
        <br />
        <br />

        <p>作品集(Collection)</p>
        <Link href={`/static/2048/index.html`} prefetch={false}>
            <a>2048</a>
        </Link>
        <br />
        <Link href={`/static/handwrite/index.html`} prefetch={false} >
            <a>handwrite</a>
        </Link>
        <br />
        <Link href={`/static/wow/index.html`} prefetch={false}>
            <a>wow</a>
        </Link>
        <br />
        <Link href={`/static/countdown/index.html`} prefetch={false}>
            <a>count down</a>
        </Link>
        <br />
        <br />

        {/* <Link href={`/static/game/index.html`} prefetch={false}>
      <a>game</a>
    </Link> */}
        {/* <br />
    <Link href={`/static/3dshow/index.html`}>
      <a>3d show</a>
    </Link>
    <br />
    <Link href={`/static/bgtranslation/index.html`}>
      <a>bg translation</a>
    </Link> */}

    </Layout >
)

// Index.getInitialProps = async function () {
//   const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
//   const data = await res.json()

//   console.log(`Show data fetched. Count: ${data.length}`)

//   return {
//     shows: data
//   }
// }

export default Index
