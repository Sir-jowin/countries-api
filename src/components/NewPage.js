import axios from "axios"
import { useState, useEffect } from "react"
import styled from 'styled-components'

const CountryName = styled.div`
    font-size: 18px;
    font-weight: bold;
    line-height: 24px;
    width: 200px;
`

const ImageCover = styled.div`
    height: 200px;
    width: 200px;
    overflow: hidden;
    img {
        width: 200px;
        height: 200px;
        object-fit: contain;
    }
`

const Country=styled.div`
    text-align: start!important;
    display: inline-block;
    margin: 20px;
    background-color: #ddd;
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid #aaa;
`

const Text = styled.p`
    margin-block-start: 0;
    margin-block-end: 0;
`

const NewPage = () => {
    const [isloading, setIsloading] = useState(true)
    const [data, setData] = useState([])
    
    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            setData(response.data)
            console.log(response.data)
            setIsloading(false);
        }).catch(e => {throw e})
    }, [])

    const toReturn = isloading ? <>Loading...</> :<>
        {data.map((country, i) =><Country key={i}>
            <ImageCover><img src={country.flag}/></ImageCover>
            <CountryName>{country.name} ({country.cioc})</CountryName>
            <Text>Capital: <b>{country.capital}</b></Text>
            <Text>Calling Code: <b>{country.callingCodes.map((code, c)=><>
                {code}
            </>)}</b></Text>
        </Country>)}
        
    </>
    return toReturn
}

export default NewPage