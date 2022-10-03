import '@styles/globals.css'

function Application({ Component, pageProps }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `body { background: #${process.env.NEXT_PUBLIC_BACKGROUND} }`}}></style>
      <Component {...pageProps} />
    </>
  )
}

export default Application
