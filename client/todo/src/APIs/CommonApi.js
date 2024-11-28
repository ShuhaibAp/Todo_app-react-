import axios from 'axios'

const CommonApi=(reqMethod,reqBody,reqUrl,reqHeader)=>{
    const config = {
      method: reqMethod,
      data: reqBody,
      url: reqUrl,
      headers:reqHeader ? reqHeader : { "Content-Type": "application/json" },
    };
    return axios(config)
}
export default CommonApi