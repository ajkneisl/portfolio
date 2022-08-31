import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Breadcrumbs from '../app/components/Breadcrumbs'
import Layout from '../app/components/Layout'

type Photo = {
    date: string,
    url: string,
    camInfo: string
}

const Photography = () => {
    const [photos, setPhotos] = useState([] as Photo[])

    useEffect(() => {
        setPhotos([
            {
                url: "https://lh3.googleusercontent.com/-k1SxNx01JbS96a0M-jtFWLnMNXj_YsyROQiPHWp8v-xjdSiLw2fzy_aPNWj-wd_AIMRjUjce3gYiWmCqMTJEwFWuiZ_LEQUtPegHAeiD69OcUmvwVFqHROts39p2eZYpqkq0d-47_-ySucHyI1o8zZJ0mD3vcqLiSp12Ln9LGsJ0YTFik9H8wiucMec2bPJFd_hcR-SCTb4ql6Ijs8kvtYG84D4zPKeYWsQKH1nbuYXNg8OjiuRts9IQadYRKnVolXLcVnCUz7cJIcd23FOdCoNcYg0_gbi3tBa2gPNlKXBqawc5FJ-Vp_43fHuHPYh4U0M40K35oMqm3TyhFDPBeOKzUsrgyvlstwWsHM8ZqCUIhbw6nux_d93hWK0esGvhRNaIqgNg90w1jOxB4_q25bOx2-CQ7EuImw0vmn8AeHyVHYpRsrOgmqrbtHQgYsRHW8s3aC1OR83QzxsS0klEecbMGG4MybbFmGYHwfUtq2Cl1sS3nh7szv7iTImqUw3Oxop6J9dVwRkZHnpAPN7Qt1WKbXDP-Qq3GLaH3zx6qACbNEdquxWQAUMzLGxFABvLx2OmZWlhu7j9vfjZ24VD-jFnjZa97V_d5zj4fdHBRAKYQihz8qSUyVXrAeuyFGIe1svNBnZcJP3OHNwt5uEZ5sBvgh8aeFncVsfZTFMOiv3yKKjJmsVVirP68wQx9D8B7z06Wup-C_TUEbGnwWy7Z22behEnSQe1e3LK7mM2G1lql8Do2SgKhOcNpYQCDaFWeyZF7lcTTvU5YjK3wxN4342yN9-xosKTk2ogoae18RxnuZy3sC_5CXoybvy6NPeOhc4x9GpP7UI8_PzovH7Nf-hFh-ukk9wqwyuCaqRBRiw0oXQ876qI6xYT9IwVGxohgSnpmA77JU=w1993-h1321-no?authuser=0",
                camInfo: "pentax k1000 x fujifilm 400 iso",
                date: "8/25/22"
            },
            {
                url: "https://lh3.googleusercontent.com/QrIgtjmhVR_4tkcVtV4oJ2wt9LgCSPuZzTOPPZtEYumN4EfMc3q7ezb1oTxvJn476kJVKoHVi76ySfbyTE4y8C2TIkBW2w7hhsik7PpZvgnITcyuOJbku2ODB7MDjf4WDFdt99G2nTuVDywfXHhlagXKlPktgzwmn4r2i1WL7Q6iPTytjxrSkJOTpy5AMLdy3ZpDFqfSlqwfiPQnZE_gg0IgyTnoxRnTjW-SQKW8AzyRij_rzfyLOM7hxA0OR3Noy1IPjnJotiB5RT7aRFWjvEtONLNDwbnhDn96Vx7zN4v3Wim0ErOCaSnYJjI6MLkinLLexLmgbZOwk9DH7FvmOr95x5jutNdd3wypopTk1ZEcjsLLRrCquSggt8nzm9gXEWz_iLLpwnIzpSS9LHgTAPMpY-DVy3vQolnoIbu3jCpiNP1X1oFFXggAJOBRVae9lUNQfJcaeLV5xuk50IH4ID6g2D6rqzIzGFLN2nQ1d04-ncrqnRhV7tEYgBbUmoNm5ikFsaUPx7aTq3Sn1loLa_NH5w1haFbmFD8ZrgKS5M0-mPNOxRb35_qvas-BQrC5wuR_vV4zW9G8xy8GUkJr2KLN2MIwBY3uRoBFMsmdZDqpn1V9xvH0ciYRlmI9Ou51AVZBHlOKzrka5FZQhQGZ91bp2wRHLQFklvSjKwVaI5MGBk0gggL8KoNFth0WOep4MCAydNzP0yutSBhCn0G6IBGmyyxdDiitF6Wwd-rzYUoJ1wyjyHy-G7N3_kDDvOxbDPF-l82HM6MM3doRF4HLdShIG6hjDlg3pg7OoZzUoHZkDZSs7CIZxKKnz32AXe37Cqd7L0ZGGsD6N_Y4I7uifhZjFihgyHZiq13__LTO5L7t9tAyILqWMbq8thJ_BVgrvKdpvs-1gQI=w477-h316-no?authuser=0",
                camInfo: "pentax k1000 x fujifilm 400 iso",
                date: "8/25/22"
            }
        ])
    }, [])

    return (
        <Layout>
            <Breadcrumbs/>
            <section>
                <h3>stuff i use</h3>
                <p>
                    <b>cameras</b> pentax k1000, canon eos rebel t7
                    <br /> <b>film</b> fujicolor superia x-tra 400 color
                    negative film
                </p>
            </section>
            <section>
                <h3 style={{textAlign: "center", marginTop: "32px"}}>pictures</h3>
                <PictureDisplay>
                    {photos.map(({date, url, camInfo }) => <Picture camInfo={camInfo} date={date} url={url} />)}
                </PictureDisplay>
            </section>
        </Layout>
    )
}

const PictureDisplay = styled.section`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
    margin: 32px;
`

const Picture: React.FC<Photo> = ({ url, date, camInfo }) => {
    return (
        <PictureStyle>
            <img src={url} height="332" />
            <p><a target="_blank" href={url}>{date}</a> {camInfo}</p>
        </PictureStyle>
    )
}

const PictureStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export default Photography
